import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/validation';
import { db } from '@/lib/db';
import { enquiries } from '@/lib/schema';
import { limiter, getClientIp } from '@/lib/rate-limit';
import { sendLeadNotification } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ip = getClientIp(request.headers);

    // Rate limit
    const { success } = await limiter().limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    // Validate
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data', details: parsed.error.flatten() }, { status: 422 });
    }

    const data = parsed.data;

    // Honeypot check — silently succeed
    if (data._hp) {
      return NextResponse.json({ ok: true });
    }

    // Time trap — reject if form submitted in <3 seconds
    if (data._ts) {
      const elapsed = Date.now() - parseInt(data._ts, 10);
      if (elapsed < 3000) {
        return NextResponse.json({ ok: true }); // silently discard
      }
    }

    // Origin check (CSRF)
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Insert into DB
    await db.insert(enquiries).values({
      formType: data.formType,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      sourcePath: data.sourcePath || null,
    });

    // Fire-and-forget email notification
    sendLeadNotification({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      formType: data.formType,
      sourcePath: data.sourcePath,
    }).catch(console.error); // don't block the response

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Lead API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

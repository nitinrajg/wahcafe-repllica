import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { db } from '@/lib/db';
import { adminUsers } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, createSession } from '@/lib/auth';
import { limiter, getClientIp } from '@/lib/rate-limit';

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request.headers);

    // Rate limit
    const { success } = await limiter().limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
    }

    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { email, password } = parsed.data;

    // Find user
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email))
      .limit(1);

    // Generic error (no user enumeration)
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create session
    await createSession(user.id);

    // Update last login
    await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, user.id));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

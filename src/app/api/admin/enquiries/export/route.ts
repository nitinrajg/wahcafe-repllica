import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { enquiries } from '@/lib/schema';
import { getAdminUser } from '@/lib/auth';

export async function GET() {
  const user = await getAdminUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const allEnquiries = await db.select().from(enquiries);

  // Build CSV
  const headers = ['Name', 'Email', 'Phone', 'Form Type', 'Status', 'Source', 'Date'];
  const rows = allEnquiries.map((e) => [
    `${e.firstName} ${e.lastName}`,
    e.email,
    e.phone,
    e.formType,
    e.status,
    e.sourcePath || '',
    e.createdAt?.toISOString() || '',
  ]);

  const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="enquiries.csv"',
    },
  });
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = parseInt(searchParams.get('profileId') || '1');
    const name = searchParams.get('name') || `profile-${profileId}`;

    const record = await prisma.dashboardStorage.findUnique({
      where: { id: profileId },
    });
    
    if (!record) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
    
    const jsonString = JSON.stringify(JSON.parse(record.data), null, 2);
    
    return new NextResponse(jsonString, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="dashboard-backup-${encodeURIComponent(name)}.json"`,
      },
    });
  } catch (error) {
    console.error('Error exporting store:', error);
    return NextResponse.json({ error: 'Failed to export store' }, { status: 500 });
  }
}

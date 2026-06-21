import { NextResponse } from 'next/server';

export async function GET() {
  // We use actual user authentication now, so we return a dummy default profile
  // to avoid breaking legacy frontend components that still check for profiles.
  return NextResponse.json({ profiles: [{ id: 1, name: 'Main Account' }] });
}

export async function POST(request: Request) {
  return NextResponse.json({ error: 'Profiles are now managed by User Accounts. Please register a new account instead.' }, { status: 400 });
}

export async function DELETE(request: Request) {
  return NextResponse.json({ error: 'Cannot delete the main account profile.' }, { status: 400 });
}

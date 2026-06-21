import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'local-secret-key';

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    let token = '';
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    let userId = 'local_default_user';
    
    if (token && token !== 'local') {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        userId = decoded.userId;
      } catch (e) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    } else if (process.env.IS_LOCAL !== 'true') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, message } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const newFeedback = {
      userId,
      type: type || 'other',
      message: message.trim(),
      status: 'pending',
      createdAt: new Date()
    };

    const result = await db.collection('Feedback').insertOne(newFeedback);

    return NextResponse.json({ 
      success: true, 
      feedbackId: result.insertedId.toString() 
    });
  } catch (error) {
    console.error('Feedback Submission Error:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

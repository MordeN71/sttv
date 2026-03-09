import { NextRequest, NextResponse } from 'next/server';
import Database from 'better-sqlite3';

const db = new Database('auth.db');

export async function POST(req: NextRequest) {
  try {
    const { email, code } = await req.json();

    if (!email || !code) {
      return NextResponse.json({ error: 'Email and verification code are required' }, { status: 400 });
    }

    // Find user with verification code
    const user = db.prepare('SELECT * FROM users WHERE email = ? AND verification_code = ?').get(email, code) as any;
    if (!user) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
    }

    // Mark email as verified
    db.prepare('UPDATE users SET email_verified = TRUE, verification_code = NULL WHERE id = ?').run(user.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

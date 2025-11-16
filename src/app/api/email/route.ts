import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'dns/promises';

// ------- RATE LIMIT STORAGE (memory) -------
const RATE_LIMIT: Record<string, { count: number; lastReset: number }> = {};
const MAX_REQUESTS = 5; // 5 messages
const WINDOW = 60 * 60 * 1000; // 1 hour

function isValidEmailFormat(email: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function emailExists(email: string) {
  const domain = email.split('@')[1];
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

function sanitize(input: string) {
  return input
    .replace(/(\r\n|\n|\r)/gm, '') // prevent header injection
    .trim();
}

function rateLimit(ip: string) {
  const now = Date.now();

  if (!RATE_LIMIT[ip]) {
    RATE_LIMIT[ip] = { count: 1, lastReset: now };
    return true;
  }

  const entry = RATE_LIMIT[ip];

  // Reset window
  if (now - entry.lastReset > WINDOW) {
    RATE_LIMIT[ip] = { count: 1, lastReset: now };
    return true;
  }

  // Too many requests
  if (entry.count >= MAX_REQUESTS) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';

    // 1. Server rate limit
    if (!rateLimit(ip)) {
      return NextResponse.json(
        { message: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }

    const { name, email, message } = await req.json();

    // 2. Missing fields check
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Sanitize
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = message.trim();

    // 3. Validate name
    if (cleanName.length < 2 || cleanName.length > 60) {
      return NextResponse.json(
        { message: 'Invalid name length' },
        { status: 400 }
      );
    }

    // 4. Validate email format
    if (!isValidEmailFormat(cleanEmail)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 5. Validate email domain exists
    const exists = await emailExists(cleanEmail);
    if (!exists) {
      return NextResponse.json(
        { message: 'Email domain does not exist' },
        { status: 400 }
      );
    }

    // 6. Validate message size
    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return NextResponse.json(
        { message: 'Message length is invalid' },
        { status: 400 }
      );
    }

    // 7. Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 8. Email to you
    await transporter.sendMail({
      from: `"Nikolas Portfolio Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: cleanEmail,
      subject: `Nikolas Portfolio Website: New message from ${cleanName}`,
      html: `
        <p>${cleanMessage}</p>
        <p><strong>From:</strong> ${cleanName} (${cleanEmail})</p>
      `,
    });

    // 9. Thank-you email to sender
    await transporter.sendMail({
      from: `"Nikolas Portfolio Website" <${process.env.GMAIL_USER}>`,
      to: cleanEmail,
      subject: 'Thank you for reaching out!',
      html: `
        <p>Hi ${cleanName},</p>
        <p>Thank you for your message! I’ll get back to you soon.</p>
        <br/>
        <p>Best regards,<br/>Nikolas</p>
      `,
    });

    return NextResponse.json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error('Email API error:', err);
    return NextResponse.json(
      { message: 'Something went wrong. Try again later.' },
      { status: 500 }
    );
  }
}

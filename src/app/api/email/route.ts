import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import dns from 'dns/promises';

// --- CONFIGURATION ---
const MAX_REQUESTS = 5;
const WINDOW = 60 * 60 * 1000;
const RATE_LIMIT: Record<string, { count: number; lastReset: number }> = {};

// --- UTILS ---
async function domainHasMX(email: string) {
  const domain = email.split('@')[1];
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, _honeypot } = body; // _honeypot is the trap

    // 1. Honeypot check: If this hidden field is filled, it's a bot
    if (_honeypot) {
      return NextResponse.json({ message: 'Bot detected' }, { status: 400 });
    }

    // 2. Rate Limiting (Memory-based)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const now = Date.now();
    if (!RATE_LIMIT[ip] || now - RATE_LIMIT[ip].lastReset > WINDOW) {
      RATE_LIMIT[ip] = { count: 1, lastReset: now };
    } else {
      if (RATE_LIMIT[ip].count >= MAX_REQUESTS) {
        return NextResponse.json(
          { message: 'Too many messages. Try again later.' },
          { status: 429 },
        );
      }
      RATE_LIMIT[ip].count++;
    }

    // 3. Robust Validation
    if (
      !name ||
      name.length < 2 ||
      !email.includes('@') ||
      message.length < 10
    ) {
      return NextResponse.json(
        { message: 'Invalid input data' },
        { status: 400 },
      );
    }

    const isValidDomain = await domainHasMX(email);
    if (!isValidDomain) {
      return NextResponse.json(
        { message: 'Email domain is unreachable' },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 4. THE ROBUST SEND:
    // We create the promises but don't "await" them individually yet.
    const adminMailPromise = transporter.sendMail({
      from: `"Nikolas Portfolio Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nikolas Portfolio Website: New message from ${name}`,
      html: `
        <p>${message}</p>
        <p><strong>From:</strong> ${name} (${email})</p>
      `,
    });

    const thankYouPromise = transporter.sendMail({
      from: `"Nikolas Portfolio Website" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for reaching out!',
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for your message! I’ll get back to you soon.</p>
        <br/>
        <p>Best regards,<br/>Nikolas Iliopoulos</p>
      `,
    });

    // Fire both at once and wait for both to finish (whether they pass or fail)
    const results = await Promise.allSettled([
      adminMailPromise,
      thankYouPromise,
    ]);

    // Check if the ADMIN mail specifically failed
    if (results[0].status === 'rejected') {
      console.error(
        'Critical Error: Admin email failed to send:',
        results[0].reason,
      );
      throw new Error('Could not notify the owner.');
    }

    // Just log if the thank-you mail failed, but don't stop the success response
    if (results[1].status === 'rejected') {
      console.warn(
        'Minor Issue: Auto-reply to guest failed:',
        results[1].reason,
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json(
      { message: 'Server error.' },
      { status: 500 },
    );
  }
}

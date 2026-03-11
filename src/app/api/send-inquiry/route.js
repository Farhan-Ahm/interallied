import { NextResponse } from 'next/server';
import { sendInquiryEmail } from '@/app/utils/mailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, cartItems } = body;

    if (!customerName || !customerEmail || !customerPhone || !cartItems?.length) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    await sendInquiryEmail({ customerName, customerEmail, customerPhone, cartItems });

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully!' });
  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json(
      { error: 'Failed to send inquiry. Please try again.' },
      { status: 500 }
    );
  }
}

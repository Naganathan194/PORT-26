import { NextRequest, NextResponse } from 'next/server';
import { LearnHowToThinkRegistration } from '@/models/Registration';
import { checkDuplicateRegistration, saveRegistration, getRegistrationCount } from '@/lib/registrationUtils';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    if (searchParams.get('count') === 'true') {
      const cnt = await getRegistrationCount(LearnHowToThinkRegistration);
      return NextResponse.json(cnt);
    }
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');
    if (!email || !phone) {
      return NextResponse.json({ message: 'Email and phone are required' }, { status: 400 });
    }
    const result = await checkDuplicateRegistration(email, phone, LearnHowToThinkRegistration);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ message: 'Failed to check registration' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.transactionId || !body.paymentScreenshot) {
      return NextResponse.json(
        { message: 'Transaction ID and payment screenshot are required', success: false },
        { status: 400 }
      );
    }
    const duplicateCheck = await checkDuplicateRegistration(body.email, body.contactNumber, LearnHowToThinkRegistration);
    if (duplicateCheck.isDuplicate) {
      return NextResponse.json(duplicateCheck, { status: 409 });
    }
    const result = await saveRegistration({ ...body, paymentMode: 'UPI' }, LearnHowToThinkRegistration);
    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: 'Failed to register', success: false }, { status: 500 });
  }
}

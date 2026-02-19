import connectToDatabase from '@/lib/mongodb';

export async function checkDuplicateRegistration(
  email: string,
  contactNumber: string,
  model: any
) {
  try {
    await connectToDatabase();

    const existing = await model.findOne({
      $or: [{ email }, { contactNumber }],
    });

    if (existing) {
      const duplicateField =
        existing.email === email ? 'email' : 'contactNumber';
      return {
        isDuplicate: true,
        field: duplicateField,
        message: `\ already registered`,
      };
    }

    return { isDuplicate: false };
  } catch (error) {
    console.error('Error checking duplicate:', error);
    throw error;
  }
}

export async function saveRegistration(data: any, model: any) {
  try {
    await connectToDatabase();

    const registration = new model(data);
    await registration.save();

    return {
      success: true,
      data: registration,
      message: 'Registration successful',
    };
  } catch (error: any) {
    console.error('Error saving registration:', error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return {
        success: false,
        message: `\ already registered for this event`,
        error: field,
      };
    }

    return {
      success: false,
      message: error.message || 'Registration failed',
    };
  }
}

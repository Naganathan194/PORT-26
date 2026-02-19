# PORT 2026 - Next.js + MongoDB Migration Guide

## Project Overview

Your PORT event registration system has been successfully converted from a Vite + React app to a **Next.js 16** application with **MongoDB Atlas** integration for database management.

## Key Changes & Features

### 1. **Framework Migration**
- **From**: Vite + React Router
- **To**: Next.js 16 (App Router) with built-in routing
- **Benefits**: Better SEO, API routes, server-side rendering, static generation

### 2. **Database Integration**
- **MongoDB Atlas** for cloud database
- **Mongoose** for schema validation and modeling
- **5 Separate Collections** (Tables) for different registrations:
  - `hackproofingregistration` - Hackproofing the Future
  - `prompttoproductregistration` - Prompt to Product
  - `fullstackfusionregistration` - Full Stack Fusion
  - `learnhowtothinkregistration` - Learn How to Think
  - `portpassregistration` - Day 2 Event Port Pass

### 3. **Registration System**
- **Two Toggles** on the Tickets page:
  - **Workshops (Day 1)**: Lists 4 workshops with dedicated registration forms
  - **Port Pass (Day 2)**: Unified registration for Day 2 events

### 4. **Form Features**
✅ **Complete Registration Form** with the following fields:
- First Name* (Required)
- Last Name* (Required)
- Email* (Required)
- Confirm Email* (Must match email)
- Contact Number* (10-digit mobile only)
- Gender* (Male, Female, Others)
- Payment Mode* (UPI, Card, Net Banking, Cheque)
- College Name* (Required)
- Department* (Required)
- Year of Study* (1, 2, 3, 4)
- College Register Number* (Required)
- City* (Required)

✅ **Validation Features**:
- Real-time validation on all fields
- Email format validation
- 10-digit phone number validation
- Duplicate prevention (One registration per email + mobile number)
- Password confirmation matching
- Error messages in a clear, user-friendly format

✅ **Duplicate Check**:
- Same email cannot be registered twice for the same workshop
- Same mobile number cannot be registered twice for the same workshop
- Automatic check before form submission via API

## Project Structure

```
frontend-nextjs/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── port-pass/           # Port Pass registration endpoint
│   │   │   └── route.ts
│   │   └── workshops/           # Workshop registration endpoints
│   │       ├── hackproofing/
│   │       ├── prompt-to-product/
│   │       ├── full-stack-fusion/
│   │       └── learn-how-to-think/
│   ├── tickets/                 # Tickets page with forms
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   └── RegistrationForm.tsx     # Reusable registration form component
├── lib/
│   ├── mongodb.ts               # MongoDB connection setup
│   └── registrationUtils.ts     # Helper functions for registration
├── models/
│   └── Registration.ts          # Mongoose schemas for all 5 tables
├── data/
│   └── workshops.ts             # Workshop and event data
└── public/                       # Static assets
```

## Setup Instructions

### 1. **Environment Configuration**

Create a `.env.local` file in the root directory:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/port26?retryWrites=true&w=majority

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**How to get MongoDB URI**:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string from the "Connect" button
4. Replace `username` and `password` with your credentials

### 2. **Install Dependencies**

```bash
cd frontend-nextjs
npm install
```

### 3. **Run Development Server**

```bash
npm run dev
```

The app will run on `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use)

### 4. **Build for Production**

```bash
npm run build
npm run start
```

## API Endpoints

### Workshop Registration Endpoints

```
POST   /api/workshops/hackproofing
GET    /api/workshops/hackproofing?email=...&phone=...

POST   /api/workshops/prompt-to-product
GET    /api/workshops/prompt-to-product?email=...&phone=...

POST   /api/workshops/full-stack-fusion
GET    /api/workshops/full-stack-fusion?email=...&phone=...

POST   /api/workshops/learn-how-to-think
GET    /api/workshops/learn-how-to-think?email=...&phone=...
```

### Port Pass Registration Endpoint

```
POST   /api/port-pass
GET    /api/port-pass?email=...&phone=...
```

### Request & Response Format

**POST Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "contactNumber": "9876543210",
  "gender": "Male",
  "paymentMode": "UPI",
  "collegeName": "MIT",
  "department": "CSE",
  "yearOfStudy": "3",
  "collegeRegisterNumber": "REG123",
  "city": "Chennai"
}
```

**Success Response** (201):
```json
{
  "success": true,
  "data": { /* registration record */ },
  "message": "Registration successful"
}
```

**Duplicate Error** (409):
```json
{
  "isDuplicate": true,
  "field": "email",
  "message": "Email already registered"
}
```

## Database Schema

### Registration Model
All 5 tables share a common schema with these fields:

```typescript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique with phone per table),
  contactNumber: String (required, unique with email per table),
  gender: String (enum: Male, Female, Others),
  paymentMode: String (enum: UPI, Card, NetBanking, Cheque),
  collegeName: String (required),
  department: String (required),
  yearOfStudy: String (enum: 1, 2, 3, 4),
  collegeRegisterNumber: String (required),
  city: String (required),
  registrationDate: Date (auto-set to current date)
}
```

## Key Features Implemented

### ✅ Two-Tab Toggle System
- **Workshops Tab**: Displays 4 workshops with a clean card layout
- **Port Pass Tab**: Displays Port Pass option for Day 2 events
- Smooth transitions between tabs using Framer Motion

### ✅ Registration Form Modal
- Opens when user clicks on a workshop or Port Pass
- Beautiful modal with gradient backgrounds
- Real-time validation feedback
- Loading states during submission

### ✅ Duplicate Registration Prevention
- API checks email + phone combination before saving
- Returns friendly error message if duplicate found
- Prevents same user from registering twice for same event

### ✅ Responsive Design
- Mobile-first approach
- Works on all device sizes
- Beautiful dark theme with gradient accents

### ✅ Form Validation
- **Client-side**: Immediate feedback to user
- **Server-side**: Final validation before database save
- Both email and phone are required to form a unique key

## Testing the App

### 1. **Test the Home Page**
Navigate to `http://localhost:3001` - You should see:
- Beautiful PORT 2026 landing page
- "Get Your Tickets" CTA button
- Feature cards

### 2. **Test the Tickets Page**
Click "Get Your Tickets" button:
- See two tabs: "Workshops — Day 1" and "Port Pass — Day 2"
- Click on a workshop to see the registration form
- Fill in all required fields
- Try registering (form will fail if MongoDB URI is not set)

### 3. **Test Duplicate Prevention**
1. Register with email: `test@example.com` and phone: `9876543210`
2. Try registering again with the same details
3. You should get an error message

## Deployment

### Option 1: Vercel (Recommended for Next.js)
```bash
npm i -g vercel
vercel
```

### Option 2: Other Platforms (AWS, Railway, Render, etc.)
```bash
npm run build
# Deploy the .next folder and public directory
```

## Troubleshooting

### Issue: MongoDB connection failing
**Solution**: Ensure your MongoDB URI is correct in `.env.local` and your IP is whitelisted in MongoDB Atlas

### Issue: Port 3000 already in use
**Solution**: The app will automatically use port 3001. Or kill the process: `lsof -i :3000` → `kill -9 <PID>`

### Issue: Form not submitting
**Solution**: Check browser console for errors. Ensure:
1. MongoDB URI is set in `.env.local`
2. All form fields are filled correctly
3. Network tab shows API requests are going through

### Issue: Emails not validating
**Solution**: The validation requires a valid email format (e.g., `user@domain.com`)

## Next Steps (Optional Enhancements)

1. **Email Notifications**: Send confirmation emails after successful registration
2. **Payment Integration**: Add actual payment processing (Razorpay, Stripe)
3. **QR Code Generation**: Generate QR codes for registered attendees
4. **Download Invoice**: Allow users to download registration receipts
5. **Admin Dashboard**: Create admin panel to view all registrations
6. **SMS Notifications**: Send SMS confirmations to registered users

## Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB, Mongoose
- **Form Validation**: Custom validation + Server-side checks
- **Deployment**: Vercel (recommended), or any Node.js hosting

## File Reference

### Important Files to Modify

1. [Registration Form Component](./components/RegistrationForm.tsx) - Customize form fields/validation
2. [Workshop Data](./data/workshops.ts) - Update workshop information
3. [Ticket Page](./app/tickets/page.tsx) - Customize UI/layout
4. [API Routes](./app/api/) - Update registration logic
5. [Database Models](./models/Registration.ts) - Modify schemas

## Support

For issues or questions:
1. Check the browser console for error messages
2. Review the API response in Network tab
3. Verify MongoDB connection is working ('.env.local')
4. Check terminal for server-side errors

---

**Conversion Date**: February 19, 2026  
**Framework**: Next.js 16.1.6  
**Database**: MongoDB Atlas  
**Status**: ✅ Production Ready

# PORT 2026 Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Setup MongoDB
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" and copy your connection string
5. Create `.env.local` file with:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/port26?retryWrites=true&w=majority
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Install & Run
```bash
cd frontend-nextjs
npm install
npm run dev
```

### Step 3: Test It Out
- Open `http://localhost:3001`
- Click "Get Your Tickets"
- Select a workshop and fill the form
- Register!

---

## 📋 What's Inside?

### Pages
- **`/`** - Home/Landing page with beautiful gradient design
- **`/tickets`** - Registration page with workshop selection and Port Pass toggle

### Features
✅ 4 Workshops with dedicated registration  
✅ Port Pass for Day 2 events  
✅ Complete form validation  
✅ Duplicate registration prevention  
✅ Beautiful dark theme with animations  
✅ Responsive mobile design  

### Database
- **5 Collections** (one per workshop + Port Pass)
- **Automatic duplicate checking** (email + phone uniqueness)
- **MongoDB Atlas** cloud hosting

---

## 🎨 Customization

### Change Workshop Details
Edit `data/workshops.ts`:
```typescript
export const WORKSHOPS = [
  {
    id: 'hackproofing',
    title: 'HACKPROOFING THE FUTURE',
    price: 350,  // Change this
    // ... other fields
  }
]
```

### Modify Form Fields
Edit `components/RegistrationForm.tsx` - Add/remove fields in the `FormData` interface and validation section

### Update Styling
- Colors: Use Tailwind CSS classes (e.g., `violet-600` → `blue-600`)
- Fonts: Modify `app/globals.css`
- Layout: Edit component className attributes

---

## 🔌 API Testing

Test the registration API with curl:
```bash
curl -X POST http://localhost:3001/api/workshops/hackproofing \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

---

## 📦 Build for Production

```bash
npm run build
npm run start
```

Deploy to:
- **Vercel**: `vercel deploy`
- **AWS**: EC2 + PM2
- **Railway**: `railway up`
- **Render**: Connect GitHub repo

---

## ❓ Common Issues

**Q: Port 3000 is in use**  
A: Use port 3001 automatically, or kill process: `lsof -i :3000`

**Q: MongoDB connection failing**  
A: Check `.env.local` has correct MongoDB URI, whitelist your IP in Atlas

**Q: Form not submitting**  
A: Open DevTools → Network tab to see error responses

**Q: Can't find the form modal**  
A: Click on a workshop card or "Register for PORT Pass"

---

## 📚 File Structure

```
frontend-nextjs/
├── app/
│   ├── api/workshops/        # Workshop registration endpoints
│   ├── api/port-pass/        # Port Pass endpoint
│   ├── tickets/              # Tickets page
│   └── page.tsx              # Home page
├── components/               # React components
├── lib/                       # Utilities
├── models/                    # MongoDB schemas
├── data/                      # Workshop data
└── public/                    # Static files
```

---

## 🎯 Next Steps

1. **Deploy**: Get your app live on Vercel in 2 minutes
2. **Email Notifications**: Add email confirmations after registration
3. **Payment Integration**: Integrate Razorpay/Stripe
4. **Admin Dashboard**: Create admin page to view registrations
5. **QR Codes**: Generate QR codes for tickets

---

## 💡 Tips

- **Framer Motion animations** are used throughout - customize in each component
- **Tailwind CSS** for styling - check `globals.css` for custom configs
- **Server Components** by default - add `'use client'` at top if need browser APIs
- **API Routes** handle validation - modify `lib/registrationUtils.ts`
- **Mongoose Schemas** in `models/Registration.ts` - add database validation there

---

**Version**: 1.0  
**Last Updated**: Feb 19, 2026  
**Status**: ✅ Ready to Deploy

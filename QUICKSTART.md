# 🚀 Quick Start Guide

## Open Two Terminal Windows

### Terminal 1: Backend Server

```bash
cd backend
npm install
npm run dev
```

✅ Backend ready at: `http://localhost:5000`

### Terminal 2: Frontend Development

```bash
npm install
npm run dev
```

✅ Frontend ready at: `http://localhost:5173`

---

## Make Sure You Have:

- ✅ MongoDB running (local or Atlas)
- ✅ Node.js installed
- ✅ Two terminal windows open

---

## Test It:

1. Open `http://localhost:5173` in browser
2. Click "إنشاء حساب" (Register)
3. Create an account → saved to MongoDB → redirected to home
4. Click "تسجيل الدخول" (Login)
5. Login with your credentials → redirected to home page

---

## Backend Environment Setup:

```bash
cd backend
# Create .env file from template
cp .env.example .env
```

Edit `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gentle-guide
JWT_SECRET=your_secret_key
NODE_ENV=development
```

Then: `npm run dev`

---

## That's It! ✨

- User registration saves to MongoDB
- User login validates from MongoDB
- Admin users go to dashboard
- Regular users go to home page
- All data persists!

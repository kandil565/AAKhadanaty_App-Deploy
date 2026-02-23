# 📊 Complete Data Flow & User Journey

## Registration Flow

```
┌──────────────────┐
│  Register Page   │
│  (React)         │
└────────┬─────────┘
         │
         │ Form submission
         │ {name, email, phone, password}
         ▼
┌──────────────────────────────────────┐
│   AuthContext                        │
│   POST /api/auth/register            │
└────────┬─────────────────────────────┘
         │
         │ API call
         ▼
┌──────────────────────────────────────┐
│   Backend Server (Express)           │
│   POST /api/auth/register            │
│                                       │
│   1. Validate input                  │
│   2. Hash password (bcryptjs)        │
│   3. Create user in MongoDB          │
│   4. Generate JWT token             │
│   5. Return token + user data        │
└────────┬─────────────────────────────┘
         │
         │ Response: {token, user: {id, name, email, phone, isAdmin}}
         ▼
┌──────────────────────────────────────┐
│   Frontend                           │
│   1. Store token in localStorage     │
│   2. Store user data in localStorage │
│   3. Update AuthContext state        │
│   4. Redirect to home page (/)       │
└──────────────────────────────────────┘
         │
         ▼
    ✅ User logged in
    ✅ Data in MongoDB
    ✅ Token stored
```

---

## Login Flow

```
┌──────────────────┐
│   Login Page     │
│   (React)        │
└────────┬─────────┘
         │
         │ Form submission
         │ {email, password}
         ▼
┌──────────────────────────────────────┐
│   AuthContext                        │
│   POST /api/auth/login               │
└────────┬─────────────────────────────┘
         │
         │ API call
         ▼
┌──────────────────────────────────────┐
│   Backend Server (Express)           │
│   POST /api/auth/login               │
│                                       │
│   1. Find user in MongoDB            │
│   2. Compare password (bcryptjs)     │
│   3. Generate JWT token             │
│   4. Return token + user data        │
└────────┬─────────────────────────────┘
         │
         │ Response: {token, user: {id, name, email, phone, isAdmin}}
         ▼
┌──────────────────────────────────────┐
│   Frontend                           │
│   1. Store token in localStorage     │
│   2. Store user data in localStorage │
│   3. Update AuthContext state        │
│   4. Check user.isAdmin flag         │
└────────┬─────────────────────────────┘
         │
         ├─ isAdmin: true  ──→ /dashboard (Admin Panel)
         │
         └─ isAdmin: false ──→ / (Home Page)

         ✅ User logged in
         ✅ Routed by role
```

---

## Current User State Management

```
Frontend Storage:
├── localStorage
│   ├── "a5adamaty_token"      ← JWT token for API calls
│   └── "a5adamaty_user"       ← User data {id, name, email, phone, isAdmin}
│
└── AuthContext (React State)
    ├── user: User | null       ← Current user object
    ├── isAuthenticated: boolean ← true if logged in
    ├── loading: boolean         ← Loading state
    └── Methods:
        ├── login()              ← Call API
        ├── register()           ← Call API
        └── logout()             ← Clear all

Backend Storage:
└── MongoDB
    ├── users collection
    │   └── Documents with: name, email, phone, password (hashed), isAdmin
    │
    └── bookings collection
        └── Documents with: userId, service, date, time, status...
```

---

## API Request/Response Cycle

### Registration Example

```javascript
// Frontend
const response = await fetch("http://localhost:5000/api/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "أحمد محمد",
    email: "ahmad@example.com",
    phone: "01012345678",
    password: "password123"
  })
});

// Backend Response
{
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "507f1f77bcf86cd799439011",
    name: "أحمد محمد",
    email: "ahmad@example.com",
    phone: "01012345678",
    isAdmin: false
  }
}

// Frontend stores in localStorage
localStorage.setItem("a5adamaty_token", token);
localStorage.setItem("a5adamaty_user", JSON.stringify(user));
```

---

## Login Example

```javascript
// Frontend
const response = await fetch("http://localhost:5000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "ahmad@example.com",
    password: "password123"
  })
});

// Backend Response
{
  success: true,
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  user: {
    id: "507f1f77bcf86cd799439011",
    name: "أحمد محمد",
    email: "ahmad@example.com",
    phone: "01012345678",
    isAdmin: false  // This determines routing!
  }
}

// Frontend checks isAdmin
if (user.isAdmin) {
  navigate("/dashboard");  // Admin panel
} else {
  navigate("/");           // Home page
}
```

---

## Protected API Calls (Future)

After login, any API call to protected routes must include JWT:

```javascript
// Creating a booking (Protected)
const response = await fetch("http://localhost:5000/api/bookings", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Include token!
  },
  body: JSON.stringify({
    serviceName: "Therapy Session",
    date: "2024-03-15",
    time: "10:00",
    price: 100,
  }),
});

// Backend validates token in middleware
// If valid: Create booking
// If invalid: Return 401 Unauthorized
```

---

## User Journey Summary

### Step 1: Visit Application

```
User → http://localhost:5173 → Home Page
```

### Step 2: Register (First Time)

```
User → /register → Fill Form → Create Account
  ↓
  Save to MongoDB
  Create JWT Token
  Store in localStorage
  ↓
  Redirect to Home Page (/)
  ✅ User is now logged in
```

### Step 3: Logout & Login (Returning User)

```
User → Logout → Clear localStorage
User → /login → Enter Credentials
  ↓
  Query MongoDB
  Validate Password
  Create JWT Token
  Store in localStorage
  ↓
  Check isAdmin flag:
    ├─ true  → /dashboard
    └─ false → /
  ✅ User is logged in
```

### Step 4: Make API Calls (Future Bookings)

```
User → Click "Book Service"
  ↓
  Frontend sends POST with JWT token
  ↓
  Backend validates JWT
  Backend creates booking in MongoDB
  ↓
  ✅ Booking created
```

---

## File Structure After Integration

```
gentle-guide-main/
│
├── Frontend Code
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx (✨ Updated - API calls)
│   ├── pages/
│   │   ├── LoginPage.tsx (✨ Updated - async login)
│   │   └── RegisterPage.tsx (✨ Updated - API register)
│   └── ...
│
├── Config Files
├── .env (✨ Created - API URL)
├── .env.example (✨ Created)
│
├── Backend Code
├── backend/
│   ├── server.js (✨ Created - Express server)
│   ├── package.json (✨ Created)
│   ├── .env.example (✨ Created)
│   ├── models/
│   │   ├── User.js (✨ MongoDB schema)
│   │   └── Booking.js (✨ MongoDB schema)
│   ├── controllers/
│   │   ├── authController.js (✨ Register/Login logic)
│   │   ├── userController.js (✨ User CRUD)
│   │   └── bookingController.js (✨ Booking CRUD)
│   ├── routes/
│   │   ├── authRoutes.js (✨ Auth endpoints)
│   │   ├── userRoutes.js (✨ User endpoints)
│   │   └── bookingRoutes.js (✨ Booking endpoints)
│   ├── middleware/
│   │   └── auth.js (✨ JWT protection)
│   └── README.md (✨ Backend docs)
│
├── Documentation
├── SETUP_GUIDE.md (✨ Created - Complete setup)
├── QUICKSTART.md (✨ Created - Quick reference)
├── INTEGRATION_SUMMARY.md (✨ Created - What changed)
└── DATA_FLOW.md (✨ This file - Visual flow)
```

---

## Key Points

✅ **User data is now persisted in MongoDB**

- Not just localStorage
- Accessible across devices/browsers

✅ **Registration saves to database**

- `POST /api/auth/register`
- Password hashed with bcryptjs
- User saved in MongoDB

✅ **Login validates from database**

- `POST /api/auth/login`
- Queries MongoDB for user
- Compares hashed password
- Returns JWT token

✅ **Admin vs Regular User routing**

- Check `user.isAdmin` flag
- Admin → `/dashboard`
- Regular → `/` (home page)

✅ **JWT Token authentication**

- Stored in localStorage
- Used for protected API calls
- Expires in 7 days (configurable)

✅ **Everything is connected**

- Frontend ↔ Backend ↔ MongoDB
- Production ready
- Scalable architecture

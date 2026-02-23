# Gentle Guide - Full Stack Setup Guide

This project consists of a React frontend with TypeScript and a Node.js/Express backend with MongoDB.

## Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **npm, yarn, or bun** (package manager)
- **Two terminal windows** (one for frontend, one for backend)

## Project Structure

```
gentle-guide-main/
├── src/                    # Frontend React code
├── backend/                # Backend Express API
├── .env                    # Frontend environment variables
└── public/                 # Static assets
```

---

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gentle-guide
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
NODE_ENV=development
```

**For MongoDB:**

- **Local**: Make sure MongoDB is running (`mongod` command)
- **Cloud**: Use MongoDB Atlas connection string

### Step 4: Start Backend Server

```bash
npm run dev
```

You should see:

```
Server running on port 5000
MongoDB connected: localhost
```

**Backend is running at:** `http://localhost:5000`

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory (in a new terminal)

```bash
cd gentle-guide-main  # root directory
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### Step 3: Check Environment Configuration

The `.env` file should have:

```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

You should see:

```
VITE v... ready in ... ms

  ➜  Local:   http://localhost:5173/
```

**Frontend is running at:** `http://localhost:5173`

---

## Testing the Integration

### 1. Open Frontend

Go to `http://localhost:5173` in your browser

### 2. Register a New User

- Click "إنشاء حساب" (Create Account)
- Fill in name, email, phone, and password
- Click "إنشاء الحساب" (Create Account)
- **New users are redirected to home page** (normal users)
- User data is saved in MongoDB

### 3. Login as Regular User

- Email: `demo@a5adamaty.com`
- Password: `123456`
- **You will be redirected to home page** (because isAdmin: true in this case)
- _Note: This is a demo admin account, adjust as needed_

### 4. Test Admin Features

If an admin user logs in:

- They will be redirected to `/dashboard`
- They can manage bookings and users

### 5. Verify Backend Database

Connect to MongoDB and check:

```bash
# If using MongoDB locally
mongo

# In MongoDB shell:
use gentle-guide
db.users.find()
db.bookings.find()
```

---

## API Endpoints

### Authentication

```
POST   /api/auth/register          Register new user
POST   /api/auth/login             Login user
GET    /api/auth/me                Get current user (protected)
```

### Users

```
GET    /api/users                  Get all users (admin only)
GET    /api/users/:id              Get user by ID
PUT    /api/users/:id              Update user profile
DELETE /api/users/:id              Delete user (admin only)
PUT    /api/users/:id/role         Update user role (admin only)
```

### Bookings

```
GET    /api/bookings               Get all bookings (admin only)
GET    /api/bookings/my-bookings   Get current user's bookings
GET    /api/bookings/:id           Get booking details
POST   /api/bookings               Create new booking
PUT    /api/bookings/:id           Update booking
PATCH  /api/bookings/:id/cancel    Cancel booking
DELETE /api/bookings/:id           Delete booking (admin only)
```

---

## User Flow

### Registration Flow

1. User fills registration form
2. Frontend sends POST to `/api/auth/register`
3. Backend validates and creates user in MongoDB
4. Returns JWT token and user data
5. Frontend stores token and user data in localStorage
6. **New users redirected to home page (`/`)**
7. User data persists in MongoDB

### Login Flow

1. User enters email and password
2. Frontend sends POST to `/api/auth/login`
3. Backend validates credentials against MongoDB
4. Returns JWT token and user data
5. Frontend checks `user.isAdmin` flag:
   - **If Admin (isAdmin: true)** → Redirected to `/dashboard`
   - **If Regular User (isAdmin: false)** → Redirected to `/` (home page)
6. User data persists in localStorage and can be retrieved from backend

---

## Common Issues & Solutions

### MongoDB Connection Error

**Error:** `MongoDB connection refused`

- **Solution**: Start MongoDB service

  ```bash
  # On Windows (if installed):
  net start MongoDB

  # On Mac (if installed via brew):
  brew services start mongodb-community

  # Or use MongoDB Atlas cloud URL
  ```

### CORS Error in Console

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

- **Solution**: Backend already has CORS enabled, make sure it's running on port 5000

### 404 Not Found on API Calls

**Error:** `Cannot POST /api/auth/login`

- **Solution**:
  - Make sure backend is running (`npm run dev` in backend folder)
  - Check that VITE_API_URL is correctly set in `.env`

### Port Already in Use

**Error:** `Port 5000/5173 already in use`

- **Solution**: Change PORT in backend `.env` or kill the process using the port

---

## Development Workflow

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
# Keep running (development with nodemon)
```

**Terminal 2 - Frontend:**

```bash
npm run dev
# Keep running
```

**Terminal 3 - Optional (MongoDB Atlas or Local):**

```bash
# If using local MongoDB
mongod
```

---

## Production Deployment Notes

When deploying to production:

1. **Backend (.env)**:
   - Change `NODE_ENV=production`
   - Use secure JWT_SECRET
   - Update MONGODB_URI to production database
   - Deploy on service like Heroku, Railway, etc.

2. **Frontend (.env)**:
   - Update VITE_API_URL to production backend URL
   - Run `npm run build` to create optimized build
   - Deploy on Vercel, Netlify, etc.

3. **MongoDB**:
   - Use MongoDB Atlas for cloud hosting
   - Set up proper authentication and network access

---

## Project Features

✅ User authentication with JWT
✅ Role-based access (Admin/Regular User)
✅ Booking management system
✅ User profiles
✅ MongoDB database persistence
✅ CORS-enabled API
✅ Password hashing with bcryptjs
✅ TypeScript support
✅ Responsive UI with Tailwind CSS

---

## Support

For issues or questions:

1. Check the error messages in browser console
2. Check backend terminal logs
3. Verify MongoDB is running
4. Ensure correct environment variables are set

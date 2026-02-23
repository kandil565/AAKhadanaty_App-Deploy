# Gentle Guide Backend

Complete Node.js + Express + MongoDB backend for the Gentle Guide booking system.

## Features

- **User Management**: Register, login, profile management
- **Role-based Access**: Admin and regular user roles
- **Booking System**: Create, update, cancel, and manage bookings
- **JWT Authentication**: Secure API endpoints with JWT tokens
- **Password Hashing**: Bcryptjs for secure password storage
- **MongoDB**: Persistent data storage with Mongoose ODM

## Models

### User Model

- name, email, phone
- password (hashed)
- isAdmin flag
- profileImage, bio
- timestamps

### Booking Model

- userId (reference to User)
- serviceName, serviceType
- date, time, duration
- price, notes
- status (pending, confirmed, completed, cancelled)
- paymentStatus (unpaid, paid, failed)
- therapistName, location
- timestamps

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
# or with yarn/bun
```

### 2. Environment Setup

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/gentle-guide
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

### 3. MongoDB Setup

Make sure MongoDB is running locally or update `MONGODB_URI` with your connection string.

### 4. Run Server

```bash
npm run dev    # Development (with nodemon)
npm start      # Production
```

Server will run on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Users

- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)

### Bookings

- `GET /api/bookings` - Get all bookings (admin only)
- `GET /api/bookings/my-bookings` - Get current user's bookings
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `PATCH /api/bookings/:id/cancel` - Cancel booking
- `DELETE /api/bookings/:id` - Delete booking (admin only)

## Example Requests

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Booking (with JWT token)

```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "serviceName": "Therapy Session",
    "serviceType": "therapy",
    "date": "2024-03-15",
    "time": "10:00",
    "price": 100,
    "duration": 60
  }'
```

## Project Structure

```
backend/
├── models/
│   ├── User.js
│   └── Booking.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── bookingController.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── bookingRoutes.js
├── middleware/
│   └── auth.js
├── server.js
├── package.json
├── .env.example
└── .env
```

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Role-based access control (RBAC)
- Protected routes for sensitive operations
- CORS enabled for frontend integration

## Future Enhancements

- Email verification
- Password reset functionality
- Payment gateway integration
- Booking notifications
- Analytics and reporting
- Scheduler for appointment reminders

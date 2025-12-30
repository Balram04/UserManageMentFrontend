# User Management System

A full-stack web application for managing users with role-based access control, built with modern technologies and best practices.

## 🚀 Project Overview

This application provides a comprehensive user management system with authentication, authorization, and admin capabilities. It features a clean, responsive UI and a secure RESTful API backend.

### Key Features

- ✅ User authentication with JWT
- ✅ Role-based access control (Admin/User)
- ✅ Secure password hashing with bcrypt
- ✅ Input validation and sanitization
- ✅ Responsive design for desktop and mobile
- ✅ User profile management
- ✅ Admin dashboard with user management
- ✅ Pagination for large datasets
- ✅ Toast notifications for user feedback
- ✅ Protected routes and API endpoints

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **CSS3** - Styling

### Testing
- **Jest** - Testing framework
- **Supertest** - API testing

---

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Git** (optional)

---

## ⚙️ Setup Instructions

### 1. Clone or Download the Project

```bash
cd UserManagementApp
```

### 2. Backend Setup

#### Navigate to backend directory
```bash
cd backend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

#### Configure environment variables
Edit the `.env` file with your values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000

# Admin Account
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin@123
ADMIN_NAME=Admin User
```

#### Start the backend server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

#### Navigate to frontend directory
```bash
cd ../frontend
```

#### Install dependencies
```bash
npm install
```

#### Create environment file
Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

#### Configure environment variables
Edit the `.env` file:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### Start the frontend application
```bash
npm start
```

The frontend will run on `http://localhost:3000`

---

## 🌍 Environment Variables

### Backend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | `5000` |
| `NODE_ENV` | Environment mode | No | `development` |
| `MONGODB_URI` | MongoDB connection string | Yes | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT | Yes | `your_secret_key` |
| `JWT_EXPIRE` | JWT expiration time | No | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:3000` |
| `ADMIN_EMAIL` | Default admin email | No | `admin@example.com` |
| `ADMIN_PASSWORD` | Default admin password | No | `Admin@123` |
| `ADMIN_NAME` | Default admin name | No | `Admin User` |

### Frontend Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REACT_APP_API_URL` | Backend API URL | Yes | `http://localhost:5000/api` |

---

## 🧪 Running Tests

### Backend Tests
```bash
cd backend
npm test
```

This will run 5+ unit tests covering:
- Password hashing
- JWT token generation and verification
- Email validation
- Password strength validation
- Role-based authorization

---

## 🚀 Deployment Instructions

### Backend Deployment (Render)

#### 1. Create a new Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

**Build Settings:**
```
Build Command: npm install
Start Command: npm start
```

**Environment Variables:**
Add all variables from `.env.example`:
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL` (your Vercel URL)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`

#### 2. Create `render.yaml` (optional)

```yaml
services:
  - type: web
    name: user-management-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5000
```

### Frontend Deployment (Vercel)

#### 1. Install Vercel CLI (optional)
```bash
npm install -g vercel
```

#### 2. Deploy using Vercel Dashboard

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your repository
4. Configure project:

**Framework Preset:** Create React App
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `build`

**Environment Variables:**
- `REACT_APP_API_URL` = Your Render backend URL

#### 3. Create `vercel.json`

Create `vercel.json` in the `frontend` directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/manifest.json",
      "dest": "/manifest.json"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Sign Up
```http
POST /auth/signup
```

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Test@123",
  "confirmPassword": "Test@123"
}
```

**Response (201):**
```json
{
  "status": "success",
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login
```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Test@123"
}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2025-12-29T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "...",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "status": "active",
      "lastLogin": "2025-12-29T10:30:00.000Z",
      "createdAt": "2025-12-20T08:15:00.000Z"
    }
  }
}
```

#### 4. Logout
```http
POST /auth/logout
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "status": "success",
  "message": "Logout successful"
}
```

### User Endpoints

#### 1. Get Profile
```http
GET /users/profile
Authorization: Bearer {token}
```

#### 2. Update Profile
```http
PUT /users/profile
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "fullName": "John Smith",
  "email": "johnsmith@example.com"
}
```

#### 3. Change Password
```http
PUT /users/change-password
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "currentPassword": "Test@123",
  "newPassword": "NewPass@456",
  "confirmPassword": "NewPass@456"
}
```

### Admin Endpoints

#### 1. Get All Users
```http
GET /admin/users?page=1&limit=10
Authorization: Bearer {admin_token}
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Users per page (default: 10)
- `search` (optional): Search by name or email
- `role` (optional): Filter by role (admin/user)
- `status` (optional): Filter by status (active/inactive)

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "users": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "usersPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

#### 2. Get User by ID
```http
GET /admin/users/:id
Authorization: Bearer {admin_token}
```

#### 3. Activate User
```http
PATCH /admin/users/:id/activate
Authorization: Bearer {admin_token}
```

#### 4. Deactivate User
```http
PATCH /admin/users/:id/deactivate
Authorization: Bearer {admin_token}
```

#### 5. Delete User
```http
DELETE /admin/users/:id
Authorization: Bearer {admin_token}
```

#### 6. Get Statistics
```http
GET /admin/stats
Authorization: Bearer {admin_token}
```

**Response (200):**
```json
{
  "status": "success",
  "data": {
    "stats": {
      "totalUsers": 50,
      "activeUsers": 45,
      "inactiveUsers": 5,
      "adminUsers": 2,
      "regularUsers": 48
    }
  }
}
```

### Error Responses

All endpoints may return error responses:

**400 Bad Request:**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "status": "error",
  "message": "No token provided. Please login first."
}
```

**403 Forbidden:**
```json
{
  "status": "error",
  "message": "Access denied. Admin privileges required."
}
```

**404 Not Found:**
```json
{
  "status": "error",
  "message": "User not found"
}
```

**500 Internal Server Error:**
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## 🔒 Security Features

1. **Password Security:**
   - Passwords hashed using bcrypt (salt rounds: 10)
   - Strong password requirements enforced
   - Passwords never sent in API responses

2. **Authentication:**
   - JWT-based stateless authentication
   - Token expiration (7 days default)
   - Authorization header validation

3. **Input Validation:**
   - Server-side validation using express-validator
   - Client-side validation for better UX
   - XSS protection through input sanitization

4. **Authorization:**
   - Role-based access control
   - Protected routes on frontend
   - Protected endpoints on backend
   - Admin-only operations

5. **CORS:**
   - Configured to allow only specific origins
   - Credentials support for cookies/headers

---

## 📱 Application Features

### For Users:
- Sign up with email and password
- Login to access dashboard
- View and edit profile information
- Change password securely
- Responsive design for all devices

### For Admins:
- All user features
- View dashboard with statistics
- See all users with pagination
- Activate/deactivate user accounts
- Delete user accounts
- Search and filter users

---

## 🎨 UI Components

### Reusable Components:
- **Navbar** - Navigation with user info and logout
- **ProtectedRoute** - Route wrapper for authentication
- **ConfirmModal** - Confirmation dialog for destructive actions
- **Loading Spinner** - Visual feedback during async operations
- **Toast Notifications** - User feedback for actions

### Pages:
- **Login Page** - User authentication
- **Signup Page** - New user registration
- **Profile Page** - User profile management
- **Admin Dashboard** - User management interface

---

## 🐛 Troubleshooting

### Common Issues:

**1. MongoDB Connection Failed**
- Check your MongoDB URI in `.env`
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify database user credentials

**2. CORS Errors**
- Check `FRONTEND_URL` in backend `.env`
- Ensure frontend is running on correct port
- Clear browser cache

**3. JWT Token Invalid**
- Check `JWT_SECRET` matches in `.env`
- Token may have expired (login again)
- Clear localStorage and login again

**4. Port Already in Use**
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

---

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

---

## 👨‍💻 Author

**Balram Prajapati**

---

## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- React team for the powerful UI library
- MongoDB for the flexible database
- All open-source contributors

---

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review error messages in console
3. Check API responses in Network tab
4. Verify environment variables

---

**Happy Coding! 🚀**

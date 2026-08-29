# ISOTOPES Backend API

> Node.js + Express Backend for ISOTOPES Platform

## Overview

This is the backend API for the ISOTOPES SIH26044 project - Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Navigate to backend folder:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**

Edit `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/isotopes
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Running the Server

**Development mode with auto-reload:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📊 Database Setup

### Seed Sample Data

The project includes sample assessments and career roles:

```bash
npm run seed
```

This will populate:
- 3 Sample Assessments (Python, JavaScript, Data Science)
- 5 Career Roles (Software Engineer, Data Scientist, Web Developer, Cloud Architect, UI/UX Designer)

## 📁 Project Structure

```
backend/
├── server.js              # Express app entry point
├── package.json           # Dependencies
├── .env                   # Environment variables
├── seed.js                # Database seed script
├── middleware/
│   └── auth.js            # JWT authentication middleware
├── models/
│   ├── User.js            # User model (base)
│   ├── Student.js         # Student profile
│   ├── Company.js         # Company profile
│   ├── CareerRole.js      # Career roles with required skills
│   ├── Assessment.js      # Assessments and results
│   ├── Opportunity.js     # Internships and jobs
│   └── Application.js     # Student applications
└── routes/
    ├── auth.js            # Auth endpoints
    ├── students.js        # Student profile endpoints
    ├── assessments.js     # Assessment endpoints
    ├── careerRoles.js     # Career role endpoints
    ├── opportunities.js   # Opportunity endpoints
    ├── applications.js    # Application endpoints
    └── companies.js       # Company endpoints
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Student Profile
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update profile
- `POST /api/students/education` - Add education
- `PUT /api/students/education/:id` - Update education
- `DELETE /api/students/education/:id` - Delete education
- `POST /api/students/experience` - Add experience
- `DELETE /api/students/experience/:id` - Delete experience
- `POST /api/students/projects` - Add project
- `DELETE /api/students/projects/:id` - Delete project
- `POST /api/students/certifications` - Add certification
- `DELETE /api/students/certifications/:id` - Delete certification
- `POST /api/students/skills` - Add skill
- `DELETE /api/students/skills/:id` - Delete skill

### Assessments
- `GET /api/assessments` - Get all assessments
- `GET /api/assessments/:id` - Get specific assessment
- `POST /api/assessments/:id/submit` - Submit assessment (requires auth)
- `GET /api/assessments/results/:studentId` - Get assessment results

### Career Roles
- `GET /api/career-roles` - Get all career roles
- `GET /api/career-roles/:id` - Get specific role
- `POST /api/career-roles/select/:id` - Select target role (requires auth)

### Opportunities
- `GET /api/opportunities` - Get all opportunities (with filters)
- `GET /api/opportunities/:id` - Get specific opportunity
- `POST /api/opportunities` - Create opportunity (industry only)
- `PUT /api/opportunities/:id` - Update opportunity (industry only)
- `PATCH /api/opportunities/:id/close` - Close opportunity (industry only)

### Applications
- `POST /api/applications` - Apply for opportunity (student, requires auth)
- `GET /api/applications/student` - Get student's applications (requires auth)
- `GET /api/applications/company` - Get company's applications (industry, requires auth)
- `PATCH /api/applications/:id/status` - Update application status
- `GET /api/applications/:id` - Get specific application

### Companies
- `GET /api/companies` - Get all verified companies
- `GET /api/companies/:id` - Get specific company
- `GET /api/companies/profile` - Get company profile (industry, requires auth)
- `PUT /api/companies/profile` - Update company profile (industry, requires auth)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Login Flow:
1. User registers or logs in
2. Backend returns a JWT token
3. Token is stored in localStorage on client
4. For authenticated requests, include: `Authorization: Bearer <token>`

### User Roles:
- `student` - Student users
- `industry` - Company/Industry users
- `academician` - Academic professionals
- `institution` - Educational institutions

## 📝 Sample Requests

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "role": "student"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

### Submit Assessment
```bash
POST /api/assessments/507f1f77bcf86cd799439011/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": ["option1", "option2", "option1", ...],
  "timeSpent": 12
}
```

### Apply for Opportunity
```bash
POST /api/applications
Authorization: Bearer <token>
Content-Type: application/json

{
  "opportunityId": "507f1f77bcf86cd799439012",
  "coverLetter": "I'm very interested in this role because..."
}
```

## 🛡️ Features

✅ **User Authentication**
- JWT-based authentication
- Role-based access control
- Secure password hashing

✅ **Student Features**
- Complete profile management
- Skill tracking with evidence
- Assessment submission
- Target role selection
- Application tracking

✅ **Industry Features**
- Company profile management
- Post internships/jobs
- Define required skills
- View and manage applications

✅ **Skill Gap Analysis**
- Calculate skill matches
- Identify missing skills
- Provide personalized guidance

✅ **Assessment System**
- Multiple assessment categories
- Automatic scoring
- Skill profiling based on results

✅ **Career Roles Database**
- 5+ predefined career roles
- Required skills per role
- Career progression paths

## 📊 Running the Complete System

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Start MongoDB:**
Make sure MongoDB is running on your system

3. **Seed the database:**
```bash
npm run seed
```

4. **Start the backend server:**
```bash
npm start
# or npm run dev for development
```

Backend will be available at `http://localhost:5000`

5. **Start the frontend:**
Open `frontend/index.html` in your browser or use Live Server

## 🚧 Future Enhancements

- [ ] Email notifications
- [ ] Advanced candidate matching algorithm
- [ ] Skill recommendations engine
- [ ] Analytics dashboard
- [ ] Integration with learning platforms
- [ ] Skill verification badges
- [ ] Mentor matching system
- [ ] Interview scheduling

## 📚 Technologies Used

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

## 🤝 Contributing

This is a Smart India Hackathon project. Contributions are welcome!

## 📄 License

MIT License - SIH26044 Project

---

**Built for SIH26044** - Portal for Academia–Industry Collaboration

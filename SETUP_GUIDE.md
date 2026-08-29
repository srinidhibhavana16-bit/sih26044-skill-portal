# ISOTOPES - Complete Setup Guide

> Smart India Hackathon 2026 - SIH26044  
> Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement

## 🎯 System Overview

ISOTOPES is a full-stack web application with:
- **Frontend**: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Community Edition) - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, Edge)

### Verify Installation

```bash
node --version      # Should show v14.x or higher
npm --version       # Should show 6.x or higher
mongod --version    # Should show version info
```

## 🚀 Complete Setup (Step by Step)

### Step 1: Start MongoDB

MongoDB must be running before you start the backend.

**On Windows:**
```bash
mongod
```

**On macOS:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

Verify MongoDB is running:
```bash
mongo --eval "db.adminCommand('ping')"
```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Output should show:
# ✅ Assessments seeded
# ✅ Career Roles seeded
# ✅ Database seeding completed successfully!
```

### Step 3: Start Backend Server

```bash
# From backend folder
npm start

# OR for development with auto-reload:
npm run dev

# Expected output:
# ✅ MongoDB Connected
# 🚀 Server running on http://localhost:5000
# 📝 Environment: development
```

**Keep this terminal open!** The backend must stay running.

### Step 4: Open Frontend

In a **new terminal** (don't close the backend one):

```bash
# Navigate to frontend folder
cd frontend

# Option A: Use VS Code Live Server extension
# Right-click index.html → Open with Live Server
# OR

# Option B: Use Python's built-in server
python -m http.server 8000

# Option C: Use Node's http-server
npm install -g http-server
http-server

# Open browser to http://localhost:8000 (or 5500 if using Live Server)
```

### Step 5: Access the Application

Open your browser and go to:
```
http://localhost:8000  (or the port shown by your server)
```

You should see the **ISOTOPES** landing page.

---

## 📱 Complete User Journey

### For Students:

1. **Register** (`login.html`)
   - Click "Register" tab
   - Fill in: Name, Email, Password
   - Select Role: "Student"
   - Click "Create Account"

2. **Complete Profile** (`student-profile.html`)
   - Add Education (degree, institution, CGPA)
   - Add Projects (title, description, skills)
   - Add Certifications
   - Add Skills manually or via assessments

3. **Take Assessments** (`skill-assessment.html`)
   - Choose assessment category (Programming, Data Science, etc.)
   - Answer questions
   - Get instant score and skill validation
   - Skills are added to profile automatically

4. **Analyze Skill Gaps** (`skill-gap-analysis.html`)
   - Select a target career role
   - View your skill match percentage
   - See matched skills vs. missing skills
   - Get personalized improvement guidance

5. **Browse Opportunities** (`opportunities.html`)
   - Filter by job type (Internship/Job)
   - Filter by location type (Remote/Hybrid/Onsite)
   - See skill match percentage for each opportunity
   - Click "Apply" to submit application

6. **Track Applications** (`applications.html`)
   - View all your applications
   - Filter by status (Applied, Shortlisted, Rejected, etc.)
   - See application timeline

### For Companies/Industry:

1. **Register** (`login.html`)
   - Click "Register" tab
   - Fill in: Name, Email, Password
   - Select Role: "Industry Professional"
   - Click "Create Account"

2. **Complete Company Profile** (`company-profile.html`)
   - Add company details (name, industry, size, etc.)
   - Add company description and website

3. **Post Opportunities** (`post-opportunity.html`)
   - Fill in opportunity details
   - Specify required skills with importance levels
   - Set location and salary range
   - Define job duration and requirements

4. **View Applications** (`manage-applications.html`)
   - See all applications received
   - View candidate skill match
   - Update application status
   - Send interview invitations

---

## 🔑 Sample Test Accounts

After seeding, use these for testing:

**Note:** The system uses real registration currently. Here are steps to create test accounts:

### Test Student Account:
```
Email: student@example.com
Password: Student@123
Role: Student
```

Register this account, then:
1. Go to Skill Assessment
2. Take "Python Programming Basics" assessment
3. View in Skill Display
4. Go to Skill Gap Analysis
5. Select "Software Engineer" role
6. See gap analysis

### Test Company Account:
```
Email: company@example.com
Password: Company@123
Role: Industry Professional
```

Register and:
1. Complete company profile
2. Post an internship or job
3. Wait for student applications

---

## 🗄️ Database Schema Overview

The system uses MongoDB with the following main collections:

### Users
Stores login credentials and basic info for all user types

### Students
Complete profile: education, experience, projects, certifications, skills, assessments

### Companies
Company information: profile, opportunities posted, applications received

### Assessments
Quiz questions, answers, scoring logic

### CareerRoles
Job titles, required skills, career paths, salary info

### Opportunities
Posted internships and jobs

### Applications
Student applications to opportunities

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Make sure MongoDB is running
# Windows: mongod should be in a terminal
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### "Backend connection error" in frontend
```bash
# Make sure backend is running on port 5000
npm run dev  # from backend folder
```

### "CORS error" in browser console
This shouldn't happen - backend has CORS enabled. Check:
1. Backend is actually running (`npm run dev`)
2. Frontend is accessing `http://localhost:5000/api`

### "Port 5000 already in use"
```bash
# Windows: Find process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5000
kill -9 <PID>
```

### "Seed failed"
```bash
# Make sure MongoDB is running and database exists
# Clear and reseed:
npm run seed  # from backend folder
```

---

## 📊 Testing the Complete Workflow

### Quick Test Scenario (15 minutes)

1. **Register as Student** (2 min)
   - Go to login.html
   - Register new account

2. **Complete Profile** (3 min)
   - Add education, projects, skills
   - Save

3. **Take Assessment** (5 min)
   - Go to skill-assessment.html
   - Complete Python or JavaScript assessment
   - View results

4. **Analyze Skills** (3 min)
   - Go to skill-gap-analysis.html
   - Select "Software Engineer" role
   - See skill gap breakdown

5. **Browse Jobs** (2 min)
   - Go to opportunities.html
   - View opportunities
   - See your match percentage

---

## 📚 API Documentation

Full API documentation available at: `backend/BackEnd_README.md`

### Quick API Test

```bash
# Health check
curl http://localhost:5000/api/health

# Get all career roles
curl http://localhost:5000/api/career-roles

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test@123",
    "role": "student"
  }'
```

---

## 🎨 Frontend Pages Explained

| Page | File | Purpose |
|------|------|---------|
| Landing | `index.html` | Marketing/intro page |
| Login/Register | `login.html` | Authentication |
| Dashboard | `student-dashboard.html` | Main student hub |
| Profile | `student-profile.html` | Manage profile info |
| Assessment | `skill-assessment.html` | Take quizzes |
| Skills | `skill-display.html` | View skill profile |
| **Skill Gap** | `skill-gap-analysis.html` | **NEW: Compare with roles** |
| **Opportunities** | `opportunities.html` | **NEW: Browse jobs/internships** |
| **Applications** | `applications.html` | **NEW: Track applications** |
| **Industry Dashboard** | `industry-dashboard.html` | **NEW: Company portal** |

---

## 🔐 Key Features Implemented

✅ **Authentication & Authorization**
- User registration with role selection
- JWT-based login
- Role-based access control (student/industry/academician/institution)

✅ **Student Features**
- Profile management (education, experience, projects, certs)
- Skills tracking with evidence
- Skill assessments (3 sample assessments provided)
- Career role selection
- Skill gap analysis
- Application tracking

✅ **Industry Features**
- Company profile management
- Post internships/jobs
- Define required skills
- Track applications
- View candidate details

✅ **Unique Features**
- **Skill Gap Analysis**: Compare student skills vs. role requirements
- **Skill Evidence**: Skills backed by assessments, not just claims
- **Match Percentages**: Explicit skill match scoring
- **Career Paths**: Structured role progression

---

## 🚀 Deployment Hints

### For Frontend
- Deploy to Netlify, Vercel, GitHub Pages, or any static host
- Update `API_BASE_URL` in `js/app.js` to production backend URL

### For Backend
- Deploy to Heroku, Railway, Render, or AWS
- Set environment variables in hosting platform
- MongoDB can stay local or use MongoDB Atlas

---

## 📞 Getting Help

### Check Logs
```bash
# Backend logs show in terminal
# Frontend: Open browser DevTools (F12 → Console)
```

### Common Issues

**Problem:** "authToken not found"  
**Solution:** User not logged in - go to login.html and register

**Problem:** "Applications list empty"  
**Solution:** First apply for opportunities, then check applications

**Problem:** "Cannot load career roles"  
**Solution:** Backend might not be running - check terminal

---

## ✨ Next Steps After Setup

1. **Explore the UI** - Navigate through all pages
2. **Test the workflow** - Register, complete profile, take assessment
3. **Customize content** - Update seed.js with your own assessments/roles
4. **Add more features** - Follow existing patterns to extend
5. **Deploy** - Move to production when ready

---

## 📝 Notes

- Assessment questions are hardcoded in `backend/seed.js`
- Career roles are predefined in `backend/seed.js`
- Opportunities are created by users after registration
- All data persists in MongoDB
- JWT tokens expire after 7 days (configurable in .env)

---

## 🎓 SIH26044 Context

This project addresses **SIH26044**: *Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement*

**Key Differentiators:**
- Evidence-based skill profiles (not just self-reported)
- Skill gap analysis with actionable guidance
- Direct matching between students and opportunities
- Structured career role requirements

---

**Built with ❤️ for Smart India Hackathon 2026**

For questions or issues, refer to individual README files:
- `backend/BackEnd_README.md` - Backend API documentation
- `frontend/FrontEnd_README.md` - Frontend components guide
- `database/DataBase_README.md` - Data models reference

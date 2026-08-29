# ISOTOPES System Architecture
## SIH26044 — Portal for Academia–Industry Collaboration

This document provides a high-level overview of the system architecture, data flow, and key components.

---

# System Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                    USER BROWSER                     │
│         (Frontend - HTML/CSS/JavaScript)            │
│                                                     │
│  Pages:                                            │
│  - Landing (index.html)                            │
│  - Auth (login.html)                               │
│  - Student Dashboard                               │
│  - Skill Assessment                                │
│  - Skill Gap Analysis ⭐                            │
│  - Opportunities ⭐                                 │
│  - Applications ⭐                                  │
│  - Industry Dashboard ⭐                            │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │ HTTP Requests (Fetch API)
                   │ JSON + JWT Token
                   ↓
┌─────────────────────────────────────────────────────┐
│      BACKEND SERVER (Node.js + Express.js)         │
│                 Port: 5000                          │
│                                                     │
│  Routes:                                           │
│  ├── /api/auth (Register, Login)                   │
│  ├── /api/students (Profile CRUD)                  │
│  ├── /api/assessments (Quizzes)                    │
│  ├── /api/career-roles (Job Titles)                │
│  ├── /api/opportunities (Jobs/Internships)         │
│  ├── /api/applications (Job Applications)          │
│  └── /api/companies (Company Profiles)             │
│                                                     │
│  Middleware:                                       │
│  - JWT Authentication                              │
│  - CORS Headers                                    │
│  - Error Handling                                  │
│                                                     │
└──────────────────┬──────────────────────────────────┘
                   │ Mongoose Queries
                   │ CRUD Operations
                   ↓
┌─────────────────────────────────────────────────────┐
│            DATABASE (MongoDB)                       │
│      localhost:27017/isotopes                      │
│                                                     │
│  Collections:                                      │
│  ├── users                                         │
│  ├── students                                      │
│  ├── companies                                     │
│  ├── assessments                                   │
│  ├── assessmentresults                             │
│  ├── careersroles                                  │
│  ├── opportunities                                 │
│  └── applications                                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# Data Flow Diagram

## Student Registration & Profile Build

```
Student Opens App
    ↓
Sees Login Page (login.html)
    ↓
Clicks Register
    ↓
Fills: Name, Email, Password, Role=Student
    ↓
POST /api/auth/register
    ↓
Backend Creates User + Student Model
    ↓
Returns JWT Token
    ↓
Frontend Stores Token in localStorage
    ↓
Redirects to student-dashboard.html
    ↓
Student Completes Profile
    ├── Add Education
    ├── Add Experience
    ├── Add Projects
    ├── Add Certifications
    ├── Add Skills
    ↓
Profile Completion % Increases
```

## Skill Assessment Flow

```
Student Takes Assessment
    ↓
GET /api/assessments/:id (fetch questions)
    ↓
Student Answers Questions
    ↓
Submits Answers
    ↓
POST /api/assessments/:id/submit
    ↓
Backend Scores Assessment
    ├── Calculate score (correct/total)
    ├── Determine skill levels per skill
    └── Update Student Profile with results
    ↓
Returns Score + Breakdown
    ↓
Frontend Shows Results
    ↓
Skills Automatically Added to Profile
```

## Skill Gap Analysis Flow

```
Student Goes to Skill Gap Analysis
    ↓
GET /api/career-roles (load all roles)
    ↓
Student Selects Target Role
    ↓
GET /api/career-roles/:id (get role details)
    ↓
Frontend Runs calculateSkillGap()
    ├── Compares Student.skills[] vs Role.requiredSkills[]
    ├── Calculates match percentage
    ├── Identifies matched skills
    └── Identifies missing skills
    ↓
Displays:
├── Match % (e.g., 78%)
├── Matched Skills (green)
├── Missing Critical Skills (red)
├── Missing Important Skills (orange)
└── Improvement Path
```

## Opportunity Discovery Flow

```
Student Goes to Opportunities
    ↓
GET /api/opportunities?type=...&location=...
    ↓
Frontend Displays Filtered List
    ↓
For Each Opportunity:
    ├── Calls calculateSkillMatch()
    ├── Shows Match % to Student
    └── Shows Required Skills
    ↓
Student Clicks Apply
    ↓
POST /api/applications
    ├── Saves Application Record
    ├── Calculates Skill Match
    ├── Sets Status = "applied"
    └── Records Application Date
    ↓
Confirmation Message
    ↓
Application Appears in Applications Page
```

## Industry User Posting Job Flow

```
Industry User Registers
    ↓
POST /api/auth/register with role=industry
    ↓
Creates User + Company Model
    ↓
Completes Company Profile
    ↓
PUT /api/companies/profile
    ↓
Goes to industry-dashboard.html
    ↓
Clicks "Post Opportunity"
    ↓
Fills: Title, Description, Required Skills, Salary, etc.
    ↓
POST /api/opportunities
    ↓
Opportunity Listed & Searchable
    ↓
Students Can See & Apply
    ↓
Company Views Applications on Dashboard
    ↓
PATCH /api/applications/:id/status (update status)
    ↓
Student Sees Status Update in Applications Page
```

---

# Data Models Relationship

```
┌─────────────┐
│   User      │ (Base: email, password, role, name)
└──────┬──────┘
       │ Discriminator Pattern
       ├──────────────────┬──────────────────┐
       ↓                  ↓                  ↓
  ┌─────────┐      ┌─────────┐      ┌───────────────┐
  │ Student │      │ Company │      │ Academician   │
  └────┬────┘      └─────────┘      │ Institution   │
       │                             └───────────────┘
       │ Has Many
       ├────────────────────┬─────────────────┬───────────────┐
       ↓                    ↓                 ↓               ↓
  ┌──────────┐        ┌─────────┐    ┌────────────┐  ┌────────────┐
  │ Skills   │        │Projects │    │Assessments │  │Applications│
  │ (array)  │        │         │    │Results     │  │            │
  └──────────┘        └─────────┘    └────────────┘  └──────┬─────┘
                                                             │
                                          ┌──────────────────┴──────────────┐
                                          ↓                                 ↓
                                   ┌────────────────┐          ┌──────────────────┐
                                   │  Opportunity   │          │  CareerRole      │
                                   │ (Jobs/Internships)        │ (Target Roles)   │
                                   └────────────────┘          └──────────────────┘
                                          │                           │
                                          ├──── requiredSkills[] ──────┤
                                          │
                                   Posted by Company
```

---

# API Endpoint Categories

## Authentication (3 endpoints)
```
POST   /api/auth/register          Create account
POST   /api/auth/login             Login & get token
GET    /api/auth/me                Get current user (auth required)
```

## Student Profile (13 endpoints)
```
GET    /api/students/profile                Get profile
PUT    /api/students/profile                Update profile
POST   /api/students/education              Add education
PUT    /api/students/education/:id          Update education
DELETE /api/students/education/:id          Delete education
POST   /api/students/experience             Add experience
DELETE /api/students/experience/:id         Delete experience
POST   /api/students/projects               Add project
DELETE /api/students/projects/:id           Delete project
POST   /api/students/certifications         Add certification
DELETE /api/students/certifications/:id     Delete certification
POST   /api/students/skills                 Add skill
DELETE /api/students/skills/:id             Delete skill
```

## Assessments (4 endpoints)
```
GET    /api/assessments                     Get all assessments
GET    /api/assessments/:id                 Get specific assessment
POST   /api/assessments/:id/submit          Submit answers
GET    /api/assessments/results/:studentId  Get past results
```

## Career Roles (3 endpoints)
```
GET    /api/career-roles                    Get all roles
GET    /api/career-roles/:id                Get specific role
POST   /api/career-roles/select/:id         Select target role
```

## Opportunities (5 endpoints)
```
GET    /api/opportunities                   Get all (with filters)
GET    /api/opportunities/:id               Get specific
POST   /api/opportunities                   Create (industry only)
PUT    /api/opportunities/:id               Update (industry only)
PATCH  /api/opportunities/:id/close         Close (industry only)
```

## Applications (5 endpoints)
```
POST   /api/applications                    Apply for opportunity
GET    /api/applications/student            Get my applications
GET    /api/applications/company            Get received applications
PATCH  /api/applications/:id/status         Update status
GET    /api/applications/:id                Get specific application
```

## Companies (4 endpoints)
```
GET    /api/companies                       Get all companies
GET    /api/companies/:id                   Get specific company
GET    /api/companies/profile               Get my profile
PUT    /api/companies/profile               Update my profile
```

---

# Authentication Flow

## JWT Authentication

```
1. User Registers/Logins
   ├── Sends email + password
   └── Backend validates credentials

2. Backend Creates JWT Token
   ├── Payload: { userId, role, email, exp: future }
   ├── Secret: JWT_SECRET from .env
   └── Expires: 7 days (JWT_EXPIRE)

3. Token Returned to Frontend
   └── Stored in localStorage as "authToken"

4. Protected API Calls
   ├── Frontend adds header: Authorization: Bearer <token>
   └── Backend validates token with auth middleware

5. Token Expiration
   ├── Token expires after 7 days
   ├── User gets 401 error
   └── Redirected to login page

6. Logout
   ├── Frontend deletes token from localStorage
   ├── User redirected to login
   └── Protected routes inaccessible
```

## Role-Based Access Control (RBAC)

```
Routes Protected by Role:

/api/students/*         → student role only
/api/companies/*        → industry role only
/api/applications      → student (read own) + industry (read own)
/api/assessments       → student (submit) + anyone (read)
/api/career-roles      → anyone (read) + student (select)
/api/opportunities     → anyone (read) + industry (write)
/api/auth/me           → any logged-in user
```

---

# Skill Matching Algorithm

## calculateSkillMatch Function

```javascript
Input:
  studentSkills = [
    { name: "Python", level: "intermediate" },
    { name: "JavaScript", level: "beginner" },
    ...
  ]
  
  roleRequiredSkills = [
    { name: "Python", level: "advanced", importance: "critical" },
    { name: "JavaScript", level: "intermediate", importance: "critical" },
    { name: "Docker", level: "intermediate", importance: "important" },
    ...
  ]

Process:
  1. For each required skill:
     - Check if student has this skill
     - If yes → matched[]
     - If no → missing[]
  
  2. Calculate match percentage
     = (matched.count / required.count) * 100
  
  3. Categorize missing skills
     - critical → show in red (priority learn)
     - important → show in orange (secondary)
     - nice-to-have → show in blue
  
  4. Generate recommendation
     - "Learn Docker and Kubernetes to increase match to 95%"

Output: {
  matchPercentage: 78,
  matched: ["Python", "JavaScript", ...],
  missing: ["Docker", "Kubernetes", ...],
  criticalGaps: ["Docker"],
  recommendedActions: [...]
}
```

---

# File Organization

## Frontend Structure

```
frontend/
├── index.html                  # Landing page
├── login.html                  # Auth (register/login)
├── student-dashboard.html      # Main student hub
├── student-profile.html        # Profile management
├── skill-assessment.html       # Take assessments
├── skill-display.html          # View skills
├── skill-gap-analysis.html     # Gap analysis ⭐
├── opportunities.html          # Browse jobs ⭐
├── applications.html           # Track applications ⭐
├── industry-dashboard.html     # Company portal ⭐
├── js/
│   └── app.js                  # 40+ API functions
│       ├── Authentication
│       ├── Student Profile
│       ├── Assessments
│       ├── Career Roles
│       ├── Opportunities
│       ├── Applications
│       ├── Companies
│       └── Utilities
└── css/
    └── style.css               # Bootstrap + custom
```

## Backend Structure

```
backend/
├── server.js                   # Express app entry
├── package.json                # Dependencies
├── .env                        # Configuration
├── seed.js                     # Database seeding
├── middleware/
│   └── auth.js                 # JWT middleware
├── models/
│   ├── User.js                 # Base user
│   ├── Student.js              # Student profile
│   ├── Company.js              # Company profile
│   ├── CareerRole.js           # Career roles
│   ├── Assessment.js           # Assessments
│   ├── Opportunity.js          # Job/internship
│   └── Application.js          # Applications
└── routes/
    ├── auth.js                 # Auth endpoints
    ├── students.js             # Student CRUD
    ├── assessments.js          # Assessment logic
    ├── careerRoles.js          # Career roles
    ├── opportunities.js        # Opportunity CRUD
    ├── applications.js         # Application logic
    └── companies.js            # Company CRUD
```

---

# Key Technologies

## Frontend
- **HTML5** - Structure & semantic markup
- **CSS3 + Bootstrap 5** - Responsive styling
- **JavaScript (Vanilla)** - Logic & interactions
- **Fetch API** - HTTP requests
- **LocalStorage** - Client-side token storage

## Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT creation/verification
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

## Database
- **MongoDB** - NoSQL database
- **Mongoose Schema Validation** - Data integrity
- **Discriminator Pattern** - User role inheritance

---

# Security Measures

1. **Password Security**
   - bcryptjs hashing (10 salt rounds)
   - Passwords never stored plaintext
   - Client-side validation

2. **Authentication**
   - JWT tokens with expiration
   - Secure token storage (localStorage)
   - Token validation on protected routes

3. **Authorization**
   - Role-based access control
   - Middleware checks user role
   - Per-endpoint authorization

4. **API Security**
   - CORS whitelist (configured)
   - Request validation
   - Error messages don't expose internals

5. **Data Validation**
   - Mongoose schema validation
   - Frontend form validation
   - Type checking

---

# Common Operations

## How to Add a New Assessment

1. Edit `backend/seed.js`
2. Add assessment to assessmentsData array
3. Include questions with answers
4. Run `npm run seed`

## How to Add a New Career Role

1. Edit `backend/seed.js`
2. Add role to careersRolesData array
3. Include required skills array
4. Run `npm run seed`

## How to Add a New Page

1. Create `frontend/new-page.html`
2. Add functions to `frontend/js/app.js`
3. Add link in navigation
4. Update routing logic if needed

## How to Add a New API Endpoint

1. Create route handler in `backend/routes/file.js`
2. Add auth middleware if needed
3. Mount route in `backend/server.js`
4. Create frontend function in `app.js`

---

# Debugging Guide

## Backend Debugging

```bash
# Check MongoDB connection
npm run dev  # Look for "MongoDB Connected" in logs

# Test API endpoint
curl http://localhost:5000/api/career-roles

# Check errors in server logs
# Look for error messages in terminal
```

## Frontend Debugging

```javascript
// Open DevTools (F12)
// Console tab shows errors
console.log(localStorage.getItem('authToken'))  // Check token
console.log(response)  // Check API response

// Network tab shows API calls
// Application tab shows localStorage
```

## Database Debugging

```bash
# Connect to MongoDB
mongo  # or mongosh

# Check database
use isotopes
db.students.findOne()
db.assessments.find()
```

---

# Performance Optimization Tips

1. **Frontend**
   - Cache API responses
   - Lazy load images
   - Minimize re-renders

2. **Backend**
   - Add database indexes
   - Cache role data
   - Optimize queries

3. **Database**
   - Index frequently queried fields
   - Denormalize if needed
   - Archive old data

---

# Deployment Checklist

- [ ] Environment variables configured
- [ ] MongoDB Atlas connection string set
- [ ] JWT_SECRET updated for production
- [ ] CORS updated for production domain
- [ ] API_BASE_URL updated in frontend
- [ ] No console.log in production code
- [ ] Error messages user-friendly
- [ ] Database backup strategy planned
- [ ] SSL/HTTPS enabled
- [ ] Rate limiting configured

---

**This architecture supports the complete SIH26044 requirements and is ready for scaling.**

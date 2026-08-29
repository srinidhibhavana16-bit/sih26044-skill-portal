# ISOTOPES 🚀
## SIH26044 — Portal for Academia–Industry Collaboration

> An intelligent career growth ecosystem that connects students, industries, academicians, and educational institutions through skill mapping, skill-gap analysis, opportunities, and career intelligence.

---

# 📌 Status: FULLY IMPLEMENTED ✅

The complete ISOTOPES platform is now fully implemented with backend, frontend, and database integration. Ready for testing and deployment!

---

# 🚀 Quick Start

**See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete step-by-step instructions.**

### Quick Overview:

1. **Start MongoDB:**
```bash
mongod
```

2. **Setup Backend:**
```bash
cd backend
npm install
npm run seed  # Populates sample data
npm start     # Starts server on port 5000
```

3. **Open Frontend:**
```bash
# In another terminal
cd frontend
python -m http.server 8000  # Or use Live Server in VS Code
# Open http://localhost:8000
```

**Platform is ready to use!**

---

# 📌 Problem Statement

**SIH26044**

### Portal for Academia–Industry Collaboration for:

- ✅ Skill Mapping
- ✅ Internships  
- ✅ Placements
- ✅ Career Development
- ✅ Academia–Industry Collaboration

---

# 💡 Our Vision

Students today learn from many different platforms.

Their information is scattered across:

- Coding practice platforms
- GitHub
- Online learning platforms
- Certifications
- Academic projects
- Assessments
- Internships

Because of this, it is difficult for students and companies to clearly understand:

> **What can a student actually do?**

**ISOTOPES solves this by creating an intelligent platform that helps students:**

```text
LEARN
  ↓
DEMONSTRATE SKILLS
  ↓
ANALYZE SKILLS
  ↓
IDENTIFY SKILL GAPS
  ↓
LEARN WHAT IS MISSING
  ↓
STAY UPDATED WITH INDUSTRY
  ↓
DISCOVER OPPORTUNITIES
  ↓
BECOME CAREER READY
```

---

# 🎯 Core Mission

We are not building just another placement portal.

Our goal is to create a system that continuously helps students become career ready through:

1. **Evidence-Based Skills** - Skills validated through assessments, not just claims
2. **Skill Twin** - Digital representation of demonstrated capabilities
3. **Skill Gap Analysis** - Clear understanding of missing skills
4. **Personalized Guidance** - Actionable steps to improve
5. **Opportunity Matching** - Connect students to relevant roles

---

# 🌟 Key Innovation

## Evidence-Based Skill Intelligence

Instead of relying only on manually entered skills, the platform uses evidence such as:

* Assessments
* Projects
* Coding practice
* Certifications
* Internship experience
* Learning progress

```text
SKILL EVIDENCE
      ↓
SKILL ANALYSIS
      ↓
SKILL TWIN
      ↓
SKILL GAP ANALYSIS
      ↓
PERSONALIZED GUIDANCE
```

---

# 🧬 Skill Twin

The **Skill Twin** is a digital representation of a student's demonstrated skills.

### Features:

✅ **Evidence-Based** - Backed by assessments, not just claims  
✅ **Comprehensive** - Education, experience, projects, certifications  
✅ **Real-Time** - Updates as students take assessments  
✅ **Comparable** - Can be matched against job requirements  

---

# 🎨 Platform Features

## For Students

✅ **Profile Management**
- Education details
- Work experience
- Projects and portfolio
- Certifications and achievements

✅ **Skill Assessment**
- Multiple assessment categories
- Instant scoring
- Automatic skill profiling
- Evidence collection

✅ **Skill Gap Analysis** 🆕
- Select target career role
- View skill match percentage
- Identify missing skills
- Get improvement guidance

✅ **Career Discovery**
- Browse internships and jobs
- See skill match for each role
- Easy application process
- Track application status

✅ **Digital Career Twin**
- Visual skill profile
- Skill strength indicators
- Career readiness score

## For Companies

✅ **Company Profile**
- Manage company information
- Post internships and jobs
- Define required skills
- Set salary ranges

✅ **Candidate Management**
- View student applications
- See skill match percentages
- Shortlist candidates
- Track hiring process

✅ **Opportunity Management**
- Create and update opportunities
- Close opportunities when filled
- View applicant statistics

## System Features

✅ **Authentication**
- Secure registration and login
- JWT-based authentication
- Role-based access control

✅ **Career Roles Database**
- 5+ predefined career roles
- Required skills per role
- Salary information
- Career progression paths

✅ **Assessment System**
- 3+ sample assessments
- Multiple categories
- Automatic scoring
- Skill profiling

---

# 📁 Project Structure

```
sih26044-skill-portal/
├── frontend/
│   ├── index.html                    # Landing page
│   ├── login.html                    # Authentication
│   ├── student-dashboard.html        # Main hub
│   ├── student-profile.html          # Profile management
│   ├── skill-assessment.html         # Assessments
│   ├── skill-display.html            # Skill visualization
│   ├── skill-gap-analysis.html       # 🆕 Gap analysis
│   ├── opportunities.html            # 🆕 Job browsing
│   ├── applications.html             # 🆕 Application tracker
│   ├── industry-dashboard.html       # 🆕 Company portal
│   ├── js/
│   │   └── app.js                    # API functions
│   └── css/
│       └── style.css                 # Styling
│
├── backend/
│   ├── server.js                     # Express app
│   ├── package.json                  # Dependencies
│   ├── seed.js                       # Sample data
│   ├── middleware/
│   │   └── auth.js                   # JWT middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Student.js
│   │   ├── Company.js
│   │   ├── CareerRole.js
│   │   ├── Assessment.js
│   │   ├── Opportunity.js
│   │   └── Application.js
│   └── routes/
│       ├── auth.js
│       ├── students.js
│       ├── assessments.js
│       ├── careerRoles.js
│       ├── opportunities.js
│       ├── applications.js
│       └── companies.js
│
├── SETUP_GUIDE.md                    # 🆕 Complete setup guide
├── README.md                         # This file
└── PROJECT_CONTEXT.md                # Project vision
```

---

# ✅ Implementation Status

## Completed Components

- [x] **Authentication System** - JWT + password hashing
- [x] **User Roles** - Student, Industry, Academician, Institution
- [x] **Student Profile** - Education, experience, projects, certifications
- [x] **Skill Management** - Add, update, delete skills
- [x] **Assessments** - Take quizzes, automatic scoring
- [x] **Career Roles** - 5+ predefined roles with skill requirements
- [x] **Skill Gap Analysis** - Visual comparison with target roles
- [x] **Opportunity Management** - Post and browse internships/jobs
- [x] **Applications** - Apply and track status
- [x] **Skill Matching** - Calculate match percentages
- [x] **Dashboards** - Student and industry portals
- [x] **API Documentation** - Complete backend reference

---

# 🚀 Technology Stack

## Frontend
- HTML5 + CSS3 + Bootstrap 5
- Vanilla JavaScript
- Fetch API for backend communication

## Backend
- Node.js + Express.js
- Mongoose ODM
- JWT Authentication
- bcryptjs Password Hashing
- CORS Support

## Database
- MongoDB
- 7 Data Models (Users, Students, Companies, Assessments, CareerRoles, Opportunities, Applications)

---

# 🔑 Key Features

### ✨ What Makes ISOTOPES Unique

1. **Evidence-Based Skills**
   - Skills come from assessments and achievements
   - Not just self-reported claims
   - Verified through platform activities

2. **Skill Twin**
   - 360° view of student capabilities
   - Combines multiple evidence sources
   - Real-time skill profiling

3. **Explainable Matching**
   - Students see exactly why they match a role
   - "78% match - Missing Docker, Know ML"
   - Actionable feedback

4. **Personalized Guidance**
   - After gap analysis, students know what to learn
   - Prioritized learning paths
   - Improvement recommendations

5. **Career Intelligence**
   - Link between skills and career roles
   - Salary insights
   - Career progression paths

---

# 📖 Documentation Files

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete step-by-step setup guide ⭐ **START HERE**
- **[backend/BackEnd_README.md](backend/BackEnd_README.md)** - Backend API documentation
- **[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md)** - Project vision and problem statement
- **[FEATURES.md](FEATURES.md)** - Feature status tracker
- **[CURRENT_TASK.md](CURRENT_TASK.md)** - Development progress

---

# 🚀 Getting Started

**For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)**

### Test Workflow:

1. Go to Login page
2. Register as a Student
3. Complete your profile
4. Take a skill assessment
5. View skill gap analysis
6. Browse opportunities
7. Apply to a job/internship
8. Track application status

---

# 🔐 Security Features

✅ Secure password hashing (bcryptjs)  
✅ JWT-based authentication  
✅ Role-based access control  
✅ Protected API endpoints  
✅ CORS enabled for cross-origin requests  

---

# 📞 Support

### Getting Help

1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for setup issues
2. Check [backend/BackEnd_README.md](backend/BackEnd_README.md) for API questions
3. Check browser DevTools (F12) for frontend errors
4. Check backend terminal for server errors

---

# 📝 License

MIT License - SIH26044 Project

---

# 🎓 Credits

**Built for Smart India Hackathon 2026 - SIH26044**

Portal for Academia–Industry Collaboration for Skill Mapping, Internships and Placement

---

**Ready to use! Start with [SETUP_GUIDE.md](SETUP_GUIDE.md)** 🚀

```text
LEARN
  ↓
DEMONSTRATE SKILLS
  ↓
ANALYZE SKILLS
  ↓
IDENTIFY SKILL GAPS
  ↓
LEARN WHAT IS MISSING
  ↓
STAY UPDATED WITH INDUSTRY
  ↓
DISCOVER OPPORTUNITIES
  ↓
BECOME CAREER READY
````

---

# 🌟 Key Innovation

## Evidence-Based Skill Intelligence

Instead of relying only on manually entered skills, the platform aims to use evidence such as:

* Assessments
* Projects
* Coding practice
* Certifications
* Internship experience
* Learning progress

```text
SKILL EVIDENCE
      ↓
SKILL ANALYSIS
      ↓
SKILL TWIN
      ↓
SKILL GAP ANALYSIS
      ↓
PERSONALIZED GUIDANCE
```

---

# 🧬 Skill Twin

The **Skill Twin** is a digital representation of a student's demonstrated skills.

Example:

```text
Student Skill Profile

Python               ████████░░ 80%
Data Structures      ███████░░░ 70%
Machine Learning     ██████░░░░ 60%
GitHub Projects      ██████░░░░ 65%
Communication        █████░░░░░ 50%
```

The system should provide explanations for important skill scores.

Example:

```text
Python Skill Score: 78%

Reason:

✓ Good assessment performance
✓ Multiple relevant projects
✓ Consistent practice

Needs Improvement:

• Advanced problem solving
• Larger real-world projects
```

> AI should help explain the results, but should not invent achievements or randomly generate important scores.

---

# 🧠 Main Features

## 👨‍🎓 Student Features

* Student profile
* Skill assessment
* Skill mapping
* Skill Twin
* Skill-gap analysis
* Career role selection
* Personalized learning roadmap
* Digital portfolio
* Internship discovery
* Job discovery
* Application tracking
* Opportunity recommendations

---

## 🏢 Industry Features

* Company profile
* Post internships
* Post jobs
* Define required skills
* Discover suitable candidates
* Skill-based candidate matching
* Application management
* Explainable matching results

Example:

```text
Candidate Match: 78%

Matched Skills:

✓ Python
✓ Machine Learning
✓ Statistics

Missing Skills:

✗ Deep Learning
✗ MLOps
```

---

## 👨‍🏫 Academician Features

* Faculty opportunities
* Industry training
* Faculty internships
* Research collaboration
* Consultancy opportunities
* Industry-academia collaboration

---

## 🏫 Institution Features

* Student skill analytics
* Skill-gap reports
* Internship participation
* Placement readiness
* Industry demand insights
* Institutional dashboards

---

# 🔥 Unique Features

## 1️⃣ Evidence-Based Skill Twin

```text
Projects
   +
Assessments
   +
Practice
   +
Certifications
   +
Internships
       ↓
Evidence Analysis
       ↓
Skill Twin
```

---

## 2️⃣ Explainable Skill Matching

Instead of simply showing:

```text
Match Score: 78%
```

The platform explains:

```text
WHY 78%?

Strong Skills:

✓ Python
✓ Machine Learning
✓ Statistics

Missing Skills:

✗ Deep Learning
✗ Docker
```

---

## 3️⃣ Skill Gap Analysis

```text
CURRENT STUDENT SKILLS
            VS
TARGET ROLE REQUIREMENTS
            ↓
      SKILL GAP ANALYSIS
            ↓
      PRIORITY SKILLS
```

Example:

```text
Target Role:
Machine Learning Engineer

High Priority:

🔴 Deep Learning
🔴 MLOps

Medium Priority:

🟡 Advanced Statistics

Strong Skills:

🟢 Python
🟢 Machine Learning
```

---

## 4️⃣ Personalized Learning Roadmap

The system should not only identify problems.

It should suggest the next action.

```text
SKILL GAP
   ↓
WHAT TO LEARN
   ↓
LEARNING ROADMAP
   ↓
PROJECT RECOMMENDATION
   ↓
PORTFOLIO IMPROVEMENT
```

---

## 5️⃣ Future Skill Radar

Technology changes rapidly.

The platform aims to help students understand:

* Current industry requirements
* Emerging technologies
* Future skill trends
* Relevant technologies for their career

```text
CURRENT STUDENT SKILLS
          +
INDUSTRY REQUIREMENTS
          +
EMERGING TECHNOLOGIES
          ↓
FUTURE SKILL RADAR
          ↓
PERSONALIZED RECOMMENDATIONS
```

---

## 6️⃣ Opportunity Intelligence

The system can recommend relevant opportunities.

```text
STUDENT PROFILE
       +
SKILLS
       +
EDUCATION
       +
ELIGIBILITY
       ↓
OPPORTUNITY ENGINE
       ↓
RELEVANT OPPORTUNITIES
```

Possible opportunities:

* Internships
* Jobs
* Government schemes
* Scholarships
* Fellowships
* Skill-development programs
* Research opportunities

---

# 🏗️ System Architecture

```text
                         USER
                           │
                           ▼
                    ┌──────────────┐
                    │   FRONTEND   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ BACKEND API  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   DATABASE   │
                    └──────┬───────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │ SKILL INTELLIGENCE  │
                 │       ENGINE        │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
        SKILL TWIN      SKILL GAP      MATCHING
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                    RECOMMENDATIONS
                            │
                            ▼
                INTERNSHIPS / JOBS /
              SCHEMES / LEARNING PATHS
```

---

# 👥 Stakeholders

```text
                     ┌─────────────┐
                     │  STUDENTS   │
                     └──────┬──────┘
                            │
                            │
     ┌──────────────┬───────┼───────┬──────────────┐
     │              │       │       │              │
     ▼              ▼       ▼       ▼              ▼

 INDUSTRY      ACADEMICIANS PLATFORM  INSTITUTIONS GOVERNMENT
```

---

# 🔄 Student Journey

```text
REGISTER
   ↓
CREATE PROFILE
   ↓
SKILL ASSESSMENT
   ↓
SKILL TWIN
   ↓
SELECT CAREER GOAL
   ↓
SKILL GAP ANALYSIS
   ↓
PERSONALIZED ROADMAP
   ↓
INTERNSHIP / JOB MATCHING
   ↓
APPLICATION
   ↓
CAREER DEVELOPMENT
```

---

# 🏢 Industry Journey

```text
REGISTER COMPANY
        ↓
POST JOB / INTERNSHIP
        ↓
DEFINE REQUIRED SKILLS
        ↓
FIND MATCHING STUDENTS
        ↓
VIEW EXPLAINABLE MATCHING
        ↓
SHORTLIST
        ↓
MANAGE APPLICATIONS
```

---

# 👨‍🏫 Academician Journey

```text
REGISTER
    ↓
CREATE PROFESSIONAL PROFILE
    ↓
DISCOVER INDUSTRY OPPORTUNITIES
    ↓
TRAINING / INTERNSHIPS
    ↓
RESEARCH COLLABORATION
    ↓
CONSULTANCY
```

---

# 🏫 Institution Journey

```text
INSTITUTION DASHBOARD
          ↓
STUDENT ANALYTICS
          ↓
SKILL GAP ANALYSIS
          ↓
INTERNSHIP PARTICIPATION
          ↓
PLACEMENT READINESS
          ↓
INDUSTRY REQUIREMENTS
```

---

# 🚀 MVP Development Strategy

We will not attempt to build every feature simultaneously.

The first complete MVP journey will be:

```text
STUDENT REGISTERS
        ↓
SKILL ASSESSMENT
        ↓
SKILL PROFILE
        ↓
SELECT TARGET ROLE
        ↓
SKILL GAP ANALYSIS
        ↓
PERSONALIZED GUIDANCE
        ↓
RECOMMENDED INTERNSHIP
        ↓
APPLICATION
```

> **Working Core > Impressive Unfinished Features**

---

# 🧩 Project Structure

```text
isotopes-sih26044/

│
├── frontend/
│   └── Student, Industry, Academician and Institution UI
│
├── backend/
│   └── APIs and Business Logic
│
├── database/
│   └── Database Schema and Data
│
├── docs/
│   ├── architecture/
│   ├── diagrams/
│   ├── requirements/
│   └── demo/
│
├── PROJECT_CONTEXT.md
├── FEATURES.md
├── CURRENT_TASK.md
├── README.md
├── .gitignore
└── .env.example
```

---

# 🤖 AI-Assisted Development Workflow

AI should not be asked to build the complete platform at once.

Instead:

```text
UNDERSTAND FEATURE
       ↓
PLAN FEATURE
       ↓
DESIGN DATA FLOW
       ↓
IMPLEMENT SMALL PART
       ↓
TEST
       ↓
DEBUG
       ↓
REVIEW
       ↓
COMMIT
```

---

# 🧠 AI Roles

## ChatGPT

Use for:

* Understanding requirements
* Architecture planning
* Feature planning
* Explaining concepts
* Debugging
* Code review
* Documentation

---

## AI Coding Assistant

Use for:

* Writing code
* Editing files
* Implementing features
* Debugging

---

## GitHub

Use for:

* Version control
* Collaboration
* Code backup
* Branch management

---

# 📂 Important Project Documentation

## PROJECT_CONTEXT.md

Contains:

* Project vision
* Architecture
* Technology stack
* Completed features
* Current development status
* Important development rules

---

## FEATURES.md

Tracks:

* SIH-required features
* Unique features
* Priority
* Development status

Example:

```text
Skill Assessment        ✅ Completed
Skill Gap Analysis      🟡 In Progress
Opportunity Matching    ❌ Not Started
```

---

## CURRENT_TASK.md

Tracks the team's current work.

Example:

```text
Current Feature:
Skill Gap Analysis

Completed:
Backend API

Next:
Frontend Integration

Known Problem:
API response needs testing
```

---

# 🔀 GitHub Workflow

```text
main
 │
 ├── feature/student-dashboard
 │
 ├── feature/skill-engine
 │
 ├── feature/opportunity-engine
 │
 └── feature/company-dashboard
```

Development workflow:

```text
PULL
 ↓
CREATE BRANCH
 ↓
BUILD FEATURE
 ↓
TEST
 ↓
COMMIT
 ↓
PUSH
 ↓
REVIEW
 ↓
MERGE
```

---

# 🧪 Development Rules

## Always

* Build one feature at a time
* Test before merging
* Keep important decisions documented
* Commit working code frequently
* Update project status files
* Review AI-generated code

## Never

* Ask AI to blindly build the entire platform
* Directly edit `main`
* Commit API keys
* Upload `.env`
* Trust AI-generated data without verification
* Allow AI to invent student achievements

---

# 🔐 AI and Data Principles

Important rules:

```text
AI MAY:

✓ Explain skill gaps
✓ Recommend learning paths
✓ Summarize information
✓ Assist with recommendations

AI MUST NOT:

✗ Invent achievements
✗ Randomly generate skill scores
✗ Guess official eligibility
✗ Expose private data
```

---

# 🛠️ Token Limit Recovery

If an AI reaches its token or usage limit:

```text
SAVE CODE
    ↓
COMMIT TO GITHUB
    ↓
UPDATE PROJECT_CONTEXT.md
    ↓
UPDATE CURRENT_TASK.md
    ↓
MOVE TO ANOTHER AI
    ↓
READ PROJECT DOCUMENTATION
    ↓
CONTINUE DEVELOPMENT
```

Important:

> Never keep critical project information only inside an AI conversation.

---

# 🧪 Testing Strategy

## Feature Testing

* Does normal usage work?
* Does missing data work?
* Are invalid inputs handled?

## API Testing

* Does the correct response return?
* Are errors handled?
* Is validation working?

## Integration Testing

```text
FRONTEND
   ↓
API
   ↓
BACKEND
   ↓
DATABASE
```

Test the complete user journey.

---

# 🎬 SIH Demo Flow

The final demonstration should tell a story.

```text
STUDENT ARRIVES
       ↓
CREATES PROFILE
       ↓
SKILLS ARE ANALYZED
       ↓
SKILL TWIN IS GENERATED
       ↓
STUDENT SELECTS CAREER GOAL
       ↓
SKILL GAPS ARE IDENTIFIED
       ↓
PERSONALIZED ROADMAP APPEARS
       ↓
FUTURE SKILL INSIGHTS
       ↓
RELEVANT OPPORTUNITIES
       ↓
STUDENT BECOMES MORE CAREER READY
```

---

# 🏆 What Makes ISOTOPES Different?

```text
TRADITIONAL PLATFORM

Profile
   ↓
Search Job
   ↓
Apply


ISOTOPES

Evidence
   ↓
Skill Intelligence
   ↓
Skill Twin
   ↓
Skill Gap Analysis
   ↓
Learning Guidance
   ↓
Future Skill Awareness
   ↓
Opportunity Intelligence
   ↓
Career Growth
```

---

# 👨‍💻 Team

## Team Name

**ISOTOPES**

### Team Lead

**ELURI HEMANTH**

### Team Members

* Vasadi Veera Venkata Veerendra
* Venkata Nagaraju Toka
* Sk Zaheer
* Yochana Sai Praneetha
* Srinidhikrishna Bhavana

### Institution

**KL University**

---

# 🎯 Final Vision

> **We are not just helping students find opportunities.**

> **We are helping them understand their current abilities, identify what they need next, prepare for future industry demands, and connect with the right opportunities.**

---

# 🚧 Project Status

```text
🟡 Planning and Architecture Phase
```

---

# 📜 License

This project is being developed as part of **Smart India Hackathon — SIH26044**.

---

# ⭐ ISOTOPES

### Learn. Demonstrate. Analyze. Improve. Connect. Grow.
````
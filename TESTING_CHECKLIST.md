# TESTING CHECKLIST
## ISOTOPES — SIH26044

Complete this checklist to verify all system functionality works correctly.

---

# System Setup Verification

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] npm installed
- [ ] Backend folder contains `node_modules` after `npm install`
- [ ] `.env` file configured in backend folder
- [ ] `SETUP_GUIDE.md` reviewed

---

# Backend Verification

## Database & Seeding

- [ ] MongoDB `mongod` command runs without errors
- [ ] Backend `npm run seed` completes successfully
- [ ] Database contains 3 assessments
- [ ] Database contains 5 career roles
- [ ] Database is empty before seeding (clean state)

## Server Startup

- [ ] `npm start` starts server on port 5000
- [ ] Server logs show "MongoDB Connected"
- [ ] Server logs show "Server running on http://localhost:5000"
- [ ] `npm run dev` works with nodemon auto-reload

## API Endpoints - Health Check

- [ ] GET `/api/career-roles` returns 5 roles (no auth needed)
- [ ] GET `/api/assessments` returns 3 assessments (no auth needed)
- [ ] Server responds to requests from frontend without CORS errors

---

# Frontend Verification

## Page Loading

- [ ] `index.html` loads at http://localhost:8000
- [ ] All CSS loads correctly (Bootstrap styling visible)
- [ ] All pages load without 404 errors
- [ ] Browser console shows no critical errors (F12)

## Navigation

- [ ] Home page loads correctly
- [ ] Links between pages work
- [ ] Navigation menu items visible
- [ ] Back button works

---

# Authentication Tests

## Registration - Student

- [ ] Navigate to `login.html`
- [ ] Click "Register" tab
- [ ] Fill form: Name, Email, Password, Confirm Password
- [ ] Select "Student" as role
- [ ] Click "Create Account"
- [ ] Success message appears
- [ ] Page redirects to student dashboard OR login page
- [ ] User can login with credentials

**Test Account:**
```
Email: student@example.com
Password: Student@123
Name: Test Student
```

## Registration - Industry

- [ ] Navigate to `login.html`
- [ ] Click "Register" tab
- [ ] Fill form: Name, Email, Password, Confirm Password
- [ ] Select "Industry Professional" as role
- [ ] Click "Create Account"
- [ ] Success message appears
- [ ] User can login with credentials

**Test Account:**
```
Email: company@example.com
Password: Company@123
Name: Test Company
```

## Login

- [ ] Login page loads
- [ ] Enter student email and password
- [ ] Click "Login"
- [ ] Success message shows
- [ ] Redirected to student dashboard
- [ ] JWT token saved in localStorage (check DevTools)

## Logout

- [ ] Click logout button
- [ ] Redirected to login page
- [ ] localStorage cleared (token removed)
- [ ] Cannot access protected pages

## Authentication Error Handling

- [ ] Login with wrong password shows error
- [ ] Login with non-existent email shows error
- [ ] Register with existing email shows error
- [ ] Missing required fields shows validation error

---

# Student Dashboard Tests

## Dashboard Load

- [ ] Dashboard loads after login
- [ ] Shows student name
- [ ] Shows profile completion percentage
- [ ] Action cards visible (Assessment, Skills, Opportunities, etc.)
- [ ] Navigation menu shows student options

## Dashboard Cards

- [ ] "Take Assessment" card visible
- [ ] "View Skills" card visible
- [ ] "Find Opportunities" card visible ✅ NEW
- [ ] "Skill Gap Analysis" card visible ✅ NEW
- [ ] All cards have working links

## Profile Completion

- [ ] Profile completion percentage calculated
- [ ] Percentage increases as profile sections filled
- [ ] Shows 0% on first login
- [ ] Shows near 100% after complete profile

---

# Student Profile Tests

## Education Section

- [ ] Add education button works
- [ ] Form appears to add education
- [ ] Fill: Degree, School/University, Field, Start Date, End Date, CGPA
- [ ] Submit button saves education
- [ ] Education appears in list
- [ ] Edit button works
- [ ] Delete button works
- [ ] Multiple education entries can be added

## Experience Section

- [ ] Add experience button works
- [ ] Form appears
- [ ] Fill: Company, Position, Description, Start Date, End Date
- [ ] Submit saves experience
- [ ] Edit and delete work

## Projects Section

- [ ] Add project button works
- [ ] Fill: Project Name, Description, Skills Used, Link
- [ ] Submit saves project
- [ ] Edit and delete work

## Certifications Section

- [ ] Add certification button works
- [ ] Fill: Certification Name, Organization, Date
- [ ] Submit saves certification
- [ ] Edit and delete work

## Skills Section

- [ ] Add skill button works
- [ ] Fill: Skill Name (e.g., Python, JavaScript)
- [ ] Submit adds skill
- [ ] Skills list shows all added skills
- [ ] Delete skill works

---

# Skill Assessment Tests

## Browse Assessments

- [ ] Navigate to Assessment page
- [ ] Assessment list loads
- [ ] Shows at least 3 assessments:
  - Python Programming Basics
  - JavaScript Fundamentals
  - Data Science Fundamentals

## Take Assessment

- [ ] Click "Start Assessment"
- [ ] Assessment title displays
- [ ] Questions appear in order
- [ ] Each question has options/answers
- [ ] Can select answer for each question
- [ ] "Submit" button visible
- [ ] Cannot submit without answering all questions

## Assessment Completion

- [ ] Submit assessment
- [ ] Loading state appears
- [ ] Results page shows score (e.g., 6/10)
- [ ] Shows correct/incorrect for each question
- [ ] Shows skills identified
- [ ] "Return to Dashboard" link works
- [ ] Skills added to student profile

## Assessment Scoring

- [ ] Score calculated correctly
- [ ] Skill level determined based on performance
- [ ] Can retake assessment
- [ ] Results persist in database

---

# Skill Display Tests

## Skill Profile Page

- [ ] Navigate to Skill Display page
- [ ] Shows all skills added manually
- [ ] Shows skills from assessments
- [ ] Each skill shows proficiency level
- [ ] Skills from assessments marked differently
- [ ] No skills shown if none added yet
- [ ] Display is visually clear

---

# Skill Gap Analysis Tests ✅ NEW FEATURE

## Feature Access

- [ ] Navigate to Skill Gap Analysis page
- [ ] Page loads without errors
- [ ] Career roles grid displays

## Role Selection

- [ ] Shows 5+ career roles
- [ ] Each role card clickable
- [ ] Click on "Software Engineer"
- [ ] Skill comparison loads

## Gap Analysis Display

- [ ] Shows "Skill Match: XX%"
- [ ] Shows matched skills (skills student has)
- [ ] Shows missing skills (skills needed)
- [ ] Shows skill importance levels
- [ ] Shows importance colors (red for critical, orange for important)

## Improvement Guidance

- [ ] Shows recommended improvements
- [ ] Prioritizes critical missing skills
- [ ] Shows alternative skills available
- [ ] Provides actionable steps

## Career Readiness Score

- [ ] Shows overall career readiness percentage
- [ ] Matches calculated skill match percentage
- [ ] Updates when student takes new assessment

## Testing Different Roles

- [ ] Test with "Data Scientist" role
- [ ] Test with "Web Developer" role
- [ ] Test with "Cloud Architect" role
- [ ] Different roles show different skill gaps

---

# Opportunity Browsing Tests ✅ NEW FEATURE

## Opportunities Page

- [ ] Navigate to Opportunities page
- [ ] Page loads without errors
- [ ] List of opportunities displays

## Opportunity List

- [ ] Shows multiple opportunities
- [ ] Each shows: Title, Company, Type (Internship/Job)
- [ ] Each shows: Location, Salary Range
- [ ] Each shows: Skill Match Percentage ✅
- [ ] Each shows: Required skills

## Filtering

- [ ] Filter by Type (Internship/Job)
- [ ] Filter by Location Type (Remote/Hybrid/Onsite)
- [ ] Multiple filters work together
- [ ] "Clear Filters" button works

## Opportunity Details

- [ ] Click opportunity card
- [ ] Details modal/page opens
- [ ] Shows full description
- [ ] Shows required skills with importance
- [ ] Shows application deadline
- [ ] Shows skill match calculation details

## Applying for Opportunity

- [ ] Click "Apply" button
- [ ] Confirmation message shows
- [ ] Application recorded
- [ ] Status changes (if visible)

---

# Applications Tracking Tests ✅ NEW FEATURE

## Applications Page

- [ ] Navigate to Applications page
- [ ] Page loads
- [ ] List of applications appears

## Application List

- [ ] Shows each application
- [ ] Shows: Opportunity title, company, skill match %
- [ ] Shows: Application date
- [ ] Shows: Current status

## Status Tabs

- [ ] "All" tab shows all applications
- [ ] "Applied" tab shows only applied
- [ ] "Shortlisted" tab shows shortlisted
- [ ] "Rejected" tab shows rejected
- [ ] Tab filtering works correctly

## Application Details

- [ ] Click application
- [ ] Shows full details
- [ ] Shows skill match explanation
- [ ] Shows matched and missing skills
- [ ] Shows application timeline

---

# Industry Dashboard Tests ✅ NEW FEATURE

## Industry Login

- [ ] Register/login as industry user
- [ ] Directed to industry dashboard
- [ ] Not directed to student dashboard

## Dashboard Overview

- [ ] Shows company name
- [ ] Shows statistics:
  - Total opportunities posted
  - Total applications received
  - Shortlisted candidates
  - Hired candidates
- [ ] Statistics cards visible and readable

## Opportunities Section

- [ ] Shows opportunities posted by company
- [ ] Each shows: Title, type, location, applications count
- [ ] Shows "Post New Opportunity" button
- [ ] Shows "Edit" option for each
- [ ] Shows "Close" option for each

## Applications Section

- [ ] Shows recent applications
- [ ] Each shows: Student name, role applied for, skill match %
- [ ] Shows application date
- [ ] Shows action buttons

## Actions

- [ ] Can view application details
- [ ] Can update application status
- [ ] Can shortlist candidate
- [ ] Can reject candidate

---

# Career Roles Tests

## Browse Roles

- [ ] Navigate to Career Roles (if available)
- [ ] Shows all 5+ roles
- [ ] Each role displays:
  - Title
  - Description
  - Required skills
  - Salary range
  - Career progression

## Role Selection

- [ ] Can select target role
- [ ] Selection persists
- [ ] Can view skill gap for selected role
- [ ] Can change selected role

## Skill Requirements

- [ ] Shows required skills per role
- [ ] Shows importance levels
- [ ] Shows alternatives
- [ ] Shows nice-to-have skills

---

# Error Handling Tests

## Network Errors

- [ ] Stop backend server
- [ ] Try to load a page requiring API
- [ ] Shows error message (not crash)
- [ ] Shows "Try again" option
- [ ] Restart backend
- [ ] Page works again

## Validation Errors

- [ ] Submit form without required fields
- [ ] Shows field-specific errors
- [ ] Highlights invalid fields
- [ ] Doesn't submit invalid data

## Authentication Errors

- [ ] Access protected page without login
- [ ] Redirected to login
- [ ] Try API call with expired token
- [ ] Shows re-login prompt
- [ ] Can re-login and continue

---

# Data Persistence Tests

## Profile Data

- [ ] Add profile information
- [ ] Refresh page
- [ ] Data still there
- [ ] Close browser
- [ ] Re-login
- [ ] Data persists

## Assessment Results

- [ ] Take assessment
- [ ] View results
- [ ] Refresh page
- [ ] Results still available
- [ ] Results saved in database

## Applications

- [ ] Apply for opportunity
- [ ] Refresh page
- [ ] Application still in list
- [ ] Can track status

## Skills

- [ ] Add skill
- [ ] Logout and login
- [ ] Skill still in profile
- [ ] Assessment skills persistent

---

# Performance Tests

## Page Load Time

- [ ] Home page loads < 2 seconds
- [ ] Dashboard loads < 2 seconds
- [ ] Assessment page loads < 1 second
- [ ] Opportunity list loads < 2 seconds

## API Response Time

- [ ] Get opportunities API < 500ms
- [ ] Submit assessment < 1 second
- [ ] Update profile < 500ms
- [ ] Login < 1 second

## Database Performance

- [ ] Seed script completes < 5 seconds
- [ ] Query 100 opportunities < 500ms
- [ ] Get student profile < 200ms

---

# Browser Compatibility Tests

Test in each browser:

## Chrome
- [ ] All pages load
- [ ] Forms work
- [ ] Navigation works
- [ ] API calls work

## Firefox
- [ ] All pages load
- [ ] Forms work
- [ ] Navigation works
- [ ] API calls work

## Safari
- [ ] All pages load
- [ ] Forms work
- [ ] Navigation works
- [ ] API calls work

## Edge
- [ ] All pages load
- [ ] Forms work
- [ ] Navigation works
- [ ] API calls work

---

# Responsive Design Tests

## Mobile (< 600px)

- [ ] Navigation works on mobile
- [ ] Forms readable on mobile
- [ ] Buttons clickable
- [ ] Text readable
- [ ] No horizontal scrolling

## Tablet (600-1000px)

- [ ] Layout adapts
- [ ] Forms work
- [ ] Navigation works

## Desktop (> 1000px)

- [ ] Full layout visible
- [ ] No overflow
- [ ] Sidebar works if applicable

---

# Accessibility Tests

- [ ] Can navigate with keyboard only
- [ ] Tab order logical
- [ ] Buttons have labels
- [ ] Images have alt text
- [ ] Color contrast adequate
- [ ] Form labels associated with inputs

---

# Complete Workflow Tests

## Student Complete Workflow

1. [ ] Register as student
2. [ ] Complete profile (education, projects, skills)
3. [ ] Take 1-2 assessments
4. [ ] View skill profile
5. [ ] Select target career role
6. [ ] View skill gap analysis
7. [ ] Browse opportunities
8. [ ] Apply for 2-3 opportunities
9. [ ] Check applications page
10. [ ] Track application status

**Expected Result:** All steps complete without errors

## Industry Complete Workflow

1. [ ] Register as industry user
2. [ ] Complete company profile
3. [ ] Post internship opportunity
4. [ ] Post job opportunity
5. [ ] View opportunities posted
6. [ ] Check for applications (if students applied)
7. [ ] View student details
8. [ ] Update application status
9. [ ] Close opportunity

**Expected Result:** All steps complete without errors

---

# Final Verification Checklist

- [ ] Backend runs without errors
- [ ] Frontend loads without errors
- [ ] All pages accessible
- [ ] All CRUD operations work
- [ ] Authentication works
- [ ] Skill gap analysis shows correct data
- [ ] Opportunities browsing works
- [ ] Applications tracking works
- [ ] Error messages user-friendly
- [ ] Data persists across sessions
- [ ] No sensitive data in frontend code
- [ ] No hard-coded passwords
- [ ] Documentation complete
- [ ] README reviewed
- [ ] SETUP_GUIDE followed successfully

---

# Test Results Summary

```
Total Tests: _____ / _____
Passed: _____
Failed: _____
Blocked: _____
Known Issues:
- ___
- ___
```

---

**Date Tested:** ___________  
**Tested By:** ___________  
**Status:** ☐ READY FOR DEPLOYMENT | ☐ NEEDS FIXES

---

**Save this checklist after testing and track issues found!**

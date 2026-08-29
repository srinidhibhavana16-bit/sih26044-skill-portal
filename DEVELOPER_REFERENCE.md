# ISOTOPES Developer Quick Reference
## SIH26044 — For Developers & Contributors

Quick reference guide for common development tasks.

---

# 🚀 Project Startup (Copy-Paste)

## Terminal 1: MongoDB
```bash
mongod
```

## Terminal 2: Backend
```bash
cd backend
npm install
npm run seed
npm start
```

## Terminal 3: Frontend
```bash
cd frontend
python -m http.server 8000
# Open: http://localhost:8000
```

**API will be at:** http://localhost:5000/api

---

# 📁 Quick File Navigation

| Task | File | Line |
|------|------|------|
| Add API endpoint | `backend/routes/*.js` | N/A |
| Change database model | `backend/models/*.js` | N/A |
| Add frontend page | `frontend/newpage.html` | N/A |
| Add API function | `frontend/js/app.js` | See sections below |
| Add seed data | `backend/seed.js` | 1 |
| Configure env | `backend/.env` | 1 |
| Fix styling | `frontend/css/style.css` | 1 |

---

# 🔧 Common Tasks

## Task: Add a New API Endpoint

### Step 1: Create Route Handler
File: `backend/routes/filename.js`

```javascript
const express = require('express');
const router = express.Router();
const Model = require('../models/ModelName');
const auth = require('../middleware/auth');

// GET all
router.get('/', async (req, res) => {
  try {
    const data = await Model.find();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create
router.post('/', auth, async (req, res) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
```

### Step 2: Mount in Backend
File: `backend/server.js`

```javascript
const newRoute = require('./routes/newroute');
app.use('/api/newroute', newRoute);
```

### Step 3: Create Frontend Function
File: `frontend/js/app.js`

```javascript
async function fetchData() {
  try {
    const response = await fetch(`${API_BASE_URL}/newroute`, {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Failed to fetch');
    const result = await response.json();
    return result.data;
  } catch (error) {
    showError('Error fetching data: ' + error.message);
    return null;
  }
}
```

### Step 4: Use in Frontend
```javascript
// In HTML page script section
async function loadData() {
  const data = await fetchData();
  console.log(data);
  // Display data
}

// Call on page load
window.addEventListener('load', loadData);
```

---

## Task: Add a New Database Model

File: `backend/models/NewModel.js`

```javascript
const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Please provide a valid email']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('NewModel', newSchema);
```

Then import in routes:
```javascript
const Model = require('../models/NewModel');
```

---

## Task: Add a New Frontend Page

### Step 1: Create HTML File
File: `frontend/mynewpage.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My New Page - ISOTOPES</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.html">ISOTOPES</a>
    </div>
  </nav>

  <div class="container mt-5">
    <h1>My New Page</h1>
    <!-- Content here -->
  </div>

  <script src="js/app.js"></script>
  <script>
    // Page-specific JavaScript
    window.addEventListener('load', async () => {
      console.log('Page loaded');
      // Initialize page
    });
  </script>
</body>
</html>
```

### Step 2: Add to Navigation
Edit other HTML pages and add link:
```html
<a href="mynewpage.html" class="nav-link">My Page</a>
```

---

## Task: Add New Seed Data

File: `backend/seed.js`

```javascript
// Add to seedDatabase() function

const newData = [
  {
    field1: 'value1',
    field2: 'value2'
  }
];

await NewModel.insertMany(newData);
console.log('✅ New data seeded');
```

Then run:
```bash
npm run seed
```

---

## Task: Fix Authentication Issue

### If user can't login:
1. Check `.env` has `JWT_SECRET`
2. Check MongoDB is running
3. Check password hashing in `backend/models/User.js`
4. Check token storage in browser DevTools → Application → LocalStorage

### If protected route denies access:
1. Check auth middleware in `backend/middleware/auth.js`
2. Check Authorization header is sent: `Authorization: Bearer <token>`
3. Check token hasn't expired (7 days)
4. Verify user role matches route requirements

---

## Task: Add Authentication to Route

```javascript
router.get('/protected', auth, async (req, res) => {
  // req.user is set by auth middleware
  console.log('User:', req.user);
  
  // Check role
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Student only' });
  }
  
  // Your route logic
  res.json({ success: true });
});
```

---

# 📊 Data Structure Quick Reference

## Student Object
```javascript
{
  _id: ObjectId,
  user: ObjectId (reference to User),
  education: [{
    degree, school, field, startDate, endDate, cgpa
  }],
  experience: [{
    company, position, description, startDate, endDate
  }],
  projects: [{
    title, description, skillsUsed, link
  }],
  certifications: [{
    name, organization, date
  }],
  skills: [{
    name, level, evidence: [assessments, projects, etc.]
  }],
  targetRole: ObjectId (reference to CareerRole),
  profileCompletion: Number,
  createdAt: Date
}
```

## Opportunity Object
```javascript
{
  _id: ObjectId,
  title: String,
  type: 'internship' | 'job',
  company: ObjectId,
  description: String,
  requiredSkills: [{
    name, level, importance
  }],
  location: String,
  locationType: 'remote' | 'hybrid' | 'onsite',
  salary: { min, max },
  applicationDeadline: Date,
  isOpen: Boolean,
  createdAt: Date
}
```

## Application Object
```javascript
{
  _id: ObjectId,
  student: ObjectId,
  opportunity: ObjectId,
  status: 'applied' | 'shortlisted' | 'rejected' | 'accepted',
  skillMatch: {
    matchPercentage: Number,
    matchedSkills: [String],
    missingSkills: [String]
  },
  appliedAt: Date,
  timeline: [{ action, date, notes }]
}
```

---

# 🧪 Testing API Endpoints

## Using Postman / curl

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "Test@123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Test@123"
  }'
```

### Protected Route (with token)
```bash
curl http://localhost:5000/api/students/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

# 🐛 Debugging Tips

## Backend Errors

```bash
# 1. Check logs in terminal running npm start
# Look for: ✅ or ❌ or Error: ...

# 2. Test API with curl
curl http://localhost:5000/api/health

# 3. Check MongoDB
# Make sure mongod is running

# 4. Check .env file
# Ensure all required variables are set

# 5. Restart server
# Stop (Ctrl+C) and restart (npm start)
```

## Frontend Errors

```javascript
// Press F12 to open DevTools
// Go to Console tab

// Check authentication
console.log(localStorage.getItem('authToken'));

// Check API responses
// Go to Network tab, click request, see Response

// Check for CORS errors
// Look for "Access-Control" errors in console

// Test API from console
fetch('http://localhost:5000/api/career-roles')
  .then(r => r.json())
  .then(d => console.log(d));
```

## Database Errors

```bash
# Connect to MongoDB
mongosh

# Select database
use isotopes

# Check collections
db.getCollectionNames()

# Find user
db.users.findOne({ email: 'john@example.com' })

# Check indexes
db.users.getIndexes()

# Count documents
db.students.countDocuments()
```

---

# 📚 Code Examples

## How to Get Current User

```javascript
// Frontend
const user = getCurrentUser();
console.log(user.name, user.email, user.role);

// Or from API
const response = await fetch(`${API_BASE_URL}/auth/me`, {
  headers: getAuthHeaders()
});
const user = await response.json();
```

## How to Check User Role

```javascript
// Frontend
const user = getCurrentUser();
if (user.role === 'student') {
  // Show student features
} else if (user.role === 'industry') {
  // Show industry features
}

// Backend
router.get('/route', auth, (req, res) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  // Continue
});
```

## How to Display Error Message

```javascript
// Frontend
try {
  const data = await fetchData();
} catch (error) {
  showError('Failed to load data: ' + error.message);
  // or
  showAlert('Error loading', 'danger');
}

// Backend
res.status(400).json({
  error: 'Validation failed',
  details: error.message
});
```

---

# 🔍 Finding Things in Code

| To Find | Look In | Search For |
|---------|---------|------------|
| All API calls | `frontend/js/app.js` | `fetch(` |
| All routes | `backend/routes/*.js` | `router.` |
| All models | `backend/models/*.js` | `mongoose.Schema` |
| Student profile logic | `frontend/student-profile.html` | `<form>` |
| Styling classes | `frontend/css/style.css` | `.` |
| Environment setup | `backend/.env` | `=` |

---

# ⚡ Performance Tips

1. **Cache API Responses**
```javascript
let cachedData = null;
async function getData() {
  if (cachedData) return cachedData;
  cachedData = await fetchData();
  return cachedData;
}
```

2. **Lazy Load Large Lists**
```javascript
// Load 20 items at a time, not all 1000
const page = 1;
const limit = 20;
const items = await fetchItems(page, limit);
```

3. **Add Loading States**
```html
<button onclick="load()" id="btn">Load</button>
<script>
async function load() {
  btn.disabled = true;
  btn.innerHTML = 'Loading...';
  await fetchData();
  btn.disabled = false;
  btn.innerHTML = 'Load';
}
</script>
```

---

# 📝 Code Style Guide

## Naming Conventions
- Functions: `camelCase` - `fetchStudentProfile()`
- Variables: `camelCase` - `studentData`
- Constants: `UPPER_CASE` - `API_BASE_URL`
- Files: `kebab-case` - `student-profile.html`
- Classes: `PascalCase` - `StudentModel`

## Comments
```javascript
// Bad comment
const x = 5; // x

// Good comment
const maxRetries = 5; // Maximum API retry attempts
```

## Error Handling
```javascript
// Always include try-catch
try {
  const data = await fetchData();
  return data;
} catch (error) {
  console.error('Error:', error);
  showError(error.message);
  return null;
}
```

---

# 🚀 Deployment Quick Steps

## Deploy Backend
```bash
# 1. Set environment variables on hosting platform
# 2. Upload code to Heroku/Railway
# 3. Run seed script
# 4. Test API endpoints
```

## Deploy Frontend
```bash
# 1. Update API_BASE_URL in js/app.js
# 2. Upload frontend folder to Netlify/Vercel
# 3. Test in production
```

---

# 📞 Quick Contacts

| Issue | Solution |
|-------|----------|
| "Cannot connect to DB" | Run `mongod` in separate terminal |
| "Port 5000 already used" | Kill process: `lsof -i :5000 \| kill -9` |
| "npm not found" | Install Node.js |
| "Module not found" | Run `npm install` |
| "Token expired" | Login again |
| "CORS error" | Check backend CORS config |

---

# ✅ Before Committing Code

- [ ] Code has no `console.log()` statements (or wrapped in dev check)
- [ ] No hardcoded passwords or secrets
- [ ] Error messages are user-friendly
- [ ] Code follows naming conventions
- [ ] Tested on at least one browser
- [ ] API calls have error handling
- [ ] No unused variables
- [ ] Functions are documented with comments

---

**Happy Coding! 🚀**

For more details, see:
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Complete setup
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [backend/BackEnd_README.md](backend/BackEnd_README.md) - API docs
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Testing guide

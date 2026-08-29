# ISOTOPES Frontend - Web Design

> Beautiful, responsive web interface for the ISOTOPES career growth ecosystem

## 📁 Project Structure

```
frontend/
├── index.html                  # Landing page
├── login.html                  # Login/Registration page
├── student-dashboard.html      # Student main dashboard
├── student-profile.html        # Student profile management
├── skill-assessment.html       # Skill assessment interface
├── skill-display.html          # Skill Twin visualization
├── css/
│   └── style.css              # Main stylesheet (1000+ lines)
├── js/
│   └── app.js                 # Main JavaScript functionality
└── FrontEnd_README.md
```

---

## 🎨 Pages Overview

### 1. **Landing Page** (`index.html`)
- Marketing/introduction page
- Feature highlights
- Call-to-action buttons
- Responsive design
- Navigation navbar

**Key Sections:**
- Hero section with value proposition
- Feature cards (Skill Twin, Gap Analysis, Opportunities, Intelligence)
- How it works (4-step journey)
- User types section (Students, Industry, Academicians, Institutions)
- CTA section with sign-up button

---

### 2. **Login & Registration** (`login.html`)
- Tabbed authentication interface
- Two modes: Login and Register
- Role-based registration (Student, Industry, Academician, Institution)
- Social login buttons (Google, GitHub placeholders)
- Form validation
- Responsive split layout

**Features:**
- Email/password authentication
- Role selection on registration
- Remember me checkbox
- Password confirmation
- Terms & conditions agreement

---

### 3. **Student Dashboard** (`student-dashboard.html`)
- Main user dashboard after login
- Quick action cards (Profile, Assessment, Skills, Jobs)
- Skill Twin preview
- Profile completion progress
- Recommended next steps
- Learning statistics
- Quick tips section

**Components:**
- Welcome message with progress indicator
- 4 action cards for quick navigation
- Skill bars visualization
- Next steps guide
- Profile summary sidebar
- Statistics badges

---

### 4. **Student Profile** (`student-profile.html`)
- Comprehensive profile management
- Tabbed interface for different sections
- Editable fields for all information

**Tabs:**
1. **Basic Info** - Name, email, phone, location, bio
2. **Education** - Degree, institution, dates, CGPA
3. **Experience** - Job title, company, duration, description
4. **Projects** - Project details with skills and links
5. **Certifications** - Certification name, provider, date

**Features:**
- Add/delete functionality for each section
- Form validation
- Persistent storage (ready for backend integration)

---

### 5. **Skill Assessment** (`skill-assessment.html`)
- Multiple assessment types:
  - Programming (8 questions)
  - Data Science (6 questions)
  - Communication (5 questions)
  - Aptitude (10 questions)
  
**Features:**
- Interactive questionnaire
- Progress bar tracking
- Multiple choice questions
- Previous assessment history table
- Score tracking

---

### 6. **Skill Display (Skill Twin)** (`skill-display.html`)
- Comprehensive skill visualization
- Skill breakdown with scores
- Gap analysis vs target role
- Skill distribution chart (Doughnut chart)
- Recommended actions
- Evidence-based explanations

**Components:**
- Overall score display
- Individual skill bars with explanations
- Target role selection dropdown
- Gap analysis comparison
- Chart.js doughnut chart
- Action recommendations

---

## 🎯 Design System

### Colors
- **Primary**: `#0066cc` (Blue)
- **Secondary**: `#00a8e8` (Light Blue)
- **Success**: `#28a745` (Green)
- **Warning**: `#ffc107` (Yellow)
- **Danger**: `#dc3545` (Red)
- **Light Background**: `#f8f9fa`

### Typography
- **Font**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Font Sizes**: Responsive (scales with Bootstrap)
- **Weights**: 400 (regular), 500, 600 (semibold), 700 (bold)

### Components
- Bootstrap 5.3.0 (CSS framework)
- Font Awesome 6.4.0 (Icons)
- Chart.js 4.4.0 (Data visualization)

---

## 💻 Quick Start

### For Development Team

1. **Clone/Download the project**
   ```bash
   cd frontend
   ```

2. **Open in Browser**
   - Drag `index.html` into browser, OR
   - Use a local server:
     ```bash
     python -m http.server 8000
     # or
     npx http-server
     ```

3. **Navigate the pages:**
   - `http://localhost:8000/index.html` - Landing page
   - `http://localhost:8000/login.html` - Login
   - `http://localhost:8000/student-dashboard.html` - Dashboard (after login)

---

## 🔧 Customization Guide

### Changing Colors
Edit `css/style.css` - Update CSS variables in `:root`:
```css
:root {
    --primary-color: #0066cc;      /* Change here */
    --secondary-color: #00a8e8;
    /* ... */
}
```

### Adding New Pages
1. Create new HTML file in `frontend/` folder
2. Copy navbar from existing page
3. Add content sections
4. Import `css/style.css` and `js/app.js`

### Modifying Forms
- Edit form fields in respective HTML files
- Update validation in `js/app.js`
- Example: `validateLoginForm()`, `validateRegisterForm()`

### Updating Content
- Landing page: Edit `index.html` feature cards
- Dashboard: Edit `student-dashboard.html` quick actions
- Profile: Add/remove tabs in `student-profile.html`

---

## 📱 Responsive Design

The design is fully responsive:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px-1199px (adjusted spacing)
- **Mobile**: <768px (single column, simplified)

Breakpoints:
```css
- Extra Large: 1200px+
- Large: 992px - 1199px
- Medium: 768px - 991px
- Small: 576px - 767px
- Extra Small: < 576px
```

---

## 🔐 Security Notes

### For Developers
- Current auth is mock (localStorage based)
- **Never commit real credentials**
- Replace mock API calls with actual backend endpoints
- Implement proper JWT token handling
- Add HTTPS in production

### File Structure After Backend Integration
```
frontend/
├── js/
│   ├── app.js
│   ├── auth.js          # Add authentication logic
│   ├── api.js           # Add API client
│   └── utils.js         # Add utility functions
└── ... (other files)
```

---

## 🚀 JavaScript Functions

### Authentication
- `isUserLoggedIn()` - Check if user logged in
- `getCurrentUser()` - Get current user data
- `logoutUser()` - Logout and redirect
- `loginUser(email, password)` - Simulate login
- `registerUser(name, email, password, role)` - Simulate registration

### Validation
- `validateLoginForm(email, password)` - Validate login
- `validateRegisterForm(...)` - Validate registration
- `isValidEmail(email)` - Email validation
- `isStrongPassword(password)` - Password strength check

### Data
- `fetchStudentProfile()` - Get profile data
- `updateStudentProfile(data)` - Update profile
- `fetchUserSkills()` - Get skills
- `submitAssessment(type, answers)` - Submit assessment

### Utilities
- `showAlert(message, type)` - Show notification
- `saveToStorage(key, value)` - Save to localStorage
- `getFromStorage(key)` - Read from localStorage
- `formatDate(date)` - Format date display

---

## 📊 Chart Integration

Skill display page uses Chart.js for visualization:
```javascript
// Example: Creating a chart
const ctx = document.getElementById('skillChart').getContext('2d');
const skillChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Strong', 'Moderate', 'Developing'],
        datasets: [{
            data: [60, 30, 10],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545']
        }]
    },
    options: { /* config */ }
});
```

---

## 🔗 Links & Navigation

**Navigation Flow:**
```
Landing (index.html)
  ↓
Login (login.html)
  ↓
Dashboard (student-dashboard.html)
  ├→ Profile (student-profile.html)
  ├→ Assessment (skill-assessment.html)
  ├→ Skills (skill-display.html)
  └→ Opportunities (placeholder)
```

---

## ✅ Testing Checklist

- [ ] All pages load without errors
- [ ] Forms validate inputs
- [ ] Navigation links work
- [ ] Responsive on mobile/tablet
- [ ] Charts render correctly
- [ ] Local storage works
- [ ] Logout clears data
- [ ] Alert messages display
- [ ] All icons render (Font Awesome)

---

## 📝 Notes for Team

1. **Backend Integration**
   - Replace mock API calls in `js/app.js`
   - Update endpoints in `loginUser()`, `registerUser()`, etc.
   - Implement JWT token handling

2. **Database Fields to Collect**
   - User: name, email, password_hash, role, created_at
   - Profile: bio, phone, location, education, experience
   - Skills: skill_id, user_id, score, category
   - Assessment: assessment_id, user_id, questions, answers, score

3. **Next Steps**
   - Connect to backend API
   - Set up user authentication
   - Implement database
   - Add more role-specific pages (Industry, Academician, Institution)

---

## 🎓 Documentation

For more details, see:
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [Font Awesome Icons](https://fontawesome.com/icons)
- [Chart.js Documentation](https://www.chartjs.org/docs/latest/)

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Ready for Backend Integration
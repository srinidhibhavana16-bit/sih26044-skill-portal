/**
 * ISOTOPES - Main JavaScript File
 * Handles authentication, navigation, and common functionality
 */

// ============================================
// Authentication Functions
// ============================================

/**
 * Check if user is logged in
 */
function isUserLoggedIn() {
    return localStorage.getItem('userEmail') !== null;
}

/**
 * Get current user info
 */
function getCurrentUser() {
    return {
        email: localStorage.getItem('userEmail'),
        role: localStorage.getItem('userRole'),
        name: localStorage.getItem('userName') || 'User'
    };
}

/**
 * Logout user
 */
function logoutUser() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// ============================================
// Form Validation Functions
// ============================================

/**
 * Validate email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 */
function isStrongPassword(password) {
    return password.length >= 8 && 
           /[A-Z]/.test(password) && 
           /[a-z]/.test(password) && 
           /[0-9]/.test(password);
}

/**
 * Validate form inputs
 */
function validateLoginForm(email, password) {
    if (!email || !password) {
        showAlert('Please fill in all fields', 'warning');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'warning');
        return false;
    }
    
    return true;
}

/**
 * Validate registration form
 */
function validateRegisterForm(name, email, password, confirmPassword, role) {
    if (!name || !email || !password || !confirmPassword || !role) {
        showAlert('Please fill in all fields', 'warning');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'warning');
        return false;
    }
    
    if (!isStrongPassword(password)) {
        showAlert('Password must be at least 8 characters with uppercase, lowercase, and numbers', 'warning');
        return false;
    }
    
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'warning');
        return false;
    }
    
    return true;
}

// ============================================
// Alert/Toast Functions
// ============================================

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.appendChild(alertDiv);
    }
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

/**
 * Show success notification
 */
function showSuccess(message) {
    showAlert(message, 'success');
}

/**
 * Show error notification
 */
function showError(message) {
    showAlert(message, 'danger');
}

/**
 * Show warning notification
 */
function showWarning(message) {
    showAlert(message, 'warning');
}

// ============================================
// API Functions (Mock for now)
// ============================================

/**
 * Mock API call for login
 */
async function loginUser(email, password) {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store user data (in real app, this comes from backend)
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('userName', email.split('@')[0]);
        
        return { success: true, message: 'Login successful' };
    } catch (error) {
        return { success: false, message: 'Login failed' };
    }
}

/**
 * Mock API call for registration
 */
async function registerUser(name, email, password, role) {
    try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Store user data
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', name);
        
        return { success: true, message: 'Registration successful' };
    } catch (error) {
        return { success: false, message: 'Registration failed' };
    }
}

/**
 * Fetch student profile
 */
async function fetchStudentProfile() {
    try {
        // Mock data - replace with actual API call
        return {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+91 1234567890',
            location: 'Bangalore, India',
            bio: 'Passionate about full-stack development',
            skills: ['Python', 'JavaScript', 'React', 'Django']
        };
    } catch (error) {
        console.error('Error fetching profile:', error);
        return null;
    }
}

/**
 * Update student profile
 */
async function updateStudentProfile(profileData) {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
        return { success: false, message: 'Profile update failed' };
    }
}

// ============================================
// Skill Functions
// ============================================

/**
 * Fetch user skills
 */
async function fetchUserSkills() {
    try {
        // Mock data
        return [
            { name: 'Python', score: 78, category: 'Programming' },
            { name: 'Data Structures', score: 72, category: 'Programming' },
            { name: 'Web Development', score: 65, category: 'Web' },
            { name: 'Machine Learning', score: 55, category: 'Data Science' },
            { name: 'Communication', score: 45, category: 'Soft Skills' }
        ];
    } catch (error) {
        console.error('Error fetching skills:', error);
        return [];
    }
}

/**
 * Calculate skill level
 */
function getSkillLevel(score) {
    if (score >= 80) return 'Expert';
    if (score >= 60) return 'Intermediate';
    if (score >= 40) return 'Beginner';
    return 'Novice';
}

/**
 * Get skill badge color
 */
function getSkillColor(score) {
    if (score >= 80) return 'success';
    if (score >= 60) return 'info';
    if (score >= 40) return 'warning';
    return 'danger';
}

// ============================================
// Assessment Functions
// ============================================

/**
 * Submit assessment answers
 */
async function submitAssessment(assessmentType, answers) {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const score = Math.floor(Math.random() * 40) + 60; // Random score 60-100
        
        return {
            success: true,
            score: score,
            message: `Assessment completed with score: ${score}%`
        };
    } catch (error) {
        return { success: false, message: 'Assessment submission failed' };
    }
}

// ============================================
// DOM Ready Functions
// ============================================

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // Check if user needs to be redirected to login
    checkAuthStatus();
    
    // Initialize tooltips and popovers
    initializeBootstrapComponents();
    
    // Setup event listeners
    setupEventListeners();
});

/**
 * Check authentication status
 */
function checkAuthStatus() {
    const protectedPages = ['student-dashboard.html', 'student-profile.html', 'skill-assessment.html', 'skill-display.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (protectedPages.includes(currentPage) && !isUserLoggedIn()) {
        window.location.href = 'login.html';
    }
}

/**
 * Initialize Bootstrap components
 */
function initializeBootstrapComponents() {
    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Initialize popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Add event listeners for dynamic content
    document.addEventListener('click', function(e) {
        // Handle logout buttons
        if (e.target.closest('[data-action="logout"]')) {
            logoutUser();
        }
    });
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format date
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Truncate text
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

/**
 * Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Local Storage Functions
// ============================================

/**
 * Save data to local storage
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error('Error saving to storage:', error);
        return false;
    }
}

/**
 * Get data from local storage
 */
function getFromStorage(key) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error reading from storage:', error);
        return null;
    }
}

/**
 * Remove data from local storage
 */
function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing from storage:', error);
        return false;
    }
}

// ============================================
// Export functions for external use
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isUserLoggedIn,
        getCurrentUser,
        logoutUser,
        validateLoginForm,
        validateRegisterForm,
        showAlert,
        showSuccess,
        showError,
        loginUser,
        registerUser,
        fetchStudentProfile,
        updateStudentProfile,
        fetchUserSkills
    };
}

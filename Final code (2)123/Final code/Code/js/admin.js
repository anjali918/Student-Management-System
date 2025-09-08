// API Configuration
const API_BASE_URL = 'http://localhost:3001/api';

// API fetch helper function
async function apiFetch(endpoint, options = {}) {
    try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add authorization header if token exists
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: options.method || 'GET',
            headers: headers,
            body: options.body ? JSON.stringify(options.body) : null
        });

        if (!response.ok) {
            throw new Error(`API call failed: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.warn(`API call to ${endpoint} failed:`, error.message);
        throw error;
    }
}

// Chart.js initialization - Updated to reinitialize when sections become visible
function initializeCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js is not loaded. Please include Chart.js library.');
        return;
    }

    // We'll create charts when the dashboard section is shown
    // This function will be called from showDashboard function
}

// Function to create charts (called when dashboard is shown)
function createCharts() {
    // First, destroy any existing charts to avoid duplicates
    if (typeof Chart !== 'undefined') {
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.destroy();
        });
    }

    // Enrollment Trends Chart
    const enrollmentCtx = document.getElementById('enrollment-chart');
    if (enrollmentCtx) {
        new Chart(enrollmentCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'New Enrollments',
                    data: [65, 59, 80, 81, 56, 55, 40, 72, 89, 94, 78, 85],
                    borderColor: '#4a6bff',
                    backgroundColor: 'rgba(74, 107, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Enrollment Trends'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Course Distribution Chart
    const courseDistCtx = document.getElementById('course-distribution-chart');
    if (courseDistCtx) {
        new Chart(courseDistCtx, {
            type: 'doughnut',
            data: {
                labels: ['Web Dev', 'Data Science', 'Mobile Dev', 'AI/ML', 'Cybersecurity', 'Cloud Computing'],
                datasets: [{
                    data: [120, 98, 85, 76, 65, 54],
                    backgroundColor: [
                        '#4a6bff',
                        '#1dd1a1',
                        '#ff6b35',
                        '#feca57',
                        '#ff9ff3',
                        '#54a0ff'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Course Distribution'
                    }
                }
            }
        });
    }

    // Student Performance Chart
    const performanceCtx = document.getElementById('performance-chart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'bar',
            data: {
                labels: ['0-1.0', '1.1-2.0', '2.1-3.0', '3.1-4.0'],
                datasets: [{
                    label: 'Students',
                    data: [15, 35, 120, 85],
                    backgroundColor: [
                        '#ef4444',
                        '#f97316',
                        '#eab308',
                        '#22c55e'
                    ],
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'GPA Distribution'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // System Usage Chart
    const usageCtx = document.getElementById('usage-chart');
    if (usageCtx) {
        new Chart(usageCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Active Users',
                    data: [120, 135, 98, 145, 167, 89, 76],
                    borderColor: '#1dd1a1',
                    backgroundColor: 'rgba(29, 209, 161, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Daily Active Users'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// CRUD Operations
function initializeCRUD() {
    // User Management CRUD
    setupUserCRUD();

    // Course Management CRUD
    setupCourseCRUD();

    // Student Management CRUD
    setupStudentCRUD();

    // Settings Management
    setupSettingsCRUD();
}

function setupUserCRUD() {
    const addUserBtn = document.getElementById('addUserBtn');
    const userTable = document.getElementById('admin-user-list');

    if (addUserBtn) {
        addUserBtn.addEventListener('click', function() {
            // Reset form and open modal
            const userForm = document.getElementById('user-form');
            userForm.reset();
            delete userForm.dataset.editingId;
            document.getElementById('user-modal-title').textContent = 'Add New User';
            openModal('userModal');
        });
    }

    // Edit user functionality using event delegation on tbody
    if (userTable) {
        userTable.addEventListener('click', function(e) {
            // Handle edit button clicks
            if (e.target.classList.contains('btn-edit') || e.target.closest('.btn-edit')) {
                const button = e.target.classList.contains('btn-edit') ? e.target : e.target.closest('.btn-edit');
                const userId = button.getAttribute('data-user-id') || button.dataset.userId;
                if (userId) {
                    editUser(userId);
                } else {
                    console.error('User ID not found on edit button');
                }
            }
            // Handle delete button clicks
            else if (e.target.classList.contains('btn-delete') || e.target.closest('.btn-delete')) {
                const button = e.target.classList.contains('btn-delete') ? e.target : e.target.closest('.btn-delete');
                const userId = button.getAttribute('data-user-id') || button.dataset.userId;
                if (userId) {
                    deleteUser(userId);
                } else {
                    console.error('User ID not found on delete button');
                }
            }
            // Handle approve button clicks
            else if (e.target.classList.contains('btn-approve') || e.target.closest('.btn-approve')) {
                const button = e.target.classList.contains('btn-approve') ? e.target : e.target.closest('.btn-approve');
                const userId = button.getAttribute('data-user-id') || button.dataset.userId;
                if (userId) {
                    approveUser(userId);
                } else {
                    console.error('User ID not found on approve button');
                }
            }
        });
    }
}

// Updated refreshUserTable to fetch from backend API
async function refreshUserTable() {
    const userTableBody = document.getElementById('admin-user-list');
    if (!userTableBody) return;

    try {
        const data = await apiFetch('/users');
        const users = data.users || [];

        userTableBody.innerHTML = '';

        if (users.length === 0) {
            userTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No users found</td></tr>';
            return;
        }

        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>${user.approved ? 'Approved' : 'Pending'}</td>
                <td>${user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}</td>
                <td class="actions">
                    <button class="btn btn-sm btn-edit" data-user-id="${user._id}">Edit</button>
                    <button class="btn btn-sm btn-delete" data-user-id="${user._id}">Delete</button>
                    ${user.approved ? '' : `<button class="btn btn-sm btn-approve" data-user-id="${user._id}">Approve</button>`}
                </td>
            `;
            userTableBody.appendChild(tr);
        });
        
        // Re-attach event listeners after table is refreshed
        setupUserCRUD();
    } catch (error) {
        showNotification(`Failed to load users: ${error.message}`, 'error');
    }
}

// Updated editUser to fetch from backend API
async function editUser(userId) {
    console.log('Editing user:', userId);

    try {
        const data = await apiFetch(`/users/${userId}`);
        const user = data.user;

        if (!user) {
            showNotification('User not found.', 'error');
            return;
        }

        // Populate the modal form with user data
        document.getElementById('user-modal-title').textContent = 'Edit User';
        document.getElementById('user-name').value = user.name || '';
        document.getElementById('user-email').value = user.email || '';
        document.getElementById('user-role').value = user.role || 'student';
        document.getElementById('user-status').value = user.approved ? 'approved' : 'pending';

        // Store editing ID in the form
        document.getElementById('user-form').dataset.editingId = userId;

        // Open the modal
        openModal('userModal');
    } catch (error) {
        showNotification(`Failed to load user: ${error.message}`, 'error');
    }
}

// Updated deleteUser to use backend API
async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Deleting user:', userId);

        try {
            await apiFetch(`/users/${userId}`, {
                method: 'DELETE'
            });

            showNotification('User deleted successfully', 'success');
            refreshUserTable(); // Refresh the table
        } catch (error) {
            showNotification(`Failed to delete user: ${error.message}`, 'error');
        }
    }
}

// Updated approveUser to use backend API
async function approveUser(userId) {
    if (confirm('Are you sure you want to approve this user?')) {
        console.log('Approving user:', userId);

        try {
            await apiFetch(`/users/${userId}/approve`, {
                method: 'PATCH'
            });

            showNotification('User approved successfully', 'success');
            refreshUserTable();
        } catch (error) {
            showNotification(`Failed to approve user: ${error.message}`, 'error');
        }
    }
}

function setupCourseCRUD() {
    const addCourseBtn = document.getElementById('addCourseBtn');
    const courseTableBody = document.getElementById('admin-course-list');

    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', function() {
            // Reset form and open modal
            const courseForm = document.getElementById('course-form');
            courseForm.reset();
            delete courseForm.dataset.editingId;
            document.getElementById('course-modal-title').textContent = 'Add New Course';
            openModal('course-modal');
        });
    }

    // Setup event delegation for course table
    if (courseTableBody) {
        courseTableBody.addEventListener('click', function(e) {
            // Handle edit button clicks
            if (e.target.classList.contains('btn-edit') || e.target.closest('.btn-edit')) {
                const button = e.target.classList.contains('btn-edit') ? e.target : e.target.closest('.btn-edit');
                const courseId = button.getAttribute('data-course-id') || button.dataset.courseId;
                if (courseId) {
                    editCourse(courseId);
                } else {
                    console.error('Course ID not found on edit button');
                }
            }
            // Handle delete button clicks
            else if (e.target.classList.contains('btn-delete') || e.target.closest('.btn-delete')) {
                const button = e.target.classList.contains('btn-delete') ? e.target : e.target.closest('.btn-delete');
                const courseId = button.getAttribute('data-course-id') || button.dataset.courseId;
                if (courseId) {
                    deleteCourse(courseId);
                } else {
                    console.error('Course ID not found on delete button');
                }
            }
        });
    }
}

function setupSettingsCRUD() {
    const settingsForm = document.getElementById('settingsForm');

    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings(new FormData(this));
        });
    }
}

function setupStudentCRUD() {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentTableBody = document.getElementById('admin-student-list');

    if (addStudentBtn) {
        addStudentBtn.addEventListener('click', function() {
            // Reset form and open modal
            const studentForm = document.getElementById('student-form');
            studentForm.reset();
            delete studentForm.dataset.editingId;
            document.getElementById('student-modal-title').textContent = 'Add New Student';
            openModal('student-modal');
        });
    }

    // Setup event delegation for student table
    if (studentTableBody) {
        studentTableBody.addEventListener('click', function(e) {
            // Handle edit button clicks
            if (e.target.classList.contains('btn-edit') || e.target.closest('.btn-edit')) {
                const button = e.target.classList.contains('btn-edit') ? e.target : e.target.closest('.btn-edit');
                const studentId = button.getAttribute('data-student-id') || button.dataset.studentId;
                if (studentId) {
                    editStudent(studentId);
                } else {
                    console.error('Student ID not found on edit button');
                }
            }
            // Handle delete button clicks
            else if (e.target.classList.contains('btn-delete') || e.target.closest('.btn-delete')) {
                const button = e.target.classList.contains('btn-delete') ? e.target : e.target.closest('.btn-delete');
                const studentId = button.getAttribute('data-student-id') || button.dataset.studentId;
                if (studentId) {
                    deleteStudent(studentId);
                } else {
                    console.error('Student ID not found on delete button');
                }
            }
        });
    }
}

// Modal Management
function initializeModals() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModal(this.closest('.modal').id);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this.id);
            }
        });
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

// Search Functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('.search-bar input');

    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.admin-management-section').querySelector('tbody');

            if (table) {
                const rows = table.querySelectorAll('tr');
                rows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            }
        });
    });
}

// CRUD Functions

// Updated editCourse to fetch from backend API
async function editCourse(courseId) {
    console.log('Editing course:', courseId);

    try {
        const data = await apiFetch(`/courses/${courseId}`);
        const course = data.course;

        if (!course) {
            showNotification('Course not found.', 'error');
            return;
        }

        // Populate the modal form with course data
        document.getElementById('course-modal-title').textContent = 'Edit Course';
        document.getElementById('course-name').value = course.name || '';
        document.getElementById('course-code').value = course.code || '';
        document.getElementById('course-description').value = course.description || '';
        document.getElementById('course-instructor').value = course.instructor || '';
        document.getElementById('course-credits').value = course.credits || '';
        document.getElementById('course-duration').value = course.duration || '';
        document.getElementById('course-status').value = course.status || 'active';

        // Store editing ID in the form
        document.getElementById('course-form').dataset.editingId = courseId;

        // Open the modal
        openModal('course-modal');
    } catch (error) {
        showNotification(`Failed to load course: ${error.message}`, 'error');
    }
}

// Updated deleteCourse to use backend API
async function deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete this course?')) {
        console.log('Deleting course:', courseId);

        try {
            await apiFetch(`/courses/${courseId}`, {
                method: 'DELETE'
            });

            showNotification('Course deleted successfully', 'success');
            loadCourses(); // Refresh the table
        } catch (error) {
            showNotification(`Failed to delete course: ${error.message}`, 'error');
        }
    }
}

function saveSettings(formData) {
    // Save settings to localStorage
    const settings = Object.fromEntries(formData);
    localStorage.setItem('systemSettings', JSON.stringify(settings));
    console.log('Saving settings:', settings);
    showNotification('Settings saved successfully', 'success');
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);

    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}

// Export functionality
function exportData(type) {
    console.log('Exporting', type, 'data');
    showNotification(`${type} data exported successfully`, 'success');
}

// Quick actions
function quickAction(action) {
    console.log('Performing quick action:', action);
    showNotification(`${action} completed successfully`, 'success');
}

// Utility functions
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
}

// Show Dashboard function
function showDashboard() {
    // Hide all management sections
    hideAllManagementSections();

    // Show dashboard section
    const dashboardSection = document.getElementById('admin-dashboard');
    if (dashboardSection) {
        dashboardSection.style.display = 'block';
    }

    // Create charts when dashboard is shown
    createCharts();
}

function showUserManagement() {
    // Hide all management sections
    hideAllManagementSections();

    // Show manage users section
    const manageUsersSection = document.getElementById('admin-user-management');
    if (manageUsersSection) {
        manageUsersSection.style.display = 'block';
    }

    // Refresh user table
    refreshUserTable();
}

function showCourseManagement() {
    // Hide all management sections
    hideAllManagementSections();

    // Show course management section
    const courseManagementSection = document.getElementById('admin-course-management');
    if (courseManagementSection) {
        courseManagementSection.style.display = 'block';
    }

    // Load courses data every time the section is shown
    loadCourses();
}

function showStudentManagement() {
    // Hide all management sections
    hideAllManagementSections();

    // Show student management section
    const studentManagementSection = document.getElementById('admin-student-management');
    if (studentManagementSection) {
        studentManagementSection.style.display = 'block';
    }

    // Load students data every time the section is shown
    loadStudents();
}

function showSystemSettings() {
    // Hide all management sections
    hideAllManagementSections();

    // Show system settings section
    const systemSettingsSection = document.getElementById('admin-system-settings');
    if (systemSettingsSection) {
        systemSettingsSection.style.display = 'block';
    }

    // Load current settings
    loadSystemSettings();
}

// Utility function to hide all management sections
function hideAllManagementSections() {
    const sections = document.querySelectorAll('.admin-management-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

// Updated loadCourses to fetch from backend API with JWT auth and database integration
async function loadCourses() {
    const courseTableBody = document.getElementById('admin-course-list');
    if (!courseTableBody) return;

    try {
        // Fetch courses from backend API
        const data = await apiFetch('/courses');
        const courses = data.courses || [];

        courseTableBody.innerHTML = '';

        if (courses.length === 0) {
            courseTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No courses found</td></tr>';
            return;
        }

        // Populate table with courses from database
        courses.forEach(course => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${course.name}</td>
                <td>${course.code}</td>
                <td>${course.instructor || 'Not assigned'}</td>
                <td>${course.credits || 3}</td>
                <td>${course.status || 'Active'}</td>
                <td class="actions">
                    <button class="btn btn-sm btn-edit" data-course-id="${course._id}">Edit</button>
                    <button class="btn btn-sm btn-delete" data-course-id="${course._id}">Delete</button>
                </td>
            `;
            courseTableBody.appendChild(tr);
        });
        
        // Re-attach event listeners after table is refreshed
        setupCourseCRUD();
    } catch (error) {
        showNotification(`Failed to load courses: ${error.message}`, 'error');
    }
}

async function loadStudents() {
    const studentTableBody = document.getElementById('admin-student-list');
    if (!studentTableBody) return;

    try {
        // Fetch students from backend API
        const data = await apiFetch('/students');
        const students = data.students || [];

        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">No students found</td></tr>';
            return;
        }

        // Populate table with students from database
        students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.program || 'Not specified'}</td>
                <td>${student.year || 'Not specified'}</td>
                <td>${student.status || 'Active'}</td>
                <td class="actions">
                    <button class="btn btn-sm btn-edit" data-student-id="${student._id}">Edit</button>
                    <button class="btn btn-sm btn-delete" data-student-id="${student._id}">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(tr);
        });
        
        // Re-attach event listeners after table is refreshed
        setupStudentCRUD();
    } catch (error) {
        showNotification(`Failed to load students: ${error.message}`, 'error');
    }
}

// Updated editStudent to fetch from backend API
async function editStudent(studentId) {
    console.log('Editing student:', studentId);

    try {
        const data = await apiFetch(`/students/${studentId}`);
        const student = data.student;

        if (!student) {
            showNotification('Student not found.', 'error');
            return;
        }

        // Populate the modal form with student data
        document.getElementById('student-modal-title').textContent = 'Edit Student';
        document.getElementById('student-name').value = student.name || '';
        document.getElementById('student-email').value = student.email || '';
        document.getElementById('student-program').value = student.program || '';
        document.getElementById('student-year').value = student.year || '';
        document.getElementById('student-previous-education').value = student.previousEducation || '';
        document.getElementById('student-status').value = student.status || 'active';

        // Store editing ID in the form
        document.getElementById('student-form').dataset.editingId = studentId;

        // Open the modal
        openModal('student-modal');
    } catch (error) {
        showNotification(`Failed to load student: ${error.message}`, 'error');
    }
}

// Updated deleteStudent to use backend API
async function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        console.log('Deleting student:', studentId);

        try {
            await apiFetch(`/students/${studentId}`, {
                method: 'DELETE'
            });

            showNotification('Student deleted successfully', 'success');
            loadStudents(); // Refresh the table
        } catch (error) {
            showNotification(`Failed to delete student: ${error.message}`, 'error');
        }
    }
}

function loadSystemSettings() {
    const settings = JSON.parse(localStorage.getItem('systemSettings') || '{}');
    document.getElementById('system-name').value = settings.systemName || 'LMS Admin';
    document.getElementById('admin-email').value = settings.adminEmail || 'admin@lms.edu.np';
    document.getElementById('session-timeout').value = settings.sessionTimeout || 60;
    document.getElementById('max-login-attempts').value = settings.maxLoginAttempts || 5;
    document.getElementById('enable-notifications').checked = settings.enableNotifications !== false;
    document.getElementById('maintenance-mode').checked = settings.maintenanceMode || false;
}

// Function to save user (create or update)
async function saveUser() {
    const form = document.getElementById('user-form');
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    const userData = {
        name: document.getElementById('user-name').value,
        email: document.getElementById('user-email').value,
        role: document.getElementById('user-role').value,
        approved: document.getElementById('user-status').value === 'approved'
    };

    try {
        // Check if we're editing an existing user
        const editingId = form.dataset.editingId;
        
        if (editingId) {
            // Update existing user
            await apiFetch(`/users/${editingId}`, {
                method: 'PUT',
                body: userData
            });
            showNotification('User updated successfully', 'success');
        } else {
            // Create new user
            await apiFetch('/users', {
                method: 'POST',
                body: userData
            });
            showNotification('User created successfully', 'success');
        }

        // Close modal and refresh table
        closeModal('userModal');
        refreshUserTable();
        
        // Clear editing ID
        delete form.dataset.editingId;
    } catch (error) {
        showNotification(`Failed to save user: ${error.message}`, 'error');
    }
}

// Function to save course (create or update)
async function saveCourse() {
    const form = document.getElementById('course-form');
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    const courseData = {
        name: document.getElementById('course-name').value,
        code: document.getElementById('course-code').value,
        description: document.getElementById('course-description').value,
        instructor: document.getElementById('course-instructor').value,
        credits: parseInt(document.getElementById('course-credits').value),
        duration: document.getElementById('course-duration').value,
        status: document.getElementById('course-status').value
    };

    try {
        // Check if we're editing an existing course
        const editingId = form.dataset.editingId;
        
        if (editingId) {
            // Update existing course
            await apiFetch(`/courses/${editingId}`, {
                method: 'PUT',
                body: courseData
            });
            showNotification('Course updated successfully', 'success');
        } else {
            // Create new course
            await apiFetch('/courses', {
                method: 'POST',
                body: courseData
            });
            showNotification('Course created successfully', 'success');
        }

        // Close modal and refresh table
        closeModal('course-modal');
        loadCourses();
        
        // Clear editing ID
        delete form.dataset.editingId;
    } catch (error) {
        showNotification(`Failed to save course: ${error.message}`, 'error');
    }
}

// Function to save student (create or update)
async function saveStudent() {
    const form = document.getElementById('student-form');
    if (!validateForm(form)) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }

    const studentData = {
        name: document.getElementById('student-name').value,
        email: document.getElementById('student-email').value,
        program: document.getElementById('student-program').value,
        year: document.getElementById('student-year').value,
        previousEducation: document.getElementById('student-previous-education').value,
        status: document.getElementById('student-status').value
    };

    try {
        // Check if we're editing an existing student
        const editingId = form.dataset.editingId;
        
        if (editingId) {
            // Update existing student
            await apiFetch(`/students/${editingId}`, {
                method: 'PUT',
                body: studentData
            });
            showNotification('Student updated successfully', 'success');
        } else {
            // Create new student
            await apiFetch('/students', {
                method: 'POST',
                body: studentData
            });
            showNotification('Student created successfully', 'success');
        }

        // Close modal and refresh table
        closeModal('student-modal');
        loadStudents();
        
        // Clear editing ID
        delete form.dataset.editingId;
    } catch (error) {
        showNotification(`Failed to save student: ${error.message}`, 'error');
    }
}

// Initialize the admin dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeModals();
    initializeSearch();
    initializeCRUD();

    // Set up event listeners for navigation
    const navLinks = document.querySelectorAll('.admin-nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            switch(target) {
                case 'dashboard':
                    showDashboard();
                    break;
                case 'user-management':
                    showUserManagement();
                    break;
                case 'course-management':
                    showCourseManagement();
                    break;
                case 'student-management':
                    showStudentManagement();
                    break;
                case 'system-settings':
                    showSystemSettings();
                    break;
            }
        });
    });

    // Set up form submission handlers
    const userForm = document.getElementById('user-form');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveUser();
        });
    }

    const courseForm = document.getElementById('course-form');
    if (courseForm) {
        courseForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveCourse();
        });
    }

    const studentForm = document.getElementById('student-form');
    if (studentForm) {
        studentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveStudent();
        });
    }

    // Set up quick action buttons
    const quickActionButtons = document.querySelectorAll('.quick-action-btn');
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            quickAction(action);
        });
    });

    // Set up export buttons
    const exportButtons = document.querySelectorAll('.export-btn');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            exportData(type);
        });
    });

    // Show dashboard by default
    showDashboard();
});
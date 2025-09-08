document.addEventListener('DOMContentLoaded', () => {
  // API Base URL
  const API_BASE = 'http://localhost:3001/api';

  // Initialize EduManageAPI object for data fetching
  window.EduManageAPI = {
    // Get JWT token from localStorage
    getToken: function() {
      return localStorage.getItem('token');
    },

    apiCall: async function(endpoint, options = {}) {
      try {
        const token = this.getToken();
        const headers = {
          'Content-Type': 'application/json',
          ...options.headers
        };

        // Add authorization header if token exists
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${API_BASE}${endpoint}`, {
          method: options.method || 'GET',
          headers: headers,
          body: options.body ? JSON.stringify(options.body) : undefined
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`API call failed: ${response.status} - ${response.statusText}. ${errorData.error || ''}`);
        }

        return await response.json();
      } catch (error) {
        console.error(`API call to ${endpoint} failed:`, error.message);
        throw error; // Re-throw to let caller handle the error
      }
    },

    // Specific API methods
    getStudents: async function() {
      return await this.apiCall('/students');
    },

    getCourses: async function() {
      return await this.apiCall('/courses');
    },

    createStudent: async function(studentData) {
      return await this.apiCall('/students', {
        method: 'POST',
        body: studentData
      });
    },

    createCourse: async function(courseData) {
      return await this.apiCall('/courses', {
        method: 'POST',
        body: courseData
      });
    },

    updateStudent: async function(id, studentData) {
      return await this.apiCall(`/students/${id}`, {
        method: 'PUT',
        body: studentData
      });
    },

    updateCourse: async function(id, courseData) {
      return await this.apiCall(`/courses/${id}`, {
        method: 'PUT',
        body: courseData
      });
    },

    deleteStudent: async function(id) {
      return await this.apiCall(`/students/${id}`, {
        method: 'DELETE'
      });
    },

    deleteCourse: async function(id) {
      return await this.apiCall(`/courses/${id}`, {
        method: 'DELETE'
      });
    }
  };

  // Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navToggle.classList.toggle('active');
    });
  }

  // Enhanced Authentication System
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const navActions = document.getElementById('nav-actions');
  const logoutActions = document.getElementById('logout-actions');

  // Initialize user data storage only if not present
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }

  // Fixed sample data - always use these current values
  const sampleCourses = [
    { id: 1, name: 'Introduction to Computer Science', code: 'CSC101', description: 'Fundamental concepts of computer science and programming', instructor: 'Dr. Prakash Rai', credits: 3, duration: 16, status: 'active' },
    { id: 2, name: 'Data Structures and Algorithms', code: 'CSC201', description: 'Advanced data structures and algorithm design', instructor: 'Prof. Sunita Lama', credits: 4, duration: 16, status: 'active' },
    { id: 3, name: 'Database Management Systems', code: 'CSC301', description: 'Relational databases and SQL programming', instructor: 'Dr. Rajesh Shrestha', credits: 3, duration: 16, status: 'active' },
    { id: 4, name: 'Software Engineering', code: 'CSC401', description: 'Software development lifecycle and methodologies', instructor: 'Prof. Anil Thapa', credits: 3, duration: 16, status: 'active' },
    { id: 5, name: 'Web Technologies', code: 'CSC501', description: 'HTML, CSS, JavaScript and modern web frameworks', instructor: 'Dr. Maya Gurung', credits: 3, duration: 16, status: 'active' },
    { id: 6, name: 'Artificial Intelligence', code: 'CSC601', description: 'Machine learning and AI fundamentals', instructor: 'Dr. Bikash Joshi', credits: 4, duration: 16, status: 'active' },
    { id: 7, name: 'Cybersecurity Fundamentals', code: 'CSC701', description: 'Network security and ethical hacking basics', instructor: 'Prof. Sarita Pandey', credits: 3, duration: 16, status: 'active' }
  ];

  const sampleStudents = [
    { id: 1, name: 'Ram Shrestha', email: 'ram.shrestha@tu.edu.np', phone: '+977-9800000001', course: 'CSC101', gpa: 3.8, status: 'active' },
    { id: 2, name: 'Sita Koirala', email: 'sita.koirala@tu.edu.np', phone: '+977-9800000002', course: 'CSC201', gpa: 3.5, status: 'active' },
    { id: 3, name: 'Hari Thapa', email: 'hari.thapa@tu.edu.np', phone: '+977-9800000003', course: 'CSC301', gpa: 3.2, status: 'active' },
    { id: 4, name: 'Anita Gurung', email: 'anita.gurung@tu.edu.np', phone: '+977-9800000004', course: 'CSC401', gpa: 3.9, status: 'graduated' },
    { id: 5, name: 'Binod Karki', email: 'binod.karki@tu.edu.np', phone: '+977-9800000005', course: 'CSC501', gpa: 2.8, status: 'inactive' },
    { id: 6, name: 'Puja Sharma', email: 'puja.sharma@tu.edu.np', phone: '+977-9800000006', course: 'CSC101', gpa: 3.6, status: 'active' },
    { id: 7, name: 'Ravi Adhikari', email: 'ravi.adhikari@tu.edu.np', phone: '+977-9800000007', course: 'CSC201', gpa: 3.4, status: 'active' },
    { id: 8, name: 'Kiran Bhattarai', email: 'kiran.bhattarai@tu.edu.np', phone: '+977-9800000008', course: 'CSC601', gpa: 3.7, status: 'active' },
    { id: 9, name: 'Nisha Pokharel', email: 'nisha.pokharel@tu.edu.np', phone: '+977-9800000009', course: 'CSC701', gpa: 3.9, status: 'active' },
    { id: 10, name: 'Sanjay Maharjan', email: 'sanjay.maharjan@tu.edu.np', phone: '+977-9800000010', course: 'CSC301', gpa: 3.1, status: 'active' },
    { id: 11, name: 'Priya Basnet', email: 'priya.basnet@tu.edu.np', phone: '+977-9800000011', course: 'CSC401', gpa: 3.8, status: 'active' },
    { id: 12, name: 'Roshan Khadka', email: 'roshan.khadka@tu.edu.np', phone: '+977-9800000012', course: 'CSC501', gpa: 2.9, status: 'inactive' }
  ];

  // Role-based access control
  const ROLE_PAGES = {
    admin: ['admin.html', 'teacher.html', 'students.html', 'courses.html', 'index.html', 'about.html', 'contact.html'],
    teacher: ['teacher.html', 'students.html', 'courses.html', 'index.html', 'about.html', 'contact.html'],
    student: ['students.html', 'courses.html', 'index.html', 'about.html', 'contact.html']
  };

  // Check if user has access to current page
  function checkPageAccess() {
    const currentUser = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (!currentUser || !isLoggedIn) {
      // Allow access to public pages
      const publicPages = ['index.html', 'login.html', 'signup.html', 'about.html', 'contact.html'];
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      
      if (!publicPages.includes(currentPage)) {
        window.location.href = 'login.html';
        return false;
      }
      return true;
    }

    const user = JSON.parse(currentUser);
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Check if user has access to this page
    const allowedPages = ROLE_PAGES[user.role] || [];
    if (!allowedPages.includes(currentPage) && currentPage !== 'login.html' && currentPage !== 'signup.html') {
      // Redirect to appropriate page based on role
      switch(user.role) {
        case 'admin':
          window.location.href = 'admin.html';
          break;
        case 'teacher':
          window.location.href = 'teacher.html';
          break;
        case 'student':
          window.location.href = 'index.html';
          break;
        default:
          window.location.href = 'login.html';
      }
      return false;
    }
    
    return true;
  }

  // Hide/show navigation links based on role
  function updateRoleBasedNavigation() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const user = JSON.parse(currentUser);
    const navLinks = document.querySelectorAll('.nav-links a, .nav-actions a, .logout-actions a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      const allowedPages = ROLE_PAGES[user.role] || [];
      const pageName = href.split('/').pop() || 'index.html';
      
      // Hide links to pages the user doesn't have access to
      if (href.includes('admin.html') && user.role !== 'admin') {
        link.style.display = 'none';
      } else if (href.includes('teacher.html') && user.role !== 'admin' && user.role !== 'teacher') {
        link.style.display = 'none';
      } else if (href.includes('students.html') && !allowedPages.includes('students.html')) {
        link.style.display = 'none';
      }
    });

    // Also hide role-specific buttons in the UI
    const adminButtons = document.querySelectorAll('.admin-only');
    const teacherButtons = document.querySelectorAll('.teacher-only');
    const studentButtons = document.querySelectorAll('.student-only');

    adminButtons.forEach(btn => {
      btn.style.display = user.role === 'admin' ? 'block' : 'none';
    });

    teacherButtons.forEach(btn => {
      btn.style.display = (user.role === 'teacher' || user.role === 'admin') ? 'block' : 'none';
    });

    studentButtons.forEach(btn => {
      btn.style.display = (user.role === 'student' || user.role === 'admin' || user.role === 'teacher') ? 'block' : 'none';
    });
  }

  // Check if user is logged in
  function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (currentUser && isLoggedIn) {
      const user = JSON.parse(currentUser);
      updateLoginState(true, user.name, user.role);
    } else {
      updateLoginState(false);
    }
  }

  // Initialize login state
  function updateLoginState(loggedIn, userName = '', userRole = '') {
    if (loggedIn) {
      if (navActions) navActions.style.display = 'none';
      if (logoutActions) logoutActions.style.display = 'flex';
      const usernameSpan = document.getElementById('username');
      if (usernameSpan) usernameSpan.textContent = `${userName} (${userRole})`;
    } else {
      if (navActions) navActions.style.display = 'flex';
      if (logoutActions) logoutActions.style.display = 'none';
    }
  }

  // Initialize access control
  checkPageAccess();
  checkLoginStatus();
  updateRoleBasedNavigation();

  // Login button handler - redirects to login page
  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }

  // Logout button handler
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.setItem('isLoggedIn', 'false');
      checkLoginStatus();
      window.location.href = 'index.html';
    });
  }

  // Navigation Link Handling
  const navLinkElements = document.querySelectorAll('.nav-links a');
  
  // Set active link based on current page
  function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinkElements.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (currentPage === linkPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setActiveNavLink();

  // Navigation click handlers
  navLinkElements.forEach(link => {
    link.addEventListener('click', (e) => {
      // For same-page anchors (like #about)
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Close mobile menu if open
      if (navLinks) navLinks.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
      
      // Update active link
      setActiveNavLink();
    });
  });

  // Signup Button Handling
  const signupBtn = document.querySelector('.signup-btn');
  if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'signup.html';
    });
  }

  // Signup Form Handling (if on signup page)
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    const signupMessage = document.getElementById('signup-message');
    
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('signup-name')?.value.trim();
      const email = document.getElementById('signup-email')?.value.trim();
      const password = document.getElementById('signup-password')?.value.trim();

      // Validation
      if (!name || !email || !password) {
        showSignupMessage('Please fill in all fields.', 'error');
        return;
      }

      // Email validation - must be Gmail
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(email)) {
        showSignupMessage('Please enter a valid Gmail address (must end with @gmail.com).', 'error');
        return;
      }

      // Password strength (strong validation)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        showSignupMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.', 'error');
        return;
      }

      try {
        const role = document.getElementById('signup-role')?.value || 'student';
        
        // Use API for signup
        const response = await fetch('http://localhost:3001/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role })
        });

        const data = await response.json();

        if (response.ok) {
          showSignupMessage(`Signup successful! Welcome, ${name}. Redirecting to login...`, 'success');
          signupForm.reset();
          
          // Redirect to login after 2 seconds
          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          showSignupMessage(data.error || 'Signup failed. Please try again.', 'error');
        }
      } catch (error) {
        console.error('Signup error:', error);
        showSignupMessage('Signup failed due to server error.', 'error');
      }
    });

    function showSignupMessage(message, type) {
      if (!signupMessage) return;
      
      signupMessage.textContent = message;
      signupMessage.className = `signup-message ${type}`;
      signupMessage.style.display = 'block';
    }
  }

  // Login Form Handling (if on login page)
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const loginMessage = document.getElementById('login-message');

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email')?.value.trim();
      const password = document.getElementById('login-password')?.value.trim();

      if (!email || !password) {
        showLoginMessage('Please fill in all fields.', 'error');
        return;
      }

      // Email validation - must be Gmail
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(email)) {
        showLoginMessage('Please enter a valid Gmail address (must end with @gmail.com).', 'error');
        return;
      }

      // Password strength (strong validation)
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        showLoginMessage('Invalid password. Must be at least 8 characters with uppercase, lowercase, number, and special character.', 'error');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          // Store user info and token in localStorage
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          localStorage.setItem('isLoggedIn', 'true');

          showLoginMessage(`Welcome back, ${data.user.name}! Redirecting...`, 'success');

          setTimeout(() => {
            if (data.user.role === 'admin') {
              window.location.href = 'admin.html';
            } else if (data.user.role === 'teacher') {
              window.location.href = 'teacher.html';
            } else {
              window.location.href = 'index.html';
            }
          }, 1500);
        } else {
          showLoginMessage(data.error || 'Invalid email or password.', 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        showLoginMessage('Login failed due to server error.', 'error');
      }
    });

    function showLoginMessage(message, type) {
      if (!loginMessage) return;

      loginMessage.textContent = message;
      loginMessage.className = `login-message ${type}`;
      loginMessage.style.display = 'block';
    }
  }

  // Search Algorithm Implementation
  function setupSearchFunctionality() {
    const searchInputs = document.querySelectorAll('.search-input');

    searchInputs.forEach(input => {
      input.addEventListener('input', debounce((e) => {
        const searchTerm = e.target.value.trim().toLowerCase();

        if (window.location.pathname.includes('students.html')) {
          searchStudents(searchTerm);
        } else if (window.location.pathname.includes('courses.html')) {
          searchCourses(searchTerm);
        }
      }, 300));
    });
  }

  // Debounce function to limit search frequency
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

  // Search algorithm for students
  async function searchStudents(searchTerm) {
    try {
      const studentsResponse = await window.EduManageAPI.getStudents();
      
      // Extract the actual data from response
      const students = Array.isArray(studentsResponse) ? studentsResponse : 
                      (studentsResponse && studentsResponse.students) ? studentsResponse.students : 
                      (studentsResponse && studentsResponse.data) ? studentsResponse.data : [];

      if (!searchTerm) {
        updateStudentsList(students);
        return;
      }

      // Advanced search algorithm with multiple criteria
      const filteredStudents = students.filter(student => {
        // Search in name, email, phone, course, and status
        return (
          student.name.toLowerCase().includes(searchTerm) ||
          student.email.toLowerCase().includes(searchTerm) ||
          (student.phone && student.phone.toLowerCase().includes(searchTerm)) ||
          (student.course && student.course.toLowerCase().includes(searchTerm)) ||
          student.status.toLowerCase().includes(searchTerm)
        );
      });

      updateStudentsList(filteredStudents);
    } catch (error) {
      console.error('Error searching students:', error);
      // Fallback to local data
      const students = await window.EduManageLocal.students.getAll();
      updateStudentsList(students);
    }
  }

  // Search algorithm for courses
  async function searchCourses(searchTerm) {
    try {
      const coursesResponse = await window.EduManageAPI.getCourses();
      
      // Extract the actual data from response
      const courses = Array.isArray(coursesResponse) ? coursesResponse : 
                     (coursesResponse && coursesResponse.courses) ? coursesResponse.courses : 
                     (coursesResponse && coursesResponse.data) ? coursesResponse.data : [];

      if (!searchTerm) {
        updateCoursesList(courses);
        return;
      }

      // Advanced search algorithm with multiple criteria
      const filteredCourses = courses.filter(course => {
        // Search in name, code, description, instructor, and status
        return (
          course.name.toLowerCase().includes(searchTerm) ||
          course.code.toLowerCase().includes(searchTerm) ||
          (course.description && course.description.toLowerCase().includes(searchTerm)) ||
          (course.instructor && course.instructor.toLowerCase().includes(searchTerm)) ||
          course.status.toLowerCase().includes(searchTerm)
        );
      });

      updateCoursesList(filteredCourses);
    } catch (error) {
      console.error('Error searching courses:', error);
      // Fallback to local data
      const courses = await window.EduManageLocal.courses.getAll();
      updateCoursesList(courses);
    }
  }

  // Local storage data management
  window.EduManageLocal = {
    // Admin specific functions
    admin: {
      getDashboard: () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        return {
          totalUsers: users.length,
          totalCourses: courses.length,
          totalStudents: students.length,
          recentActivity: []
        };
      },
      getUsers: () => JSON.parse(localStorage.getItem('users') || '[]'),
      getAnalytics: () => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        return {
          userStats: {
            total: users.length,
            admin: users.filter(u => u.role === 'admin').length,
            teacher: users.filter(u => u.role === 'teacher').length,
            student: users.filter(u => u.role === 'student').length
          },
          courseStats: {
            total: courses.length,
            active: courses.filter(c => c.status === 'active').length,
            inactive: courses.filter(c => c.status === 'inactive').length,
            completed: courses.filter(c => c.status === 'completed').length
          },
          studentStats: {
            total: students.length,
            active: students.filter(s => s.status === 'active').length,
            inactive: students.filter(s => s.status === 'inactive').length,
            graduated: students.filter(s => s.status === 'graduated').length
          }
        };
      }
    },
    
    // Teacher specific functions
    teacher: {
      getDashboard: () => {
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        return {
          courses: courses,
          students: students
        };
      },
      getCourses: () => JSON.parse(localStorage.getItem('courses') || '[]'),
      getStudents: () => JSON.parse(localStorage.getItem('students') || '[]')
    },
    
    // Student specific functions
    student: {
      getCourses: () => JSON.parse(localStorage.getItem('courses') || '[]'),
      getStudents: () => JSON.parse(localStorage.getItem('students') || '[]')
    },
    
    // General data functions
    courses: {
      getAll: async () => {
        try {
          // Try to get from API first
          const coursesResponse = await window.EduManageAPI.getCourses();
          
          // Extract the actual data from response
          const courses = Array.isArray(coursesResponse) ? coursesResponse : 
                         (coursesResponse && coursesResponse.courses) ? coursesResponse.courses : 
                         (coursesResponse && coursesResponse.data) ? coursesResponse.data : [];
          
          if (courses.length > 0) {
            // Cache in localStorage
            localStorage.setItem('courses', JSON.stringify(courses));
            return courses;
          }
        } catch (error) {
          console.error('Error fetching courses from API:', error);
        }
        
        // Fallback to localStorage
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        if (storedCourses.length > 0) {
          return storedCourses;
        }

        // Only initialize with sample data if current user is admin
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          if (user.role === 'admin') {
            // Initialize localStorage with sample data if empty and user is admin
            localStorage.setItem('courses', JSON.stringify(sampleCourses));
            return sampleCourses;
          }
        }

        // Return empty array for non-admin users
        return [];
      },
      getById: async (id) => {
        // Check localStorage first, fallback to sample data
        const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
        if (storedCourses.length > 0) {
          return storedCourses.find(c => c.id === id);
        }
        return sampleCourses.find(c => c.id === id);
      },
      create: async (data) => {
        try {
          const result = await window.EduManageAPI.createCourse(data);
          if (result) {
            showNotification('Course created successfully!', 'success');
            return result;
          }
        } catch (error) {
          console.error('Error creating course via API:', error);
        }
        
        // Fallback to localStorage
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const newCourse = {
          ...data,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        courses.push(newCourse);
        localStorage.setItem('courses', JSON.stringify(courses));
        showNotification('Course created locally (server unavailable)', 'warning');
        return newCourse;
      },
      update: async (id, data) => {
        try {
          const result = await window.EduManageAPI.updateCourse(id, data);
          if (result) {
            showNotification('Course updated successfully!', 'success');
            return result;
          }
        } catch (error) {
          console.error('Error updating course via API:', error);
        }
        
        // Fallback to localStorage
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const index = courses.findIndex(c => c.id === id);
        if (index !== -1) {
          courses[index] = {
            ...courses[index],
            ...data,
            updatedAt: new Date().toISOString()
          };
          localStorage.setItem('courses', JSON.stringify(courses));
          showNotification('Course updated locally (server unavailable)', 'warning');
          return courses[index];
        }
        return null;
      },
      delete: async (id) => {
        try {
          const result = await window.EduManageAPI.deleteCourse(id);
          if (result !== null) {
            showNotification('Course deleted successfully!', 'success');
            return true;
          }
        } catch (error) {
          console.error('Error deleting course via API:', error);
        }
        
        // Fallback to localStorage
        const courses = JSON.parse(localStorage.getItem('courses') || '[]');
        const filtered = courses.filter(c => c.id !== id);
        localStorage.setItem('courses', JSON.stringify(filtered));
        showNotification('Course deleted locally (server unavailable)', 'warning');
        return true;
      }
    },
    
    students: {
      getAll: async () => {
        try {
          // Try to get from API first
          const studentsResponse = await window.EduManageAPI.getStudents();
          
          // Extract the actual data from response
          const students = Array.isArray(studentsResponse) ? studentsResponse : 
                          (studentsResponse && studentsResponse.students) ? studentsResponse.students : 
                          (studentsResponse && studentsResponse.data) ? studentsResponse.data : [];
          
          if (students.length > 0) {
            // Cache in localStorage
            localStorage.setItem('students', JSON.stringify(students));
            return students;
          }
        } catch (error) {
          console.error('Error fetching students from API:', error);
        }
        
        // Fallback to localStorage
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        if (storedStudents.length > 0) {
          return storedStudents;
        }

        // Only initialize with sample data if current user is admin
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          if (user.role === 'admin') {
            // Initialize localStorage with sample data if empty and user is admin
            localStorage.setItem('students', JSON.stringify(sampleStudents));
            return sampleStudents;
          }
        }

        // Return empty array for non-admin users
        return [];
      },
      getById: async (id) => {
        // Check localStorage first, fallback to sample data
        const storedStudents = JSON.parse(localStorage.getItem('students') || '[]');
        if (storedStudents.length > 0) {
          return storedStudents.find(s => s.id === id);
        }
        return sampleStudents.find(s => s.id === id);
      },
      create: async (data) => {
        try {
          const result = await window.EduManageAPI.createStudent(data);
          if (result) {
            showNotification('Student added successfully!', 'success');
            return result;
          }
        } catch (error) {
          console.error('Error creating student via API:', error);
        }
        
        // Fallback to localStorage
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const newStudent = {
          ...data,
          id: Date.now(),
          createdAt: new Date().toISOString()
        };
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        showNotification('Student added locally (server unavailable)', 'warning');
        return newStudent;
      },
      update: async (id, data) => {
        try {
          const result = await window.EduManageAPI.updateStudent(id, data);
          if (result) {
            showNotification('Student updated successfully!', 'success');
            return result;
          }
        } catch (error) {
          console.error('Error updating student via API:', error);
        }
        
        // Fallback to localStorage
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
          students[index] = {
            ...students[index],
            ...data,
            updatedAt: new Date().toISOString()
          };
          localStorage.setItem('students', JSON.stringify(students));
          showNotification('Student updated locally (server unavailable)', 'warning');
          return students[index];
        }
        return null;
      },
      delete: async (id) => {
        try {
          const result = await window.EduManageAPI.deleteStudent(id);
          if (result !== null) {
            showNotification('Student deleted successfully!', 'success');
            return true;
          }
        } catch (error) {
          console.error('Error deleting student via API:', error);
        }
        
        // Fallback to localStorage
        const students = JSON.parse(localStorage.getItem('students') || '[]');
        const filtered = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(filtered));
        showNotification('Student deleted locally (server unavailable)', 'warning');
        return true;
      }
    }
  };

  // Modal Functions - Admin Only
  window.addStudent = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login to access this feature.', 'error');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      showNotification('Access denied. Admin privileges required.', 'error');
      return;
    }

    document.getElementById('student-modal-title').textContent = 'Add Student';
    document.getElementById('student-form').reset();
    document.getElementById('student-form').dataset.editingId = '';
    document.getElementById('student-modal').classList.add('show');
  };

  window.closeStudentModal = function() {
    document.getElementById('student-modal').classList.remove('show');
    document.getElementById('student-form').dataset.editingId = '';
  };

  window.addCourse = function() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login to access this feature.', 'error');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      showNotification('Access denied. Admin privileges required.', 'error');
      return;
    }

    document.getElementById('course-modal-title').textContent = 'Add Course';
    document.getElementById('course-form').reset();
    document.getElementById('course-form').dataset.editingId = '';
    document.getElementById('course-modal').classList.add('show');
  };

  window.closeCourseModal = function() {
    document.getElementById('course-modal').classList.remove('show');
    document.getElementById('course-form').dataset.editingId = '';
  };

  // Form Handlers
  const studentForm = document.getElementById('student-form');
  if (studentForm) {
    studentForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const editingId = studentForm.dataset.editingId;
      const formData = new FormData(studentForm);
      const studentData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        course: formData.get('course'),
        gpa: parseFloat(formData.get('gpa')) || 0,
        status: formData.get('status') || 'active'
      };

      let result;
      if (editingId) {
        // Update existing student
        result = await window.EduManageLocal.students.update(parseInt(editingId), studentData);
        if (result) {
          showNotification('Student updated successfully!', 'success');
        } else {
          showNotification('Error updating student.', 'error');
        }
      } else {
        // Create new student
        result = await window.EduManageLocal.students.create(studentData);
        if (result) {
          showNotification('Student added successfully!', 'success');
        } else {
          showNotification('Error adding student.', 'error');
        }
      }

      if (result) {
        closeStudentModal();
        await loadStudents();
      }
    });
  }

  const courseForm = document.getElementById('course-form');
  if (courseForm) {
    courseForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const editingId = courseForm.dataset.editingId;
      const formData = new FormData(courseForm);
      const courseData = {
        name: formData.get('name'),
        code: formData.get('code'),
        description: formData.get('description'),
        instructor: formData.get('instructor'),
        credits: parseInt(formData.get('credits')) || 0,
        duration: parseInt(formData.get('duration')) || 0,
        status: formData.get('status') || 'active'
      };

      let result;
      if (editingId) {
        // Update existing course
        result = await window.EduManageLocal.courses.update(parseInt(editingId), courseData);
      } else {
        // Create new course
        result = await window.EduManageLocal.courses.create(courseData);
      }

      if (result) {
        closeCourseModal();
        await loadCourses();
      }
    });
  }

  // Edit and Delete Functions
  window.editStudent = async function(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login to access this feature.', 'error');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      showNotification('Access denied. Admin privileges required.', 'error');
      return;
    }

    const student = await window.EduManageLocal.students.getById(id);
    if (!student) {
      showNotification('Student not found.', 'error');
      return;
    }

    document.getElementById('student-modal-title').textContent = 'Edit Student';
    document.getElementById('student-name').value = student.name || '';
    document.getElementById('student-email').value = student.email || '';
    document.getElementById('student-phone').value = student.phone || '';
    document.getElementById('student-course').value = student.course || '';
    document.getElementById('student-gpa').value = student.gpa || '';
    document.getElementById('student-status').value = student.status || 'active';
    document.getElementById('student-form').dataset.editingId = id;
    document.getElementById('student-modal').classList.add('show');
  };

  window.deleteStudent = async function(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login to access this feature.', 'error');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      showNotification('Access denied. Admin privileges required.', 'error');
      return;
    }

    if (!confirm('Are you sure you want to delete this student?')) {
      return;
    }

    const success = await window.EduManageLocal.students.delete(id);
    if (success) {
      showNotification('Student deleted successfully!', 'success');
      await loadStudents();
    } else {
      showNotification('Error deleting student.', 'error');
    }
  };

  window.editCourse = async function(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login to access this feature.', 'error');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      showNotification('Access denied. Admin privileges required.', 'error');
      return;
    }

    const course = await window.EduManageLocal.courses.getById(id);
    if (!course) {
      showNotification('Course not found.', 'error');
      return;
    }

    document.getElementById('course-modal-title').textContent = 'Edit Course';
    document.getElementById('course-name').value = course.name || '';
    document.getElementById('course-code').value = course.code || '';
    document.getElementById('course-description').value = course.description || '';
    document.getElementById('course-instructor').value = course.instructor || '';
    document.getElementById('course-credits').value = course.credits || '';
    document.getElementById('course-duration').value = course.duration || '';
    document.getElementById('course-status').value = course.status || 'active';
    document.getElementById('course-form').dataset.editingId = id;
    document.getElementById('course-modal').classList.add('show');
  };

  window.deleteCourse = async function(id) {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      showNotification('Please login to access this feature.', 'error');
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      showNotification('Access denied. Admin privileges required.', 'error');
      return;
    }

    if (!confirm('Are you sure you want to delete this course?')) {
      return;
    }

    const success = await window.EduManageLocal.courses.delete(id);
    if (success) {
      showNotification('Course deleted successfully!', 'success');
      await loadCourses();
    } else {
      showNotification('Error deleting course.', 'error');
    }
  };

  // Data Loading Functions
  async function loadStudents() {
    try {
      const students = await window.EduManageLocal.students.getAll();
      updateStudentsList(students);
    } catch (error) {
      console.error('Error loading students:', error);
      updateStudentsList([]);
    }
  }

  async function loadCourses() {
    try {
      const courses = await window.EduManageLocal.courses.getAll();
      updateCoursesList(courses);
    } catch (error) {
      console.error('Error loading courses:', error);
      updateCoursesList([]);
    }
  }

  function updateStudentsList(students) {
    const studentsContainer = document.getElementById('students-container');
    const studentsTable = document.getElementById('students-table');
    const noStudents = document.getElementById('no-students');

    if (!studentsContainer) return;

    if (students.length === 0) {
      if (studentsTable) studentsTable.style.display = 'none';
      if (noStudents) noStudents.style.display = 'block';
      return;
    }

    if (studentsTable) studentsTable.style.display = 'table';
    if (noStudents) noStudents.style.display = 'none';

    // Update table body
    const tbody = studentsTable ? studentsTable.querySelector('tbody') : null;
    if (tbody) {
      tbody.innerHTML = '';
      students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.phone || 'N/A'}</td>
          <td>${student.course || 'N/A'}</td>
          <td>${student.gpa || 'N/A'}</td>
          <td><span class="status-badge ${student.status}">${student.status}</span></td>
          <td>
            <button class="btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
            <button class="btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    // Update cards view
    const cardsContainer = document.getElementById('students-cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
      students.forEach(student => {
        const card = document.createElement('div');
        card.className = 'student-card';
        card.innerHTML = `
          <h3>${student.name}</h3>
          <p><strong>Email:</strong> ${student.email}</p>
          <p><strong>Phone:</strong> ${student.phone || 'N/A'}</p>
          <p><strong>Course:</strong> ${student.course || 'N/A'}</p>
          <p><strong>GPA:</strong> ${student.gpa || 'N/A'}</p>
          <p><strong>Status:</strong> <span class="status-badge ${student.status}">${student.status}</span></p>
          <div class="card-actions">
            <button class="btn btn-edit" onclick="editStudent(${student.id})">Edit</button>
            <button class="btn btn-delete" onclick="deleteStudent(${student.id})">Delete</button>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }
  }

  function updateCoursesList(courses) {
    const coursesContainer = document.getElementById('courses-container');
    const coursesTable = document.getElementById('courses-table');
    const noCourses = document.getElementById('no-courses');

    if (!coursesContainer) return;

    if (courses.length === 0) {
      if (coursesTable) coursesTable.style.display = 'none';
      if (noCourses) noCourses.style.display = 'block';
      return;
    }

    if (coursesTable) coursesTable.style.display = 'table';
    if (noCourses) noCourses.style.display = 'none';

    // Update table body
    const tbody = coursesTable ? coursesTable.querySelector('tbody') : null;
    if (tbody) {
      tbody.innerHTML = '';
      courses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${course.name}</td>
          <td>${course.code}</td>
          <td>${course.description || 'N/A'}</td>
          <td>${course.instructor || 'N/A'}</td>
          <td>${course.credits}</td>
          <td>${course.duration} weeks</td>
          <td><span class="status-badge ${course.status}">${course.status}</span></td>
          <td>
            <button class="btn btn-edit" onclick="editCourse(${course.id})">Edit</button>
            <button class="btn btn-delete" onclick="deleteCourse(${course.id})">Delete</button>
          </td>
        `;
        tbody.appendChild(row);
      });
    }

    // Update cards view
    const cardsContainer = document.getElementById('courses-cards');
    if (cardsContainer) {
      cardsContainer.innerHTML = '';
      courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
          <h3>${course.name}</h3>
          <p><strong>Code:</strong> ${course.code}</p>
          <p><strong>Description:</strong> ${course.description || 'N/A'}</p>
          <p><strong>Instructor:</strong> ${course.instructor || 'N/A'}</p>
          <p><strong>Credits:</strong> ${course.credits}</p>
          <p><strong>Duration:</strong> ${course.duration} weeks</p>
          <p><strong>Status:</strong> <span class="status-badge ${course.status}">${course.status}</span></p>
          <div class="card-actions">
            <button class="btn btn-edit" onclick="editCourse(${course.id})">Edit</button>
            <button class="btn btn-delete" onclick="deleteCourse(${course.id})">Delete</button>
          </div>
        `;
        cardsContainer.appendChild(card);
      });
    }
  }

  // View Toggle Functions
  window.toggleView = function(viewType) {
    const tableView = document.getElementById(`${viewType}-table-container`);
    const cardsView = document.getElementById(`${viewType}-cards-container`);
    const tableViewBtn = document.getElementById(`${viewType}-table-view`);
    const cardsViewBtn = document.getElementById(`${viewType}-cards-view`);

    if (tableView && cardsView && tableViewBtn && cardsViewBtn) {
      if (viewType === 'table') {
        tableView.style.display = 'block';
        cardsView.style.display = 'none';
        tableViewBtn.classList.add('active');
        cardsViewBtn.classList.remove('active');
      } else {
        tableView.style.display = 'none';
        cardsView.style.display = 'grid';
        tableViewBtn.classList.remove('active');
        cardsViewBtn.classList.add('active');
      }
    }
  };

  // Notification System
  function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <span class="notification-message">${message}</span>
      <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    // Add to notification container
    const container = document.getElementById('notification-container');
    if (container) {
      container.appendChild(notification);

      // Auto remove after 5 seconds
      setTimeout(() => {
        if (notification.parentElement) {
          notification.remove();
        }
      }, 5000);
    }
  }

  // Initialize page-specific functionality
  if (window.location.pathname.includes('students.html')) {
    loadStudents();
    setupSearchFunctionality();
  } else if (window.location.pathname.includes('courses.html')) {
    loadCourses();
    setupSearchFunctionality();
  } else if (window.location.pathname.includes('admin.html')) {
    // Admin dashboard initialization
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'admin') {
      window.location.href = 'index.html';
      return;
    }

    // Load admin dashboard data
    loadAdminDashboard();
  } else if (window.location.pathname.includes('teacher.html')) {
    // Teacher dashboard initialization
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = 'login.html';
      return;
    }

    const user = JSON.parse(currentUser);
    if (user.role !== 'teacher' && user.role !== 'admin') {
      window.location.href = 'index.html';
      return;
    }

    // Load teacher dashboard data
    loadTeacherDashboard();
  }

  // Admin Dashboard Functions
  async function loadAdminDashboard() {
    try {
      // Load users, courses, and students
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const courses = await window.EduManageLocal.courses.getAll();
      const students = await window.EduManageLocal.students.getAll();

      // Update stats
      document.getElementById('total-users').textContent = users.length;
      document.getElementById('total-courses').textContent = courses.length;
      document.getElementById('total-students').textContent = students.length;

      // Update recent activity
      updateRecentActivity(users, courses, students);
    } catch (error) {
      console.error('Error loading admin dashboard:', error);
    }
  }

  function updateRecentActivity(users, courses, students) {
    const activityList = document.getElementById('recent-activity-list');
    if (!activityList) return;

    // Clear existing content
    activityList.innerHTML = '';

    // Combine and sort activities by date
    const activities = [];

    // Add user signups
    users.slice(-5).forEach(user => {
      activities.push({
        type: 'user',
        action: 'signed up',
        name: user.name,
        date: user.signupDate || new Date().toISOString(),
        role: user.role
      });
    });

    // Add course creations
    courses.slice(-5).forEach(course => {
      activities.push({
        type: 'course',
        action: 'created',
        name: course.name,
        date: course.createdAt || new Date().toISOString()
      });
    });

    // Add student registrations
    students.slice(-5).forEach(student => {
      activities.push({
        type: 'student',
        action: 'registered',
        name: student.name,
        date: student.createdAt || new Date().toISOString()
      });
    });

    // Sort by date (newest first)
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Take only the 5 most recent activities
    const recentActivities = activities.slice(0, 5);

    // Add to list
    recentActivities.forEach(activity => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <strong>${activity.name}</strong> ${activity.action}
        ${activity.role ? `as ${activity.role}` : ''}
        <span class="activity-date">${formatDate(activity.date)}</span>
      `;
      activityList.appendChild(listItem);
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Teacher Dashboard Functions
  async function loadTeacherDashboard() {
    try {
      // Load courses and students
      const courses = await window.EduManageLocal.courses.getAll();
      const students = await window.EduManageLocal.students.getAll();

      // Update stats
      document.getElementById('teacher-total-courses').textContent = courses.length;
      document.getElementById('teacher-total-students').textContent = students.length;

      // Update course list
      updateTeacherCourseList(courses);
    } catch (error) {
      console.error('Error loading teacher dashboard:', error);
    }
  }

  function updateTeacherCourseList(courses) {
    const courseList = document.getElementById('teacher-course-list');
    if (!courseList) return;

    // Clear existing content
    courseList.innerHTML = '';

    // Add courses
    courses.slice(0, 5).forEach(course => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h4>${course.name} (${course.code})</h4>
        <p>Instructor: ${course.instructor || 'N/A'}</p>
        <p>Status: <span class="status-badge ${course.status}">${course.status}</span></p>
      `;
      courseList.appendChild(listItem);
    });
  }

  // Initialize view toggles
  if (document.getElementById('students-table-view')) {
    document.getElementById('students-table-view').addEventListener('click', () => toggleView('students'));
    document.getElementById('students-cards-view').addEventListener('click', () => toggleView('students'));
  }

  if (document.getElementById('courses-table-view')) {
    document.getElementById('courses-table-view').addEventListener('click', () => toggleView('courses'));
    document.getElementById('courses-cards-view').addEventListener('click', () => toggleView('courses'));
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    const studentModal = document.getElementById('student-modal');
    if (studentModal && e.target === studentModal) {
      closeStudentModal();
    }

    const courseModal = document.getElementById('course-modal');
    if (courseModal && e.target === courseModal) {
      closeCourseModal();
    }
  });
});
// Teacher Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize teacher dashboard
    initializeTeacherDashboard();

    // Set up search functionality
    setupSearchFunctionality();

    // Load initial data
    loadTeacherData();
});

function initializeTeacherDashboard() {
    // Add loading states
    showLoadingState();

    // Simulate data loading
    setTimeout(() => {
        hideLoadingState();
        populateDashboardData();
    }, 1000);
}

function showLoadingState() {
    const studentList = document.getElementById('student-list');
    const courseList = document.getElementById('course-list');

    if (studentList) {
        studentList.innerHTML = '<li class="loading">Loading students...</li>';
    }

    if (courseList) {
        courseList.innerHTML = '<li class="loading">Loading courses...</li>';
    }
}

function hideLoadingState() {
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

function setupSearchFunctionality() {
    // Student search
    const studentSearch = document.getElementById('student-search');
    if (studentSearch) {
        studentSearch.addEventListener('input', function(e) {
            filterStudents(e.target.value);
        });
    }

    // Course search
    const courseSearch = document.getElementById('course-search');
    if (courseSearch) {
        courseSearch.addEventListener('input', function(e) {
            filterCourses(e.target.value);
        });
    }
}

function filterStudents(searchTerm) {
    const studentItems = document.querySelectorAll('#student-list .student-item');
    const term = searchTerm.toLowerCase();

    studentItems.forEach(item => {
        const studentName = item.querySelector('.student-info .student-name').textContent.toLowerCase();
        const studentEmail = item.querySelector('.student-info .student-email').textContent.toLowerCase();

        if (studentName.includes(term) || studentEmail.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function filterCourses(searchTerm) {
    const courseItems = document.querySelectorAll('#course-list .course-item');
    const term = searchTerm.toLowerCase();

    courseItems.forEach(item => {
        const courseName = item.querySelector('.course-info .course-name').textContent.toLowerCase();
        const courseInstructor = item.querySelector('.course-info .course-instructor').textContent.toLowerCase();

        if (courseName.includes(term) || courseInstructor.includes(term)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function loadTeacherData() {
    // Simulate API calls to load teacher data
    // In a real application, this would be actual API calls

    // Load teacher courses
    loadTeacherCourses();

    // Load enrolled students
    loadEnrolledStudents();

    // Load available courses
    loadAvailableCourses();
}

function loadTeacherCourses() {
    const teacherCourseList = document.getElementById('teacher-course-list');
    if (!teacherCourseList) return;

    // Mock data - replace with actual API call
    const courses = [
        { name: 'Programming Fundamentals', code: 'CSC101', students: 45 },
        { name: 'Advanced Calculus', code: 'MATH201', students: 32 },
        { name: 'Data Structures and Algorithms', code: 'CSC201', students: 38 },
        { name: 'Web Development Basics', code: 'CSC301', students: 28 }
    ];

    teacherCourseList.innerHTML = '';
    courses.forEach(course => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="course-info">
                <strong>${course.name}</strong>
                <span class="course-code">${course.code}</span>
                <span class="student-count">${course.students} students</span>
            </div>
            <div class="course-actions">
                <button class="btn btn-sm btn-primary" onclick="viewCourse('${course.code}')">View</button>
            </div>
        `;
        teacherCourseList.appendChild(li);
    });
}

function loadEnrolledStudents() {
    const studentList = document.getElementById('student-list');
    if (!studentList) return;

    // Mock data - replace with actual API call
    const students = [
        { name: 'Sita Rai', email: 'sita.rai@tu.edu.np', status: 'active', gpa: 3.8 },
        { name: 'Ram Thapa', email: 'ram.thapa@tu.edu.np', status: 'active', gpa: 3.6 },
        { name: 'Gita Lama', email: 'gita.lama@tu.edu.np', status: 'inactive', gpa: 2.9 },
        { name: 'Hari Gurung', email: 'hari.gurung@tu.edu.np', status: 'active', gpa: 4.0 },
        { name: 'Maya Shrestha', email: 'maya.shrestha@tu.edu.np', status: 'graduated', gpa: 3.9 }
    ];

    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.className = 'student-item';
        li.innerHTML = `
            <div class="student-info">
                <div class="student-name">${student.name}</div>
                <div class="student-email">${student.email}</div>
                <div class="student-details">GPA: ${student.gpa}</div>
            </div>
            <div class="student-status ${student.status}">${student.status}</div>
            <div class="student-actions">
                <button class="btn btn-sm btn-edit" onclick="editStudent('${student.email}')">Edit</button>
                <button class="btn btn-sm btn-primary" onclick="viewStudent('${student.email}')">View</button>
            </div>
        `;
        studentList.appendChild(li);
    });
}

function loadAvailableCourses() {
    const courseList = document.getElementById('course-list');
    if (!courseList) return;

    // Mock data - replace with actual API call
    const courses = [
        { name: 'Advanced Algorithms', instructor: 'Dr. Nisha Sharma', students: 25, capacity: 30 },
        { name: 'Machine Learning', instructor: 'Prof. Ramesh Adhikari', students: 40, capacity: 45 },
        { name: 'Database Systems', instructor: 'Dr. Suman Thapa', students: 35, capacity: 40 },
        { name: 'Software Engineering', instructor: 'Prof. Kriti Gurung', students: 28, capacity: 35 }
    ];

    courseList.innerHTML = '';
    courses.forEach(course => {
        const li = document.createElement('li');
        li.className = 'course-item';
        li.innerHTML = `
            <div class="course-info">
                <div class="course-name">${course.name}</div>
                <div class="course-instructor">${course.instructor}</div>
                <div class="course-students">${course.students}/${course.capacity} enrolled</div>
            </div>
            <div class="course-actions">
                <button class="btn btn-sm btn-primary" onclick="enrollCourse('${course.name}')">Enroll</button>
                <button class="btn btn-sm btn-secondary" onclick="viewCourseDetails('${course.name}')">Details</button>
            </div>
        `;
        courseList.appendChild(li);
    });
}

function populateDashboardData() {
    // Update dashboard statistics
    updateDashboardStats();
}

function updateDashboardStats() {
    // Mock statistics - replace with actual data
    const stats = {
        totalStudents: 156,
        activeCourses: 4,
        averageGPA: 3.7,
        completionRate: 89
    };

    // You can add stat cards to the dashboard if needed
    console.log('Dashboard stats updated:', stats);
}

// Action functions
function viewCourse(courseCode) {
    alert(`Viewing course: ${courseCode}`);
    // Implement course viewing functionality
}

function editStudent(email) {
    alert(`Editing student: ${email}`);
    // Implement student editing functionality
}

function viewStudent(email) {
    alert(`Viewing student: ${email}`);
    // Implement student viewing functionality
}

function enrollCourse(courseName) {
    if (confirm(`Enroll in ${courseName}?`)) {
        alert(`Successfully enrolled in ${courseName}!`);
        // Implement enrollment functionality
    }
}

function viewCourseDetails(courseName) {
    alert(`Viewing details for: ${courseName}`);
    // Implement course details viewing functionality
}

// Add some interactive features
function addInteractiveFeatures() {
    // Add click handlers for course list items
    const courseListItems = document.querySelectorAll('#teacher-course-list li');
    courseListItems.forEach(item => {
        item.addEventListener('click', function() {
            const courseName = this.querySelector('strong').textContent;
            viewCourse(courseName);
        });
    });

    // Add hover effects for better UX
    const listItems = document.querySelectorAll('.student-item, .course-item');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// Initialize interactive features after data loads
setTimeout(addInteractiveFeatures, 1100);

// Export functions for global access if needed
window.viewCourse = viewCourse;
window.editStudent = editStudent;
window.viewStudent = viewStudent;
window.enrollCourse = enrollCourse;
window.viewCourseDetails = viewCourseDetails;

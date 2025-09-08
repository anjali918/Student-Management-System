const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Student = require('./models/Student');
const Course = require('./models/Course');
const db = require('./database');

async function seed() {
  try {
    await db.connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Student.deleteMany({});
    await Course.deleteMany({});

    // Hash passwords
    const saltRounds = 10;
    const hashedAdminPassword = await bcrypt.hash('admin123', saltRounds);
    const hashedTeacherPassword = await bcrypt.hash('teacher123', saltRounds);
    const hashedStudentPassword = await bcrypt.hash('student123', saltRounds);

    // Seed users
    const users = [
      { name: 'Admin User', email: 'admin@example.com', password: hashedAdminPassword, role: 'admin' },
      { name: 'Teacher One', email: 'teacher1@example.com', password: hashedTeacherPassword, role: 'teacher' },
      { name: 'Teacher Two', email: 'teacher2@example.com', password: hashedTeacherPassword, role: 'teacher' },
      { name: 'Student One', email: 'student1@example.com', password: hashedStudentPassword, role: 'student' },
      { name: 'Student Two', email: 'student2@example.com', password: hashedStudentPassword, role: 'student' }
    ];
    await User.insertMany(users);

    // Seed courses
    const courses = [
      { name: 'Web Development', code: 'WEB101', instructor: 'Teacher One', credits: 3, status: 'active' },
      { name: 'Data Science', code: 'DS201', instructor: 'Teacher One', credits: 4, status: 'active' },
      { name: 'Machine Learning', code: 'ML301', instructor: 'Teacher One', credits: 3, status: 'active' },
      { name: 'Database Systems', code: 'DBS401', instructor: 'Teacher One', credits: 3, status: 'active' },
      { name: 'Software Engineering', code: 'SE501', instructor: 'Teacher One', credits: 4, status: 'active' }
    ];
    await Course.insertMany(courses);

    // Seed students
    const students = [
      { name: 'Student One', email: 'student1@example.com', course: 'Web Development', gpa: 3.5, status: 'active' },
      { name: 'Student Two', email: 'student2@example.com', course: 'Data Science', gpa: 3.8, status: 'active' }
    ];
    await Student.insertMany(students);

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();

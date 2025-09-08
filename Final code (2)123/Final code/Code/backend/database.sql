-- EduManage Database Schema

CREATE DATABASE IF NOT EXISTS edumanage;
USE edumanage;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'teacher', 'admin') DEFAULT 'student',
  signup_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  course VARCHAR(255),
  gpa DECIMAL(3,2),
  status ENUM('active', 'inactive', 'graduated') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  instructor VARCHAR(255),
  credits INT DEFAULT 3,
  duration INT DEFAULT 12,
  status ENUM('active', 'inactive', 'completed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT IGNORE INTO users (name, email, password, role) VALUES
('Admin User', 'admin@edumanage.com', '$2b$10$example.hash.for.admin', 'admin'),
('Teacher User', 'teacher@edumanage.com', '$2b$10$example.hash.for.teacher', 'teacher'),
('Student User', 'student@edumanage.com', '$2b$10$example.hash.for.student', 'student');

INSERT IGNORE INTO courses (name, code, description, instructor, credits, duration, status) VALUES
('Introduction to Programming', 'CS101', 'Learn basic programming concepts', 'Dr. Smith', 3, 12, 'active'),
('Calculus I', 'MATH101', 'Introduction to differential calculus', 'Prof. Johnson', 4, 14, 'active'),
('Web Development', 'CS201', 'Build modern web applications', 'Dr. Williams', 3, 10, 'active');

INSERT IGNORE INTO students (name, email, phone, course, gpa, status) VALUES
('John Doe', 'john@example.com', '555-1234', 'CS101', 3.8, 'active'),
('Jane Smith', 'jane@example.com', '555-5678', 'MATH101', 3.5, 'active'),
('Mike Johnson', 'mike@example.com', '555-9012', 'CS201', 3.2, 'active');

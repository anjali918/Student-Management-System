const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Student = require('../models/Student');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Middleware to check admin/teacher role
const requireAdminOrTeacher = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Access denied. Admin or teacher role required.' });
  }
  next();
};

// Get all students
router.get('/', authenticateToken, async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json({ students });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get student by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ student });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new student
router.post('/', authenticateToken, requireAdminOrTeacher, async (req, res) => {
  try {
    const { name, email, phone, course, gpa, status } = req.body;

    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Check if email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create student
    const student = new Student({
      name,
      email,
      phone,
      course,
      gpa,
      status: status || 'active'
    });

    const savedStudent = await student.save();

    res.status(201).json({
      message: 'Student created successfully',
      student: savedStudent
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update student
router.put('/:id', authenticateToken, requireAdminOrTeacher, async (req, res) => {
  try {
    const { name, email, phone, course, gpa, status } = req.body;

    // Check if student exists
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Check if email is already used by another student
    if (email) {
      const emailCheck = await Student.findOne({ email, _id: { $ne: req.params.id } });
      if (emailCheck) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Update student
    existingStudent.name = name;
    existingStudent.email = email;
    existingStudent.phone = phone;
    existingStudent.course = course;
    existingStudent.gpa = gpa;
    existingStudent.status = status;

    const updatedStudent = await existingStudent.save();

    res.json({
      message: 'Student updated successfully',
      student: updatedStudent
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete student
router.delete('/:id', authenticateToken, requireAdminOrTeacher, async (req, res) => {
  try {
    // Check if student exists
    const existingStudent = await Student.findById(req.params.id);
    if (!existingStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Delete student
    await Student.findByIdAndDelete(req.params.id);

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

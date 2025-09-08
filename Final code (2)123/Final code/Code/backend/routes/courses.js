const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Course = require('../models/Course');

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

// Get all courses
router.get('/', authenticateToken, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json({ courses });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get course by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json({ course });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new course
router.post('/', authenticateToken, requireAdminOrTeacher, async (req, res) => {
  try {
    const { name, code, description, instructor, credits, duration, status } = req.body;

    // Validation
    if (!name || !code) {
      return res.status(400).json({ error: 'Name and code are required' });
    }

    // Check if code already exists
    const existingCourse = await Course.findOne({ code });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course code already exists' });
    }

    // Create course
    const course = new Course({
      name,
      code,
      description,
      instructor,
      credits: credits || 3,
      duration: duration || 12,
      status: status || 'active'
    });

    const savedCourse = await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course: savedCourse
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update course
router.put('/:id', authenticateToken, requireAdminOrTeacher, async (req, res) => {
  try {
    const { name, code, description, instructor, credits, duration, status } = req.body;

    // Check if course exists
    const existingCourse = await Course.findById(req.params.id);
    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if code is already used by another course
    if (code) {
      const codeCheck = await Course.findOne({ code, _id: { $ne: req.params.id } });
      if (codeCheck) {
        return res.status(400).json({ error: 'Course code already exists' });
      }
    }

    // Update course
    existingCourse.name = name;
    existingCourse.code = code;
    existingCourse.description = description;
    existingCourse.instructor = instructor;
    existingCourse.credits = credits;
    existingCourse.duration = duration;
    existingCourse.status = status;

    const updatedCourse = await existingCourse.save();

    res.json({
      message: 'Course updated successfully',
      course: updatedCourse
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete course
router.delete('/:id', authenticateToken, requireAdminOrTeacher, async (req, res) => {
  try {
    // Check if course exists
    const existingCourse = await Course.findById(req.params.id);
    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Delete course
    await Course.findByIdAndDelete(req.params.id);

    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Correct file path
const file_path = path.join(__dirname, '../data/student.json');

// -----------------------
// Helper: Read students
// -----------------------
function readStudents() {
  try {
    // Ensure folder + file exists
    if (!fs.existsSync(file_path)) {
      fs.mkdirSync(path.dirname(file_path), { recursive: true });
      fs.writeFileSync(file_path, '[]', 'utf8');
    }

    const raw = fs.readFileSync(file_path, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    throw new Error('Failed to read students data: ' + err.message);
  }
}

// -----------------------
// Helper: Write students
// -----------------------
function writeStudents(list) {
  try {
    fs.writeFileSync(file_path, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    throw new Error('Failed to write students data: ' + err.message);
  }
}

// -----------------------
// GET /api/students
// -----------------------
router.get('/api/students', (req, res) => {
  try {
    const students = readStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// -----------------------
// POST /api/students
// -----------------------
router.post('/api/students', (req, res) => {
  try {
    const { name, age, course, year, status } = req.body || {};

    // Validate fields
    if (!name?.trim()) return res.status(400).json({ message: "Name is required" });
    if (!course?.trim()) return res.status(400).json({ message: "Course is required" });


    if (!year || isNaN(year)) {
  return res.status(400).json({ message: "Year must be a valid number" });
}

    const ageNum = Number(age);
    if (!ageNum || ageNum <= 0 || isNaN(ageNum))
      return res.status(400).json({ message: "Age must be a valid number greater than 0" });

    // Create new student object
    const newStudent = {
      id: uuidv4(),
      name: name.trim(),
      age: ageNum,
      course: course.trim(),
      year: Number(year),
      status: status?.toString().trim() || 'active',
      createdAt: new Date().toISOString(),
    };

    // Save in file
    const students = readStudents();
    students.push(newStudent);
    writeStudents(students);

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

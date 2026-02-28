import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors"; // [پہلا قدم: CORS امپورٹ کیا]

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("school.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT, -- 'admin', 'student', 'teacher'
    portal TEXT, -- 'boys', 'girls'
    student_id INTEGER,
    teacher_id INTEGER,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(teacher_id) REFERENCES teachers(id)
  );

  CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT,
    subject TEXT,
    username TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    roll_number INTEGER UNIQUE,
    full_name TEXT,
    father_name TEXT,
    gender TEXT,
    dob TEXT,
    cnic TEXT,
    class TEXT,
    group_name TEXT,
    board_reg_no TEXT,
    prev_marks INTEGER,
    prev_percentage REAL,
    student_mobile TEXT,
    parent_mobile TEXT,
    email TEXT,
    address TEXT,
    portal TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT,
    status TEXT, -- 'present', 'absent'
    FOREIGN KEY(student_id) REFERENCES students(id)
  );

  CREATE TABLE IF NOT EXISTS marks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    subject TEXT,
    marks_obtained INTEGER,
    total_marks INTEGER,
    exam_type TEXT, -- 'Class Test', 'Monthly', 'Mid-Term', 'Final'
    date TEXT,
    teacher_id INTEGER,
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(teacher_id) REFERENCES teachers(id)
  );

  CREATE TABLE IF NOT EXISTS fees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    month TEXT,
    amount INTEGER,
    due_date TEXT,
    status TEXT DEFAULT 'unpaid', -- 'paid', 'unpaid'
    voucher_id TEXT UNIQUE,
    FOREIGN KEY(student_id) REFERENCES students(id)
  );
`);

// Seed Admin if not exists
const adminExists = db.prepare("SELECT * FROM users WHERE role = 'admin'").get();
if (!adminExists) {
  db.prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)").run("admin", "admin123", "admin");
}

// Seed a default teacher for testing
const teacherExists = db.prepare("SELECT * FROM teachers WHERE username = 'teacher1'").get();
if (!teacherExists) {
  const res = db.prepare("INSERT INTO teachers (full_name, subject, username, password) VALUES (?, ?, ?, ?)").run("Default Teacher", "Physics", "teacher1", "teacher123");
  db.prepare("INSERT INTO users (username, password, role, teacher_id) VALUES (?, ?, ?, ?)").run("teacher1", "teacher123", "teacher", res.lastInsertRowid);
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000; // Railway کے لیے پورٹ کی سیٹنگ درست کی

  app.use(cors()); // [دوسرا قدم: CORS کو ایکٹیویٹ کیا]
  app.use(express.json());

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password, portal } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password);
    
    if (user) {
      if (user.role === 'student' && user.portal !== portal) {
        return res.status(401).json({ error: "Invalid portal selection for this user" });
      }
      res.json({ user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/forgot-password", (req, res) => {
    const { username, cnic, portal } = req.body;
    let user;
    if (portal === 'admin') {
      user = db.prepare("SELECT * FROM users WHERE username = ? AND role = 'admin'").get(username);
    } else {
      const student = db.prepare("SELECT * FROM students WHERE roll_number = ? AND cnic = ?").get(username, cnic);
      if (student) {
        user = db.prepare("SELECT * FROM users WHERE student_id = ?").get(student.id);
      }
    }

    if (user) {
      res.json({ password: user.password });
    } else {
      res.status(404).json({ error: "User not found or details mismatch" });
    }
  });

  app.get("/api/admin/stats", (req, res) => {
    const totalBoys = db.prepare("SELECT COUNT(*) as count FROM students WHERE portal = 'boys'").get().count;
    const totalGirls = db.prepare("SELECT COUNT(*) as count FROM students WHERE portal = 'girls'").get().count;
    const totalFees = db.prepare("SELECT SUM(amount) as total FROM fees WHERE status = 'paid'").get().total || 0;
    const pendingFees = db.prepare("SELECT SUM(amount) as total FROM fees WHERE status = 'unpaid'").get().total || 0;
    const totalTeachers = db.prepare("SELECT COUNT(*) as count FROM teachers").get().count;
    
    res.json({ totalBoys, totalGirls, totalFees, pendingFees, totalTeachers });
  });

  app.get("/api/students", (req, res) => {
    const { portal } = req.query;
    let students;
    if (portal) {
      students = db.prepare("SELECT * FROM students WHERE portal = ?").all(portal);
    } else {
      students = db.prepare("SELECT * FROM students").all();
    }
    res.json(students);
  });

  app.post("/api/students/register", (req, res) => {
    const s = req.body;
    
    // Find next roll number starting from 100
    const lastStudent = db.prepare("SELECT roll_number FROM students ORDER BY roll_number DESC LIMIT 1").get();
    const rollNumber = lastStudent ? Math.max(100, lastStudent.roll_number + 1) : 100;
    
    try {
      const result = db.prepare(`
        INSERT INTO students (
          roll_number, full_name, father_name, gender, dob, cnic, 
          class, group_name, board_reg_no, prev_marks, prev_percentage,
          student_mobile, parent_mobile, email, address, portal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        rollNumber, s.fullName, s.fatherName, s.gender, s.dob, s.cnic,
        s.class, s.groupName, s.boardRegNo, s.prevMarks, (s.prevMarks / 1100 * 100).toFixed(2),
        s.studentMobile, s.parentMobile, s.email, s.address, s.portal
      );

      const studentId = result.lastInsertRowid;
      // Create user account
      db.prepare("INSERT INTO users (username, password, role, portal, student_id) VALUES (?, ?, ?, ?, ?)")
        .run(rollNumber.toString(), "student123", "student", s.portal, studentId);

      res.json({ success: true, rollNumber });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/student/:id/dashboard", (req, res) => {
    const studentId = req.params.id;
    const student = db.prepare("SELECT * FROM students WHERE id = ?").get(studentId);
    const attendance = db.prepare("SELECT * FROM attendance WHERE student_id = ?").all(studentId);
    const marks = db.prepare("SELECT * FROM marks WHERE student_id = ?").all(studentId);
    const fees = db.prepare("SELECT * FROM fees WHERE student_id = ?").all(studentId);
    
    res.json({ student, attendance, marks, fees });
  });

  app.get("/api/teacher/:id/dashboard", (req, res) => {
    const teacherId = req.params.id;
    const teacher = db.prepare("SELECT * FROM teachers WHERE id = ?").get(teacherId);
    const students = db.prepare("SELECT * FROM students").all();
    const marks = db.prepare("SELECT * FROM marks WHERE teacher_id = ?").all(teacherId);
    
    res.json({ teacher, students, marks });
  });

  app.post("/api/marks/add", (req, res) => {
    const { studentId, subject, marksObtained, totalMarks, examType, date, teacherId } = req.body;
    db.prepare("INSERT INTO marks (student_id, subject, marks_obtained, total_marks, exam_type, date, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
      .run(studentId, subject, marksObtained, totalMarks, examType, date, teacherId);
    res.json({ success: true });
  });

  app.post("/api/attendance/mark", (req, res) => {
    const { studentId, date, status } = req.body;
    // Check if attendance already exists for this date
    const existing = db.prepare("SELECT id FROM attendance WHERE student_id = ? AND date = ?").get(studentId, date);
    if (existing) {
      db.prepare("UPDATE attendance SET status = ? WHERE id = ?").run(status, existing.id);
    } else {
      db.prepare("INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)")
        .run(studentId, date, status);
    }
    res.json({ success: true });
  });

  app.get("/api/attendance/today", (req, res) => {
    const { date } = req.query;
    const attendance = db.prepare("SELECT * FROM attendance WHERE date = ?").all(date);
    res.json(attendance);
  });

  app.post("/api/fees/generate", (req, res) => {
    const { studentId, month, amount, dueDate } = req.body;
    const voucherId = `VOU-${Date.now()}`;
    db.prepare("INSERT INTO fees (student_id, month, amount, due_date, voucher_id) VALUES (?, ?, ?, ?, ?)")
      .run(studentId, month, amount, dueDate, voucherId);
    res.json({ success: true, voucherId });
  });

  app.post("/api/fees/pay", (req, res) => {
    const { voucherId } = req.body;
    db.prepare("UPDATE fees SET status = 'paid' WHERE voucher_id = ?").run(voucherId);
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

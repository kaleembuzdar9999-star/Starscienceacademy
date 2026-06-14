import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

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

// Seed test students, attendance, marks, and fees if empty
const studentsCount = db.prepare("SELECT COUNT(*) as count FROM students").get().count;
if (studentsCount === 0) {
  console.log("Seeding initial school database...");
  const seedStudents = [
    { name: "Muhammad Ali", father: "Imran Ali", gender: "Male", cnic: "32102-1234567-1", class: "11th", group: "Pre-Engineering", portal: "boys", marks: 980 },
    { name: "Ayesha Fatima", father: "Kamran Khan", gender: "Female", cnic: "32102-2345678-2", class: "12th", group: "Pre-Medical", portal: "girls", marks: 1045 },
    { name: "Hamza Tariq", father: "Tariq Mahmood", gender: "Male", cnic: "32102-3456789-3", class: "11th", group: "ICS", portal: "boys", marks: 890 },
    { name: "Zainab Bibi", father: "Sajid Rashid", gender: "Female", cnic: "32102-4567890-4", class: "12th", group: "ICS", portal: "girls", marks: 940 },
    { name: "Usman Ghani", father: "Abdul Rehman", gender: "Male", cnic: "32102-5678901-5", class: "11th", group: "Pre-Medical", portal: "boys", marks: 780 }
  ];

  let currentRoll = 100;
  for (const s of seedStudents) {
    const res = db.prepare(`
      INSERT INTO students (
        roll_number, full_name, father_name, gender, dob, cnic, 
        class, group_name, board_reg_no, prev_marks, prev_percentage,
        student_mobile, parent_mobile, email, address, portal
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      currentRoll, s.name, s.father, s.gender, "2007-06-15", s.cnic,
      s.class, s.group, `REG-${currentRoll}`, s.marks, (s.marks / 1100 * 100).toFixed(2),
      "+923001234567", "+923007654321", `${s.name.toLowerCase().replace(" ", "")}@star.edu`, "Choti Zareen, DG Khan", s.portal
    );
    
    const studentId = res.lastInsertRowid;
    
    // User Account
    db.prepare("INSERT INTO users (username, password, role, portal, student_id) VALUES (?, ?, ?, ?, ?)")
      .run(currentRoll.toString(), "student123", "student", s.portal, studentId);

    // Seed attendance records for past 5 days
    const dates = ["2026-06-09", "2026-06-10", "2026-06-11", "2026-06-12", "2026-06-13"];
    for (const d of dates) {
      const status = Math.random() > 0.15 ? "present" : "absent";
      db.prepare("INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)")
        .run(studentId, d, status);
    }

    // Seed marks for subjects
    const subjects = ["Physics", "Chemistry", "Biology", "Mathematics"];
    const exams = ["Class Test", "Monthly", "Mid-Term"];
    for (const sub of subjects) {
      for (const ex of exams) {
        const val = s.marks / 1100;
        const score = Math.floor(Math.max(40, Math.min(100, val * 100 + (Math.random() * 20 - 10))));
        db.prepare("INSERT INTO marks (student_id, subject, marks_obtained, total_marks, exam_type, date, teacher_id) VALUES (?, ?, ?, ?, ?, ?, ?)")
          .run(studentId, sub, score, 100, ex, "2026-06-01", 1);
      }
    }

    // Seed fees
    db.prepare("INSERT INTO fees (student_id, month, amount, due_date, status, voucher_id) VALUES (?, ?, ?, ?, ?, ?)")
      .run(studentId, "April", 2500, "2026-04-10", "paid", `VOU-${currentRoll}-APR`);
    db.prepare("INSERT INTO fees (student_id, month, amount, due_date, status, voucher_id) VALUES (?, ?, ?, ?, ?, ?)")
      .run(studentId, "May", 2500, "2026-05-10", "paid", `VOU-${currentRoll}-MAY`);
    db.prepare("INSERT INTO fees (student_id, month, amount, due_date, status, voucher_id) VALUES (?, ?, ?, ?, ?, ?)")
      .run(studentId, "June", 2500, "2026-06-10", Math.random() > 0.4 ? "paid" : "unpaid", `VOU-${currentRoll}-JUN`);

    currentRoll++;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

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
    
    // Top 5 Students calculation
    const topStudents = db.prepare(`
      SELECT s.id, s.roll_number, s.full_name, s.class, s.group_name, s.portal,
             ROUND(COALESCE(
               (SELECT AVG(CAST(m.marks_obtained AS REAL) / m.total_marks * 100) FROM marks m WHERE m.student_id = s.id),
               s.prev_percentage
             ), 1) as performance
      FROM students s
      ORDER BY performance DESC
      LIMIT 5
    `).all();

    // Fee trend by month
    const feeTrends = db.prepare(`
      SELECT month, 
             SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as collected,
             SUM(CASE WHEN status = 'unpaid' THEN amount ELSE 0 END) as pending
      FROM fees
      GROUP BY month
      ORDER BY id ASC
    `).all();

    // Attendance stats
    const attendanceStats = db.prepare(`
      SELECT 
        SUM(CASE WHEN s.portal = 'boys' AND a.status = 'present' THEN 1 ELSE 0 END) as presentBoys,
        SUM(CASE WHEN s.portal = 'boys' AND a.status = 'absent' THEN 1 ELSE 0 END) as absentBoys,
        SUM(CASE WHEN s.portal = 'girls' AND a.status = 'present' THEN 1 ELSE 0 END) as presentGirls,
        SUM(CASE WHEN s.portal = 'girls' AND a.status = 'absent' THEN 1 ELSE 0 END) as absentGirls
      FROM attendance a
      JOIN students s ON a.student_id = s.id
    `).get();

    // Subject Performance chart data
    const subjectPerformance = db.prepare(`
      SELECT subject as label, ROUND(AVG(CAST(marks_obtained AS REAL) / total_marks * 100), 1) as value
      FROM marks
      GROUP BY subject
    `).all();

    // Retrieve all issued fee vouchers with student data
    const allFees = db.prepare(`
      SELECT f.*, s.roll_number, s.full_name
      FROM fees f
      JOIN students s ON f.student_id = s.id
      ORDER BY f.id DESC
    `).all();

    res.json({ 
      totalBoys, 
      totalGirls, 
      totalFees, 
      pendingFees, 
      totalTeachers,
      topStudents,
      feeTrends,
      attendanceStats,
      subjectPerformance,
      allFees
    });
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

    // Top 5 students specifically for the teacher's subject if possible, or overall
    const topStudents = db.prepare(`
      SELECT s.id, s.roll_number, s.full_name, s.class, s.group_name, s.portal,
             ROUND(AVG(CAST(m.marks_obtained AS REAL) / m.total_marks * 100), 1) as performance
      FROM students s
      JOIN marks m ON s.id = m.student_id
      WHERE m.subject = ?
      GROUP BY s.id
      ORDER BY performance DESC
      LIMIT 5
    `).all(teacher?.subject || 'Physics');

    // Fallback if no entries yet for this subject
    const displayTopStudents = topStudents.length > 0 ? topStudents : db.prepare(`
      SELECT id, roll_number, full_name, class, group_name, portal, prev_percentage as performance
      FROM students
      ORDER BY prev_percentage DESC
      LIMIT 5
    `).all();

    // Group marks by exam type for charts
    const examPerformance = db.prepare(`
      SELECT exam_type as label, ROUND(AVG(CAST(marks_obtained AS REAL) / total_marks * 100), 1) as value
      FROM marks
      WHERE subject = ?
      GROUP BY exam_type
    `).all(teacher?.subject || 'Physics');

    // Attendance rates for teacher's view (past few days)
    const teacherAttendance = db.prepare(`
      SELECT date,
             SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present,
             COUNT(*) as total
      FROM attendance
      GROUP BY date
      ORDER BY date DESC
      LIMIT 5
    `).all();

    res.json({ 
      teacher, 
      students, 
      marks,
      topStudents: displayTopStudents,
      examPerformance,
      attendanceStats: teacherAttendance.reverse()
    });
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
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

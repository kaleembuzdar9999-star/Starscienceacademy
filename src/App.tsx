/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  School, 
  Users, 
  UserCircle, 
  LayoutDashboard, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Clock,
  CheckCircle2,
  FileText,
  CreditCard,
  Calendar,
  Search,
  Plus,
  Download,
  Share2,
  TrendingUp,
  Award,
  Star,
  MessageCircle,
  AlertCircle,
  WifiOff
} from 'lucide-react';
import { User, Student, Mark, Attendance, Fee, Teacher } from './types';

// --- Components ---

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Star className="w-16 h-16 text-indigo-600 fill-indigo-600" />
    </motion.div>
    <p className="mt-4 font-display font-bold text-slate-900 animate-pulse">STAR ACADEMY LOADING...</p>
    {!navigator.onLine && (
      <div className="mt-4 flex items-center gap-2 text-red-600 font-medium">
        <WifiOff className="w-5 h-5" /> No Internet Connection
      </div>
    )}
  </div>
);

const Navbar = ({ user, onLogout, onLoginClick }: { user: User | null, onLogout: () => void, onLoginClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Star className="w-8 h-8 text-indigo-600 fill-indigo-600" />
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 hidden sm:block uppercase">
              STAR ACADEMY CHOTI ZAREEN
            </span>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 sm:hidden">
              SACZ
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Home</a>
            <a href="#about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">About</a>
            <a href="#portals" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">Portals</a>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-500">Welcome, {user.username}</span>
                <button onClick={onLogout} className="btn-secondary flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <button onClick={onLoginClick} className="btn-primary">Login to Portal</button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <a href="#home" className="block px-3 py-2 text-slate-600 font-medium">Home</a>
              <a href="#about" className="block px-3 py-2 text-slate-600 font-medium">About</a>
              <a href="#portals" className="block px-3 py-2 text-slate-600 font-medium">Portals</a>
              {user ? (
                <button onClick={onLogout} className="w-full text-left px-3 py-2 text-red-600 font-medium">Logout</button>
              ) : (
                <button onClick={onLoginClick} className="w-full text-left px-3 py-2 text-indigo-600 font-medium">Login</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onLoginClick }: { onLoginClick: () => void }) => (
  <section id="home" className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-4 bg-white rounded-full shadow-xl border border-slate-100"
          >
            <Star className="w-12 h-12 text-indigo-600 fill-indigo-600" />
          </motion.div>
        </div>
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
          Excellence in Education
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight">
          Empowering Minds with <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">AI-Driven Management</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
          Star Science Academy Choti Zareen provides quality education for 11th & 12th classes with a modern, automated, and secure digital platform.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onLoginClick} className="btn-primary px-8 py-4 text-lg flex items-center gap-2">
            Access Portals <ChevronRight className="w-5 h-5" />
          </button>
          <a href="#about" className="btn-secondary px-8 py-4 text-lg">Learn More</a>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16 relative"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
          <img 
            src="https://picsum.photos/seed/school/1200/600" 
            alt="Academy Campus" 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-4 sm:gap-8 px-6 py-4 bg-white rounded-xl shadow-xl border border-slate-100 max-w-full overflow-x-auto">
          <div className="text-center min-w-[100px]">
            <div className="text-2xl font-bold text-indigo-600">11th & 12th</div>
            <div className="text-xs text-slate-500 uppercase font-semibold">Classes</div>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-center min-w-[100px]">
            <div className="text-2xl font-bold text-indigo-600">BISE DGK</div>
            <div className="text-xs text-slate-500 uppercase font-semibold">Affiliation</div>
          </div>
          <div className="w-px h-10 bg-slate-200"></div>
          <div className="text-center min-w-[100px]">
            <div className="text-2xl font-bold text-indigo-600">AI-Powered</div>
            <div className="text-xs text-slate-500 uppercase font-semibold">Systems</div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Features = () => {
  const features = [
    { icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />, title: "Secure Portals", desc: "Separate digital environments for boys and girls to maintain privacy and discipline." },
    { icon: <TrendingUp className="w-6 h-6 text-indigo-600" />, title: "AI Result System", desc: "Automated calculation of marks, percentages, and grades with performance analysis." },
    { icon: <FileText className="w-6 h-6 text-orange-600" />, title: "Digital Vouchers", desc: "Monthly fee vouchers generated automatically with online status tracking." },
    { icon: <Users className="w-6 h-6 text-blue-600" />, title: "Student Hub", desc: "Personalized dashboards for students to track attendance, results, and fees." },
    { icon: <Clock className="w-6 h-6 text-purple-600" />, title: "Real-time Tracking", desc: "Daily attendance monitoring with automated alerts for parents and administration." },
    { icon: <Share2 className="w-6 h-6 text-pink-600" />, title: "Easy Sharing", desc: "One-click sharing of results and vouchers via WhatsApp, Email, or PDF download." },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Comprehensive Management</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Our system integrates automation, transparency, and efficiency into every aspect of school administration.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: User) => void }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [portal, setPortal] = useState<'boys' | 'girls' | 'admin' | 'teacher'>('boys');
  
  // Sign up fields
  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [dob, setDob] = useState('');
  const [cnic, setCnic] = useState('');
  const [studentClass, setStudentClass] = useState('11th');
  const [groupName, setGroupName] = useState('Pre-Medical');
  const [boardRegNo, setBoardRegNo] = useState('');
  const [prevMarks, setPrevMarks] = useState('');
  const [studentMobile, setStudentMobile] = useState('');
  const [parentMobile, setParentMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (mode === 'signup') {
        const res = await fetch('/api/students/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fullName, fatherName, gender: portal === 'boys' ? 'Male' : 'Female', 
            dob, cnic, class: studentClass, groupName, boardRegNo, 
            prevMarks: parseInt(prevMarks), studentMobile, parentMobile, email, address, portal
          })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccessMsg(`Registration successful! Your Roll Number is ${data.rollNumber}. Use it to login with password 'student123'.`);
          setMode('signin');
          setUsername(data.rollNumber.toString());
          setPassword('student123');
        } else {
          setError(data.error || 'Registration failed');
        }
      } else if (mode === 'forgot') {
        const res = await fetch('/api/forgot-password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, cnic, portal })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccessMsg(`Your password is: ${data.password}`);
          setMode('signin');
        } else {
          setError(data.error || 'Recovery failed. Check details.');
        }
      } else {
        const res = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, portal })
        });
        const data = await res.json();
        if (res.ok) {
          onLogin(data.user);
          onClose();
        } else {
          setError(data.error || 'Login failed');
        }
      }
    } catch (err) {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-900">
              {mode === 'signup' ? 'Student Self-Registration' : mode === 'forgot' ? 'Recover Password' : 'Portal Login'}
            </h2>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600"><X /></button>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Select Your Portal</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button 
                  type="button"
                  onClick={() => setPortal('boys')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${portal === 'boys' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                >
                  Boys
                </button>
                <button 
                  type="button"
                  onClick={() => setPortal('girls')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${portal === 'girls' ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                >
                  Girls
                </button>
                <button 
                  type="button"
                  onClick={() => setPortal('teacher')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${portal === 'teacher' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                >
                  Teacher
                </button>
                <button 
                  type="button"
                  onClick={() => setPortal('admin')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${portal === 'admin' ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-100 text-slate-600'}`}
                >
                  Admin
                </button>
              </div>
            </div>

            {mode === 'signup' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="text" placeholder="Father Name" required value={fatherName} onChange={e => setFatherName(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="date" placeholder="Date of Birth" required value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="text" placeholder="CNIC / B-Form" required value={cnic} onChange={e => setCnic(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <select value={studentClass} onChange={e => setStudentClass(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <option value="11th">11th Class</option>
                  <option value="12th">12th Class</option>
                </select>
                <select value={groupName} onChange={e => setGroupName(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <option value="Pre-Medical">Pre-Medical</option>
                  <option value="Pre-Engineering">Pre-Engineering</option>
                  <option value="ICS">ICS</option>
                  <option value="FA">FA</option>
                </select>
                <input type="text" placeholder="Board Reg No" value={boardRegNo} onChange={e => setBoardRegNo(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="number" placeholder="Previous Class Marks" value={prevMarks} onChange={e => setPrevMarks(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="tel" placeholder="Student Mobile" value={studentMobile} onChange={e => setStudentMobile(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="tel" placeholder="Parent Mobile" required value={parentMobile} onChange={e => setParentMobile(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" />
                <input type="text" placeholder="Complete Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg md:col-span-2" />
              </div>
            ) : mode === 'forgot' ? (
              <div className="space-y-4">
                <div className="p-4 bg-indigo-50 rounded-lg text-sm text-indigo-700 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <p>Enter your Roll Number and CNIC to recover your password. Admin must enter username.</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Username / Roll Number</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="e.g. 101" required />
                </div>
                {portal !== 'admin' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">CNIC / B-Form</label>
                    <input type="text" value={cnic} onChange={e => setCnic(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" placeholder="Enter CNIC used during registration" required />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Username / Roll Number</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Enter your ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </>
            )}

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3 text-lg mt-2 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : (mode === 'signup' ? 'Register Now' : mode === 'forgot' ? 'Recover Password' : 'Sign In')}
            </button>

            <div className="flex flex-col gap-2 text-center mt-4">
              {mode === 'signin' && (
                <>
                  <button 
                    type="button" 
                    onClick={() => { setMode('signup'); setError(''); }}
                    className="text-sm text-indigo-600 font-semibold hover:underline"
                  >
                    New Student? Register Yourself
                  </button>
                  <button 
                    type="button" 
                    onClick={() => { setMode('forgot'); setError(''); }}
                    className="text-sm text-slate-500 font-medium hover:text-indigo-600"
                  >
                    Forgot Password?
                  </button>
                </>
              )}
              {(mode === 'signup' || mode === 'forgot') && (
                <button 
                  type="button" 
                  onClick={() => { setMode('signin'); setError(''); }}
                  className="text-sm text-indigo-600 font-semibold hover:underline"
                >
                  Back to Login
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

// --- Dashboard Views ---

const TeacherPortal = ({ user }: { user: User }) => {
  const [data, setData] = useState<{ teacher: Teacher, students: Student[], marks: Mark[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'students' | 'marks'>('students');
  
  // Mark entry state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [subject, setSubject] = useState('');
  const [marksObtained, setMarksObtained] = useState('');
  const [totalMarks, setTotalMarks] = useState('100');
  const [examType, setExamType] = useState('Monthly');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/teacher/${user.teacher_id}/dashboard`);
        setData(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.teacher_id]);

  const handleAddMarks = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;
    
    try {
      const res = await fetch('/api/marks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: selectedStudent.id,
          subject,
          marksObtained: parseInt(marksObtained),
          totalMarks: parseInt(totalMarks),
          examType,
          date: new Date().toISOString().split('T')[0],
          teacherId: user.teacher_id
        })
      });
      if (res.ok) {
        alert('Marks added successfully!');
        setMarksObtained('');
        setSelectedStudent(null);
        // Refresh data
        const refreshRes = await fetch(`/api/teacher/${user.teacher_id}/dashboard`);
        setData(await refreshRes.json());
      }
    } catch (err) {
      alert('Failed to add marks');
    }
  };

  const sendWhatsApp = (student: Student, message: string) => {
    const phone = student.parent_mobile.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) return <LoadingOverlay />;
  if (!data) return <div className="pt-32 text-center">Error loading teacher portal</div>;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm mb-4">
              <h3 className="font-bold text-slate-900">{data.teacher.full_name}</h3>
              <p className="text-sm text-slate-500">{data.teacher.subject} Teacher</p>
            </div>
            <button 
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'students' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Users className="w-5 h-5" /> My Students
            </button>
            <button 
              onClick={() => setActiveTab('marks')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'marks' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Award className="w-5 h-5" /> Manage Results
            </button>
          </div>

          <div className="flex-1">
            {activeTab === 'students' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Student List</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                      <tr>
                        <th className="px-6 py-4">Roll No</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Class</th>
                        <th className="px-6 py-4">WhatsApp</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.students.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm font-medium text-indigo-600">{s.roll_number}</td>
                          <td className="px-6 py-4 font-semibold text-slate-900">{s.full_name}</td>
                          <td className="px-6 py-4 text-slate-600 text-sm">{s.class} ({s.group_name})</td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => sendWhatsApp(s, `Assalam-o-Alaikum, this is ${data.teacher.full_name} from Star Academy. I wanted to discuss ${s.full_name}'s performance.`)}
                              className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                            >
                              <MessageCircle className="w-5 h-5" />
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => { setSelectedStudent(s); setActiveTab('marks'); setSubject(data.teacher.subject); }}
                              className="text-emerald-600 hover:text-emerald-800 font-bold text-sm"
                            >
                              Add Marks
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'marks' && (
              <div className="space-y-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Enter Student Marks</h3>
                  <form onSubmit={handleAddMarks} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Select Student</label>
                      <select 
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg"
                        value={selectedStudent?.id || ''}
                        onChange={(e) => setSelectedStudent(data.students.find(s => s.id === parseInt(e.target.value)) || null)}
                        required
                      >
                        <option value="">Choose a student...</option>
                        {data.students.map(s => (
                          <option key={s.id} value={s.id}>{s.roll_number} - {s.full_name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
                      <input type="text" value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Marks Obtained</label>
                      <input type="number" value={marksObtained} onChange={e => setMarksObtained(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Total Marks</label>
                      <input type="number" value={totalMarks} onChange={e => setTotalMarks(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Exam Type</label>
                      <select value={examType} onChange={e => setExamType(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                        <option value="Class Test">Class Test</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Mid-Term">Mid-Term</option>
                        <option value="Final">Final</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <button type="submit" className="w-full btn-primary py-3 bg-emerald-600 hover:bg-emerald-700">Submit Marks</button>
                    </div>
                  </form>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900">Recent Entries</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Student</th>
                          <th className="px-6 py-4">Subject</th>
                          <th className="px-6 py-4">Marks</th>
                          <th className="px-6 py-4">Type</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {data.marks.slice().reverse().map(m => {
                          const student = data.students.find(s => s.id === m.student_id);
                          return (
                            <tr key={m.id}>
                              <td className="px-6 py-4 text-sm text-slate-500">{m.date}</td>
                              <td className="px-6 py-4 font-semibold text-slate-900">{student?.full_name}</td>
                              <td className="px-6 py-4 text-slate-600 text-sm">{m.subject}</td>
                              <td className="px-6 py-4 font-bold text-indigo-600">{m.marks_obtained}/{m.total_marks}</td>
                              <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs font-bold uppercase">{m.exam_type}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ user }: { user: User }) => {
  const [stats, setStats] = useState({ totalBoys: 0, totalGirls: 0, totalFees: 0, pendingFees: 0, totalTeachers: 0 });
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'attendance' | 'fees'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const [statsRes, studentsRes, attendanceRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/students'),
          fetch(`/api/attendance/today?date=${today}`)
        ]);
        setStats(await statsRes.json());
        setStudents(await studentsRes.json());
        setAttendance(await attendanceRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleMarkAttendance = async (studentId: number, status: 'present' | 'absent') => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch('/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, date: today, status })
      });
      if (res.ok) {
        // Update local state
        const updatedAttendance = [...attendance];
        const index = updatedAttendance.findIndex(a => a.student_id === studentId);
        if (index > -1) {
          updatedAttendance[index].status = status;
        } else {
          updatedAttendance.push({ id: 0, student_id: studentId, date: today, status });
        }
        setAttendance(updatedAttendance);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const sendWhatsApp = (student: Student, message: string) => {
    const phone = student.parent_mobile.replace(/\D/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (loading) return <LoadingOverlay />;

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <LayoutDashboard className="w-5 h-5" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'students' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Users className="w-5 h-5" /> Students
            </button>
            <button 
              onClick={() => setActiveTab('attendance')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'attendance' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <CheckCircle2 className="w-5 h-5" /> Attendance
            </button>
            <button 
              onClick={() => setActiveTab('fees')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'fees' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <CreditCard className="w-5 h-5" /> Fee Management
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-sm font-semibold uppercase mb-2">Total Boys</div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalBoys}</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-sm font-semibold uppercase mb-2">Teachers</div>
                    <div className="text-3xl font-bold text-slate-900">{stats.totalTeachers}</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-sm font-semibold uppercase mb-2">Fees Collected</div>
                    <div className="text-3xl font-bold text-emerald-600">Rs. {stats.totalFees}</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-sm font-semibold uppercase mb-2">Pending Fees</div>
                    <div className="text-3xl font-bold text-orange-600">Rs. {stats.pendingFees}</div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <UserCircle />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">New Student Registered</div>
                        <div className="text-sm text-slate-500">Ahmad Khan (SSA-123456) was added to Boys Portal</div>
                      </div>
                    </div>
                    {/* More mock activities */}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-900">Student Directory</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="Search by roll no..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                      <tr>
                        <th className="px-6 py-4">Roll No</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Class</th>
                        <th className="px-6 py-4">Portal</th>
                        <th className="px-6 py-4">WhatsApp</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map(s => (
                        <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm font-medium text-indigo-600">{s.roll_number}</td>
                          <td className="px-6 py-4 font-semibold text-slate-900">{s.full_name}</td>
                          <td className="px-6 py-4 text-slate-600">{s.class} ({s.group_name})</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${s.portal === 'boys' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                              {s.portal}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => sendWhatsApp(s, `Assalam-o-Alaikum, this is Star Academy Administration. We are contacting you regarding ${s.full_name}.`)}
                              className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                            >
                              <MessageCircle className="w-5 h-5" />
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Daily Attendance</h3>
                    <p className="text-sm text-slate-500">Marking for: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                      <tr>
                        <th className="px-6 py-4">Roll No</th>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {students.map(s => {
                        const att = attendance.find(a => a.student_id === s.id);
                        return (
                          <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm font-medium text-indigo-600">{s.roll_number}</td>
                            <td className="px-6 py-4 font-semibold text-slate-900">{s.full_name}</td>
                            <td className="px-6 py-4">
                              {att ? (
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${att.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                  {att.status}
                                </span>
                              ) : (
                                <span className="text-slate-400 text-xs italic">Not Marked</span>
                              )}
                            </td>
                            <td className="px-6 py-4 flex gap-2">
                              <button 
                                onClick={() => handleMarkAttendance(s.id, 'present')}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${att?.status === 'present' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-emerald-50'}`}
                              >
                                Present
                              </button>
                              <button 
                                onClick={() => handleMarkAttendance(s.id, 'absent')}
                                className={`px-3 py-1 rounded text-xs font-bold transition-all ${att?.status === 'absent' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-red-50'}`}
                              >
                                Absent
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StudentHub = ({ user }: { user: User }) => {
  const [data, setData] = useState<{ student: Student, attendance: Attendance[], marks: Mark[], fees: Fee[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/student/${user.student_id}/dashboard`);
        setData(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.student_id]);

  if (loading) return <LoadingOverlay />;
  if (!data) return <div className="pt-32 text-center">Error loading data</div>;

  const attendancePercentage = data.attendance.length > 0 
    ? (data.attendance.filter(a => a.status === 'present').length / data.attendance.length * 100).toFixed(1)
    : "0.0";

  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm text-center">
              <div className="w-32 h-32 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-6 border-4 border-white shadow-lg overflow-hidden">
                <UserCircle className="w-20 h-20 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-display font-bold text-slate-900">{data.student.full_name}</h2>
              <p className="text-slate-500 font-medium mb-4">Roll No: {data.student.roll_number}</p>
              <div className="flex justify-center gap-2 mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase">{data.student.class}</span>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase">{data.student.group_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t pt-6">
                <div className="text-center">
                  <div className="text-sm text-slate-500 uppercase font-semibold mb-1">Attendance</div>
                  <div className="text-xl font-bold text-indigo-600">{attendancePercentage}%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-500 uppercase font-semibold mb-1">Status</div>
                  <div className="text-xl font-bold text-emerald-600">Active</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" /> Attendance Log
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {data.attendance.slice().reverse().map(a => (
                  <div key={a.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg text-sm">
                    <span className="text-slate-600">{a.date}</span>
                    <span className={`font-bold uppercase text-[10px] px-2 py-0.5 rounded ${a.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
                {data.attendance.length === 0 && <p className="text-center text-slate-400 text-xs py-4">No attendance marked yet.</p>}
              </div>
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Academic Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl text-white shadow-lg shadow-indigo-200">
                <div className="flex justify-between items-start mb-4">
                  <Award className="w-8 h-8 opacity-80" />
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">Latest Result</span>
                </div>
                <div className="text-4xl font-bold mb-1">
                  {data.marks.length > 0 ? (data.marks[data.marks.length-1].marks_obtained / data.marks[data.marks.length-1].total_marks >= 0.8 ? 'A+' : 'A') : 'N/A'}
                </div>
                <div className="text-sm opacity-80">Overall Performance Grade</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-200">
                <div className="flex justify-between items-start mb-4">
                  <TrendingUp className="w-8 h-8 opacity-80" />
                  <span className="text-xs font-bold uppercase tracking-wider opacity-80">Academic Average</span>
                </div>
                <div className="text-4xl font-bold mb-1">
                  {data.marks.length > 0 
                    ? (data.marks.reduce((acc, m) => acc + (m.marks_obtained/m.total_marks), 0) / data.marks.length * 100).toFixed(0)
                    : 0}%
                </div>
                <div className="text-sm opacity-80">Average Score across subjects</div>
              </div>
            </div>

            {/* Marks Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-900">Academic Records</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                    <tr>
                      <th className="px-6 py-4">Subject</th>
                      <th className="px-6 py-4">Obtained</th>
                      <th className="px-6 py-4">Total</th>
                      <th className="px-6 py-4">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.marks.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-semibold text-slate-900">{m.subject}</td>
                        <td className="px-6 py-4 text-slate-600">{m.marks_obtained}</td>
                        <td className="px-6 py-4 text-slate-600">{m.total_marks}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded font-bold text-xs">
                            {m.marks_obtained / m.total_marks >= 0.8 ? 'A+' : 'A'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {data.marks.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-slate-500 italic">No marks recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Fee Status */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Fee History</h3>
              <div className="space-y-4">
                {data.fees.map(f => (
                  <div key={f.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${f.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                        {f.status === 'paid' ? <CheckCircle2 /> : <Clock />}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{f.month} Fee</div>
                        <div className="text-xs text-slate-500">Voucher: {f.voucher_id}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">Rs. {f.amount}</div>
                      <div className={`text-xs font-bold uppercase ${f.status === 'paid' ? 'text-emerald-600' : 'text-orange-600'}`}>
                        {f.status}
                      </div>
                    </div>
                  </div>
                ))}
                {data.fees.length === 0 && (
                  <div className="text-center text-slate-500 italic py-4">No fee records found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onLoginClick={() => setIsLoginOpen(true)} 
      />

      <AnimatePresence mode="wait">
        {!user ? (
          <motion.div 
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Hero onLoginClick={() => setIsLoginOpen(true)} />
            <Features />
            
            {/* About Section */}
            <section id="about" className="py-24 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">About Star Academy Choti Zareen</h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                      Star Academy Choti Zareen is a modern educational institution committed to academic excellence, discipline, and technological advancement. The academy provides quality education for 11th and 12th classes under the Punjab Board system.
                    </p>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                      Affiliated with the Board of Intermediate and Secondary Education (BISE), DG Khan, our institution emphasizes discipline, moral values, and academic achievement. We believe that education is not only about passing exams but also about building character, leadership skills, and confidence.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900">Vision</h4>
                          <p className="text-sm text-slate-500">To become a leading institution in academic excellence by integrating AI and digital systems.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1" />
                        <div>
                          <h4 className="font-bold text-slate-900">Mission</h4>
                          <p className="text-sm text-slate-500">To provide quality education aligned with Punjab Board standards and ensure transparency.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img 
                      src="https://picsum.photos/seed/learning/800/600" 
                      alt="Students Learning" 
                      className="rounded-2xl shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-6 -left-6 p-6 bg-indigo-600 text-white rounded-2xl shadow-xl hidden sm:block">
                      <div className="flex items-center gap-3 mb-1">
                        <Star className="w-8 h-8 text-white fill-white" />
                        <div className="text-3xl font-bold">BISE DGK</div>
                      </div>
                      <div className="text-sm font-medium opacity-80">Official Affiliation</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Subjects Section */}
            <section className="py-24 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-display font-bold mb-4">Our Academic Programs</h2>
                  <p className="text-slate-400">Comprehensive coverage of Punjab Board subjects for 11th & 12th Classes.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Physics", "Chemistry", "Biology", "Mathematics", 
                    "English", "Urdu", "Islamic Studies", "Pakistan Studies",
                    "Computer Science", "Statistics", "Economics", "Civics"
                  ].map((subject, idx) => (
                    <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl text-center hover:bg-white/10 transition-colors">
                      <BookOpen className="w-6 h-6 mx-auto mb-2 text-indigo-400" />
                      <span className="font-medium">{subject}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Portals Section */}
            <section id="portals" className="py-24 bg-slate-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-display font-bold text-slate-900 mb-16">Dedicated Portals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white rounded-3xl border border-slate-100 shadow-xl"
                  >
                    <div className="w-20 h-20 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8">
                      <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Boys Portal</h3>
                    <p className="text-slate-600 mb-8">Independent digital environment for male students with separate records and dashboards.</p>
                    <button onClick={() => setIsLoginOpen(true)} className="btn-primary w-full py-4 text-lg">Access Boys Portal</button>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-10 bg-white rounded-3xl border border-slate-100 shadow-xl"
                  >
                    <div className="w-20 h-20 mx-auto bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-8">
                      <Users className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-display font-bold text-slate-900 mb-4">Girls Portal</h3>
                    <p className="text-slate-600 mb-8">Independent digital environment for female students ensuring privacy and structured management.</p>
                    <button onClick={() => setIsLoginOpen(true)} className="btn-primary w-full py-4 text-lg bg-pink-600 hover:bg-pink-700">Access Girls Portal</button>
                  </motion.div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {user.role === 'admin' ? (
              <AdminDashboard user={user} />
            ) : user.role === 'teacher' ? (
              <TeacherPortal user={user} />
            ) : (
              <StudentHub user={user} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLogin={handleLogin} 
      />

      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-8 h-8 text-indigo-400 fill-indigo-400" />
                <span className="font-display font-bold text-xl tracking-tight uppercase">STAR ACADEMY CHOTI ZAREEN</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Modern intermediate education with AI-powered management systems for 11th and 12th classes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#portals" className="hover:text-white transition-colors">Portals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3"><MessageCircle className="w-5 h-5 text-indigo-400" /> WhatsApp Support Available</li>
                <li className="flex items-center gap-3"><LayoutDashboard className="w-5 h-5 text-indigo-400" /> Choti Zareen, DG Khan</li>
                <li className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 text-indigo-400" /> Affiliated with BISE DGK</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} Star Academy Choti Zareen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}


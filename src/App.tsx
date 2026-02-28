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

// --- API CONFIGURATION ---
const API_URL = "https://starscienceacademy-production.up.railway.app";

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
    </div>
  </section>
);

// --- Login Modal with Updated Railway Link ---
const LoginModal = ({ isOpen, onClose, onLogin }: { isOpen: boolean, onClose: () => void, onLogin: (user: User) => void }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [portal, setPortal] = useState<'boys' | 'girls' | 'admin' | 'teacher'>('boys');
  
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
        const res = await fetch(`${API_URL}/api/students/register`, {
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
        const res = await fetch(`${API_URL}/api/forgot-password`, {
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
        const res = await fetch(`${API_URL}/api/login`, {
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
      setError('Connection error: Make sure Backend is running');
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

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Select Your Portal</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button type="button" onClick={() => setPortal('boys')} className={`py-2 rounded-lg text-xs font-bold ${portal === 'boys' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100'}`}>Boys</button>
                <button type="button" onClick={() => setPortal('girls')} className={`py-2 rounded-lg text-xs font-bold ${portal === 'girls' ? 'bg-pink-600 text-white shadow-lg' : 'bg-slate-100'}`}>Girls</button>
                <button type="button" onClick={() => setPortal('teacher')} className={`py-2 rounded-lg text-xs font-bold ${portal === 'teacher' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-100'}`}>Teacher</button>
                <button type="button" onClick={() => setPortal('admin')} className={`py-2 rounded-lg text-xs font-bold ${portal === 'admin' ? 'bg-slate-800 text-white shadow-lg' : 'bg-slate-100'}`}>Admin</button>
              </div>
            </div>

            {mode === 'signup' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Father Name" required value={fatherName} onChange={e => setFatherName(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="date" required value={dob} onChange={e => setDob(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="CNIC / B-Form" required value={cnic} onChange={e => setCnic(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <select value={studentClass} onChange={e => setStudentClass(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                   <option value="11th">11th Class</option>
                   <option value="12th">12th Class</option>
                </select>
                <select value={groupName} onChange={e => setGroupName(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
                   <option value="Pre-Medical">Pre-Medical</option>
                   <option value="Pre-Engineering">Pre-Engineering</option>
                   <option value="ICS">ICS</option>
                   <option value="FA">FA</option>
                </select>
                <input type="tel" placeholder="Parent Mobile" required value={parentMobile} onChange={e => setParentMobile(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="text" placeholder="Complete Address" value={address} onChange={e => setAddress(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            ) : (
              <div className="space-y-4">
                <input type="text" placeholder="Roll Number / Username" required value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
                <input type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-lg" />
              </div>
            )}

            <button disabled={loading} type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-bold">
              {loading ? 'Please wait...' : mode === 'signup' ? 'Register Now' : mode === 'forgot' ? 'Get Password' : 'Sign In'}
            </button>
            
            <div className="flex justify-between text-sm mt-4">
              <button type="button" onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="text-indigo-600 font-medium">
                {mode === 'signin' ? 'New student? Register here' : 'Already registered? Login'}
              </button>
              {mode === 'signin' && (
                <button type="button" onClick={() => setMode('forgot')} className="text-slate-500 hover:text-indigo-600 transition-colors">
                  Forgot Password?
                </button>
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <LoadingOverlay />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar user={user} onLogout={() => setUser(null)} onLoginClick={() => setShowLogin(true)} />
      <Hero onLoginClick={() => setShowLogin(true)} />
      {/* Additional sections like Features go here */}
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} onLogin={setUser} />
    </div>
  );
        }

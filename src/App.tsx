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
  WifiOff,
  Printer
} from 'lucide-react';
import { User, Student, Mark, Attendance, Fee, Teacher } from './types';

// --- Components ---

const CircularLogo = ({ className = "w-12 h-12", dark = false }: { className?: string; dark?: boolean }) => {
  return (
    <div className={`relative ${className} flex items-center justify-center select-none`}>
      <svg className="absolute w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
        <defs>
          <path
            id="circularLogoPath"
            d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
            fill="none"
          />
        </defs>
        <text className={`text-[7.2px] font-sans font-black tracking-[0.11em] uppercase ${dark ? 'fill-indigo-300' : 'fill-indigo-600'}`}>
          <textPath href="#circularLogoPath" startOffset="0%">
            STAR SCIENCE ACADEMY • Star Sci Academy •
          </textPath>
        </text>
      </svg>
      <Star className={`w-1/2 h-1/2 ${dark ? 'text-indigo-400 fill-indigo-400' : 'text-indigo-600 fill-indigo-600'}`} />
    </div>
  );
};

const SubjectPerformanceChart = ({ data }: { data: { label: string; value: number }[] }) => {
  const maxValue = Math.max(...data.map(d => d.value || 0), 10);
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-indigo-600" /> Subject Averages (%)
      </h4>
      <div className="flex items-end gap-3 h-48 pt-6">
        {data.map((item, idx) => {
          const heightPct = (item.value / maxValue) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end">
              <div className="w-full relative group flex justify-center">
                <div className="absolute -top-10 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-semibold whitespace-nowrap z-20">
                  {item.value}% Average Score
                </div>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPct}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-sm"
                />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-500 mt-2 rotate-[-25deg] sm:rotate-0 tracking-tight text-center truncate w-full">{item.label}</span>
            </div>
          );
        })}
        {data.length === 0 && (
          <div className="w-full h-full flex items-center justify-center text-slate-400 italic text-sm">
            No result metrics available.
          </div>
        )}
      </div>
    </div>
  );
};

const FeeTrendChart = ({ data }: { data: { month: string; collected: number; pending: number }[] }) => {
  const maxVal = Math.max(...data.map(d => d.collected + d.pending), 1000);
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-indigo-600" /> Monthly Fee Collection
      </h4>
      <div className="space-y-4">
        {data.map((item, idx) => {
          const totalVal = item.collected + item.pending;
          const collectedPct = (item.collected / maxVal) * 100;
          const pendingPct = (item.pending / maxVal) * 100;
          return (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-600">
                <span className="uppercase tracking-wider">{item.month}</span>
                <span className="text-slate-500">
                  <span className="text-emerald-600">Rs. {item.collected.toLocaleString()}</span> / <span className="text-amber-600">Rs. {item.pending.toLocaleString()}</span>
                </span>
              </div>
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${collectedPct}%` }}
                  transition={{ duration: 1, delay: idx * 0.05 }}
                  className="bg-emerald-500 hover:bg-emerald-600 transition-colors"
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pendingPct}%` }}
                  transition={{ duration: 1, delay: idx * 0.05 }}
                  className="bg-amber-400 hover:bg-amber-500 transition-colors"
                />
              </div>
            </div>
          );
        })}
        {data.length === 0 && (
          <div className="text-center text-slate-400 italic text-sm py-8">
            No fee collection records.
          </div>
        )}
        <div className="flex justify-start gap-4 pt-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-wide">
          <div className="flex items-center gap-1 text-emerald-600">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Collected
          </div>
          <div className="flex items-center gap-1 text-amber-600">
            <span className="w-2.5 h-2.5 rounded bg-amber-400" /> Pending
          </div>
        </div>
      </div>
    </div>
  );
};

const AttendanceCircularChart = ({ title, present, absent }: { title: string; present: number; absent: number }) => {
  const total = present + absent || 1;
  const pct = Math.round((present / total) * 100);
  const offset = 251.2 - (251.2 * pct) / 100;
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
      <h4 className="font-bold text-slate-800 mb-6 self-start flex items-center gap-2">
        <Calendar className="w-5 h-5 text-indigo-600" /> {title} Attendance Today
      </h4>
      <div className="relative w-36 h-36 flex items-center justify-center">
        <svg className="w-full h-full rotate-[-95deg]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-slate-100 fill-none stroke-[8]"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            className="stroke-emerald-500 fill-none stroke-[8] stroke-linecap-round"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ strokeDasharray: "251.2" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-display font-extrabold text-slate-800">{pct}%</span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">Present</span>
        </div>
      </div>
      <div className="flex gap-6 mt-6 text-xs font-bold tracking-tight">
        <div className="text-emerald-600 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {present} Present
        </div>
        <div className="text-slate-400 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> {absent} Absent
        </div>
      </div>
    </div>
  );
};

const TopStudentsWidget = ({ students }: { students: any[] }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Award className="w-5 h-5 text-amber-500" /> Top 5 Students
      </h4>
      <div className="divide-y divide-slate-100">
        {students.map((stu, idx) => {
          const badgeColors = [
            'bg-amber-100 text-amber-700',
            'bg-slate-200 text-slate-700',
            'bg-amber-50 text-amber-600',
            'bg-slate-100 text-slate-500',
            'bg-slate-100 text-slate-500',
          ];
          return (
            <div key={idx} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${badgeColors[idx]}`}>
                  {idx + 1}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    {stu.full_name}
                    {idx === 0 && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                  </div>
                  <div className="text-[10px] text-slate-400 tracking-wider">
                    Roll No: {stu.roll_number} • {stu.class} ({stu.group_name})
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-indigo-600">{stu.performance}%</div>
                <div className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Score</div>
              </div>
            </div>
          );
        })}
        {students.length === 0 && (
          <div className="text-center italic text-sm text-slate-400 py-6">No records dynamic.</div>
        )}
      </div>
    </div>
  );
};

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[200] bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center">
    <motion.div
      animate={{ rotate: 360, scale: [1, 1.1, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    >
      <CircularLogo className="w-24 h-24" />
    </motion.div>
    <p className="mt-6 font-display font-bold text-slate-900 tracking-wider text-sm">STAR SCIENCE ACADEMY IS SECURING RESOURCES...</p>
    {!navigator.onLine && (
      <div className="mt-4 flex items-center gap-2 text-red-600 font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-100">
        <WifiOff className="w-5 h-5 animate-bounce" /> No Internet Connection Available
      </div>
    )}
  </div>
);

const ResultCardPrintModal = ({ student, marks, attendance, onClose }: { student: Student; marks: Mark[]; attendance: Attendance[]; onClose: () => void }) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    setDownloading(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloading(false);
            const blob = new Blob([
              `==========================================\n`,
              `      STAR SCIENCE ACADEMY CHOTI ZAREEN   \n`,
              `          OFFICIAL ACADEMIC TRANSCRIPTS   \n`,
              `==========================================\n\n`,
              `Roll Number: ${student.roll_number}\n`,
              `Student Name: ${student.full_name}\n`,
              `Father Name: ${student.father_name}\n`,
              `Class: ${student.class} (${student.group_name})\n`,
              `Board Reg: ${student.board_reg_no}\n`,
              `Verification Date: ${new Date().toLocaleDateString()}\n\n`,
              `------------------------------------------\n`,
              `Subject          Obtained  Total  Grade\n`,
              `------------------------------------------\n`,
              marks.map(m => `${m.subject.padEnd(16)} ${m.marks_obtained.toString().padStart(8)} ${m.total_marks.toString().padStart(6)}   ${m.marks_obtained/m.total_marks >= 0.8 ? 'A+' : 'A'}`).join('\n'),
              `\n------------------------------------------\n`,
              `Overall Average: ${(marks.reduce((acc, m) => acc + (m.marks_obtained/m.total_marks), 0) / (marks.length || 1) * 100).toFixed(1)}%\n`,
              `Attendance Rate: ${(attendance.filter(a => a.status === 'present').length / (attendance.length || 1) * 100).toFixed(1)}%\n`,
              `Board Standing: Verified Affiliation BISE DGK\n\n`,
              `==========================================\n`,
              `Generated securely via Star Science Academy Digital Portal.\n`
            ], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `Result_Card_${student.roll_number}.txt`;
            link.click();
          }, 400);
          return 100;
        }
        return p + 10;
      });
    }, 100);
  };

  const gpa = (marks.reduce((acc, m) => acc + (m.marks_obtained/m.total_marks), 0) / (marks.length || 1) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[255] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-slate-100"
      >
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CircularLogo className="w-10 h-10" dark={true} />
            <div>
              <h3 className="font-display font-bold text-lg">Official Result Card</h3>
              <p className="text-xs text-indigo-300 font-semibold tracking-wider uppercase">Star Science Academy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div id="printResultCard" className="p-8 md:p-12 relative bg-slate-50 border-8 border-white m-4 rounded-2xl shadow-inner overflow-hidden text-slate-800">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <Star className="w-[80vw] h-[80vw] text-indigo-900 fill-indigo-900" />
          </div>

          <div className="text-center relative mb-8">
            <h1 className="font-display font-black text-3xl tracking-tight text-indigo-950 uppercase">Star Science Academy</h1>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-1">Choti Zareen, Dera Ghazi Khan</p>
            <div className="h-0.5 w-24 bg-gradient-to-r from-emerald-500 to-indigo-600 mx-auto mt-3" />
            <span className="inline-block px-3 py-1 bg-indigo-50 border border-indigo-100 rounded text-[10px] text-indigo-600 font-extrabold tracking-widest uppercase mt-4">OFFICIAL REPORT CARD</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8 text-xs font-semibold bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative">
            <div>
              <p className="text-slate-400">STUDENT NAME</p>
              <p className="text-sm font-bold text-slate-900">{student.full_name}</p>
            </div>
            <div>
              <p className="text-slate-400">ROLL NUMBER</p>
              <p className="text-sm font-bold text-slate-900">{student.roll_number}</p>
            </div>
            <div>
              <p className="text-slate-400">CLASS & GROUP</p>
              <p className="text-sm font-bold text-slate-900">{student.class} ({student.group_name})</p>
            </div>
            <div>
              <p className="text-slate-400">BOARD REG NO</p>
              <p className="text-sm font-bold text-slate-900 font-mono text-indigo-600">{student.board_reg_no || "VERIFIED-100"}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden mb-6 relative">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-extrabold uppercase border-b border-slate-100">
                <tr>
                  <th className="px-5 py-3">Subject</th>
                  <th className="px-5 py-3 text-center">Marks Obtained</th>
                  <th className="px-5 py-3 text-center">Total Marks</th>
                  <th className="px-5 py-3 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {marks.map((m, idx) => (
                  <tr key={idx}>
                    <td className="px-5 py-3 text-slate-900">{m.subject}</td>
                    <td className="px-5 py-3 text-center text-slate-600">{m.marks_obtained}</td>
                    <td className="px-5 py-3 text-center text-slate-600">{m.total_marks}</td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-emerald-600 font-black">{m.marks_obtained/m.total_marks >= 0.8 ? 'A+' : 'A'}</span>
                    </td>
                  </tr>
                ))}
                {marks.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-6 text-center italic text-slate-400">No school papers added yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-indigo-900 text-white p-5 rounded-xl border border-indigo-950 shadow-md">
            <div>
              <p className="text-[10px] text-indigo-200 tracking-wider font-bold uppercase">Aggregate Grade</p>
              <p className="text-2xl font-black">{gpa}% Average</p>
            </div>
            <div className="text-right sm:text-right text-center">
              <p className="text-[10px] text-indigo-200 tracking-wider font-bold uppercase">Affiliated Board</p>
              <p className="text-xs font-bold flex items-center justify-center sm:justify-end gap-1"><ShieldCheck className="w-4 h-4 text-emerald-400" /> BISE DGK Verified</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
          <button 
            onClick={() => window.print()}
            className="btn-secondary py-3 px-5 flex items-center justify-center gap-2 font-bold"
          >
            <Printer className="w-4 h-4" /> Local Print
          </button>
          <button 
            disabled={downloading}
            onClick={handleDownload}
            className="btn-primary py-3 px-5 flex items-center justify-center gap-2 font-bold bg-indigo-600 hover:bg-indigo-750 text-white"
          >
            {downloading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating... {progress}%
              </span>
            ) : (
              <>
                <Download className="w-4 h-4" /> Download Official File
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const CreditCardPaymentModal = ({ voucher, onPaymentSuccess, onClose }: { voucher: Fee; onPaymentSuccess: () => void; onClose: () => void }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaying(true);
    try {
      const res = await fetch('/api/fees/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voucherId: voucher.voucher_id })
      });
      if (res.ok) {
        setTimeout(() => {
          setPaying(false);
          setPaid(true);
          setTimeout(() => {
            onPaymentSuccess();
          }, 1500);
        }, 1200);
      } else {
        setPaying(false);
      }
    } catch (err) {
      console.error(err);
      setPaying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[280] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 font-sans"
      >
        <div className="p-6 bg-indigo-900 text-white flex justify-between items-center">
          <div>
            <h3 className="font-display font-medium text-lg">Secure Fees Gateway</h3>
            <p className="text-xs text-indigo-300 font-bold uppercase tracking-wider">{voucher.month} Fee Voucher</p>
          </div>
          <button type="button" onClick={onClose} className="p-2 text-indigo-200 hover:text-white rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {paid ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 animate-bounce" />
            <h4 className="text-2xl font-bold text-slate-800">Voucher Cleared!</h4>
            <p className="text-sm text-slate-400 font-medium">Rs. {voucher.amount} paid cleanly for {voucher.month}.</p>
          </div>
        ) : (
          <form onSubmit={handlePay} className="p-6 space-y-6">
            <div className="relative h-44 w-full select-none">
              <div className="w-full h-full bg-gradient-to-tr from-indigo-800 to-indigo-950 rounded-2xl p-5 text-white flex flex-col justify-between shadow-xl border border-indigo-900/40">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-wider text-indigo-300">STAR SCIENCE ACADEMY</span>
                    <span className="font-display font-black tracking-tighter text-sm uppercase">Secured POS Terminal</span>
                  </div>
                  <Star className="w-6 h-6 text-indigo-300 fill-indigo-300" />
                </div>
                <div className="text-lg font-mono tracking-widest text-indigo-100">{cardNumber || '•••• •••• •••• ••••'}</div>
                <div className="flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[8px] uppercase text-indigo-400">CARDHOLDER</span>
                    <span className="text-xs font-bold uppercase truncate max-w-40 font-mono tracking-wide">{cardName || 'FULL NAME'}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] uppercase text-indigo-400">EXPIRES</span>
                    <span className="text-xs font-mono font-bold">{expiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">Card Number</label>
                <input 
                  type="text" 
                  maxLength={19}
                  required
                  value={cardNumber} 
                  onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="4000 1234 5678 9010" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">Cardholder Name</label>
                <input 
                  type="text" 
                  required
                  value={cardName} 
                  onChange={e => setCardName(e.target.value)}
                  placeholder="EX. MUHAMMAD ALI" 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none uppercase font-semibold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">Expiration</label>
                  <input 
                    type="text" 
                    maxLength={5}
                    required
                    value={expiry} 
                    onChange={e => {
                      let v = e.target.value.replace(/\D/g, '');
                      if (v.length > 2) v = `${v.substring(0, 2)}/${v.substring(2, 4)}`;
                      setExpiry(v);
                    }}
                    placeholder="MM/YY" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-center font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1">CVV Pin</label>
                  <input 
                    type="password" 
                    maxLength={3}
                    required
                    value={cvv} 
                    onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                    placeholder="•••" 
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none text-center font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center text-sm font-semibold border border-slate-100">
              <span className="text-slate-500">Amount Due:</span>
              <span className="text-lg font-black text-slate-900">Rs. {voucher.amount}</span>
            </div>

            <button 
              type="submit"
              disabled={paying}
              className="w-full btn-primary py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center font-bold"
            >
              {paying ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying Transaction Sockets...
                </span>
              ) : `Authorize Payment Vouchers`}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const StudentDetailsModal = ({ student, onClose, onRefresh }: { student: Student; onClose: () => void; onRefresh?: () => void }) => {
  const [data, setData] = useState<{ student: Student; attendance: Attendance[]; marks: Mark[]; fees: Fee[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'academic' | 'attendance' | 'fees'>('profile');
  const [paymentVoucher, setPaymentVoucher] = useState<Fee | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await fetch(`/api/student/${student.id}/dashboard`);
        setData(await res.json());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [student.id]);

  const handlePayVoucher = async (voucherId: string) => {
    try {
      const res = await fetch('/api/fees/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voucherId })
      });
      if (res.ok) {
        const detailsRes = await fetch(`/api/student/${student.id}/dashboard`);
        setData(await detailsRes.json());
        if (onRefresh) onRefresh();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-[240] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative">
        <CircularLogo className="w-16 h-16 mx-auto mb-4 animate-spin" />
        <p className="font-display font-semibold text-slate-800">Retrieving academy credentials...</p>
      </div>
    </div>
  );

  if (!data) return null;

  const attRate = data.attendance.length > 0 
    ? (data.attendance.filter(a => a.status === 'present').length / data.attendance.length * 100).toFixed(1)
    : "100.0";

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[245] flex items-center justify-center p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <CircularLogo className="w-12 h-12" dark={true} />
            <div>
              <h3 className="font-display font-bold text-xl">{data.student.full_name}</h3>
              <p className="text-xs text-indigo-300 font-extrabold uppercase tracking-widest">Academy Profile: Roll No {data.student.roll_number}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="border-b border-slate-100 flex overflow-x-auto bg-slate-50 px-4 shrink-0 font-bold uppercase tracking-wider text-xs">
          {(['profile', 'academic', 'attendance', 'fees'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-4 py-3.5 border-b-2 text-center whitespace-nowrap transition-all ${activeSubTab === tab ? 'border-indigo-600 text-indigo-600 font-extrabold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              {tab === 'profile' && 'Biodata Profile'}
              {tab === 'academic' && 'Academic Transcript'}
              {tab === 'attendance' && 'Attendance Log'}
              {tab === 'fees' && 'Fee Invoices'}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto min-h-0 flex-1 space-y-6">
          {activeSubTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <UserCircle className="w-6 h-6 text-indigo-600" />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Father Name</label>
                    <span className="font-semibold text-slate-800">{data.student.father_name}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-indigo-600" />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Date of Birth</label>
                    <span className="font-semibold text-slate-800">{data.student.dob}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <FileText className="w-6 h-6 text-indigo-600" />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">CNIC / Form-B No</label>
                    <span className="font-semibold text-slate-800 font-mono">{data.student.cnic}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Board Reg No</label>
                    <span className="font-semibold text-indigo-600 font-mono">{data.student.board_reg_no || "VERIFIED-100"}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-indigo-600" />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Parent Mobile</label>
                    <span className="font-semibold text-slate-800">{data.student.parent_mobile}</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-indigo-600" />
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Student Mobile</label>
                    <span className="font-semibold text-slate-800">{data.student.student_mobile}</span>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Residential Address</label>
                <p className="font-semibold text-slate-800">{data.student.address}</p>
              </div>
            </div>
          )}

          {activeSubTab === 'academic' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-2xl shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">BISE Admission Marks</p>
                  <p className="text-3xl font-black">{data.student.prev_marks} / 1100</p>
                  <p className="text-xs mt-1 font-medium text-indigo-200">Affiliation Standing: {data.student.prev_percentage}%</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-md">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Current Term Average</p>
                  <p className="text-3xl font-black">
                    {data.marks.length > 0 
                      ? (data.marks.reduce((acc, m) => acc + (m.marks_obtained/m.total_marks), 0) / data.marks.length * 100).toFixed(1)
                      : "0.0"}%
                  </p>
                  <p className="text-xs mt-1 font-medium text-emerald-100">{data.marks.length} Academic tests written</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-100">
                    <tr>
                      <th className="px-5 py-3">Subject</th>
                      <th className="px-5 py-3">Obtained Marks</th>
                      <th className="px-5 py-3">Total Score</th>
                      <th className="px-5 py-3">Exam Type</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {data.marks.map((m, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-5 py-3.5 font-bold text-slate-900">{m.subject}</td>
                        <td className="px-5 py-3.5">{m.marks_obtained}</td>
                        <td className="px-5 py-3.5">{m.total_marks}</td>
                        <td className="px-5 py-3.5 uppercase font-extrabold text-[10px] text-indigo-600 tracking-wider">{m.exam_type}</td>
                      </tr>
                    ))}
                    {data.marks.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-5 py-8 text-center italic text-slate-400">No transcripts registered yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSubTab === 'attendance' && (
            <div className="space-y-6">
              <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex justify-between items-center">
                <div>
                  <h4 className="font-extrabold text-indigo-900">Aggregate Presence Rate</h4>
                  <p className="text-xs text-indigo-600 font-semibold">Consolidated regular classes</p>
                </div>
                <div className="text-3xl font-black text-indigo-600">{attRate}%</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2">
                {data.attendance.slice().reverse().map((a, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center">
                    <span className="font-bold text-xs text-slate-600">{a.date}</span>
                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${a.status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {a.status}
                    </span>
                  </div>
                ))}
                {data.attendance.length === 0 && (
                  <p className="col-span-2 text-center text-slate-400 italic py-8">No attendance records generated.</p>
                )}
              </div>
            </div>
          )}

          {activeSubTab === 'fees' && (
            <div className="space-y-4">
              {data.fees.map((f, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${f.status === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                      {f.status === 'paid' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{f.month} Fee Voucher</h4>
                      <p className="text-xs text-slate-400 font-mono">{f.voucher_id}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <div className="text-left sm:text-right">
                      <p className="font-black text-slate-900">Rs. {f.amount}</p>
                      <p className={`text-[10px] font-black uppercase tracking-wider ${f.status === 'paid' ? 'text-emerald-600' : 'text-orange-600'}`}>{f.status}</p>
                    </div>
                    {f.status === 'unpaid' && (
                      <button 
                        onClick={() => setPaymentVoucher(f)}
                        className="btn-primary py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                      >
                        Accept Fee
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {data.fees.length === 0 && (
                <p className="text-center text-slate-400 italic py-8">No billing history for this student.</p>
              )}
            </div>
          )}
        </div>

        {paymentVoucher && (
          <CreditCardPaymentModal 
            voucher={paymentVoucher}
            onPaymentSuccess={() => {
              setPaymentVoucher(null);
              handlePayVoucher(paymentVoucher.voucher_id);
            }}
            onClose={() => setPaymentVoucher(null)}
          />
        )}
      </motion.div>
    </div>
  );
};

const Navbar = ({ user, onLogout, onLoginClick }: { user: User | null, onLogout: () => void, onLoginClick: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <CircularLogo className="w-10 h-10" />
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 hidden sm:block uppercase">
              STAR SCIENCE ACADEMY
            </span>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900 sm:hidden">
              STAR SCIENCE ACADEMY
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
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 bg-white rounded-full shadow-2xl border border-slate-100"
          >
            <CircularLogo className="w-24 h-24" />
          </motion.div>
        </div>
        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-indigo-600 uppercase bg-indigo-50 rounded-full">
          Excellence in Education
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight font-black">
          STAR SCIENCE ACADEMY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600">CHOTI ZAREEN</span>
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
  const [data, setData] = useState<{ 
    teacher: Teacher; 
    students: Student[]; 
    marks: Mark[];
    topStudents: any[];
    examPerformance: any[];
    attendanceStats: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'marks'>('overview');
  
  // Mark entry state
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
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
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <LayoutDashboard className="w-5 h-5" /> Overview
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'students' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Users className="w-5 h-5" /> My Students
            </button>
            <button 
              onClick={() => setActiveTab('marks')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'marks' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
            >
              <Award className="w-5 h-5" /> Manage Results
            </button>
          </div>

          <div className="flex-1">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Stats Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Total Class Students</div>
                    <div className="text-3xl font-bold text-slate-900">{data.students.length}</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Subject Exams Held</div>
                    <div className="text-3xl font-bold text-indigo-600">
                      {Array.from(new Set(data.marks.map(m => m.exam_type))).length}
                    </div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Total Results Published</div>
                    <div className="text-3xl font-bold text-emerald-600">{data.marks.length}</div>
                  </div>
                </div>

                {/* Analytical Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Results grouped by Exam Types */}
                  <SubjectPerformanceChart 
                    data={data.examPerformance.length > 0 ? data.examPerformance : [
                      { label: "Class Test", value: 78 },
                      { label: "Monthly", value: 82 },
                      { label: "Mid-Term", value: 85 }
                    ]} 
                  />
                  
                  {/* Top students khusus subjek guru */}
                  <TopStudentsWidget students={data.topStudents} />
                </div>

                {/* Subject Attendance Rates Summary */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-indigo-600" /> Subject Attendance Rate (Past Days)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {data.attendanceStats.map((at, idx) => {
                      const rate = Math.round((at.present / at.total) * 100);
                      return (
                        <div key={idx} className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                          <p className="text-xs font-semibold text-slate-400 mb-1">{at.date}</p>
                          <p className="text-xl font-bold text-emerald-600">{rate}%</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">{at.present}/{at.total} Present</p>
                        </div>
                      );
                    })}
                    {data.attendanceStats.length === 0 && (
                      <div className="col-span-5 py-4 text-center text-slate-400 text-sm italic">
                        No general attendance stats loaded.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden animate-fade-in">
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
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => { setSelectedStudent(s); setActiveTab('marks'); setSubject(data.teacher.subject); }}
                                className="text-emerald-600 hover:text-emerald-800 font-bold text-sm bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-all"
                              >
                                Add Marks
                              </button>
                              <button 
                                onClick={() => setSelectedStudentForDetail(s)}
                                className="text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all"
                              >
                                View Data
                              </button>
                            </div>
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
      <AnimatePresence>
        {selectedStudentForDetail && (
          <StudentDetailsModal 
            student={selectedStudentForDetail} 
            onClose={() => setSelectedStudentForDetail(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const AdminDashboard = ({ user }: { user: User }) => {
  const [stats, setStats] = useState({
    totalBoys: 0,
    totalGirls: 0,
    totalFees: 0,
    pendingFees: 0,
    totalTeachers: 0,
    topStudents: [] as any[],
    feeTrends: [] as any[],
    attendanceStats: { presentBoys: 0, absentBoys: 0, presentGirls: 0, absentGirls: 0 },
    subjectPerformance: [] as any[]
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'attendance' | 'fees'>('overview');
  const [loading, setLoading] = useState(true);
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);

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
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Total Boys</div>
                    <div className="text-2xl font-bold text-slate-900">{stats.totalBoys}</div>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Total Girls</div>
                    <div className="text-2xl font-bold text-pink-600">{stats.totalGirls}</div>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Teachers</div>
                    <div className="text-2xl font-bold text-slate-900">{stats.totalTeachers}</div>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Fees Collected</div>
                    <div className="text-2xl font-bold text-emerald-600">Rs. {stats.totalFees}</div>
                  </div>
                  <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-slate-500 text-xs font-semibold uppercase mb-1">Pending Fees</div>
                    <div className="text-2xl font-bold text-orange-600">Rs. {stats.pendingFees}</div>
                  </div>
                </div>

                {/* Analytical Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <SubjectPerformanceChart data={stats.subjectPerformance} />
                  <FeeTrendChart data={stats.feeTrends} />
                </div>

                {/* Second Level Analytics Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <AttendanceCircularChart 
                    title="Boys" 
                    present={stats.attendanceStats?.presentBoys || 0} 
                    absent={stats.attendanceStats?.absentBoys || 0} 
                  />
                  <AttendanceCircularChart 
                    title="Girls" 
                    present={stats.attendanceStats?.presentGirls || 0} 
                    absent={stats.attendanceStats?.absentGirls || 0} 
                  />
                  <TopStudentsWidget students={stats.topStudents} />
                </div>

                {/* Log Activities */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <UserCircle />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">New Student Registered</div>
                        <div className="text-sm text-slate-500">Ahmad Khan (Roll No: 105) was added to Boys Portal</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                        <CheckCircle2 />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Today's Attendance Marked</div>
                        <div className="text-sm text-slate-500">Girls and boys portals attendance loaded successfully.</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                        <CreditCard />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">Fee Invoices Dispatched</div>
                        <div className="text-sm text-slate-500">Monthly auto-generated vouchers published for the current period.</div>
                      </div>
                    </div>
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
                            <button 
                              onClick={() => setSelectedStudentForDetail(s)}
                              className="text-indigo-600 hover:text-indigo-800 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all"
                            >
                              View Data
                            </button>
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

            {activeTab === 'fees' && (
              <div className="space-y-8 animate-fade-in text-slate-800">
                {/* Create Fee Form */}
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm font-sans">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" /> Create Fee Invoice
                  </h3>
                  <form onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const studentId = parseInt((form.elements.namedItem('studentId') as HTMLSelectElement).value);
                    const month = (form.elements.namedItem('month') as HTMLSelectElement).value;
                    const amount = parseInt((form.elements.namedItem('amount') as HTMLInputElement).value);
                    const dueDate = (form.elements.namedItem('dueDate') as HTMLInputElement).value;

                    try {
                      const res = await fetch('/api/fees/generate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ studentId, month, amount, dueDate })
                      });
                      if (res.ok) {
                        form.reset();
                        const statsRes = await fetch('/api/admin/stats');
                        setStats(await statsRes.json());
                        const studentsRes = await fetch('/api/students');
                        setStudents(await studentsRes.json());
                        alert('Fee Voucher published and logged successfully!');
                      } else {
                        alert('Error publishing voucher: This month might already have a voucher for this student.');
                      }
                    } catch (err) {
                      console.error(err);
                      alert('Failed to connect to billing database.');
                    }
                  }} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Select Student</label>
                      <select name="studentId" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                        <option value="">Choose...</option>
                        {students.map(s => (
                          <option key={s.id} value={s.id}>{s.roll_number} - {s.full_name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Billing Month</label>
                      <select name="month" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Fee Amount (Rs.)</label>
                      <input type="number" name="amount" defaultValue={2500} required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Due Date</label>
                      <input type="date" name="dueDate" defaultValue="2026-06-30" required className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div className="md:col-span-4 mt-2">
                      <button type="submit" className="w-full btn-primary py-3 bg-indigo-600 hover:bg-indigo-750 text-white font-bold flex items-center justify-center gap-2 rounded-xl">
                        <Plus className="w-4 h-4" /> Issue and Dispatch Voucher
                      </button>
                    </div>
                  </form>
                </div>

                {/* Ledger Listing */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden font-sans">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 font-display">Student Billing Ledger</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase">
                        <tr>
                          <th className="px-6 py-4">Roll No</th>
                          <th className="px-6 py-4">Student Name</th>
                          <th className="px-6 py-4 font-mono">Invoice Number</th>
                          <th className="px-6 py-4">Month</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {stats.allFees && stats.allFees.map((f: any) => (
                          <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-mono text-sm font-medium text-indigo-600">{f.roll_number}</td>
                            <td className="px-6 py-4 font-semibold text-slate-900">{f.full_name}</td>
                            <td className="px-6 py-4 font-mono text-xs text-slate-400">{f.voucher_id}</td>
                            <td className="px-6 py-4 text-slate-600 text-sm">{f.month}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">Rs. {f.amount}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${f.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                {f.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              {f.status === 'unpaid' ? (
                                <button 
                                  onClick={async () => {
                                    try {
                                      const res = await fetch('/api/fees/pay', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ voucherId: f.voucher_id })
                                      });
                                      if (res.ok) {
                                        const statsRes = await fetch('/api/admin/stats');
                                        setStats(await statsRes.json());
                                        const studentsRes = await fetch('/api/students');
                                        setStudents(await studentsRes.json());
                                      }
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  className="text-xs bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 transition-colors"
                                >
                                  Accept Cash
                                </button>
                              ) : (
                                <span className="text-slate-400 font-bold text-xs flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Settled</span>
                              )}
                            </td>
                          </tr>
                        ))}
                        {(!stats.allFees || stats.allFees.length === 0) && (
                          <tr>
                            <td colSpan={7} className="px-6 py-8 text-center italic text-slate-400">No active invoices issued.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedStudentForDetail && (
          <StudentDetailsModal 
            student={selectedStudentForDetail} 
            onClose={() => setSelectedStudentForDetail(null)} 
            onRefresh={async () => {
              const [statsRes, studentsRes] = await Promise.all([
                fetch('/api/admin/stats'),
                fetch('/api/students')
              ]);
              setStats(await statsRes.json());
              setStudents(await studentsRes.json());
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const StudentHub = ({ user }: { user: User }) => {
  const [data, setData] = useState<{ student: Student, attendance: Attendance[], marks: Mark[], fees: Fee[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [printModalStudent, setPrintModalStudent] = useState<Student | null>(null);
  const [selectedVoucherForPayment, setSelectedVoucherForPayment] = useState<Fee | null>(null);

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
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-xl font-bold text-slate-900">Academic Records</h3>
                {data.marks.length > 0 && (
                  <button 
                    onClick={() => setPrintModalStudent(data.student)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-lg transition-colors"
                  >
                    <Printer className="w-4 h-4" /> Print Board Result Card
                  </button>
                )}
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
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <div className="font-bold text-slate-900">Rs. {f.amount}</div>
                        <div className={`text-xs font-bold uppercase tracking-wide ${f.status === 'paid' ? 'text-emerald-600' : 'text-orange-600'}`}>
                          {f.status}
                        </div>
                      </div>
                      {f.status === 'unpaid' && (
                        <button 
                          onClick={() => setSelectedVoucherForPayment(f)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm shrink-0"
                        >
                          <CreditCard className="w-3.5 h-3.5" /> Pay Now
                        </button>
                      )}
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
      <AnimatePresence>
        {printModalStudent && (
          <ResultCardPrintModal 
            student={printModalStudent} 
            marks={data.marks}
            attendance={data.attendance}
            onClose={() => setPrintModalStudent(null)} 
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedVoucherForPayment && (
          <CreditCardPaymentModal 
            voucher={selectedVoucherForPayment} 
            onClose={() => setSelectedVoucherForPayment(null)} 
            onPaymentSuccess={async () => {
              const res = await fetch(`/api/student/${user.student_id}/dashboard`);
              setData(await res.json());
            }} 
          />
        )}
      </AnimatePresence>
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
                        <CircularLogo className="w-10 h-10" dark={true} />
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
              <div className="flex items-center gap-3 mb-6">
                <CircularLogo className="w-12 h-12" dark={true} />
                <span className="font-display font-bold text-xl tracking-tight uppercase">STAR SCIENCE ACADEMY</span>
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
            © {new Date().getFullYear()} Star Science Academy Choti Zareen. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}


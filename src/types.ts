export interface Student {
  id: number;
  roll_number: string;
  full_name: string;
  father_name: string;
  gender: string;
  dob: string;
  cnic: string;
  class: string;
  group_name: string;
  board_reg_no: string;
  prev_marks: number;
  prev_percentage: number;
  student_mobile: string;
  parent_mobile: string;
  email: string;
  address: string;
  portal: 'boys' | 'girls';
  created_at: string;
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'student';
  portal?: 'boys' | 'girls';
  student_id?: number;
}

export interface Mark {
  id: number;
  student_id: number;
  subject: string;
  marks_obtained: number;
  total_marks: number;
  exam_type: string;
  date: string;
}

export interface Attendance {
  id: number;
  student_id: number;
  date: string;
  status: 'present' | 'absent';
}

export interface Fee {
  id: number;
  student_id: number;
  month: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'unpaid';
  voucher_id: string;
}

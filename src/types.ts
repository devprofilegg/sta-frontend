export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  specialty?: string; // For doctors
  crm?: string; // For doctors
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  date: string; // ISO string YYYY-MM-DD
  time: string; // HH:MM
  type: 'Consulta' | 'Retorno' | 'Exame';
  status: 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'COMPLETED';
}

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  isBooked: boolean;
}

export interface DoctorApproval {
  id: string;
  name: string;
  crm: string;
  specialty: string;
  email: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

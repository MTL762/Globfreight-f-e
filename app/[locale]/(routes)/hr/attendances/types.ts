// Auto-generated type definitions

export interface attendancesContractUser_id {
  id: number;
  name: string;
  email: string;
  is_driver: boolean;
  profile: string;
  address: string;
  roleID: number;
  work: string;
}

export interface attendancesContractContract_type_id {
  id: number;
  name: string;
  bonus_day_off: number;
  has_attendance: number;
  has_annual_leave: number;
}

export interface attendancesContract {
  id: number;
  job_id: string;
  user_id: attendancesContractUser_id;
  contract_type_id: attendancesContractContract_type_id;
  section_id: number;
  branch_id: number;
  currency_id: number;
  phone: string;
  start_at: string;
  end_at: string;
  birth_date: string;
  academic_qualification: string;
  qualifications: string;
  experience: string;
  id_number: string;
  personal_email?: null;
  personal_phone: string;
  bank_account_number: string;
  bank_name: string;
  iban: string;
  marital_status: string;
  military_status: string;
  contract_header: string;
  created_at: string;
  updated_at: string;
}

export interface AttendancesEntity {
  id: number;
  contract: attendancesContract;
  checkin?: null;
  checkout?: null;
  type: string;
  late_minutes?: null;
  early_leave_minutes?: null;
  paid: number;
  leave_description: string;
  leave_type?: null;
  official_holiday_id?: null;
  created_at: string;
  updated_at: string;
}

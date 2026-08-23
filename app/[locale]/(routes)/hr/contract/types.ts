// Auto-generated type definitions

export interface contractUser_id {
  id: number;
  name: string;
  email: string;
  is_driver: boolean;
  profile: string;
  address: string;
  roleID: number;
  work: string;
}

export interface contractContract_type_id {
  id: number;
  name: string;
  bonus_day_off: number;
  has_attendance: number;
  has_annual_leave: number;
}

export interface contractSection_id {
  id: number;
  parent_id: number;
  manager_id: number;
  name: string;
}

export interface contractBranch_idTransName {
  en: string;
}

export interface contractBranch_idTrans {
  name: contractBranch_idTransName;
  title: unknown[];
  description: unknown[];
  address: unknown[];
  notes: unknown[];
}

export interface contractBranch_id {
  id: number;
  name: string;
  title?: null;
  description?: null;
  image?: null;
  address?: null;
  email?: null;
  phones?: null;
  notes?: null;
  address_link?: null;
  show_client: number;
  is_company: number;
  class: string;
  trans: contractBranch_idTrans;
}

export interface contractCurrency_idTransName {
  ar: string;
  en: string;
}

export interface contractCurrency_idTrans {
  name: contractCurrency_idTransName;
}

export interface contractCurrency_id {
  id: number;
  name: string;
  iso: string;
  symbol: string;
  class: string;
  trans: contractCurrency_idTrans;
}

export interface contractLanguagesItem {
  id: number;
  name: string;
  proficiency: string;
}

export interface contractSalariesItem {
  id: number;
  name: string;
  is_basic: number;
  amount: number;
}

export interface contractClausesItem {
  id: number;
  contract_id: number;
  title: string;
  content: string;
}

export interface contractFilesItem {
  id: number;
  url: string;
}

export interface contractEntity {
  id: number;
  job_id: string;
  user_id: contractUser_id;
  contract_type_id: contractContract_type_id;
  section_id: contractSection_id;
  branch_id: contractBranch_id;
  currency_id: contractCurrency_id;
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
  languages: contractLanguagesItem[];
  salaries: contractSalariesItem[];
  deductions: unknown[];
  clauses: contractClausesItem[];
  files: contractFilesItem[];
  created_at: string;
  updated_at: string;
}

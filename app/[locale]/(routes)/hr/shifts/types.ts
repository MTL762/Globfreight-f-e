// Auto-generated type definitions

export interface shiftsContract_type_id {
  id: number;
  name: string;
  bonus_day_off: number;
  has_attendance: number;
  has_annual_leave: number;
}

export interface shiftsEntity {
  id: number;
  contract_type_id: shiftsContract_type_id;
  day: string;
  from: string;
  to: string;
  rest: number;
  is_week_end: number;
  created_at: string;
  updated_at: string;
}

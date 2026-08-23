// Auto-generated type definitions

export interface leaveTypesContract_type_id {
  id: number;
  name: string;
  bonus_day_off: number;
  has_attendance: boolean;
  has_annual_leave: boolean;
}

export interface leaveTypesEntity {
  id: number;
  contract_type_id: leaveTypesContract_type_id;
  name: string;
  description: string;
}

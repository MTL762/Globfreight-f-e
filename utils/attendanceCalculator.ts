import * as XLSX from "xlsx";

export interface RawAttendanceRow {
  [key: string]: any;
}

export interface ColumnMapping {
  employeeIdKey: string;
  employeeNameKey: string;
  dateKey: string;
  checkInKey: string;
  checkOutKey: string;
  statusKey: string;
}

export interface ShiftConfig {
  shiftStartTime: string; // "09:00" (HH:mm)
  shiftEndTime: string; // "17:00" (HH:mm)
  gracePeriodMinutes: number; // 15
  standardWorkHours: number; // 8
  weekendDays: number[]; // 0 = Sun, 1 = Mon, ..., 5 = Fri, 6 = Sat (default: [5, 6])
  officialHolidays: string[]; // List of YYYY-MM-DD holiday dates
  monthStartDate?: string; // Optional period filter start
  monthEndDate?: string; // Optional period filter end
}

export interface DailyAttendanceRecord {
  date: string;
  dayOfWeek: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Absent" | "Late" | "Leave" | "Weekend" | "Holiday";
  workedHours: number;
  workedMinutes: number;
  lateMinutes: number;
  earlyLeaveMinutes: number;
  overtimeHours: number;
  notes: string;
}

export interface EmployeeAttendanceSummary {
  employeeId: string;
  employeeName: string;
  totalDaysLogged: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  holidayDays: number;
  weekendDays: number;
  totalWorkedMinutes: number;
  totalWorkedHours: number;
  totalLateMinutes: number;
  totalEarlyLeaveMinutes: number;
  totalOvertimeHours: number;
  averageWorkedHoursPerDay: number;
  dailyRecords: DailyAttendanceRecord[];
}

/**
 * Auto-detect column headers from uploaded sheet rows.
 */
export function autoDetectColumnMapping(headers: string[]): ColumnMapping {
  const findMatch = (keywords: string[]): string => {
    for (const kw of keywords) {
      const match = headers.find((h) =>
        h.toLowerCase().trim().replace(/[-_]/g, " ").includes(kw.toLowerCase())
      );
      if (match) return match;
    }
    return "";
  };

  return {
    employeeIdKey: findMatch(["emp id", "employee id", "code", "user id", "id", "badge"]),
    employeeNameKey: findMatch(["employee name", "emp name", "user name", "name", "employee"]),
    dateKey: findMatch(["date", "attendance date", "day"]),
    checkInKey: findMatch(["check in", "checkin", "in time", "time in", "punch in", "start"]),
    checkOutKey: findMatch(["check out", "checkout", "out time", "time out", "punch out", "end"]),
    statusKey: findMatch(["status", "state", "attendance status", "type"])
  };
}

/**
 * Parse Excel file (Buffer or ArrayBuffer) into raw JSON rows.
 */
export function parseSheetFile(fileBuffer: ArrayBuffer): {
  headers: string[];
  rows: RawAttendanceRow[];
  sheetNames: string[];
} {
  const workbook = XLSX.read(fileBuffer, { type: "array", cellDates: true });
  const firstSheetName = workbook.SheetNames[0] || "Sheet1";
  const worksheet = workbook.Sheets[firstSheetName];

  const jsonData = XLSX.utils.sheet_to_json<RawAttendanceRow>(worksheet, {
    defval: "",
    raw: false
  });

  const headers: string[] = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];

  return {
    headers,
    rows: jsonData,
    sheetNames: workbook.SheetNames
  };
}

/**
 * Convert time input (string, JS Date, decimal) into minutes from midnight.
 */
export function parseTimeToMinutes(timeVal: any): number | null {
  if (timeVal === undefined || timeVal === null || timeVal === "") return null;

  if (typeof timeVal === "number") {
    if (timeVal >= 0 && timeVal < 1) {
      return Math.round(timeVal * 24 * 60);
    }
  }

  const str = String(timeVal).trim();
  if (!str || str.toLowerCase() === "null" || str === "-") return null;

  const timeRegex = /(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)?/i;
  const match = str.match(timeRegex);

  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const ampm = match[4] ? match[4].toUpperCase() : null;

    if (ampm === "PM" && hours < 12) hours += 12;
    if (ampm === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  }

  const dateObj = new Date(str);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.getHours() * 60 + dateObj.getMinutes();
  }

  return null;
}

/**
 * Format minutes from midnight to HH:mm AM/PM string.
 */
export function formatMinutesToTime(totalMinutes: number | null): string {
  if (totalMinutes === null || isNaN(totalMinutes)) return "--:--";

  let mins = Math.max(0, Math.floor(totalMinutes));
  const hours24 = Math.floor(mins / 60) % 24;
  const minsRemainder = mins % 60;

  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  const hStr = String(hours12).padStart(2, "0");
  const mStr = String(minsRemainder).padStart(2, "0");

  return `${hStr}:${mStr} ${period}`;
}

/**
 * Format Date object to YYYY-MM-DD string.
 */
export function formatDateToISO(dateVal: any): string {
  if (!dateVal) return "";
  const dateObj = new Date(dateVal);
  if (isNaN(dateObj.getTime())) return String(dateVal).trim();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calculate per-employee statistics and daily breakdown logs.
 */
export function calculateAttendanceData(
  rows: RawAttendanceRow[],
  mapping: ColumnMapping,
  config: ShiftConfig
): EmployeeAttendanceSummary[] {
  const shiftStartMins = parseTimeToMinutes(config.shiftStartTime) ?? 9 * 60;
  const shiftEndMins = parseTimeToMinutes(config.shiftEndTime) ?? 17 * 60;
  const gracePeriod = config.gracePeriodMinutes ?? 15;
  const standardWorkMins = (config.standardWorkHours ?? 8) * 60;
  const weekendDays = config.weekendDays ?? [5, 6];
  const officialHolidays = (config.officialHolidays || []).map((h) => formatDateToISO(h));

  // Group rows by Employee
  const employeeMap = new Map<string, { name: string; records: RawAttendanceRow[] }>();

  rows.forEach((row) => {
    const rawDateStr = String(row[mapping.dateKey] || "").trim();
    const formattedDate = formatDateToISO(rawDateStr);

    // Apply optional month date range filter
    if (config.monthStartDate && formattedDate < config.monthStartDate) return;
    if (config.monthEndDate && formattedDate > config.monthEndDate) return;

    const empId = String(row[mapping.employeeIdKey] || "EMP-UNKNOWN").trim();
    const empName = String(row[mapping.employeeNameKey] || empId).trim();

    if (!employeeMap.has(empId)) {
      employeeMap.set(empId, { name: empName, records: [] });
    }
    employeeMap.get(empId)!.records.push(row);
  });

  const summaries: EmployeeAttendanceSummary[] = [];

  employeeMap.forEach(({ name: employeeName, records }, employeeId) => {
    let totalWorkedMinutes = 0;
    let totalLateMinutes = 0;
    let totalEarlyLeaveMinutes = 0;
    let totalOvertimeHours = 0;
    let presentDays = 0;
    let absentDays = 0;
    let lateDays = 0;
    let holidayDaysCount = 0;
    let weekendDaysCount = 0;

    const dailyRecords: DailyAttendanceRecord[] = records.map((r) => {
      const rawDateStr = String(r[mapping.dateKey] || "").trim();
      const formattedDate = formatDateToISO(rawDateStr);
      const rawCheckIn = r[mapping.checkInKey];
      const rawCheckOut = r[mapping.checkOutKey];
      const rawStatus = String(r[mapping.statusKey] || "").trim();

      const inMins = parseTimeToMinutes(rawCheckIn);
      const outMins = parseTimeToMinutes(rawCheckOut);

      // Determine day of week & date properties
      const dateObj = new Date(rawDateStr);
      const dayOfWeekNum = !isNaN(dateObj.getTime()) ? dateObj.getDay() : -1;
      const dayOfWeekName = !isNaN(dateObj.getTime())
        ? dateObj.toLocaleDateString("en-US", { weekday: "short" })
        : "";

      const isWeekend = weekendDays.includes(dayOfWeekNum);
      const isOfficialHoliday = officialHolidays.includes(formattedDate);

      let workedMinutes = 0;
      let lateMinutes = 0;
      let earlyLeaveMinutes = 0;
      let overtimeHours = 0;
      let status: DailyAttendanceRecord["status"] = "Absent";
      let notes = "";

      const hasPunches = inMins !== null || outMins !== null;

      if (isOfficialHoliday) {
        holidayDaysCount++;
        if (hasPunches) {
          status = "Present";
          notes = "Official Holiday Work";
          if (inMins !== null && outMins !== null && outMins > inMins) {
            workedMinutes = outMins - inMins;
          } else if (inMins !== null && outMins === null) {
            workedMinutes = standardWorkMins;
          }
          // Holiday work is 100% bonus overtime
          overtimeHours = parseFloat((workedMinutes / 60).toFixed(2));
          presentDays++;
        } else {
          status = "Holiday";
          notes = "Official Holiday";
        }
      } else if (isWeekend) {
        weekendDaysCount++;
        if (hasPunches) {
          status = "Present";
          notes = "Weekend Work";
          if (inMins !== null && outMins !== null && outMins > inMins) {
            workedMinutes = outMins - inMins;
          } else if (inMins !== null && outMins === null) {
            workedMinutes = standardWorkMins;
          }
          // Weekend work is bonus overtime
          overtimeHours = parseFloat((workedMinutes / 60).toFixed(2));
          presentDays++;
        } else {
          status = "Weekend";
          notes = "Weekend Day";
        }
      } else {
        // Normal Work Day
        const isExplicitAbsent =
          rawStatus.toLowerCase().includes("absent") ||
          rawStatus.toLowerCase().includes("off") ||
          !hasPunches;

        if (!isExplicitAbsent && hasPunches) {
          status = "Present";
          presentDays++;

          if (inMins !== null && outMins !== null && outMins > inMins) {
            workedMinutes = outMins - inMins;
          } else if (inMins !== null && outMins === null) {
            workedMinutes = standardWorkMins;
            notes = "Missing Checkout - estimated default shift";
          }

          // Late calculation
          if (inMins !== null && inMins > shiftStartMins + gracePeriod) {
            lateMinutes = inMins - shiftStartMins;
            lateDays++;
            status = "Late";
          }

          // Early leave calculation
          if (outMins !== null && outMins < shiftEndMins) {
            earlyLeaveMinutes = shiftEndMins - outMins;
          }

          // Overtime calculation for normal working days
          if (workedMinutes > standardWorkMins) {
            overtimeHours = parseFloat(((workedMinutes - standardWorkMins) / 60).toFixed(2));
          }
        } else {
          status = rawStatus.toLowerCase().includes("leave") ? "Leave" : "Absent";
          absentDays++;
        }
      }

      totalWorkedMinutes += workedMinutes;
      totalLateMinutes += lateMinutes;
      totalEarlyLeaveMinutes += earlyLeaveMinutes;
      totalOvertimeHours += overtimeHours;

      return {
        date: formattedDate || rawDateStr,
        dayOfWeek: dayOfWeekName,
        checkIn: formatMinutesToTime(inMins),
        checkOut: formatMinutesToTime(outMins),
        status,
        workedHours: parseFloat((workedMinutes / 60).toFixed(2)),
        workedMinutes,
        lateMinutes,
        earlyLeaveMinutes,
        overtimeHours,
        notes
      };
    });

    const totalDaysLogged = dailyRecords.length;
    const totalWorkedHours = parseFloat((totalWorkedMinutes / 60).toFixed(2));
    const averageWorkedHoursPerDay =
      totalDaysLogged > 0 ? parseFloat((totalWorkedHours / totalDaysLogged).toFixed(2)) : 0;

    summaries.push({
      employeeId,
      employeeName,
      totalDaysLogged,
      presentDays,
      absentDays,
      lateDays,
      holidayDays: holidayDaysCount,
      weekendDays: weekendDaysCount,
      totalWorkedMinutes,
      totalWorkedHours,
      totalLateMinutes,
      totalEarlyLeaveMinutes,
      totalOvertimeHours: parseFloat(totalOvertimeHours.toFixed(2)),
      averageWorkedHoursPerDay,
      dailyRecords
    });
  });

  return summaries;
}

/**
 * Generate a downloadable sample Excel sheet template for users.
 */
export function generateSampleAttendanceTemplate(): ArrayBuffer {
  const sampleData = [
    {
      "Employee ID": "EMP-101",
      "Employee Name": "Ahmed Hassan",
      Date: "2026-07-01",
      "Check In": "08:55 AM",
      "Check Out": "05:05 PM",
      Status: "Present"
    },
    {
      "Employee ID": "EMP-101",
      "Employee Name": "Ahmed Hassan",
      Date: "2026-07-02",
      "Check In": "09:25 AM",
      "Check Out": "05:00 PM",
      Status: "Late"
    },
    {
      "Employee ID": "EMP-101",
      "Employee Name": "Ahmed Hassan",
      Date: "2026-07-03",
      "Check In": "-",
      "Check Out": "-",
      Status: "Weekend"
    },
    {
      "Employee ID": "EMP-102",
      "Employee Name": "Sara Mahmoud",
      Date: "2026-07-01",
      "Check In": "09:00 AM",
      "Check Out": "06:30 PM",
      Status: "Present"
    },
    {
      "Employee ID": "EMP-102",
      "Employee Name": "Sara Mahmoud",
      Date: "2026-07-23",
      "Check In": "-",
      "Check Out": "-",
      Status: "Holiday"
    }
  ];

  const ws = XLSX.utils.json_to_sheet(sampleData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Attendance Data");
  return XLSX.write(wb, { bookType: "xlsx", type: "array" });
}

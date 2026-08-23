import * as XLSX from "xlsx";
import { EmployeeAttendanceSummary } from "./attendanceCalculator";

/**
 * Trigger client-side file download from a Blob or ArrayBuffer.
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export summary table for all employees as single-sheet Excel workbook.
 */
export function exportSummaryToExcel(
  summaries: EmployeeAttendanceSummary[],
  filename = "Attendance_Summary.xlsx"
) {
  const summaryRows = summaries.map((s) => ({
    "Employee ID": s.employeeId,
    "Employee Name": s.employeeName,
    "Days Logged": s.totalDaysLogged,
    "Present Days": s.presentDays,
    "Absent Days": s.absentDays,
    "Late Days": s.lateDays,
    "Total Worked Hours": s.totalWorkedHours,
    "Total Late (Mins)": s.totalLateMinutes,
    "Total Early Leave (Mins)": s.totalEarlyLeaveMinutes,
    "Overtime (Hours)": s.totalOvertimeHours,
    "Avg Worked Hrs/Day": s.averageWorkedHoursPerDay
  }));

  const worksheet = XLSX.utils.json_to_sheet(summaryRows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Summaries");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  downloadBlob(blob, filename);
}

/**
 * Export full multi-tab workbook with Summary sheet + individual worksheet tab per employee.
 */
export function exportMultiTabExcel(
  summaries: EmployeeAttendanceSummary[],
  filename = "Attendance_Full_Report.xlsx"
) {
  const workbook = XLSX.utils.book_new();

  // Summary sheet
  const summaryRows = summaries.map((s) => ({
    "Employee ID": s.employeeId,
    "Employee Name": s.employeeName,
    "Days Logged": s.totalDaysLogged,
    "Present Days": s.presentDays,
    "Absent Days": s.absentDays,
    "Late Days": s.lateDays,
    "Total Worked Hours": s.totalWorkedHours,
    "Total Late (Mins)": s.totalLateMinutes,
    "Total Early Leave (Mins)": s.totalEarlyLeaveMinutes,
    "Overtime (Hours)": s.totalOvertimeHours,
    "Avg Worked Hrs/Day": s.averageWorkedHoursPerDay
  }));

  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Overview Summary");

  // Per-employee tabs
  summaries.forEach((emp) => {
    const dailyData = emp.dailyRecords.map((d) => ({
      Date: d.date,
      Day: d.dayOfWeek,
      Status: d.status,
      "Check In": d.checkIn,
      "Check Out": d.checkOut,
      "Worked Hours": d.workedHours,
      "Late (Mins)": d.lateMinutes,
      "Early Leave (Mins)": d.earlyLeaveMinutes,
      "Overtime (Hrs)": d.overtimeHours,
      Notes: d.notes || ""
    }));

    const empSheet = XLSX.utils.json_to_sheet(dailyData);

    // Sheet tab names must be <= 31 characters and unique
    let sheetName = `${emp.employeeName}`.substring(0, 25).trim();
    if (!sheetName) sheetName = emp.employeeId;

    // Handle name collision
    let counter = 1;
    let finalSheetName = sheetName;
    while (workbook.SheetNames.includes(finalSheetName)) {
      finalSheetName = `${sheetName}_${counter}`;
      counter++;
    }

    XLSX.utils.book_append_sheet(workbook, empSheet, finalSheetName);
  });

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  downloadBlob(blob, filename);
}

/**
 * Export single employee report as Excel workbook.
 */
export function exportSingleEmployeeExcel(emp: EmployeeAttendanceSummary) {
  const workbook = XLSX.utils.book_new();

  // Stats summary rows
  const summaryInfo = [
    { Metric: "Employee ID", Value: emp.employeeId },
    { Metric: "Employee Name", Value: emp.employeeName },
    { Metric: "Total Days Logged", Value: emp.totalDaysLogged },
    { Metric: "Present Days", Value: emp.presentDays },
    { Metric: "Absent Days", Value: emp.absentDays },
    { Metric: "Late Days", Value: emp.lateDays },
    { Metric: "Total Worked Hours", Value: emp.totalWorkedHours },
    { Metric: "Total Late Minutes", Value: emp.totalLateMinutes },
    { Metric: "Total Early Leave Minutes", Value: emp.totalEarlyLeaveMinutes },
    { Metric: "Overtime Hours", Value: emp.totalOvertimeHours }
  ];

  const summarySheet = XLSX.utils.json_to_sheet(summaryInfo);
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Employee Summary");

  // Daily records sheet
  const dailyData = emp.dailyRecords.map((d) => ({
    Date: d.date,
    Day: d.dayOfWeek,
    Status: d.status,
    "Check In": d.checkIn,
    "Check Out": d.checkOut,
    "Worked Hours": d.workedHours,
    "Late (Mins)": d.lateMinutes,
    "Early Leave (Mins)": d.earlyLeaveMinutes,
    "Overtime (Hrs)": d.overtimeHours,
    Notes: d.notes || ""
  }));

  const dailySheet = XLSX.utils.json_to_sheet(dailyData);
  XLSX.utils.book_append_sheet(workbook, dailySheet, "Daily Attendance Logs");

  const safeName = emp.employeeName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `${safeName}_Attendance_${emp.employeeId}.xlsx`;

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  downloadBlob(blob, filename);
}

/**
 * Export single employee report as CSV.
 */
export function exportEmployeeToCSV(emp: EmployeeAttendanceSummary) {
  const dailyData = emp.dailyRecords.map((d) => ({
    "Employee ID": emp.employeeId,
    "Employee Name": emp.employeeName,
    Date: d.date,
    Day: d.dayOfWeek,
    Status: d.status,
    "Check In": d.checkIn,
    "Check Out": d.checkOut,
    "Worked Hours": d.workedHours,
    "Late (Mins)": d.lateMinutes,
    "Early Leave (Mins)": d.earlyLeaveMinutes,
    "Overtime (Hrs)": d.overtimeHours,
    Notes: d.notes || ""
  }));

  const worksheet = XLSX.utils.json_to_sheet(dailyData);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);

  const safeName = emp.employeeName.replace(/[^a-zA-Z0-9]/g, "_");
  const filename = `${safeName}_Attendance_${emp.employeeId}.csv`;

  const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
  downloadBlob(blob, filename);
}

/**
 * Export calculated attendance dataset as JSON.
 */
export function exportToJSON(
  summaries: EmployeeAttendanceSummary[],
  filename = "Attendance_Calculated_Data.json"
) {
  const jsonStr = JSON.stringify(summaries, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  downloadBlob(blob, filename);
}

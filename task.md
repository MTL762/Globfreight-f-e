# HR System API Documentation

**Base URL:** `http://localhost:8000`

**Authentication:** Most endpoints require a Bearer Token via Laravel Sanctum. Include the token in the `Authorization` header:

```
Authorization: Bearer {token}
```

---

## Table of Contents

1. [Authentication](#1-authentication)
   - [Register](#11-register)
   - [Login](#12-login)
   - [Logout](#13-logout)
   - [Send Verification Code](#14-send-verification-code)
   - [Verify Email](#15-verify-email)
   - [Send Password Reset Code](#16-send-password-reset-code)
   - [Reset Password](#17-reset-password)
   - [Change Password](#18-change-password)
   - [Get Profile](#19-get-profile)
   - [Update Profile](#110-update-profile)
2. [Roles](#2-roles)
   - [List Roles](#21-list-roles)
   - [Create Role](#22-create-role)
   - [Show Role](#23-show-role)
   - [Update Role](#24-update-role)
   - [Delete Role](#25-delete-role)
3. [Users](#3-users)
   - [List Users](#31-list-users)
   - [Create User](#32-create-user)
   - [Show User](#33-show-user)
   - [Update User](#34-update-user)
   - [Delete User](#35-delete-user)
4. [Settings](#4-settings)
   - [Get Settings](#41-get-settings)
   - [Update Settings](#42-update-settings)
5. [Sections (Departments)](#5-sections-departments)
   - [List Sections](#51-list-sections)
   - [Create Section](#52-create-section)
   - [Show Section](#53-show-section)
   - [Update Section](#54-update-section)
   - [Delete Section](#55-delete-section)
6. [Contract Types](#6-contract-types)
   - [List Contract Types](#61-list-contract-types)
   - [Create Contract Type](#62-create-contract-type)
   - [Show Contract Type](#63-show-contract-type)
   - [Update Contract Type](#64-update-contract-type)
   - [Delete Contract Type](#65-delete-contract-type)
7. [Contracts](#7-contracts)
   - [List Contracts](#71-list-contracts)
   - [Create Contract](#72-create-contract)
   - [Show Contract](#73-show-contract)
   - [Update Contract](#74-update-contract)
   - [Delete Contract](#75-delete-contract)
   - [End Contract Now](#76-end-contract-now)
   - [Add Contract Extras](#77-add-contract-extras)
8. [Salaries](#8-salaries)
   - [List Salaries](#81-list-salaries)
   - [Create Salary](#82-create-salary)
   - [Show Salary](#83-show-salary)
   - [Update Salary](#84-update-salary)
   - [Delete Salary](#85-delete-salary)
9. [Deductions](#9-deductions)
   - [List Deductions](#91-list-deductions)
   - [Create Deduction](#92-create-deduction)
   - [Show Deduction](#93-show-deduction)
   - [Update Deduction](#94-update-deduction)
   - [Delete Deduction](#95-delete-deduction)
10. [Shifts](#10-shifts)
    - [List Shifts](#101-list-shifts)
    - [Create Shift](#102-create-shift)
    - [Show Shift](#103-show-shift)
    - [Update Shift](#104-update-shift)
    - [Delete Shift](#105-delete-shift)
11. [Official Holidays](#11-official-holidays)
    - [List Official Holidays](#111-list-official-holidays)
    - [Create Official Holiday](#112-create-official-holiday)
    - [Show Official Holiday](#113-show-official-holiday)
    - [Update Official Holiday](#114-update-official-holiday)
    - [Delete Official Holiday](#115-delete-official-holiday)
12. [Leave Types](#12-leave-types)
    - [List Leave Types (Employee)](#121-list-leave-types-employee)
    - [Create Leave Type](#122-create-leave-type)
    - [Show Leave Type](#123-show-leave-type)
    - [Update Leave Type](#124-update-leave-type)
    - [Delete Leave Type](#125-delete-leave-type)
13. [Attendances](#13-attendances)
    - [Export Attendances](#131-export-attendances)
    - [List Attendances](#132-list-attendances)
    - [Show Attendance](#133-show-attendance)
    - [Check In (Store Attendance)](#134-check-in-store-attendance)
    - [Check Out](#135-check-out)
    - [Assign Leave to Attendance](#136-assign-leave-to-attendance)
    - [Delete Attendance](#137-delete-attendance)
14. [Leave Requests](#14-leave-requests)
    - [Create Leave Request (Employee)](#141-create-leave-request-employee)
    - [List My Leave Requests (Employee)](#142-list-my-leave-requests-employee)
    - [Show My Leave Request (Employee)](#143-show-my-leave-request-employee)
    - [Update Leave Request (Employee)](#144-update-leave-request-employee)
    - [Delete Leave Request (Employee)](#145-delete-leave-request-employee)
    - [List All Leave Requests (Admin)](#146-list-all-leave-requests-admin)
    - [Show Leave Request (Admin)](#147-show-leave-request-admin)
    - [Change Leave Request Status (Admin)](#148-change-leave-request-status-admin)
15. [Leave Statistics](#15-leave-statistics)
    - [Get Leave Statistics](#151-get-leave-statistics)
    - [Get HR Statistics](#152-get-hr-statistics)
16. [Announcements](#16-announcements)
    - [List Announcements](#161-list-announcements)
    - [Create Announcement](#162-create-announcement)
    - [Show Announcement](#163-show-announcement)
    - [Update Announcement](#164-update-announcement)
    - [Delete Announcement](#165-delete-announcement)
17. [Warnings](#17-warnings)
    - [List Warnings](#171-list-warnings)
    - [Create Warning](#172-create-warning)
    - [Show Warning](#173-show-warning)
    - [Update Warning](#174-update-warning)
    - [Delete Warning](#175-delete-warning)
18. [Performance Reviews](#18-performance-reviews)
    - [List Performance Reviews](#181-list-performance-reviews)
    - [Create Performance Review](#182-create-performance-review)
    - [Show Performance Review](#183-show-performance-review)
    - [Update Performance Review](#184-update-performance-review)
    - [Delete Performance Review](#185-delete-performance-review)
    - [Change Performance Review Status](#186-change-performance-review-status)
19. [Training Programs](#19-training-programs)
    - [List Training Programs](#191-list-training-programs)
    - [Create Training Program](#192-create-training-program)
    - [Show Training Program](#193-show-training-program)
    - [Update Training Program](#194-update-training-program)
    - [Delete Training Program](#195-delete-training-program)
    - [Enroll in Training Program](#196-enroll-in-training-program)
    - [Update Enrollment](#197-update-enrollment)
20. [Assets](#20-assets)
    - [List Assets](#201-list-assets)
    - [Create Asset](#202-create-asset)
    - [Show Asset](#203-show-asset)
    - [Update Asset](#204-update-asset)
    - [Delete Asset](#205-delete-asset)
    - [Assign Asset](#206-assign-asset)
    - [Return Asset](#207-return-asset)
21. [Expenses](#21-expenses)
    - [List Expenses](#211-list-expenses)
    - [Create Expense](#212-create-expense)
    - [Show Expense](#213-show-expense)
    - [Update Expense](#214-update-expense)
    - [Delete Expense](#215-delete-expense)
    - [Change Expense Status](#216-change-expense-status)
22. [Employee Documents](#22-employee-documents)
    - [List Employee Documents](#221-list-employee-documents)
    - [Create Employee Document](#222-create-employee-document)
    - [Show Employee Document](#223-show-employee-document)
    - [Update Employee Document](#224-update-employee-document)
    - [Delete Employee Document](#225-delete-employee-document)
23. [Onboarding Templates](#23-onboarding-templates)
    - [List Onboarding Templates](#231-list-onboarding-templates)
    - [Create Onboarding Template](#232-create-onboarding-template)
    - [Show Onboarding Template](#233-show-onboarding-template)
    - [Update Onboarding Template](#234-update-onboarding-template)
    - [Delete Onboarding Template](#235-delete-onboarding-template)
    - [Apply Onboarding Template](#236-apply-onboarding-template)
24. [Onboarding Tasks](#24-onboarding-tasks)
    - [List Onboarding Tasks](#241-list-onboarding-tasks)
    - [Show Onboarding Task](#242-show-onboarding-task)
    - [Delete Onboarding Task](#243-delete-onboarding-task)
    - [Toggle Onboarding Task Completion](#244-toggle-onboarding-task-completion)
25. [Select Menus (Dropdowns)](#25-select-menus-dropdowns)
    - [Get Users List](#251-get-users-list)
    - [Get Roles List](#252-get-roles-list)
    - [Get Permissions List](#253-get-permissions-list)

---

## 1. Authentication

### 1.1 Register

Create a new user account.

`POST /auth/register`

**Auth:** No Auth

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | User's full name. Max 255 characters. |
| `email` | string | Yes | Valid email (RFC, DNS). Must be unique across users. |
| `password` | string | Yes | Password. Must meet Laravel's default password rules (min 8 chars, mixed case, numbers, symbols). |
| `avatar` | file | No | Profile image. Accepted formats: jpeg, png, jfif, jpg, webp. Max 10 MB. |

**Example Request Body (JSON part):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecureP@ss1"
}
```

---

### 1.2 Login

Authenticate a user and receive an access token.

`POST /auth/login`

**Auth:** No Auth

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's email address. |
| `password` | string | Yes | User's password. |

**Example Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecureP@ss1"
}
```

**Example Response:**
```json
{
  "data": {
    "token": "1|abc123xyz..."
  }
}
```

---

### 1.3 Logout

Invalidate the current access token.

`POST /auth/logout`

**Auth:** Bearer Token

**Request Body:** None

---

### 1.4 Send Verification Code

Send an email verification code to the user.

`GET /auth/send_code`

**Auth:** No Auth

**Request Body:** None

---

### 1.5 Verify Email

Verify the user's email with the received code.

`POST /auth/verify_email`

**Auth:** No Auth

> Note: Check the controller for specific required fields (typically `email` and `code`).

---

### 1.6 Send Password Reset Code

Send a password reset code to the user's email.

`GET /auth/send_code`

**Auth:** No Auth

> Note: This shares the same endpoint path as "Send Verification Code." The backend routes are defined in separate groups. Behavior may depend on request context.

---

### 1.7 Reset Password

Reset the user's password using the code received via email.

`POST /auth/reset_password`

**Auth:** No Auth

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Valid email (RFC, DNS). |
| `new_password` | string | Yes | New password. Must meet default password rules. |
| `confirm_password` | string | Yes | Must match `new_password`. |

**Example Request Body:**
```json
{
  "email": "john@example.com",
  "new_password": "NewSecure@1",
  "confirm_password": "NewSecure@1"
}
```

---

### 1.8 Change Password

Change the authenticated user's password.

`PUT /auth/change_password`

**Auth:** Bearer Token

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `old_password` | string | Yes | Current password. |
| `new_password` | string | Yes | New password. Must be different from `old_password`. Must meet default password rules. |
| `confirm_password` | string | Yes | Must match `new_password`. |

**Example Request Body:**
```json
{
  "old_password": "OldPass@1",
  "new_password": "NewPass@2",
  "confirm_password": "NewPass@2"
}
```

---

### 1.9 Get Profile

Retrieve the authenticated user's profile.

`GET /auth/profile`

**Auth:** Bearer Token

**Request Body:** None

---

### 1.10 Update Profile

Update the authenticated user's profile.

`POST /auth/profile`

**Auth:** Bearer Token

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name. Max 255 characters. |
| `email` | string | Yes | Valid email (RFC, DNS). Must be unique (ignores current user). |
| `avatar` | file | No | Profile image. Accepted: jpeg, png, jfif, jpg, webp. Max 10 MB. |
| `salary` | integer | No | Salary value. Min 1. |

**Example Request Body (JSON part):**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "salary": 5000
}
```

---

## 2. Roles

All role endpoints require authentication and specific permissions.

### 2.1 List Roles

`GET /roles`

**Auth:** Bearer Token
**Permission:** `roles.list`

**Request Body:** None

---

### 2.2 Create Role

`POST /roles`

**Auth:** Bearer Token
**Permission:** `roles.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Role name. Max 255 characters. Must be unique. |
| `permission_ids` | array | Yes | Array of permission IDs to assign. |
| `permission_ids.*` | integer | Yes | Each permission ID. Min value 1. |

**Example Request Body:**
```json
{
  "name": "HR Manager",
  "permission_ids": [1, 2, 3, 5, 8]
}
```

---

### 2.3 Show Role

`GET /roles/{id}`

**Auth:** Bearer Token
**Permission:** `roles.view`

**Request Body:** None

---

### 2.4 Update Role

`PUT /roles/{id}`

**Auth:** Bearer Token
**Permission:** `roles.update`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Role name. Max 255 characters. Must be unique (ignores current). |
| `permission_ids` | array | Yes | Array of permission IDs to assign. |
| `permission_ids.*` | integer | Yes | Each permission ID. Min value 1. |

**Example Request Body:**
```json
{
  "name": "HR Manager Updated",
  "permission_ids": [1, 2, 3, 5, 8, 12]
}
```

---

### 2.5 Delete Role

`DELETE /roles/{id}`

**Auth:** Bearer Token
**Permission:** `roles.destroy`

**Request Body:** None

---

## 3. Users

All user endpoints require authentication and specific permissions.

### 3.1 List Users

`GET /admin/users`

**Auth:** Bearer Token
**Permission:** `users.list`

**Request Body:** None

---

### 3.2 Create User

`POST /admin/users`

**Auth:** Bearer Token
**Permission:** `users.store`

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name. Max 255 characters. |
| `email` | string | Yes | Valid email (RFC, DNS). Must be unique. |
| `password` | string | Yes | Password. Must meet default password rules. |
| `role_id` | integer | Yes | ID of the role to assign. |
| `avatar` | file | No | Profile image. Accepted: jpeg, png, jfif, jpg, webp. Max 10 MB. |

**Example Request Body (JSON part):**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecureP@ss1",
  "role_id": 2
}
```

---

### 3.3 Show User

`GET /admin/users/{id}`

**Auth:** Bearer Token
**Permission:** `users.view`

**Request Body:** None

---

### 3.4 Update User

`POST /admin/users/{id}`

**Auth:** Bearer Token
**Permission:** `users.update`

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Full name. Max 255 characters. |
| `email` | string | Yes | Valid email (RFC, DNS). Must be unique (ignores current user). |
| `role_id` | integer | Yes | ID of the role to assign. |
| `avatar` | file | No | Profile image. Accepted: jpeg, png, jfif, jpg, webp. Max 10 MB. |

> Note: `password` is not accepted on update.

**Example Request Body (JSON part):**
```json
{
  "name": "Jane Smith Updated",
  "email": "jane.updated@example.com",
  "role_id": 3
}
```

---

### 3.5 Delete User

`DELETE /admin/users/{id}`

**Auth:** Bearer Token
**Permission:** `users.destroy`

**Request Body:** None

---

## 4. Settings

### 4.1 Get Settings

`GET /api/admin/users/settings`

**Auth:** Bearer Token

**Request Body:** None

---

### 4.2 Update Settings

`PUT /api/admin/users/settings`

**Auth:** Bearer Token

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `timezone` | string | No | A valid timezone string (e.g., `Asia/Riyadh`, `UTC`, `America/New_York`). Required when provided. |

**Example Request Body:**
```json
{
  "timezone": "Asia/Riyadh"
}
```

---

## 5. Sections (Departments)

All section endpoints require authentication and specific permissions. Sections represent departments or organizational units.

**Base path:** `/admin/sections`

### 5.1 List Sections

`GET /admin/sections`

**Auth:** Bearer Token
**Permission:** `sections.list`

**Request Body:** None

---

### 5.2 Create Section

`POST /admin/sections`

**Auth:** Bearer Token
**Permission:** `sections.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Section name. Must be unique. |
| `manager_id` | integer | Yes | User ID of the section manager. Must be unique across sections. Must exist in users table. |
| `parent_id` | integer | No | Parent section ID for hierarchy. Must exist in sections table. |

**Example Request Body:**
```json
{
  "name": "Engineering",
  "manager_id": 5,
  "parent_id": 1
}
```

---

### 5.3 Show Section

`GET /admin/sections/{id}`

**Auth:** Bearer Token
**Permission:** `sections.view`

**Request Body:** None

---

### 5.4 Update Section

`PUT /admin/sections/{id}`

**Auth:** Bearer Token
**Permission:** `sections.update`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Section name. Must be unique (ignores current). |
| `manager_id` | integer | Yes | User ID of the section manager. Must be unique across sections (ignores current). Must exist in users table. |
| `parent_id` | integer | No | Parent section ID. Must exist in sections table. |

**Example Request Body:**
```json
{
  "name": "Engineering Updated",
  "manager_id": 5,
  "parent_id": 2
}
```

---

### 5.5 Delete Section

`DELETE /admin/sections/{id}`

**Auth:** Bearer Token
**Permission:** `sections.destroy`

**Request Body:** None

---

## 6. Contract Types

Contract types define different employment categories (e.g., Full-time, Part-time).

**Base path:** `/admin/contract-types`

### 6.1 List Contract Types

`GET /admin/contract-types`

**Auth:** Bearer Token
**Permission:** `contract_types.list`

**Request Body:** None

---

### 6.2 Create Contract Type

`POST /admin/contract-types`

**Auth:** Bearer Token
**Permission:** `contract_types.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Contract type name. Must be unique. |
| `bonus_day_off` | boolean | Yes | Whether this type includes bonus day off. |
| `has_attendance` | boolean | Yes | Whether attendance tracking is enabled. |
| `has_annual_leave` | boolean | Yes | Whether annual leave is enabled. |

**Example Request Body:**
```json
{
  "name": "Full-time",
  "bonus_day_off": true,
  "has_attendance": true,
  "has_annual_leave": true
}
```

---

### 6.3 Show Contract Type

`GET /admin/contract-types/{id}`

**Auth:** Bearer Token
**Permission:** `contract_types.view`

**Request Body:** None

---

### 6.4 Update Contract Type

`PUT /admin/contract-types/{id}`

**Auth:** Bearer Token
**Permission:** `contract_types.update`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Contract type name. Must be unique (ignores current). |
| `has_annual_leave` | boolean | Yes | Whether annual leave is enabled. |

> Note: On update, `bonus_day_off` and `has_attendance` are not accepted.

**Example Request Body:**
```json
{
  "name": "Part-time Updated",
  "has_annual_leave": false
}
```

---

### 6.5 Delete Contract Type

`DELETE /admin/contract-types/{id}`

**Auth:** Bearer Token
**Permission:** `contract_types.destroy`

**Request Body:** None

---

## 7. Contracts

Employee contracts with salary, deduction, and clause details.

**Base path:** `/admin/contracts`

### 7.1 List Contracts

`GET /admin/contracts`

**Auth:** Bearer Token
**Permission:** `contracts.list`

**Request Body:** None

---

### 7.2 Create Contract

`POST /admin/contracts`

**Auth:** Bearer Token
**Permission:** `contracts.store`

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | integer | Yes | User ID. Must exist in users table. Must be unique among active contracts (where `end_at` > now). |
| `contract_type_id` | integer | Yes | Contract type ID. Must exist in contract_types table. |
| `section_id` | integer | Yes | Section ID. Must exist in sections table. |
| `phone` | string | Yes | Phone number. Must be unique among active contracts. |
| `start_at` | date | Yes | Contract start date. |
| `end_at` | date | Yes | Contract end date. Must be after `start_at`. |
| `birth_date` | date | No | Employee's date of birth. |
| `academic_qualification` | string | No | Academic qualification. |
| `qualifications` | string | No | Professional qualifications. |
| `experience` | string | No | Work experience description. |
| `id_number` | string | No | National ID or passport number. |
| `marital_status` | string | No | Marital status. Valid values: `Single`, `Married`, `Divorced`, `Widowed`. |
| `military_status` | string | No | Military service status. Valid values: `Exempted`, `Completed`, `Deferred`, `Currently Serving`, `Not Applicable`. |
| `personal_email` | string | No | Personal email address. |
| `personal_phone` | string | No | Personal phone number. |
| `bank_account_number` | string | No | Bank account number. |
| `bank_name` | string | No | Bank name. |
| `iban` | string | No | IBAN number. |
| `contract_header` | string | No | Contract header text. |
| `salaries` | array | Yes | Array of basic salary components. |
| `salaries.*.id` | integer | Yes | Salary ID (must be a basic salary, `is_basic = true`). Must be distinct. |
| `salaries.*.amount` | integer | Yes | Salary amount. |
| `deductions` | array | No | Array of basic deduction components. |
| `deductions.*.id` | integer | Yes | Deduction ID (must be a basic deduction, `is_basic = true`). Must be distinct. |
| `deductions.*.amount` | integer | Yes | Deduction amount. |
| `deductions.*.insurance_number` | string | No | Insurance number for this deduction. |
| `clauses` | array | No | Array of contract clauses. |
| `clauses.*.title` | string | Yes | Clause title. |
| `clauses.*.content` | string | Yes | Clause content. |
| `files` | array | No | Array of attached files. |
| `files.*` | file | No | File attachment. Accepted: jpeg, png, jpg, gif, pdf. Max 10 MB each. |
| `delete_files` | array | No | Array of file IDs to delete (for updates). |
| `delete_files.*` | integer | No | File ID to delete. |

**Example Request Body (JSON part):**
```json
{
  "user_id": 3,
  "contract_type_id": 1,
  "section_id": 2,
  "phone": "+966501234567",
  "start_at": "2026-01-01",
  "end_at": "2027-01-01",
  "birth_date": "1990-05-15",
  "marital_status": "Single",
  "military_status": "Exempted",
  "bank_name": "Al Rajhi Bank",
  "bank_account_number": "1234567890",
  "iban": "SA1234567890123456789012",
  "salaries": [
    { "id": 1, "amount": 5000 },
    { "id": 2, "amount": 1500 }
  ],
  "deductions": [
    { "id": 1, "amount": 500, "insurance_number": "INS-001" }
  ],
  "clauses": [
    { "title": "Working Hours", "content": "Employee shall work 8 hours per day." }
  ]
}
```

---

### 7.3 Show Contract

`GET /admin/contracts/{id}`

**Auth:** Bearer Token
**Permission:** `contracts.view`

**Request Body:** None

---

### 7.4 Update Contract

`POST /admin/contracts/{id}`

**Auth:** Bearer Token
**Permission:** `contracts.update`

**Content-Type:** `multipart/form-data` (supports file upload)

> Same fields as [Create Contract](#72-create-contract). The `user_id` uniqueness check ignores the current contract.

---

### 7.5 Delete Contract

`DELETE /admin/contracts/{id}`

**Auth:** Bearer Token
**Permission:** `contracts.destroy`

**Request Body:** None

---

### 7.6 End Contract Now

Immediately terminate a contract by setting its end date to now.

`PATCH /admin/contracts/{id}/end-now`

**Auth:** Bearer Token
**Permission:** `contracts.end_now`

**Request Body:** None

---

### 7.7 Add Contract Extras

Add non-basic salary components and deduction components to an existing contract.

`POST /admin/contracts/{id}/extras`

**Auth:** Bearer Token
**Permission:** `contracts.extras`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `salaries` | array | No | Array of non-basic salary extras. |
| `salaries.*.id` | integer | Yes | Salary ID (must be a non-basic salary, `is_basic = false`). Must be distinct. |
| `salaries.*.amount` | integer | Yes | Salary amount. |
| `deductions` | array | No | Array of non-basic deduction extras. |
| `deductions.*.id` | integer | Yes | Deduction ID (must be a non-basic deduction, `is_basic = false`). Must be distinct. |
| `deductions.*.amount` | integer | Yes | Deduction amount. |

**Example Request Body:**
```json
{
  "salaries": [
    { "id": 5, "amount": 300 }
  ],
  "deductions": [
    { "id": 3, "amount": 100 }
  ]
}
```

---

## 8. Salaries

Salary components that can be assigned to contracts (e.g., Basic Salary, Housing Allowance).

**Base path:** `/admin/salaries`

### 8.1 List Salaries

`GET /admin/salaries`

**Auth:** Bearer Token
**Permission:** `salaries.list`

**Request Body:** None

---

### 8.2 Create Salary

`POST /admin/salaries`

**Auth:** Bearer Token
**Permission:** `salaries.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Salary component name. Must be unique. |
| `is_basic` | boolean | Yes | Whether this is a basic salary component (`true`) or an extra (`false`). |

**Example Request Body:**
```json
{
  "name": "Housing Allowance",
  "is_basic": true
}
```

---

### 8.3 Show Salary

`GET /admin/salaries/{id}`

**Auth:** Bearer Token
**Permission:** `salaries.view`

**Request Body:** None

---

### 8.4 Update Salary

`PUT /admin/salaries/{id}`

**Auth:** Bearer Token
**Permission:** `salaries.update`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Salary component name. Must be unique (ignores current). |
| `is_basic` | boolean | Yes | Whether this is a basic salary component. |

**Example Request Body:**
```json
{
  "name": "Housing Allowance Updated",
  "is_basic": true
}
```

---

### 8.5 Delete Salary

`DELETE /admin/salaries/{id}`

**Auth:** Bearer Token
**Permission:** `salaries.destroy`

**Request Body:** None

---

## 9. Deductions

Deduction components that can be assigned to contracts (e.g., Social Insurance, Tax).

**Base path:** `/admin/deductions`

### 9.1 List Deductions

`GET /admin/deductions`

**Auth:** Bearer Token
**Permission:** `deductions.list`

**Request Body:** None

---

### 9.2 Create Deduction

`POST /admin/deductions`

**Auth:** Bearer Token
**Permission:** `deductions.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Deduction name. Must be unique. |
| `is_basic` | boolean | Yes | Whether this is a basic deduction (`true`) or extra (`false`). |
| `is_paid` | boolean | Yes | Whether this deduction is paid. |

**Example Request Body:**
```json
{
  "name": "Social Insurance",
  "is_basic": true,
  "is_paid": true
}
```

---

### 9.3 Show Deduction

`GET /admin/deductions/{id}`

**Auth:** Bearer Token
**Permission:** `deductions.view`

**Request Body:** None

---

### 9.4 Update Deduction

`PUT /admin/deductions/{id}`

**Auth:** Bearer Token
**Permission:** `deductions.update`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Deduction name. Must be unique (ignores current). |
| `is_basic` | boolean | Yes | Whether this is a basic deduction. |
| `is_paid` | boolean | Yes | Whether this deduction is paid. |

**Example Request Body:**
```json
{
  "name": "Tax Deduction",
  "is_basic": false,
  "is_paid": true
}
```

---

### 9.5 Delete Deduction

`DELETE /admin/deductions/{id}`

**Auth:** Bearer Token
**Permission:** `deductions.destroy`

**Request Body:** None

---

## 10. Shifts

Work shift schedules linked to contract types, defining working hours per day of the week.

**Base path:** `/admin/shifts`

### 10.1 List Shifts

`GET /admin/shifts`

**Auth:** Bearer Token
**Permission:** `shifts.list`

**Request Body:** None

---

### 10.2 Create Shift

`POST /admin/shifts`

**Auth:** Bearer Token
**Permission:** `shifts.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_type_id` | integer | Yes | Contract type ID. Must exist in contract_types table. |
| `day` | string | Yes | Day of the week. Valid values: `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`. |
| `from` | string | No | Shift start time. Format: `HH:mm` (e.g., `09:00`). |
| `to` | string | No | Shift end time. Format: `HH:mm` (e.g., `17:00`). Must be after `from`. |
| `rest` | integer | No | Rest time in minutes. |
| `is_week_end` | boolean | No | Whether this day is a weekend (no work). |

**Example Request Body:**
```json
{
  "contract_type_id": 1,
  "day": "Monday",
  "from": "09:00",
  "to": "17:00",
  "rest": 60,
  "is_week_end": false
}
```

---

### 10.3 Show Shift

`GET /admin/shifts/{id}`

**Auth:** Bearer Token
**Permission:** `shifts.view`

**Request Body:** None

---

### 10.4 Update Shift

`PUT /admin/shifts/{id}`

**Auth:** Bearer Token
**Permission:** `shifts.update`

> Same fields as [Create Shift](#102-create-shift).

---

### 10.5 Delete Shift

`DELETE /admin/shifts/{id}`

**Auth:** Bearer Token
**Permission:** `shifts.destroy`

**Request Body:** None

---

## 11. Official Holidays

Company-wide official holidays that affect attendance.

**Base path:** `/admin/official-holidays`

### 11.1 List Official Holidays

`GET /admin/official-holidays`

**Auth:** Bearer Token
**Permission:** `official_holidays.list`

**Request Body:** None

---

### 11.2 Create Official Holiday

`POST /admin/official-holidays`

**Auth:** Bearer Token
**Permission:** `official_holidays.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Holiday name. |
| `from_date` | date | Yes | Start date. Must be today or in the future. |
| `to_date` | date | Yes | End date. Must be on or after `from_date`. |

**Example Request Body:**
```json
{
  "name": "National Day",
  "from_date": "2026-09-23",
  "to_date": "2026-09-23"
}
```

---

### 11.3 Show Official Holiday

`GET /admin/official-holidays/{id}`

**Auth:** Bearer Token
**Permission:** `official_holidays.view`

**Request Body:** None

---

### 11.4 Update Official Holiday

`PUT /admin/official-holidays/{id}`

**Auth:** Bearer Token
**Permission:** `official_holidays.update`

> Same fields as [Create Official Holiday](#112-create-official-holiday).

---

### 11.5 Delete Official Holiday

`DELETE /admin/official-holidays/{id}`

**Auth:** Bearer Token
**Permission:** `official_holidays.destroy`

**Request Body:** None

---

## 12. Leave Types

Types of leave available per contract type (e.g., Annual Leave, Sick Leave).

**Base path:** `/admin/leave-types` (admin CRUD) and `/admin/leave-types` (employee list)

### 12.1 List Leave Types (Employee)

List all leave types available to the authenticated employee.

`GET /admin/leave-types`

**Auth:** Bearer Token

**Request Body:** None

---

### 12.2 Create Leave Type

`POST /admin/leave-types`

**Auth:** Bearer Token
**Permission:** `leave_types.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_type_id` | integer | Yes | Contract type ID. Must exist in contract_types table. |
| `name` | string | Yes | Leave type name. Must be unique. |
| `description` | string | Yes | Description of the leave type. |

**Example Request Body:**
```json
{
  "contract_type_id": 1,
  "name": "Annual Leave",
  "description": "Paid annual vacation leave"
}
```

---

### 12.3 Show Leave Type

`GET /admin/leave-types/{id}`

**Auth:** Bearer Token
**Permission:** `leave_types.view`

**Request Body:** None

---

### 12.4 Update Leave Type

`PUT /admin/leave-types/{id}`

**Auth:** Bearer Token
**Permission:** `leave_types.update`

> Same fields as [Create Leave Type](#122-create-leave-type). The `name` uniqueness check ignores the current record.

---

### 12.5 Delete Leave Type

`DELETE /admin/leave-types/{id}`

**Auth:** Bearer Token
**Permission:** `leave_types.destroy`

**Request Body:** None

---

## 13. Attendances

Track employee check-in/check-out and attendance records.

**Base path:** `/admin/attendances`

### 13.1 Export Attendances

Export attendance records as a downloadable file.

`GET /admin/attendances/export`

**Auth:** No Auth

**Request Body:** None (query parameters may be supported for filtering)

**Response:** Binary file download.

---

### 13.2 List Attendances

`GET /admin/attendances`

**Auth:** Bearer Token
**Permission:** `attendances.list`

**Request Body:** None

---

### 13.3 Show Attendance

`GET /admin/attendances/{id}`

**Auth:** Bearer Token
**Permission:** `attendances.view`

**Request Body:** None

---

### 13.4 Check In (Store Attendance)

Record a check-in for the authenticated user.

`POST /admin/attendances`

**Auth:** Bearer Token

**Request Body:** None (check-in is automatic for the authenticated user)

---

### 13.5 Check Out

Record a check-out for an attendance record.

`POST /admin/attendances/{id}/checkout`

**Auth:** Bearer Token
**Permission:** `attendances.checkout`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leave_description` | string | No | Description or reason for early departure. |

**Example Request Body:**
```json
{
  "leave_description": "Doctor appointment"
}
```

---

### 13.6 Assign Leave to Attendance

Assign a leave type to a specific contract's attendance record.

`POST /admin/attendances/{contract_id}/assign-leave`

**Auth:** Bearer Token
**Permission:** `attendances.assign_leave`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leave_type_id` | integer | Yes | Leave type ID. Must exist in leave_types table. |
| `paid` | boolean | Yes | Whether the leave is paid. |
| `leave_description` | string | No | Description for the leave. |
| `from_date` | date | Yes | Leave start date. |
| `to_date` | date | Yes | Leave end date. Must be on or after `from_date`. |

**Example Request Body:**
```json
{
  "leave_type_id": 1,
  "paid": true,
  "leave_description": "Sick leave",
  "from_date": "2026-07-01",
  "to_date": "2026-07-03"
}
```

---

### 13.7 Delete Attendance

`DELETE /admin/attendances/{id}`

**Auth:** Bearer Token
**Permission:** `attendances.destroy`

**Request Body:** None

---

## 14. Leave Requests

Employees can submit leave requests; admins can review and change their status.

### 14.1 Create Leave Request (Employee)

`POST /admin/leave-requests`

**Auth:** Bearer Token

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leave_type_id` | integer | Yes | Leave type ID. Must exist in leave_types table. |
| `from_date` | date | Yes | Leave start date. |
| `to_date` | date | Yes | Leave end date. Must be on or after `from_date`. |
| `type` | string | Yes | Leave request type. Valid values: `leave`. |
| `notes` | string | No | Additional notes. |

**Example Request Body:**
```json
{
  "leave_type_id": 1,
  "from_date": "2026-07-10",
  "to_date": "2026-07-15",
  "type": "leave",
  "notes": "Family vacation"
}
```

---

### 14.2 List My Leave Requests (Employee)

`GET /admin/leave-requests`

**Auth:** Bearer Token

**Request Body:** None

---

### 14.3 Show My Leave Request (Employee)

`GET /admin/leave-requests/{id}`

**Auth:** Bearer Token

**Request Body:** None

---

### 14.4 Update Leave Request (Employee)

`PUT /admin/leave-requests/{id}`

**Auth:** Bearer Token

> Same fields as [Create Leave Request](#141-create-leave-request-employee).

---

### 14.5 Delete Leave Request (Employee)

`DELETE /admin/leave-requests/{id}`

**Auth:** Bearer Token

**Request Body:** None

---

### 14.6 List All Leave Requests (Admin)

`GET /admin/hr-leave-requests`

**Auth:** Bearer Token
**Permission:** `leave_requests.list`

**Request Body:** None

---

### 14.7 Show Leave Request (Admin)

`GET /admin/hr-leave-requests/{id}`

**Auth:** Bearer Token
**Permission:** `leave_requests.view`

**Request Body:** None

---

### 14.8 Change Leave Request Status (Admin)

`PATCH /admin/hr-leave-requests/{id}/status`

**Auth:** Bearer Token
**Permission:** `leave_requests.change_status`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | New status. Valid values: `approved`, `rejected`. |
| `is_paid` | boolean | Conditional | Required when `status` is `approved`. Whether the leave is paid. |

**Example Request Body (Approve):**
```json
{
  "status": "approved",
  "is_paid": true
}
```

**Example Request Body (Reject):**
```json
{
  "status": "rejected"
}
```

---

## 15. Leave Statistics

### 15.1 Get Leave Statistics

`GET /admin/hr/leave-statistics`

**Auth:** No Auth

**Request Body:** None (query parameters may be used for filtering)

---

### 15.2 Get HR Statistics

`GET /admin/hr/statistics`

**Auth:** No Auth

**Request Body:** None

---

## 16. Announcements

Company-wide announcements with priority levels and publication scheduling.

**Base path:** `/admin/announcements`

### 16.1 List Announcements

`GET /admin/announcements`

**Auth:** Bearer Token
**Permission:** `announcements.list`

**Request Body:** None

---

### 16.2 Create Announcement

`POST /admin/announcements`

**Auth:** Bearer Token
**Permission:** `announcements.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Announcement title. Max 255 characters. |
| `content` | string | Yes | Announcement body content. |
| `priority` | string | Yes | Priority level. Valid values: `low`, `medium`, `high`, `urgent`. |
| `is_published` | boolean | Yes | Whether the announcement is published immediately. |
| `published_at` | date | No | Scheduled publication date. |
| `expires_at` | date | No | Expiration date. Must be after `published_at`. |

**Example Request Body:**
```json
{
  "title": "Office Closure Notice",
  "content": "The office will be closed on July 4th for the national holiday.",
  "priority": "high",
  "is_published": true,
  "published_at": "2026-06-28",
  "expires_at": "2026-07-05"
}
```

---

### 16.3 Show Announcement

`GET /admin/announcements/{id}`

**Auth:** Bearer Token
**Permission:** `announcements.view`

**Request Body:** None

---

### 16.4 Update Announcement

`PUT /admin/announcements/{id}`

**Auth:** Bearer Token
**Permission:** `announcements.update`

> Same fields as [Create Announcement](#162-create-announcement).

---

### 16.5 Delete Announcement

`DELETE /admin/announcements/{id}`

**Auth:** Bearer Token
**Permission:** `announcements.destroy`

**Request Body:** None

---

## 17. Warnings

Employee disciplinary warnings linked to contracts.

**Base path:** `/admin/warnings`

### 17.1 List Warnings

`GET /admin/warnings`

**Auth:** Bearer Token
**Permission:** `warnings.list`

**Request Body:** None

---

### 17.2 Create Warning

`POST /admin/warnings`

**Auth:** Bearer Token
**Permission:** `warnings.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |
| `type` | string | Yes | Warning type. Valid values: `verbal`, `written`, `final`. |
| `reason` | string | Yes | Reason for the warning. Max 255 characters. |
| `description` | string | No | Detailed description. |
| `action_taken` | string | No | Action taken as a result. |
| `date` | date | Yes | Date of the warning. |

**Example Request Body:**
```json
{
  "contract_id": 5,
  "type": "verbal",
  "reason": "Repeated tardiness",
  "description": "Employee was late 5 times in the past month.",
  "action_taken": "Verbal counseling provided",
  "date": "2026-06-25"
}
```

---

### 17.3 Show Warning

`GET /admin/warnings/{id}`

**Auth:** Bearer Token
**Permission:** `warnings.view`

**Request Body:** None

---

### 17.4 Update Warning

`PUT /admin/warnings/{id}`

**Auth:** Bearer Token
**Permission:** `warnings.update`

> Same fields as [Create Warning](#172-create-warning).

---

### 17.5 Delete Warning

`DELETE /admin/warnings/{id}`

**Auth:** Bearer Token
**Permission:** `warnings.destroy`

**Request Body:** None

---

## 18. Performance Reviews

Employee performance evaluations linked to contracts with rating and feedback.

**Base path:** `/admin/performance-reviews`

### 18.1 List Performance Reviews

`GET /admin/performance-reviews`

**Auth:** Bearer Token
**Permission:** `performance_reviews.list`

**Request Body:** None

---

### 18.2 Create Performance Review

`POST /admin/performance-reviews`

**Auth:** Bearer Token
**Permission:** `performance_reviews.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |
| `review_period_start` | date | Yes | Start of the review period. |
| `review_period_end` | date | Yes | End of the review period. Must be after `review_period_start`. |
| `overall_rating` | integer | Yes | Overall rating. Min: 1, Max: 5. |
| `strengths` | string | No | Employee strengths noted. |
| `improvements` | string | No | Areas for improvement. |
| `goals` | string | No | Goals for next period. |
| `status` | string | No | Review status. Valid values: `draft`, `submitted`, `acknowledged`. |

**Example Request Body:**
```json
{
  "contract_id": 3,
  "review_period_start": "2026-01-01",
  "review_period_end": "2026-06-30",
  "overall_rating": 4,
  "strengths": "Excellent team collaboration and communication skills.",
  "improvements": "Time management on long-term projects.",
  "goals": "Complete project management certification.",
  "status": "draft"
}
```

---

### 18.3 Show Performance Review

`GET /admin/performance-reviews/{id}`

**Auth:** Bearer Token
**Permission:** `performance_reviews.view`

**Request Body:** None

---

### 18.4 Update Performance Review

`PUT /admin/performance-reviews/{id}`

**Auth:** Bearer Token
**Permission:** `performance_reviews.update`

> Same fields as [Create Performance Review](#182-create-performance-review).

---

### 18.5 Delete Performance Review

`DELETE /admin/performance-reviews/{id}`

**Auth:** Bearer Token
**Permission:** `performance_reviews.destroy`

**Request Body:** None

---

### 18.6 Change Performance Review Status

`PATCH /admin/performance-reviews/{id}/status`

**Auth:** Bearer Token
**Permission:** `performance_reviews.change_status`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | New status. Valid values: `draft`, `submitted`, `acknowledged`. |

**Example Request Body:**
```json
{
  "status": "submitted"
}
```

---

## 19. Training Programs

Training programs with participant enrollment tracking.

**Base path:** `/admin/training-programs`

### 19.1 List Training Programs

`GET /admin/training-programs`

**Auth:** Bearer Token
**Permission:** `training_programs.list`

**Request Body:** None

---

### 19.2 Create Training Program

`POST /admin/training-programs`

**Auth:** Bearer Token
**Permission:** `training_programs.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Program name. Max 255 characters. |
| `description` | string | No | Program description. |
| `trainer` | string | No | Trainer name. Max 255 characters. |
| `location` | string | No | Training location. Max 255 characters. |
| `start_date` | date | Yes | Program start date. |
| `end_date` | date | Yes | Program end date. Must be on or after `start_date`. |
| `max_participants` | integer | No | Maximum number of participants. Min: 1. |
| `status` | string | No | Program status. Valid values: `planned`, `ongoing`, `completed`, `cancelled`. |

**Example Request Body:**
```json
{
  "name": "Leadership Development",
  "description": "A 5-day intensive leadership training program.",
  "trainer": "Dr. Ahmed Hassan",
  "location": "Conference Room A",
  "start_date": "2026-08-01",
  "end_date": "2026-08-05",
  "max_participants": 20,
  "status": "planned"
}
```

---

### 19.3 Show Training Program

`GET /admin/training-programs/{id}`

**Auth:** Bearer Token
**Permission:** `training_programs.view`

**Request Body:** None

---

### 19.4 Update Training Program

`PUT /admin/training-programs/{id}`

**Auth:** Bearer Token
**Permission:** `training_programs.update`

> Same fields as [Create Training Program](#192-create-training-program).

---

### 19.5 Delete Training Program

`DELETE /admin/training-programs/{id}`

**Auth:** Bearer Token
**Permission:** `training_programs.destroy`

**Request Body:** None

---

### 19.6 Enroll in Training Program

Enroll an employee (by contract) into a training program.

`POST /admin/training-programs/{id}/enroll`

**Auth:** Bearer Token
**Permission:** `training_programs.enroll`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID of the employee. Must exist in contracts table. |
| `status` | string | No | Enrollment status. Valid values: `enrolled`, `completed`, `cancelled`. |
| `completion_date` | date | No | Date of completion. |
| `score` | string | No | Score or grade achieved. Max 50 characters. |

**Example Request Body:**
```json
{
  "contract_id": 7,
  "status": "enrolled"
}
```

---

### 19.7 Update Enrollment

Update an existing enrollment record.

`PUT /admin/training-programs/enrollments/{enrollmentId}`

**Auth:** Bearer Token
**Permission:** `training_programs.update_enrollment`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |
| `status` | string | No | Enrollment status. Valid values: `enrolled`, `completed`, `cancelled`. |
| `completion_date` | date | No | Date of completion. |
| `score` | string | No | Score or grade achieved. Max 50 characters. |

**Example Request Body:**
```json
{
  "contract_id": 7,
  "status": "completed",
  "completion_date": "2026-08-05",
  "score": "A"
}
```

---

## 20. Assets

Company assets (laptops, phones, vehicles, etc.) with assignment tracking.

**Base path:** `/admin/assets`

### 20.1 List Assets

`GET /admin/assets`

**Auth:** Bearer Token
**Permission:** `assets.list`

**Request Body:** None

---

### 20.2 Create Asset

`POST /admin/assets`

**Auth:** Bearer Token
**Permission:** `assets.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Asset name. Max 255 characters. |
| `serial_number` | string | No | Serial number. Max 255 characters. Must be unique. |
| `category` | string | Yes | Asset category. Valid values: `laptop`, `phone`, `furniture`, `vehicle`, `other`. |
| `purchase_date` | date | No | Date of purchase. |
| `purchase_cost` | numeric | No | Purchase cost. Min: 0. |
| `status` | string | No | Asset status. Valid values: `available`, `assigned`, `maintenance`, `retired`. |

**Example Request Body:**
```json
{
  "name": "MacBook Pro 16\"",
  "serial_number": "SN-MBP-2026-001",
  "category": "laptop",
  "purchase_date": "2026-01-15",
  "purchase_cost": 2499.99,
  "status": "available"
}
```

---

### 20.3 Show Asset

`GET /admin/assets/{id}`

**Auth:** Bearer Token
**Permission:** `assets.view`

**Request Body:** None

---

### 20.4 Update Asset

`PUT /admin/assets/{id}`

**Auth:** Bearer Token
**Permission:** `assets.update`

> Same fields as [Create Asset](#202-create-asset). The `serial_number` uniqueness check ignores the current record.

---

### 20.5 Delete Asset

`DELETE /admin/assets/{id}`

**Auth:** Bearer Token
**Permission:** `assets.destroy`

**Request Body:** None

---

### 20.6 Assign Asset

Assign an asset to an employee contract.

`POST /admin/assets/{id}/assign`

**Auth:** Bearer Token
**Permission:** `assets.assign`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |
| `assigned_date` | date | Yes | Date of assignment. |
| `condition_on_assign` | string | No | Condition of the asset on assignment. Max 255 characters. |
| `notes` | string | No | Additional notes. |

**Example Request Body:**
```json
{
  "contract_id": 3,
  "assigned_date": "2026-06-26",
  "condition_on_assign": "New",
  "notes": "Assigned for development work"
}
```

---

### 20.7 Return Asset

Mark an assigned asset as returned.

`PATCH /admin/assets/assignments/{assignmentId}/return`

**Auth:** Bearer Token
**Permission:** `assets.return`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `returned_date` | date | Yes | Date of return. |
| `condition_on_return` | string | No | Condition of the asset on return. Max 255 characters. |

**Example Request Body:**
```json
{
  "returned_date": "2026-12-31",
  "condition_on_return": "Good - minor scratches"
}
```

---

## 21. Expenses

Employee expense claims with receipt uploads and approval workflow.

**Base path:** `/admin/expenses`

### 21.1 List Expenses

`GET /admin/expenses`

**Auth:** Bearer Token
**Permission:** `expenses.list`

**Request Body:** None

---

### 21.2 Create Expense

`POST /admin/expenses`

**Auth:** Bearer Token
**Permission:** `expenses.store`

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |
| `category` | string | Yes | Expense category. Valid values: `travel`, `meals`, `supplies`, `other`. |
| `amount` | numeric | Yes | Expense amount. Min: 0.01. |
| `description` | string | No | Description of the expense. |
| `receipt_date` | date | Yes | Date of the receipt/expense. |
| `notes` | string | No | Additional notes. |
| `receipts` | array | No | Array of receipt files. |
| `receipts.*` | file | No | Receipt file. Accepted: jpeg, png, jpg, pdf. Max 10 MB each. |
| `delete_receipts` | array | No | Array of receipt file IDs to delete (for updates). |
| `delete_receipts.*` | integer | No | Receipt file ID to delete. |

**Example Request Body (JSON part):**
```json
{
  "contract_id": 5,
  "category": "travel",
  "amount": 350.50,
  "description": "Flight to Riyadh for client meeting",
  "receipt_date": "2026-06-20",
  "notes": "Round trip ticket"
}
```

---

### 21.3 Show Expense

`GET /admin/expenses/{id}`

**Auth:** Bearer Token
**Permission:** `expenses.view`

**Request Body:** None

---

### 21.4 Update Expense

`POST /admin/expenses/{id}`

**Auth:** Bearer Token
**Permission:** `expenses.update`

**Content-Type:** `multipart/form-data` (supports file upload)

> Same fields as [Create Expense](#212-create-expense). Use `delete_receipts` to remove previously uploaded files.

---

### 21.5 Delete Expense

`DELETE /admin/expenses/{id}`

**Auth:** Bearer Token
**Permission:** `expenses.destroy`

**Request Body:** None

---

### 21.6 Change Expense Status

`PATCH /admin/expenses/{id}/status`

**Auth:** Bearer Token
**Permission:** `expenses.change_status`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `status` | string | Yes | New status. Valid values: `pending`, `approved`, `rejected`, `paid`. |

**Example Request Body:**
```json
{
  "status": "approved"
}
```

---

## 22. Employee Documents

Manage employee documents (ID copies, certificates, licenses, etc.) linked to contracts.

**Base path:** `/admin/employee-documents`

### 22.1 List Employee Documents

`GET /admin/employee-documents`

**Auth:** Bearer Token
**Permission:** `employee_documents.list`

**Request Body:** None

---

### 22.2 Create Employee Document

`POST /admin/employee-documents`

**Auth:** Bearer Token
**Permission:** `employee_documents.store`

**Content-Type:** `multipart/form-data` (supports file upload)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |
| `type` | string | Yes | Document type. Valid values: `id_copy`, `certificate`, `license`, `medical`, `other`. |
| `title` | string | Yes | Document title. Max 255 characters. |
| `expiry_date` | date | No | Document expiration date. |
| `notes` | string | No | Additional notes. |
| `files` | array | No | Array of document files. |
| `files.*` | file | No | Document file. Accepted: jpeg, png, jpg, pdf. Max 10 MB each. |
| `delete_files` | array | No | Array of file IDs to delete (for updates). |
| `delete_files.*` | integer | No | File ID to delete. |

**Example Request Body (JSON part):**
```json
{
  "contract_id": 3,
  "type": "certificate",
  "title": "Bachelor's Degree in Computer Science",
  "expiry_date": null,
  "notes": "Verified by HR"
}
```

---

### 22.3 Show Employee Document

`GET /admin/employee-documents/{id}`

**Auth:** Bearer Token
**Permission:** `employee_documents.view`

**Request Body:** None

---

### 22.4 Update Employee Document

`POST /admin/employee-documents/{id}`

**Auth:** Bearer Token
**Permission:** `employee_documents.update`

**Content-Type:** `multipart/form-data` (supports file upload)

> Same fields as [Create Employee Document](#222-create-employee-document). Use `delete_files` to remove previously uploaded files.

---

### 22.5 Delete Employee Document

`DELETE /admin/employee-documents/{id}`

**Auth:** Bearer Token
**Permission:** `employee_documents.destroy`

**Request Body:** None

---

## 23. Onboarding Templates

Reusable checklists/templates for onboarding new employees.

**Base path:** `/admin/onboarding-templates`

### 23.1 List Onboarding Templates

`GET /admin/onboarding-templates`

**Auth:** Bearer Token
**Permission:** `onboarding_templates.list`

**Request Body:** None

---

### 23.2 Create Onboarding Template

`POST /admin/onboarding-templates`

**Auth:** Bearer Token
**Permission:** `onboarding_templates.store`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Template name. Max 255 characters. |
| `description` | string | No | Template description. |
| `items` | array | Yes | Array of onboarding task descriptions. Min 1 item. |
| `items.*` | string | Yes | Task description. Max 255 characters. |

**Example Request Body:**
```json
{
  "name": "Software Engineer Onboarding",
  "description": "Standard onboarding checklist for new software engineers.",
  "items": [
    "Set up development environment",
    "Complete security training",
    "Review coding standards documentation",
    "Meet with team lead",
    "Set up email and Slack"
  ]
}
```

---

### 23.3 Show Onboarding Template

`GET /admin/onboarding-templates/{id}`

**Auth:** Bearer Token
**Permission:** `onboarding_templates.view`

**Request Body:** None

---

### 23.4 Update Onboarding Template

`PUT /admin/onboarding-templates/{id}`

**Auth:** Bearer Token
**Permission:** `onboarding_templates.update`

> Same fields as [Create Onboarding Template](#232-create-onboarding-template).

---

### 23.5 Delete Onboarding Template

`DELETE /admin/onboarding-templates/{id}`

**Auth:** Bearer Token
**Permission:** `onboarding_templates.destroy`

**Request Body:** None

---

### 23.6 Apply Onboarding Template

Apply an onboarding template to a specific contract, creating tasks for the employee.

`POST /admin/onboarding-templates/{id}/apply`

**Auth:** Bearer Token
**Permission:** `onboarding_templates.apply`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `contract_id` | integer | Yes | Contract ID. Must exist in contracts table. |

**Example Request Body:**
```json
{
  "contract_id": 12
}
```

---

## 24. Onboarding Tasks

Individual onboarding tasks created from templates, assigned to employees.

**Base path:** `/admin/onboarding-tasks`

### 24.1 List Onboarding Tasks

`GET /admin/onboarding-tasks`

**Auth:** Bearer Token
**Permission:** `onboarding_tasks.list`

**Request Body:** None

---

### 24.2 Show Onboarding Task

`GET /admin/onboarding-tasks/{id}`

**Auth:** Bearer Token
**Permission:** `onboarding_tasks.view`

**Request Body:** None

---

### 24.3 Delete Onboarding Task

`DELETE /admin/onboarding-tasks/{id}`

**Auth:** Bearer Token
**Permission:** `onboarding_tasks.destroy`

**Request Body:** None

---

### 24.4 Toggle Onboarding Task Completion

Toggle an onboarding task between complete and incomplete.

`PATCH /admin/onboarding-tasks/{id}/toggle`

**Auth:** Bearer Token
**Permission:** `onboarding_tasks.toggle`

**Request Body:** None

---

## 25. Select Menus (Dropdowns)

Helper endpoints that return simplified lists for populating dropdown select menus in the UI.

### 25.1 Get Users List

`GET /select_menu/users`

**Auth:** No Auth

**Request Body:** None

---

### 25.2 Get Roles List

`GET /select_menu/roles`

**Auth:** No Auth

**Request Body:** None

---

### 25.3 Get Permissions List

`GET /select_menu/permissions`

**Auth:** No Auth

**Request Body:** None

---

## Enums Reference

### Attendance Type
| Value | Description |
|-------|-------------|
| `present` | Employee was present |
| `absent` | Employee was absent |
| `leave` | Employee was on leave |
| `official_holiday` | Day was an official holiday |
| `weekend` | Day was a weekend |

### Leave Request Type
| Value | Description |
|-------|-------------|
| `leave` | Standard leave request |

### Warning Type
| Value | Description |
|-------|-------------|
| `verbal` | Verbal warning |
| `written` | Written warning |
| `final` | Final warning |

### Asset Category
| Value | Description |
|-------|-------------|
| `laptop` | Laptop computer |
| `phone` | Mobile phone |
| `furniture` | Office furniture |
| `vehicle` | Company vehicle |
| `other` | Other asset types |

### Asset Status
| Value | Description |
|-------|-------------|
| `available` | Asset is available for assignment |
| `assigned` | Asset is currently assigned to an employee |
| `maintenance` | Asset is under maintenance |
| `retired` | Asset has been retired |

### Training Program Status
| Value | Description |
|-------|-------------|
| `planned` | Program is planned |
| `ongoing` | Program is currently ongoing |
| `completed` | Program has been completed |
| `cancelled` | Program has been cancelled |

### Enrollment Status
| Value | Description |
|-------|-------------|
| `enrolled` | Employee is enrolled |
| `completed` | Employee has completed the training |
| `cancelled` | Enrollment has been cancelled |

### Expense Category
| Value | Description |
|-------|-------------|
| `travel` | Travel expenses |
| `meals` | Meal expenses |
| `supplies` | Office supplies |
| `other` | Other expenses |

### Expense Status
| Value | Description |
|-------|-------------|
| `pending` | Expense claim is pending review |
| `approved` | Expense claim has been approved |
| `rejected` | Expense claim has been rejected |
| `paid` | Expense claim has been paid |

### Performance Review Status
| Value | Description |
|-------|-------------|
| `draft` | Review is in draft |
| `submitted` | Review has been submitted |
| `acknowledged` | Review has been acknowledged by the employee |

### Employee Document Type
| Value | Description |
|-------|-------------|
| `id_copy` | ID card or passport copy |
| `certificate` | Educational or professional certificate |
| `license` | Professional license |
| `medical` | Medical records or reports |
| `other` | Other document types |

### Marital Status (Contract)
| Value | Description |
|-------|-------------|
| `Single` | Not married |
| `Married` | Currently married |
| `Divorced` | Divorced |
| `Widowed` | Widowed |

### Military Status (Contract)
| Value | Description |
|-------|-------------|
| `Exempted` | Exempted from military service |
| `Completed` | Completed military service |
| `Deferred` | Military service deferred |
| `Currently Serving` | Currently in military service |
| `Not Applicable` | Military service not applicable |

### Announcement Priority
| Value | Description |
|-------|-------------|
| `low` | Low priority |
| `medium` | Medium priority |
| `high` | High priority |
| `urgent` | Urgent priority |

---

## Standard Response Format

All API responses follow a consistent JSON structure:

### Success Response
```json
{
  "status": true,
  "message": "Operation successful",
  "data": { }
}
```

### Paginated Response
```json
{
  "status": true,
  "message": "Success",
  "data": [ ],
  "meta": {
    "current_page": 1,
    "last_page": 5,
    "per_page": 15,
    "total": 72
  }
}
```

### Validation Error Response (422)
```json
{
  "status": false,
  "message": "Validation failed",
  "errors": {
    "field_name": ["Error message"]
  }
}
```

### Unauthorized Response (401)
```json
{
  "message": "Unauthenticated."
}
```

### Forbidden Response (403)
```json
{
  "status": false,
  "message": "User does not have the right permissions."
}
```

### Not Found Response (404)
```json
{
  "status": false,
  "message": "No query results for model [ModelName] {id}"
}
```

---

## Notes for Frontend Developers

1. **Authentication**: Use Laravel Sanctum tokens. After login, store the token and send it in the `Authorization: Bearer {token}` header for all authenticated requests.

2. **File Uploads**: Endpoints that accept file uploads (avatar, contract files, receipts, employee documents) must use `multipart/form-data` content type. When sending JSON data alongside files, send each field as a form-data field.

3. **Array Fields in Form Data**: When sending arrays in `multipart/form-data`, use bracket notation:
   ```
   salaries[0][id] = 1
   salaries[0][amount] = 5000
   salaries[1][id] = 2
   salaries[1][amount] = 1500
   ```

4. **Pagination**: List endpoints return paginated data. Use query parameters `page` and `per_page` to control pagination.

5. **Date Format**: All date fields accept the `YYYY-MM-DD` format (e.g., `2026-07-15`).

6. **Time Format**: Time fields accept `HH:mm` format in 24-hour notation (e.g., `09:00`, `17:30`).

7. **Permissions**: Each admin endpoint requires a specific permission. If the user's role does not have the required permission, a 403 Forbidden response is returned.

8. **Unique Constraints**: Fields marked as unique will return a 422 validation error if a duplicate value is submitted. On update operations, the current record is excluded from the uniqueness check.

9. **File Size Limits**: All file uploads are limited to 10 MB per file. Accepted image formats vary by endpoint (check individual endpoint documentation).

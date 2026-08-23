export const links = ({ permissions }: { permissions: Set<Permission> }): NavItem[] => {
  console.log(permissions, "permissions");
  return (
    [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: "Dashboard"
      },

      {
        title: "hr",
        url: "/hr",
        icon: "hr",
        isDefaultOpen: true,
        items: [
          {
            title: "ContractTypes",
            url: "/hr/contract-types",
            icon: "contractTypes"
          },
          {
            title: "contract",
            url: "/hr/contract",
            icon: "contract"
          },
          {
            title: "Languages",
            url: "/hr/languages",
            icon: "languages"
          },
          {
            title: "LeaveTypes",
            url: "/hr/leave-types",
            icon: "leaveTypes"
          },
          {
            title: "Salaries",
            url: "/hr/salaries",
            icon: "salaries"
          },
          {
            title: "Sections",
            url: "/hr/sections",
            icon: "sections"
          },
          {
            title: "Deductions",
            url: "/hr/deductions",
            icon: "deductions"
          },
          {
            title: "OfficialHolidays",
            url: "/hr/official-holidays",
            icon: "officialHolidays"
          },
          {
            title: "Shifts",
            url: "/hr/shifts",
            icon: "shifts"
          },
          {
            title: "Attendances",
            url: "/hr/attendances",
            icon: "attendance"
          },
          {
            title: "AttendanceCalculator",
            url: "/hr/attendances/calculator",
            icon: "attendance"
          },
          {
            title: "LeaveRequests",
            url: "/hr/leave-requests",
            icon: "leaveRequests"
          },
          {
            title: "Announcements",
            url: "/hr/announcements",
            icon: "announcements"
          },
          {
            title: "Warnings",
            url: "/hr/warnings",
            icon: "warnings"
          },
          {
            title: "PerformanceReviews",
            url: "/hr/performance-reviews",
            icon: "performanceReviews"
          },
          {
            title: "TrainingPrograms",
            url: "/hr/training-programs",
            icon: "trainingPrograms"
          },
          {
            title: "Assets",
            url: "/hr/assets",
            icon: "assets"
          },
          {
            title: "Expenses",
            url: "/hr/expenses",
            icon: "expenses"
          },
          {
            title: "EmployeeDocuments",
            url: "/hr/employee-documents",
            icon: "employeeDocuments"
          },
          {
            title: "OnboardingTemplates",
            url: "/hr/onboarding-templates",
            icon: "onboardingTemplates"
          },
          {
            title: "OnboardingTasks",
            url: "/hr/onboarding-tasks",
            icon: "onboardingTasks"
          }
        ]
      },

      {
        title: "roles",
        url: "/roles",
        icon: "roles"
      },
      {
        title: "users",
        url: "/users",
        icon: "users"
      },


      // {
      //   title: "settings",
      //   url: "/settings",
      //   icon: "settings"
      // }
    ]
      .map(item => {
        if (!item || !("items" in item)) {
          return item;
        }

        if (!item?.items?.length) {
          return undefined;
        }

        return item;
      })
      .filter(Boolean) as NavItem[]
  ).filter(Boolean) as NavItem[]; // Filter out any undefined values
};

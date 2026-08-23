export const links = ({ permissions }: { permissions?: Set<Permission> }): NavItem[] => {
  return [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "Dashboard"
    },
    {
      title: "Customers",
      url: "/customers",
      icon: "customers"
    },
    {
      title: "Blog",
      url: "/blog",
      icon: "blog"
    },
    {
      title: "Categories",
      url: "/categories",
      icon: "categories"
    },
    {
      title: "SubCategories",
      url: "/sub-categories",
      icon: "subCategories"
    },
    {
      title: "Faq",
      url: "/faq",
      icon: "faq"
    },
    {
      title: "ContactUs",
      url: "/contact-us",
      icon: "contactUs"
    },
    {
      title: "SentEmails",
      url: "/sent-emails",
      icon: "sentEmails"
    },
    {
      title: "Visitors",
      url: "/visitors",
      icon: "visitors"
    },
    {
      title: "Users",
      url: "/users",
      icon: "users"
    },
    {
      title: "Roles",
      url: "/roles",
      icon: "roles"
    },
    {
      title: "hr",
      url: "/hr",
      icon: "hr",
      isDefaultOpen: false,
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
    }
  ]
    .filter((item) => {
      if (permissions && permissions.size > 0) {
        // filter if permissions set
      }
      return Boolean(item);
    })
    .map((item) => {
      if (!item || !("items" in item)) {
        return item;
      }

      if (!item?.items?.length) {
        return undefined;
      }

      return item;
    })
    .filter(Boolean) as NavItem[];
};

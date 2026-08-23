type ID = number;
declare namespace API {
  interface Response<T> {
    data: T;
    success: boolean;
    message: string;
    code?: number;
    total: number;
    limit?: number;
    result?: {
      message: string;
    };
  }
}

declare namespace Auth {
  type RoleKey = "Admin" | "Teacher" | "Student" | "Parent";
  type PermissionsType = {
    patch: boolean;
    put: boolean;
    delete: boolean;
    get: boolean;
    post: boolean;
  };
  type Permissions ='create order'
    |'manage localization'
    |'translate App\Models\Localizations\Nation'
    |'translate App\Models\Localizations\Country'
    |'translate App\Models\Localizations\County'
    |'translate App\Models\Localizations\Port'
    |'translate App\Models\Localizations\Area'
    |'manage payments'
    |'translate App\Models\PaymentMethod'
    |'manage roles'
    |'translate App\Models\Users\Role'
    |'view users list'
    |'view single user'
    |'edit user'
    |'delete user'
    |'create user'
    |'view branches list'
    |'view single branch'
    |'create branch'
    |'edit branch'
    |'delete branch'
    |'translate App\Models\Branch'
    |'view branch users'
    |'manage branch users'
    |'manage branch localization'
    |'view branch localization'
    |'translate App\Models\Services\Service'
    |'view services list'
    |'view single service'
    |'create service'
    |'edit service'
    |'delete service'
    |'manage items'
    |'translate App\Models\Items'
    |'manage status'
    |'translate App\Models\Status\Status'
    |'price service'
    |'view clients list'
    |'view single client'
    |'create client'
    |'edit client'
    |'delete client'
    |'attach clients'
    |'view attached clients'
    |'view branch clients'
    |'view user clients'
    |'view client visits'
    |'create client visit'
    |'view all client visits'
    |'view user visits'
    |'delete client visits'
    |'manage cms admin'
    |'manage cms editor'
    |'manage support admin'
    |'manage support agent'
    |'view orders'
    |'view order shipping'
    |'view order goods price'
    |'view order details'
    |'manage currency'
    |'translate App\Models\Currency'
    |'view user login history'
    |'manage user login history'
    |'view order invoice'
    |'add note to order'
    |'collect order shipping'
    |'suggest order shipping'
    |'approve order shipping'
    |'delete order'
    |'view shipments list'
    |'view shipment details'
    |'delete shipment'
    |'manage shipments'
    |'attach shipment orders'
    |'manage shipment types'
    |'translate App\Models\Shipments\ShipmentType'
    |'translate App\Models\Work'
    |'manage works'
    |'view order label'
    |'view shipment order details'
    |'view offers list'
    |'view all offers'
    |'manage offer'
    |'delete offer'
    |'add note to shipment'
    |'export shipment orders'
    |'view user orders'
    |'switch offer to order'
    |'create offer'
    |'view shipment orders'
    |'update offer'
    |'update order'
    |'branch manager'
    |'super admin'
    |'add profit'
    |'switch order to offer'
    |'add order shipping'
    |'suggest order invoice'
    |'approve order invoice'
    |'collect shipment shipping'

  type Roles = {
    id: ID;
    name: RoleKey;
    default: boolean;
  };
  interface User {
    id: number;
    name: string;
    email: string;
    type: Role;
    status: Status;
    verified: boolean;
    phone: string;
    active: boolean;
    image?: string | null;
    createdAt: string;
    updatedAt: string | null;
  }

  interface AuthData {
    user: User;
    accessToken: string;
  }
}

declare namespace AppConfig {
  type Locale = "ar" | "en" | "admin";
  interface MiniNavItem {
    label: string;
    href: string;
    active?: boolean;
    apiUrl?: string;
  }
  type SearchParams = Promise<{
    page?: number;
    limit?: number;
    branchId?: string | number;
    type?: string;
    domain?: string;
    search?: string;
    sort?: string;

    [key: string]: string | number | boolean | undefined;
  }>;
  interface NavItemChild {
    title?: string;
    url: RoutesKey;
    icon?: MainIconsType;
    info?: React.ReactNode;
    isActive?: boolean;
  }

  interface NavItem {
    title: string;
    isDefaultOpen?: boolean;
    url: RoutesKey;
    info?: React.ReactNode;
    items?: (false | NavItemChild)[];
    icon?: MainIconsType;
  }

  interface Sidebar {
    navMain: NavItem[];
  }
  type ContextParams = Promise<{
    id: string;
    moduleId: string;
    locale: Locale;
    categoryId: string;
  }>;

  interface Context {
    params: ContextParams;
    searchParams: SearchParams;
  }

  interface SystemPermissionMethod {
    id: number;
    method: string;
  }

  interface SystemPermission {
    name:string;
    prefix: string;
    methods: SystemPermissionMethod[];
  }
}

declare namespace Entities {
  type TeacherEntity = {
    id: number;
    name: string;
    email: string;
    phone: string;
    verified: boolean;
    active: boolean;
    image: string;
    TeacherDetails: {
      id: number;
      zoomLink: string;
      male: boolean;
      numberOfLessons: number;
      rate: number;
      languageId: string;
      rateCount: number;
      hourPrice: number;
      salary: number;
    };
  };

  type Student = {
    id: number;
    name: string;
    image: string;
  };
  type Lesson = {
    id: number;
    name: string;
    report: string | null; // URL to the report file
    Teacher: TeacherEntity;
    description: string;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    ended: boolean;
    teacherSalary: number;
    teacherLate: boolean;
    teacherLink: string | null;
    teacherAttend: boolean;
    teacherId: number;
    StudentLessons: {
      link: string | null;
      studentRate: number;
      teacherRate: number;
      report: string | null; // URL to the report file
      studentLate: boolean;
      studentAttend: boolean;
    }[]; // Replace `any` with the correct type if known
  };
  type Homework = {
    id: number;
    name: string;
    homeWorkFile: string;
    corrected: boolean;
    comment: string | null;
    studentHomeWork: unknown; // Change to correct type if known
    studentId: number;
    teacherId: number;
    Teacher: TeacherEntity;
    Student: Student;
  };
}
interface StudentStatistics {
  Plan: {
    id: string | null;
    name: string | null;
    numberOfSubscriptions: number;
  };
  Details: {
    lessonsAttended: number;
    lessonsNotAttended: number;
    lessonsLate: number;
    rate: number;
    reviews: number;
  };
  Graph: {
    x: string;
    y: number;
  }[];
}
interface TeacherStatistics {
  lessonsAttended: number;
  lessonsNotAttended: number;
  lessonsLate: number;
  salary: number;
  hourPrice: number;
  rate: number;
  Language: { name: string };
  Subject: { Subject: { id: number; name: string } }[];
  reviews: number;
}
// Legacy type aliases for backward compatibility
type UrlSearchParamsInterface = Awaited<AppConfig.SearchParams>;
type TFunction = (string) => string;
type NavItemChild = AppConfig.NavItemChild;
type NavItem = AppConfig.NavItem;
type SidebarData = AppConfig.Sidebar;
type SearchParams = AppConfig.SearchParams;
type locales = AppConfig.Locale;
type ApiResponse<T> = API.Response<T>;
type Params = AppConfig.ContextParams;
type Roles = Auth.Roles;
type RoleKey = Auth.RoleKey;
type Permission = Auth.Permissions;
type Homework = Entities.Homework;
type Lesson = Entities.Lesson;
type TeacherEntity = Entities.TeacherEntity;

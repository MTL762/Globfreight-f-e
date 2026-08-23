export const endpoints = {
  // Auth
  authLogin: "/auth/login",
  authProfile: "/auth/profile",
  authChangePassword: "/auth/change_password",
  authLogout: "/auth/logout",

  // Admin
  adminDashboard: "/admin/dashboard",
  adminUsers: "/admin/users",
  adminCategories: "/admin/categories",
  adminSubCategories: "/admin/sub-categories",
  adminBlogPosts: "/admin/blog-posts",
  adminFaqItems: "/admin/faq-items",
  adminContactUs: "/admin/contact-us",
  adminCustomers: "/admin/customers",
  adminSentEmails: "/admin/sent-emails",
  adminVisitors: "/admin/visitors",
  adminVisitorsStats: "/admin/visitors/stats",

  // Roles & Permissions
  roles: "/roles",
  rolesPermissions: "/roles/permissions",

  // Public
  contactUs: "/contact-us",
  visitorsTrack: "/visitors/track",
  categories: "/categories",
  categoriesSlug: "/categories/slug",
  subCategories: "/sub-categories",
  subCategoriesSlug: "/sub-categories/slug",
  blogPosts: "/blog-posts",
  blogPostsSlug: "/blog-posts/slug",
  faqItems: "/faq-items",

  // Aliases for convenience
  dashboard: "/admin/dashboard",
  users: "/admin/users",
  customers: "/admin/customers",
  sentEmails: "/admin/sent-emails",
  visitors: "/admin/visitors",
};

export type endpointName = keyof typeof endpoints;

export type endpointType = (endpointName | number | string)[];

export const tags = {
  auth: "auth",
  dashboard: "dashboard",
  users: "users",
  roles: "roles",
  categories: "categories",
  subCategories: "subCategories",
  blogPosts: "blogPosts",
  faqItems: "faqItems",
  contactUs: "contactUs",
  customers: "customers",
  sentEmails: "sentEmails",
  visitors: "visitors",
};

export type Tags = keyof typeof tags;


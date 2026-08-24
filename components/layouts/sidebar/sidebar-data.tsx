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

      // if (!item?.items?.length) {
      //   return undefined;
      // }

      return item;
    })
    .filter(Boolean) as NavItem[];
};

export interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface VisitorData {
  page_url: string;
  referer?: string;
  device_type: string;
  platform: string;
  browser: string;
  country?: string;
  city?: string;
}

export const api = {
  submitContact: async (data: ContactData): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch("/api/contact-us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return { success: true };
      }
      return await res.json();
    } catch {
      return { success: true };
    }
  },

  trackVisitor: async (data: VisitorData): Promise<{ success: boolean }> => {
    try {
      const res = await fetch("/api/visitors/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        return { success: true };
      }
      return await res.json();
    } catch {
      return { success: true };
    }
  },
};

export interface ContactMessage {
  id: number | string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: "unread" | "read" | "replied" | "archived" | string;
  reply_message?: string | null;
  replied_at?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface ContactReplyPayload {
  reply_message: string;
}

export interface ContactStatusPayload {
  status: string;
}

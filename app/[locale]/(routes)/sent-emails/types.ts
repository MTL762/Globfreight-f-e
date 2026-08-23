export interface SentEmailItem {
  id: number | string;
  recipient_email: string;
  recipient_name?: string | null;
  subject: string;
  body: string;
  status?: "sent" | "failed" | "pending" | string;
  created_at: string;
  updated_at?: string;
}

export interface ComposeEmailPayload {
  recipient_email: string;
  recipient_name?: string;
  subject: string;
  body: string;
}

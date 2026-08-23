export interface PerformanceReviewsEntity {
  id: number;
  contract_id: any;
  review_period_start: any;
  review_period_end: any;
  overall_rating: any;
  strengths?: any;
  improvements?: any;
  goals?: any;
  status?: any;
  created_at: string;
  updated_at: string;
}

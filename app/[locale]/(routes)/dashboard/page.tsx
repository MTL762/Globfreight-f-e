import type { Metadata } from "next";
import { fetchHelper } from "@/api/fetch";
import { PROJECT_NAME } from "@/utils/config";
import { DashboardData } from "./types";
import { DashboardHeader } from "./components/DashboardHeader";
import { MetricCards } from "./components/MetricCards";
import { VisitorChart } from "./components/VisitorChart";
import { RecentCustomers } from "./components/RecentCustomers";
import { RecentBlogPosts } from "./components/RecentBlogPosts";
import { RecentContacts } from "./components/RecentContacts";
import { RecentPriceRequests } from "./components/RecentPriceRequests";
import { OperationalHub } from "./components/OperationalHub";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Admin Dashboard | ${PROJECT_NAME}`,
    description: "Enterprise administration and real-time operations dashboard."
  };
}

// Fallback initial data matching the exact {{base_url}}/admin/dashboard API contract
const fallbackDashboardData: DashboardData = {
  metrics: {
    users: { total: 4 },
    customers: { total: 1, active: 1 },
    blog_posts: { total: 1, published: 1, draft: 0 },
    categories: { total: 1, sub_categories_total: 1 },
    faq_items: { total: 1 },
    contact_us: { total: 0, unread: 0 },
    sent_emails: { total: 0 },
    visitors: { total: 0, today: 0, this_week: 0, this_month: 0 }
  },
  recent: {
    contacts: [],
    customers: [
      {
        id: 1,
        user_id: null,
        first_name: "Ahmed",
        last_name: "Hassan",
        company_name: "Hassan Global Logistics",
        email: "ahmadsed@gmail.com",
        phone: "+971501234567",
        alt_phone: "+971509876543",
        country: "United Arab Emirates",
        city: "Dubai",
        address: "Business Bay, Tower 4, Suite 1205",
        postal_code: "12345",
        tax_number: "TRN-987654321",
        status: "active",
        notes: "VIP Corporate client.",
        created_at: "2026-08-23T19:35:03.000000Z"
      }
    ],
    blog_posts: [
      {
        id: 1,
        author_id: 1,
        category_id: 1,
        sub_category_id: 1,
        title: {
          ar: "ثورة وكلاء الذكاء الاصطناعي في الشحن واللوجستيات",
          en: "The Rise of Autonomous AI Agents in Freight"
        },
        slug: "the-rise-of-autonomous-ai-agents-in-freight",
        excerpt: {
          ar: "كيف تغير أنظمة الذكاء الاصطناعي إدارة حاويات الشحن.",
          en: "How autonomous AI workflows streamline container freight."
        },
        content: {
          ar: "<p>يحدث وكلاء الذكاء الاصطناعي نقلة نوعية في سلاسل الإمداد العالمية...</p>",
          en: "<p>Autonomous AI agents are transforming global supply chains...</p>"
        },
        status: "published",
        is_featured: true,
        published_at: "2026-08-23T19:33:41.000000Z",
        views_count: 0,
        tags: ["AI", "Logistics"],
        created_at: "2026-08-23T19:33:41.000000Z",
        author: {
          id: 1,
          name: "super-admin",
          email: "super-admin@admin.com",
          status: "active",
          type: "super-admin"
        },
        category: {
          id: 1,
          name: {
            ar: "تكنولوجيا",
            en: "Technology"
          },
          slug: "technology",
          description: {
            ar: "أخبار التكنولوجيا واللوجستيات",
            en: "Tech and freight innovation"
          },
          is_active: true,
          order: 1
        }
      }
    ]
  },
  charts: {
    visitor_trend: [],
    contact_trend: []
  }
};

export default async function DashboardPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Fetch dashboard data and administrator profile in parallel
  const [dashboardResponse, profileResponse] = await Promise.all([
    fetchHelper({
      endPoint: ["adminDashboard"],
      method: "GET",
      cache: "no-cache",
      tags: ["dashboard"]
    }).catch(() => null),
    fetchHelper({
      endPoint: ["authProfile"],
      method: "GET"
    }).catch(() => null)
  ]);

  // Extract data with graceful fallbacks
  const dashboardData: DashboardData =
    dashboardResponse?.data?.metrics
      ? dashboardResponse.data
      : fallbackDashboardData;

  const userProfile = profileResponse?.data || {
    name: "Admin",
    role: "Administrator"
  };

  return (
    <div className="min-h-screen space-y-8 pb-12">
      {/* 1. Header / Hero Greeting & Quick Context */}
      <DashboardHeader
        userName={userProfile?.name}
        userRole={userProfile?.role || userProfile?.type}
        locale={locale}
        metrics={dashboardData.metrics}
      />

      {/* 2. Key Metrics & Metric Cards Grid (8 Cards) */}
      <MetricCards metrics={dashboardData.metrics} locale={locale} />

      {/* 3. Interactive Analytics & Operations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Analytics Trends & Recent Customers */}
        <div className="lg:col-span-7 space-y-8">
          <VisitorChart charts={dashboardData.charts} locale={locale} />
          <RecentCustomers customers={dashboardData.recent?.customers} locale={locale} />
        </div>

        {/* Right Column (5 cols): Blog Posts, Contact Inquiries & Price Requests */}
        <div className="lg:col-span-5 space-y-8">
          <RecentPriceRequests priceRequests={dashboardData.recent?.price_requests} locale={locale} />
          <RecentBlogPosts posts={dashboardData.recent?.blog_posts} locale={locale} />
          <RecentContacts contacts={dashboardData.recent?.contacts} locale={locale} />
        </div>
      </div>

      {/* 4. Administrative Hub & Infrastructure Telemetry */}
      <OperationalHub locale={locale} />
    </div>
  );
}

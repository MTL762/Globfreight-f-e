import { fetchHelper } from "@/api/fetch";
import { AppSidebar } from "@/components/app-sidebar";
import LanguageSwitcher from "@/components/language-switcher";
import PageTransitionWrapper from "@/components/layouts/PageTransitionWrapper";
// import CheckAttendanceButton from "@/components/layouts/header/components/CheckAttendanceButton";
import LogoutConfirmButton from "@/components/layouts/header/components/LogoutConfirmButton";
import ThemeSwitcher from "@/components/theme-switcher";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TOKEN } from "@/utils/config";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function RoutesLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}): Promise<JSX.Element> {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN)?.value;

  if (!token) {
    redirect(`/${locale}/signin`);
  }

  const data = await fetchHelper({
    endPoint: ['profile']
  });

  if (data?.status === 401) {
    redirect(`/${locale}/signin?expired=true`);
  }
  return (
    <SidebarProvider>
      <AppSidebar side={locale == "ar" ? "right" : "left"} />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2 w-full flex-row-reverse me-3">
            <LogoutConfirmButton />
            <LanguageSwitcher />
            {/* <CheckAttendanceButton /> */}
            <ThemeSwitcher />
          </div>
        </header>
        <div className=" p-5 md:p-10">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

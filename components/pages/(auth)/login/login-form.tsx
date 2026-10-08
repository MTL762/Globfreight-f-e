"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/features/auth/login/hooks/use-login-form";
import { CheckCircle2, Eye, EyeOff, Lock, Mail, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function LoginForm() {
  const t = useTranslations();
  const {
    locale,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    onSubmit
  } = useLoginForm();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      <div className="w-full max-w-5xl rounded-[28px] bg-white dark:bg-gray-900 shadow-2xl border border-black/5 dark:border-gray-700 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <CardHeader className="space-y-4 p-0">
              <div className="flex items-center justify-center gap-3">
                <Image src="/logo.png" alt="Logo" width={120} height={42} className="object-contain" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl sm:text-3xl font-semibold text-foreground">
                  {t("Sign in to your account")}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t("Manage employees, payroll, and daily HR operations from one place")}
                </p>
              </div>
            </CardHeader>

            <CardContent className="mt-8 p-0">
              <form
                onSubmit={onSubmit}
                className="space-y-5 mt-6"
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t("Email")}
                  </Label>
                  <div className="relative group">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder={t("Enter your email and password to login") ? t("Email") : "name@example.com"}
                      required
                      className="h-11 rounded-full border border-border/70 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-4 shadow-sm focus-visible:ring-1 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-sm font-medium">
                      {t("Password")}
                    </Label>
                  </div>
                  <div className="relative group">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="h-11 rounded-full border border-border/70 dark:border-gray-600 bg-white dark:bg-gray-800 pl-10 pr-12 shadow-sm focus-visible:ring-1 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* {notificationPermission !== "granted" && (
                    <div className="space-y-2">
                      <Button
                        type="button"
                        onClick={requestPermission}
                        variant="outline"
                        className="w-full h-11 rounded-full border border-border/70 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Bell className="h-4 w-4 mr-2" />
                        {t("Enable Notifications")}
                      </Button>
                      <p className="text-xs text-muted-foreground text-center">
                        {t("Allow notifications to receive updates")}
                      </p>
                    </div>
                  )} */}

                <Button
                  disabled={isLoading}
                  type="submit"
                  className="w-full h-11 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-sm tracking-wide shadow-md"
                  variant="default"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin"></span>
                      <span>{t("Processing")}</span>
                    </div>
                  ) : (
                    t("Sign In")
                  )}
                </Button>
              </form>

              <footer className="mt-8 text-center text-xs text-muted-foreground">
                © {new Date().getFullYear()}{" "}
                <Link
                  href={"https://www.neovidia.com/"}
                  target="_blank"
                  className="font-semibold text-foreground"
                >
                  Neovida
                </Link>
              </footer>
            </CardContent>
          </div>
          {/* Right Visual Brand Showcase Panel */}
          <div className="relative hidden md:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#001738] via-[#002855] to-[#041226] p-8 lg:p-10 select-none">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FE6F00]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" />

            {/* Subtle Geometric Dot Grid */}
            <div
              className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"
              aria-hidden="true"
            />

            {/* Top Pill / Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FE6F00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FE6F00]" />
                </span>
                <span>Globfreight Operations</span>
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs text-white/70 font-medium bg-white/5 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Enterprise Secured</span>
              </div>
            </div>

            {/* Center Dynamic Visual: Vector Illustration & Overlay */}
            <div className="relative z-10 my-auto py-6 flex flex-col items-center justify-center">
              <div className="relative w-full aspect-[4/3] max-w-md mx-auto transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/login-hr.svg"
                  alt="Modern HR Workspace Dashboard"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Bottom Glassmorphic Value Card */}
            <div className="relative z-10 rounded-2xl bg-white/10 dark:bg-black/30 p-5 shadow-2xl backdrop-blur-xl border border-white/20 text-white">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#FE6F00] to-[#E15A00] text-white shadow-lg shadow-[#FE6F00]/25 shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white tracking-tight leading-snug">
                    {t("Modern HR workspace with instant employee insights")}
                  </p>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {t("Manage, monitor, and empower your team from one clean dashboard")}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/75">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  {t("Attendance Tracking")}
                </span>
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-[#FF9343]" />
                  {t("Performance Insights")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

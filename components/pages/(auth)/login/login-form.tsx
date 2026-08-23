"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginForm } from "@/features/auth/login/hooks/use-login-form";
import { Bell, Eye, EyeOff, Lock, Mail } from "lucide-react";
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
    onSubmit,
    notificationPermission,
    requestPermission
  } = useLoginForm();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      <div className="w-full max-w-5xl rounded-[28px] bg-white dark:bg-gray-900 shadow-2xl border border-black/5 dark:border-gray-700 overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <CardHeader className="space-y-4 p-0">
              <div className="flex items-center justify-center gap-3">
                 <Image src="/logo.svg" alt="Logo" width={120} height={42} />
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

                  {notificationPermission !== "granted" && (
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
                  )}

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

          <div className="relative hidden md:block bg-gradient-to-br from-[#022c22] via-[#065f46] to-[#022c22]">
            <div className="absolute inset-0">
              <Image
                src="/login-hr.svg"
                alt="HR system dashboard illustration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#022c22]/40 via-[#065f46]/30 to-[#022c22]/70" />
            </div>
            <div className="absolute inset-x-8 bottom-8 rounded-2xl bg-white/95 dark:bg-gray-900/95 p-4 shadow-lg backdrop-blur-sm border border-white/10">
              <p className="text-sm font-medium text-foreground">
                {t("Modern HR workspace with instant employee insights")}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {t("Manage, monitor, and empower your team from one clean dashboard")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

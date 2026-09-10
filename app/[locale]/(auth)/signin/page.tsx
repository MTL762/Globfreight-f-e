import { LoginForm } from "@/components/pages/(auth)/login/login-form";
import { Suspense } from "react";

export default async function Page(): Promise<JSX.Element> {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background/95 to-muted/60">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}

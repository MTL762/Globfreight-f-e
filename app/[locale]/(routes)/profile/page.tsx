import { fetchHelper } from "@/api/fetch";
import ProfileFormPage from "@/components/pages/_profile/profileForm.page";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage() {
  const t = await getTranslations();
  const fetchRes = await fetchHelper({
    endPoint: ["profile"]
  });

  if (!fetchRes.success) {
    return (
      <div className="container mx-auto py-8 max-w-4xl px-4">
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl text-center">
          <p className="font-semibold">{t("Error loading profile")}</p>
          <p className="text-sm opacity-80">{fetchRes.result?.message || t("Something went wrong")}</p>
        </div>
      </div>
    );
  }

  // Robustly extract user data regardless of nesting
  const userData = fetchRes?.data?.user || fetchRes?.data || fetchRes;

  return (
    <div className="container mx-auto py-8 max-w-4xl px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">{t("My Profile")}</h1>
        <p className="text-muted-foreground mt-2">
          {t("Manage your account settings and profile information")}
        </p>
      </div>
      
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <ProfileFormPage data={userData} />
      </div>
    </div>
  );
}

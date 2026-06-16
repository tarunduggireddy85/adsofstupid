import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage() {
  const cookieStore = await cookies();

  if (cookieStore.get("admin_auth")?.value === "true") {
    redirect("/admin/dashboard");
  }

  return <LoginForm />;
}

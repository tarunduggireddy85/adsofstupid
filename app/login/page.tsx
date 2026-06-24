import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdminSession } from "@/lib/adminAuth";

export default async function LoginPage() {
  if (await isAdminSession()) {
    redirect("/admin/dashboard");
  }

  return <LoginForm />;
}

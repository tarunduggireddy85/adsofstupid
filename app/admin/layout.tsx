import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import "./admin.css";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  if (cookieStore.get("admin_auth")?.value !== "true") {
    redirect("/login?next=/admin/dashboard");
  }

  return <AdminShell>{children}</AdminShell>;
}

import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isAdminSession } from "@/lib/adminAuth";
import "./admin.css";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminSession())) {
    redirect("/login?next=/admin/dashboard");
  }

  return <AdminShell>{children}</AdminShell>;
}

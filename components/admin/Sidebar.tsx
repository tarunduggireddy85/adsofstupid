"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logoutAdmin } from "@/lib/authService";
import { LayoutDashboard, FileText, SquarePen, Inbox, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "All Blogs", icon: FileText },
  { href: "/admin/blogs/add", label: "Add Blog", icon: SquarePen },
  { href: "/admin/leads", label: "Leads", icon: Inbox }
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logoutAdmin();
    router.replace("/login");
  }

  return (
    <>
      <aside className={`admin-sidebar ${isOpen ? "admin-sidebar--open" : ""}`}>
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__eyebrow">Ads of Stupid</span>
          <strong>Blog Admin</strong>
        </div>
        <nav className="admin-sidebar__nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                className={`admin-sidebar__link ${
                  isActive ? "admin-sidebar__link--active" : ""
                }`}
                href={item.href}
                key={item.href}
                onClick={onClose}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          className="admin-button admin-button--ghost admin-sidebar__logout"
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
      {isOpen ? (
        <button
          aria-label="Close sidebar"
          className="admin-sidebar__overlay"
          onClick={onClose}
          type="button"
        />
      ) : null}
    </>
  );
}

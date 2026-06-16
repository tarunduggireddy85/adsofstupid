"use client";

import { usePathname, useRouter } from "next/navigation";
import { getAdminUser, logoutAdmin } from "@/lib/authService";
import { Menu, LogOut, User } from "lucide-react";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/blogs": "All Blogs",
  "/admin/blogs/add": "Add Blog"
};

type TopbarProps = {
  onMenuClick: () => void;
};

function getPageTitle(pathname: string) {
  if (pageTitles[pathname]) {
    return pageTitles[pathname];
  }

  if (pathname.endsWith("/edit")) {
    return "Edit Blog";
  }

  if (pathname.startsWith("/admin/blogs/")) {
    return "Blog Preview";
  }

  return "Admin";
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const user = getAdminUser();

  function handleLogout() {
    logoutAdmin();
    router.replace("/login");
  }

  return (
    <header className="admin-topbar">
      <div className="admin-topbar__left">
        <button
          aria-label="Open menu"
          className="admin-icon-button"
          onClick={onMenuClick}
          type="button"
        >
          <Menu size={20} />
        </button>
        <div>
          <p className="admin-overline">Blog management</p>
          <h1 className="admin-topbar__title">{getPageTitle(pathname)}</h1>
        </div>
      </div>
      <div className="admin-topbar__right">
        <div className="admin-topbar__profile">
          <span className="admin-topbar__avatar">
            <User size={20} />
          </span>
          <div>
            <strong>{user?.name ?? "Admin User"}</strong>
            <p>{user?.email ?? "admin@example.com"}</p>
          </div>
        </div>
        <button className="admin-button" onClick={handleLogout} type="button">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
}

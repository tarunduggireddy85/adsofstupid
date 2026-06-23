"use client";

import { useState } from "react";
import { MoreHorizontal, Globe, FileText, Archive } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BlogPost } from "@/lib/mockBlogs";

type StatusAction = { label: string; to: BlogPost["status"]; icon: LucideIcon };

const ACTIONS: Record<BlogPost["status"], StatusAction[]> = {
  Draft: [{ label: "Publish", to: "Published", icon: Globe }],
  Published: [
    { label: "Unpublish (to draft)", to: "Draft", icon: FileText },
    { label: "Archive", to: "Archived", icon: Archive }
  ],
  Archived: [
    { label: "Publish", to: "Published", icon: Globe },
    { label: "Move to draft", to: "Draft", icon: FileText }
  ]
};

export function BlogStatusMenu({
  blog,
  onChange
}: {
  blog: BlogPost;
  onChange: (blog: BlogPost, to: BlogPost["status"]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const actions = ACTIONS[blog.status] ?? [];

  if (!actions.length) return null;

  function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (open) {
      setOpen(false);
      return;
    }
    const r = event.currentTarget.getBoundingClientRect();
    setPos({ top: r.bottom + 6, left: Math.max(12, r.right - 190) });
    setOpen(true);
  }

  return (
    <>
      <button
        className="admin-inline-link"
        type="button"
        onClick={toggle}
        style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginLeft: "12px" }}
      >
        <MoreHorizontal size={16} />
        Options
      </button>

      {open ? (
        <>
          <button
            aria-label="Close menu"
            type="button"
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 60, background: "transparent", border: 0, cursor: "default" }}
          />
          <div
            role="menu"
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              zIndex: 61,
              minWidth: "190px",
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 16px 40px rgba(15,23,42,0.16)",
              padding: "6px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.to}
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpen(false);
                    onChange(blog, action.to);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 10px",
                    border: 0,
                    background: "transparent",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: action.to === "Archived" ? "#475569" : "#334155",
                    textAlign: "left"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Icon size={15} />
                  {action.label}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </>
  );
}

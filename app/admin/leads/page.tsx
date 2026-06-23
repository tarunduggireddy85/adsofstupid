"use client";

import { useEffect, useState } from "react";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { Toast } from "@/components/ui/Toast";
import type { Lead } from "@/lib/db";
import { Trash2, Loader2, Calendar, Phone, Mail, Briefcase, Smile } from "lucide-react";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<Lead | null>(null);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadLeads() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      } else {
        console.error("Failed to fetch leads");
      }
    } catch (error) {
      console.error("Error loading leads:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  async function handleConfirmDelete() {
    if (!pendingDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/leads/${pendingDelete.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setToast(`Lead from "${pendingDelete.name}" deleted.`);
        loadLeads();
      } else {
        setToast("Failed to delete lead.");
      }
    } catch (error) {
      console.error("Error deleting lead:", error);
      setToast("Error deleting lead.");
    } finally {
      setPendingDelete(null);
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const query = search.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.brand.toLowerCase().includes(query) ||
      lead.painPoint.toLowerCase().includes(query) ||
      lead.phone.toLowerCase().includes(query) ||
      (lead.email || "").toLowerCase().includes(query) ||
      (lead.source || "").toLowerCase().includes(query)
    );
  });

  return (
    <div className="admin-page">
      {toast ? <Toast message={toast} onClose={() => setToast("")} /> : null}

      <section className="admin-panel">
        <div className="admin-panel__header">
          <div>
            <p className="admin-overline">Submissions</p>
            <h2>Contact Form Leads</h2>
          </div>
          <div className="text-[0.85rem] text-zinc-500 font-medium">
            Total Leads: <strong>{leads.length}</strong>
          </div>
        </div>

        <div className="admin-filters">
          <input
            className="admin-input"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, brand, phone, or pain point"
            value={search}
            style={{ width: "100%", maxWidth: "480px" }}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-zinc-400 gap-3">
            <Loader2 className="animate-spin text-[#5c43fd]" size={32} />
            <p>Loading contact leads...</p>
          </div>
        ) : filteredLeads.length ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Submitter</th>
                  <th>Source</th>
                  <th>Brand Info</th>
                  <th>Core Pain Point</th>
                  <th>Submitted At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div className="font-bold text-zinc-950 flex items-center gap-1.5">
                        <Smile size={16} className="text-[#5c43fd]/60" />
                        {lead.name}
                      </div>
                      {lead.email ? (
                        <div className="text-[0.82rem] text-zinc-500 flex items-center gap-1 mt-0.5">
                          <Mail size={12} className="text-zinc-400" />
                          {lead.email}
                        </div>
                      ) : null}
                      {lead.phone ? (
                        <div className="text-[0.82rem] text-zinc-500 flex items-center gap-1 mt-0.5">
                          <Phone size={12} className="text-zinc-400" />
                          {lead.phone}
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge--published" style={{ background: "rgba(92,67,253,0.1)", color: "#5c43fd" }}>
                        {lead.source || "Website"}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5 font-medium text-zinc-800">
                        <Briefcase size={14} className="text-zinc-400" />
                        {lead.brand || "Not specified"}
                      </div>
                    </td>
                    <td>
                      <div className="text-zinc-600 max-w-[280px] break-words whitespace-normal leading-relaxed text-[0.9rem]">
                        "{lead.painPoint}"
                      </div>
                    </td>
                    <td>
                      <div className="text-[0.85rem] text-zinc-500 flex items-center gap-1">
                        <Calendar size={13} className="text-zinc-400" />
                        {new Date(lead.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td>
                      <div className="admin-table__actions">
                        <button
                          className="admin-inline-link admin-inline-link--danger"
                          onClick={() => setPendingDelete(lead)}
                          type="button"
                          style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty-state py-16">
            <h3>No leads found</h3>
            <p>{search ? "Try adjusting your search query." : "Submissions from the website's contact form will appear here."}</p>
          </div>
        )}
      </section>

      <ConfirmModal
        description={
          pendingDelete
            ? `This will permanently delete the lead from "${pendingDelete.name}". This action cannot be undone.`
            : ""
        }
        isOpen={Boolean(pendingDelete)}
        onCancel={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete contact submission?"
      />
    </div>
  );
}

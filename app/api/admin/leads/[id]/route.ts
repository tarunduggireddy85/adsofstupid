import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readLeads, writeLeads } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const leads = await readLeads();
    const updatedLeads = leads.filter((lead) => lead.id !== id);

    if (leads.length === updatedLeads.length) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    await writeLeads(updatedLeads);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

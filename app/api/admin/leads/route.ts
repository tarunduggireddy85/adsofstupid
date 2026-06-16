import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readLeads } from "@/lib/db";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await readLeads();
    const sortedLeads = [...leads].sort(
      (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );
    return NextResponse.json(sortedLeads);
  } catch (error) {
    console.error("Failed to read leads:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

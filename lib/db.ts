import postgres from "postgres";
import { mockBlogs, type BlogPost } from "./mockBlogs";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email: string;
  brand: string;
  painPoint: string;
  source: string;
  createdAt: string;
};

/*
 * Data layer — Postgres (Neon / Supabase) via a single DATABASE_URL.
 *
 * Blogs and leads are stored one row each, with the full object kept in a
 * `data` jsonb column (so the BlogPost / Lead shapes don't need a rigid schema).
 *
 * If DATABASE_URL is NOT set, reads fall back to the bundled mock data and
 * writes throw a clear error — so the site still renders before the DB is wired.
 */

function dbConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

// Reuse one client across warm serverless invocations.
const g = globalThis as unknown as { _sql?: ReturnType<typeof postgres> };
function getSql() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not configured.");
  if (!g._sql) {
    // prepare:false keeps it compatible with transaction-pooler endpoints
    // (Supabase pgBouncer / Neon pooled).
    g._sql = postgres(process.env.DATABASE_URL, { prepare: false, onnotice: () => {} });
  }
  return g._sql;
}

let schemaReady: Promise<void> | null = null;
function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`CREATE TABLE IF NOT EXISTS blogs (
        id text PRIMARY KEY,
        slug text UNIQUE NOT NULL,
        status text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now(),
        data jsonb NOT NULL
      )`;
      await sql`CREATE TABLE IF NOT EXISTS leads (
        id text PRIMARY KEY,
        created_at timestamptz NOT NULL DEFAULT now(),
        data jsonb NOT NULL
      )`;
      // Seed the starter blog posts on a fresh database.
      const [{ count }] = await sql<{ count: number }[]>`SELECT count(*)::int AS count FROM blogs`;
      if (count === 0) {
        for (const b of mockBlogs) {
          await sql`INSERT INTO blogs (id, slug, status, created_at, data)
            VALUES (${b.id}, ${b.slug}, ${b.status}, ${b.createdAt}, ${sql.json(b)})
            ON CONFLICT (id) DO NOTHING`;
        }
      }
    })().catch((e) => {
      schemaReady = null; // allow retry on a transient failure
      throw e;
    });
  }
  return schemaReady;
}

// ---------- Blogs ----------

export async function readBlogs(): Promise<BlogPost[]> {
  if (!dbConfigured()) {
    return [...mockBlogs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<{ data: BlogPost }[]>`SELECT data FROM blogs ORDER BY created_at DESC`;
  return rows.map((r) => r.data);
}

export async function slugExists(slug: string, exceptId?: string): Promise<boolean> {
  await ensureSchema();
  const sql = getSql();
  const rows = exceptId
    ? await sql`SELECT 1 FROM blogs WHERE slug = ${slug} AND id <> ${exceptId} LIMIT 1`
    : await sql`SELECT 1 FROM blogs WHERE slug = ${slug} LIMIT 1`;
  return rows.length > 0;
}

export async function createBlog(blog: BlogPost): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`INSERT INTO blogs (id, slug, status, created_at, data)
    VALUES (${blog.id}, ${blog.slug}, ${blog.status}, ${blog.createdAt}, ${sql.json(blog)})`;
}

export async function updateBlog(id: string, blog: BlogPost): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`UPDATE blogs
    SET slug = ${blog.slug}, status = ${blog.status}, data = ${sql.json(blog)}
    WHERE id = ${id}`;
}

export async function deleteBlog(id: string): Promise<boolean> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`DELETE FROM blogs WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

// ---------- Leads ----------

export async function readLeads(): Promise<Lead[]> {
  if (!dbConfigured()) return [];
  await ensureSchema();
  const sql = getSql();
  const rows = await sql<{ data: Lead }[]>`SELECT data FROM leads ORDER BY created_at DESC`;
  return rows.map((r) => r.data);
}

export async function appendLead(lead: Lead): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`INSERT INTO leads (id, created_at, data)
    VALUES (${lead.id}, ${lead.createdAt}, ${sql.json(lead)})`;
}

export async function deleteLead(id: string): Promise<boolean> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`DELETE FROM leads WHERE id = ${id} RETURNING id`;
  return rows.length > 0;
}

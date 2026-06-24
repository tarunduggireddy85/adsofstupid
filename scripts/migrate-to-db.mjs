/*
 * One-time migration: copy data/blogs.json + data/leads.json into Postgres.
 * Run once after setting DATABASE_URL, e.g. (Git Bash / macOS / Linux):
 *   DATABASE_URL="postgres://..." node scripts/migrate-to-db.mjs
 * Safe to re-run (idempotent: blogs upsert by id, leads insert-if-absent).
 */
import postgres from "postgres";
import { readFileSync, existsSync } from "fs";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL is not set. Run: DATABASE_URL=\"postgres://...\" node scripts/migrate-to-db.mjs");
  process.exit(1);
}

const sql = postgres(url, { prepare: false });

async function main() {
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

  const blogs = existsSync("data/blogs.json")
    ? JSON.parse(readFileSync("data/blogs.json", "utf-8"))
    : [];
  const leads = existsSync("data/leads.json")
    ? JSON.parse(readFileSync("data/leads.json", "utf-8"))
    : [];

  for (const b of blogs) {
    await sql`INSERT INTO blogs (id, slug, status, created_at, data)
      VALUES (${b.id}, ${b.slug}, ${b.status}, ${b.createdAt}, ${sql.json(b)})
      ON CONFLICT (id) DO UPDATE
        SET slug = EXCLUDED.slug, status = EXCLUDED.status, data = EXCLUDED.data`;
  }
  for (const l of leads) {
    await sql`INSERT INTO leads (id, created_at, data)
      VALUES (${l.id}, ${l.createdAt}, ${sql.json(l)})
      ON CONFLICT (id) DO NOTHING`;
  }

  console.log(`✓ Imported ${blogs.length} blog post(s) and ${leads.length} lead(s) into Postgres.`);
}

main()
  .then(() => sql.end())
  .catch(async (e) => {
    console.error("✗ Migration failed:", e.message);
    await sql.end();
    process.exit(1);
  });

import fs from "fs/promises";
import path from "path";
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

const DATA_DIR = path.join(process.cwd(), "data");
const BLOGS_FILE = path.join(DATA_DIR, "blogs.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

async function initDb() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {}

  try {
    await fs.access(BLOGS_FILE);
  } catch {
    await fs.writeFile(BLOGS_FILE, JSON.stringify(mockBlogs, null, 2), "utf-8");
  }

  try {
    await fs.access(LEADS_FILE);
  } catch {
    await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

// Atomic write: write to a temp file then rename, so a crash mid-write can
// never leave a truncated/corrupt JSON file in place.
async function writeJsonAtomic(file: string, value: unknown): Promise<void> {
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2), "utf-8");
  await fs.rename(tmp, file);
}

async function readJsonSafe<T>(file: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(file, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    // Missing or corrupt file — fall back rather than throwing (which would
    // 500 the contact form or blank the admin list).
    return fallback;
  }
}

export async function readBlogs(): Promise<BlogPost[]> {
  await initDb();
  return readJsonSafe<BlogPost[]>(BLOGS_FILE, []);
}

export async function writeBlogs(blogs: BlogPost[]): Promise<void> {
  await initDb();
  await writeJsonAtomic(BLOGS_FILE, blogs);
}

export async function readLeads(): Promise<Lead[]> {
  await initDb();
  return readJsonSafe<Lead[]>(LEADS_FILE, []);
}

export async function writeLeads(leads: Lead[]): Promise<void> {
  await initDb();
  await writeJsonAtomic(LEADS_FILE, leads);
}

// Serialize read-modify-write so two simultaneous submissions can't both read
// the same array and overwrite each other (silently dropping a lead).
let leadsChain: Promise<unknown> = Promise.resolve();
export function appendLead(lead: Lead): Promise<void> {
  const next = leadsChain.then(async () => {
    const leads = await readLeads();
    leads.push(lead);
    await writeLeads(leads);
  });
  // keep the chain alive even if this op throws
  leadsChain = next.catch(() => {});
  return next;
}

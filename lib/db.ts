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

export async function readBlogs(): Promise<BlogPost[]> {
  await initDb();
  const data = await fs.readFile(BLOGS_FILE, "utf-8");
  return JSON.parse(data) as BlogPost[];
}

export async function writeBlogs(blogs: BlogPost[]): Promise<void> {
  await initDb();
  await fs.writeFile(BLOGS_FILE, JSON.stringify(blogs, null, 2), "utf-8");
}

export async function readLeads(): Promise<Lead[]> {
  await initDb();
  const data = await fs.readFile(LEADS_FILE, "utf-8");
  return JSON.parse(data) as Lead[];
}

export async function writeLeads(leads: Lead[]): Promise<void> {
  await initDb();
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

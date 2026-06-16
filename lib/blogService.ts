"use client";

import { mockBlogs, type BlogPost } from "./mockBlogs";

const BLOGS_STORAGE_KEY = "admin_blogs";

export type BlogInput = Omit<BlogPost, "id" | "createdAt">;

function canUseBrowserApis() {
  return typeof window !== "undefined";
}

function sortBlogs(blogs: BlogPost[]) {
  return [...blogs].sort(
    (left, right) =>
      new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  );
}

function writeBlogs(blogs: BlogPost[]) {
  if (!canUseBrowserApis()) {
    return;
  }

  window.localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(sortBlogs(blogs)));
}

export function ensureBlogsSeeded() {
  if (!canUseBrowserApis()) {
    return;
  }

  const existingBlogs = window.localStorage.getItem(BLOGS_STORAGE_KEY);

  if (!existingBlogs) {
    writeBlogs(mockBlogs);
  }
}

export function getBlogs() {
  if (!canUseBrowserApis()) {
    return mockBlogs;
  }

  ensureBlogsSeeded();

  const rawBlogs = window.localStorage.getItem(BLOGS_STORAGE_KEY);

  if (!rawBlogs) {
    return sortBlogs(mockBlogs);
  }

  try {
    return sortBlogs(JSON.parse(rawBlogs) as BlogPost[]);
  } catch {
    writeBlogs(mockBlogs);
    return sortBlogs(mockBlogs);
  }
}

export function getBlogById(id: string) {
  return getBlogs().find((blog) => blog.id === id) ?? null;
}

export function createBlog(input: BlogInput) {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...input,
    id: `blog-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  writeBlogs([newBlog, ...blogs]);

  return newBlog;
}

export function updateBlog(id: string, input: BlogInput) {
  const blogs = getBlogs();
  const updatedBlogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, ...input } : blog
  );

  writeBlogs(updatedBlogs);

  return updatedBlogs.find((blog) => blog.id === id) ?? null;
}

export function deleteBlog(id: string) {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter((blog) => blog.id !== id);
  writeBlogs(filteredBlogs);
}

export function getBlogStats() {
  const blogs = getBlogs();
  const publishedBlogs = blogs.filter((blog) => blog.status === "Published");
  const draftBlogs = blogs.filter((blog) => blog.status === "Draft");
  const categories = new Set(blogs.map((blog) => blog.category));

  return {
    totalBlogs: blogs.length,
    publishedBlogs: publishedBlogs.length,
    draftBlogs: draftBlogs.length,
    totalCategories: categories.size
  };
}

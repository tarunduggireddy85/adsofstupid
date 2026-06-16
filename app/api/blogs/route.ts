import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readBlogs, writeBlogs } from "@/lib/db";
import type { BlogPost } from "@/lib/mockBlogs";

export async function GET() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  try {
    const blogs = await readBlogs();
    
    const sortedBlogs = [...blogs].sort(
      (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
    );

    if (!isAdmin) {
      const published = sortedBlogs.filter((blog) => blog.status === "Published");
      return NextResponse.json(published);
    }

    return NextResponse.json(sortedBlogs);
  } catch (error) {
    console.error("Failed to read blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "true";

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      content,
      featuredImage,
      category,
      tags,
      author,
      status,
      publishDate,
      seoTitle,
      seoDescription,
      seoKeywords
    } = body;

    if (!title || !slug || !content) {
      return NextResponse.json({ error: "Title, slug, and content are required." }, { status: 400 });
    }

    const blogs = await readBlogs();

    if (blogs.some((blog) => blog.slug === slug)) {
      return NextResponse.json({ error: "A blog post with this slug already exists." }, { status: 409 });
    }

    const newBlog: BlogPost = {
      id: `blog-${Date.now()}`,
      title,
      slug,
      description: description || "",
      content,
      featuredImage: featuredImage || "",
      category: category || "Business",
      tags: Array.isArray(tags) ? tags : [],
      author: author || "Admin User",
      status: status === "Draft" ? "Draft" : "Published",
      createdAt: new Date().toISOString(),
      publishDate: publishDate || new Date().toISOString().split("T")[0],
      seoTitle: seoTitle || title,
      seoDescription: seoDescription || description || "",
      seoKeywords: seoKeywords || ""
    };

    blogs.push(newBlog);
    await writeBlogs(blogs);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Failed to create blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

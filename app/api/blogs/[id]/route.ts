import { NextResponse } from "next/server";
import { readBlogs, updateBlog, deleteBlog, slugExists } from "@/lib/db";
import type { BlogPost } from "@/lib/mockBlogs";
import { isAdminSession } from "@/lib/adminAuth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const blogs = await readBlogs();
    const blog = blogs.find((b) => b.id === id || b.slug === id);

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (blog.status !== "Published") {
      const isAdmin = await isAdminSession();
      if (!isAdmin) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAdminSession();

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const blogs = await readBlogs();
    const existingBlog = blogs.find((b) => b.id === id);

    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (body.slug && body.slug !== existingBlog.slug && (await slugExists(body.slug, id))) {
      return NextResponse.json({ error: "A blog post with this slug already exists." }, { status: 409 });
    }

    const updatedBlog: BlogPost = {
      ...existingBlog,
      ...body,
      id: existingBlog.id,
      createdAt: existingBlog.createdAt,
      publishDate: body.publishDate || existingBlog.publishDate || new Date().toISOString().split("T")[0],
    };

    await updateBlog(id, updatedBlog);

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("Failed to update blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAdminSession();

  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const deleted = await deleteBlog(id);

    if (!deleted) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to delete blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

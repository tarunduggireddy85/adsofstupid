"use client";

import { useEffect, useState } from "react";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/mockBlogs";
import type { BlogInput } from "@/lib/blogService";
import { generateSlug } from "@/utils/generateSlug";
import { Save } from "lucide-react";

type BlogFormProps = {
  initialValues?: BlogPost | null;
  onSubmit: (values: BlogInput) => void | Promise<void>;
  submitLabel: string;
};

type FormErrors = Partial<Record<keyof BlogInput, string>>;

const emptyFormValues: BlogInput = {
  title: "",
  slug: "",
  description: "",
  content: "",
  featuredImage: "",
  category: "",
  tags: [],
  author: "Admin User",
  status: "Draft",
  publishDate: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: ""
};

function getInitialFormValues(initialValues?: BlogPost | null) {
  if (!initialValues) {
    return emptyFormValues;
  }

  return {
    title: initialValues.title,
    slug: initialValues.slug,
    description: initialValues.description,
    content: initialValues.content,
    featuredImage: initialValues.featuredImage,
    category: initialValues.category,
    tags: initialValues.tags,
    author: initialValues.author,
    status: initialValues.status,
    publishDate: initialValues.publishDate,
    seoTitle: initialValues.seoTitle,
    seoDescription: initialValues.seoDescription,
    seoKeywords: initialValues.seoKeywords
  };
}

export function BlogForm({
  initialValues,
  onSubmit,
  submitLabel
}: BlogFormProps) {
  const [values, setValues] = useState<BlogInput>(getInitialFormValues(initialValues));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [tagsInput, setTagsInput] = useState(initialValues?.tags.join(", ") ?? "");
  const [imagePreview, setImagePreview] = useState(initialValues?.featuredImage ?? "");

  useEffect(() => {
    const nextValues = getInitialFormValues(initialValues);
    setValues(nextValues);
    setTagsInput(initialValues?.tags.join(", ") ?? "");
    setImagePreview(initialValues?.featuredImage ?? "");
    setSlugTouched(Boolean(initialValues?.slug));
  }, [initialValues]);

  function updateField<Key extends keyof BlogInput>(field: Key, value: BlogInput[Key]) {
    setValues((currentValues) => ({ ...currentValues, [field]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }

  function handleTitleChange(title: string) {
    updateField("title", title);

    if (!slugTouched) {
      updateField("slug", generateSlug(title));
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setImagePreview(result);
      updateField("featuredImage", result);
    };
    reader.readAsDataURL(file);
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!values.title.trim()) {
      nextErrors.title = "Title is required.";
    }

    if (!values.slug.trim()) {
      nextErrors.slug = "Slug is required.";
    }

    if (!values.description.trim()) {
      nextErrors.description = "Description is required.";
    }

    if (!values.content.trim()) {
      nextErrors.content = "Content is required.";
    }

    if (!values.category) {
      nextErrors.category = "Category is required.";
    }

    if (!values.status) {
      nextErrors.status = "Status is required.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const preparedValues: BlogInput = {
      ...values,
      slug: generateSlug(values.slug),
      tags: tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      featuredImage: imagePreview
    };

    setValues(preparedValues);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(preparedValues);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__grid">
        <label className="admin-field">
          <span>Blog Title *</span>
          <input
            className="admin-input"
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder="Enter blog title"
            value={values.title}
          />
          {errors.title ? <small className="admin-error">{errors.title}</small> : null}
        </label>

        <label className="admin-field">
          <span>Slug *</span>
          <input
            className="admin-input"
            onChange={(event) => {
              setSlugTouched(true);
              updateField("slug", event.target.value);
            }}
            placeholder="blog-post-slug"
            value={values.slug}
          />
          {errors.slug ? <small className="admin-error">{errors.slug}</small> : null}
        </label>

        <label className="admin-field admin-field--full">
          <span>Short Description / Excerpt *</span>
          <textarea
            className="admin-input admin-textarea admin-textarea--sm"
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Write a concise excerpt"
            value={values.description}
          />
          {errors.description ? (
            <small className="admin-error">{errors.description}</small>
          ) : null}
        </label>

        <label className="admin-field admin-field--full">
          <span>Blog Content *</span>
          <textarea
            className="admin-input admin-textarea"
            onChange={(event) => updateField("content", event.target.value)}
            placeholder="Write blog content"
            value={values.content}
          />
          {errors.content ? <small className="admin-error">{errors.content}</small> : null}
        </label>

        <label className="admin-field admin-field--full">
          <span>Featured Image</span>
          <div className="admin-upload">
            <input accept="image/*" onChange={handleImageChange} type="file" />
            <p>Upload a featured image for preview only.</p>
          </div>
          <div className="admin-image-preview">
            {imagePreview ? (
              <img alt="Featured preview" src={imagePreview} />
            ) : (
              <div className="admin-image-placeholder">No image selected</div>
            )}
          </div>
        </label>

        <label className="admin-field">
          <span>Category *</span>
          <select
            className="admin-input"
            onChange={(event) => updateField("category", event.target.value)}
            value={values.category}
          >
            <option value="">Select category</option>
            {BLOG_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <small className="admin-error">{errors.category}</small>
          ) : null}
        </label>

        <label className="admin-field">
          <span>Tags</span>
          <input
            className="admin-input"
            onChange={(event) => setTagsInput(event.target.value)}
            placeholder="seo, nextjs, growth"
            value={tagsInput}
          />
        </label>

        <label className="admin-field">
          <span>Author Name</span>
          <input
            className="admin-input"
            onChange={(event) => updateField("author", event.target.value)}
            placeholder="Author name"
            value={values.author}
          />
        </label>

        <label className="admin-field">
          <span>Status *</span>
          <select
            className="admin-input"
            onChange={(event) =>
              updateField("status", event.target.value as BlogInput["status"])
            }
            value={values.status}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
          {errors.status ? <small className="admin-error">{errors.status}</small> : null}
        </label>

        <label className="admin-field">
          <span>Publish Date</span>
          <input
            className="admin-input"
            onChange={(event) => updateField("publishDate", event.target.value)}
            type="date"
            value={values.publishDate}
          />
        </label>

        <label className="admin-field">
          <span>SEO Title</span>
          <input
            className="admin-input"
            onChange={(event) => updateField("seoTitle", event.target.value)}
            placeholder="SEO title"
            value={values.seoTitle}
          />
        </label>

        <label className="admin-field">
          <span>SEO Keywords</span>
          <input
            className="admin-input"
            onChange={(event) => updateField("seoKeywords", event.target.value)}
            placeholder="keyword one, keyword two"
            value={values.seoKeywords}
          />
        </label>

        <label className="admin-field admin-field--full">
          <span>SEO Description</span>
          <textarea
            className="admin-input admin-textarea admin-textarea--sm"
            onChange={(event) => updateField("seoDescription", event.target.value)}
            placeholder="SEO description"
            value={values.seoDescription}
          />
        </label>
      </div>

      <div className="admin-form__footer">
        <button className="admin-button" disabled={isSubmitting} type="submit">
          <Save size={18} />
          {isSubmitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

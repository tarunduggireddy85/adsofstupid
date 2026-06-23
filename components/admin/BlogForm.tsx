"use client";

import { useEffect, useMemo, useState } from "react";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/mockBlogs";
import { getBlogs, type BlogInput } from "@/lib/blogService";
import { generateSlug } from "@/utils/generateSlug";
import { BlogPreviewModal } from "./BlogPreviewModal";
import { Save, Eye, ArrowLeft, ArrowRight, Check } from "lucide-react";

type BlogFormProps = {
  initialValues?: BlogPost | null;
  onSubmit: (values: BlogInput) => void | Promise<void>;
  submitLabel: string;
};

type FormErrors = Partial<Record<keyof BlogInput, string>>;

const STEPS = ["Basics", "Content", "Publish & SEO"] as const;

const emptyFormValues: BlogInput = {
  title: "",
  slug: "",
  description: "",
  content: "",
  featuredImage: "",
  category: "",
  tags: [],
  author: "Ads of Stupid",
  status: "Draft",
  publishDate: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: ""
};

function getInitialFormValues(initialValues?: BlogPost | null): BlogInput {
  if (!initialValues) return emptyFormValues;
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

export function BlogForm({ initialValues, onSubmit, submitLabel }: BlogFormProps) {
  const [values, setValues] = useState<BlogInput>(getInitialFormValues(initialValues));
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues?.slug));
  const [tagsInput, setTagsInput] = useState(initialValues?.tags.join(", ") ?? "");
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState<string[]>([...BLOG_CATEGORIES]);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const next = getInitialFormValues(initialValues);
    setValues(next);
    setTagsInput(initialValues?.tags.join(", ") ?? "");
    setSlugTouched(Boolean(initialValues?.slug));
    setStep(0);
  }, [initialValues]);

  // pull categories already in use so the dropdown stays current
  useEffect(() => {
    (async () => {
      try {
        const blogs = await getBlogs();
        const used = blogs.map((b) => b.category).filter(Boolean);
        setCategories(Array.from(new Set([...BLOG_CATEGORIES, ...used])));
      } catch {
        /* keep defaults */
      }
    })();
  }, []);

  const parsedTags = useMemo(
    () =>
      tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    [tagsInput]
  );

  function updateField<Key extends keyof BlogInput>(field: Key, value: BlogInput[Key]) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleTitleChange(title: string) {
    updateField("title", title);
    if (!slugTouched) updateField("slug", generateSlug(title));
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      updateField("featuredImage", result);
    };
    reader.readAsDataURL(file);
  }

  function validateStep(target: number) {
    const next: FormErrors = {};
    if (target === 0) {
      if (!values.title.trim()) next.title = "Title is required.";
      if (!values.slug.trim()) next.slug = "Slug is required.";
      if (!values.category.trim()) next.category = "Pick or add a category.";
    }
    if (target === 1) {
      if (!values.description.trim()) next.description = "A short description is required.";
      if (!values.content.trim()) next.content = "Content is required.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function buildValues(): BlogInput {
    return { ...values, slug: generateSlug(values.slug || values.title), tags: parsedTags };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // validate all steps before publishing
    for (let i = 0; i < STEPS.length; i += 1) {
      if (!validateStep(i)) {
        setStep(i);
        return;
      }
    }
    setIsSubmitting(true);
    try {
      await onSubmit(buildValues());
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {/* step indicator */}
      <div className="flex items-center justify-center mb-8">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <div key={label} className="flex items-center">
              <button
                type="button"
                onClick={() => i < step && setStep(i)}
                className="flex flex-col items-center gap-1.5"
                style={{ cursor: i < step ? "pointer" : "default" }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-[0.85rem] font-bold transition-colors"
                  style={{
                    background: done || active ? "#5c43fd" : "#e5e7eb",
                    color: done || active ? "#fff" : "#9ca3af"
                  }}
                >
                  {done ? <Check size={16} /> : i + 1}
                </span>
                <span
                  className="text-[0.78rem] font-semibold"
                  style={{ color: done || active ? "#5c43fd" : "#9ca3af" }}
                >
                  {label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className="mx-3 h-[2px] w-10 sm:w-16 rounded-full"
                  style={{ background: i < step ? "#5c43fd" : "#e5e7eb" }}
                />
              )}
            </div>
          );
        })}
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        {/* STEP 1 — BASICS */}
        {step === 0 && (
          <div className="admin-form__grid">
            <label className="admin-field admin-field--full">
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

            <label className="admin-field">
              <span>Category *</span>
              <input
                className="admin-input"
                list="blog-category-options"
                onChange={(event) => updateField("category", event.target.value)}
                placeholder="Pick one or type a new category"
                value={values.category}
              />
              <datalist id="blog-category-options">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
              <small style={{ color: "#9ca3af" }}>
                Type a new name to create a new category.
              </small>
              {errors.category ? <small className="admin-error">{errors.category}</small> : null}
            </label>

            <label className="admin-field admin-field--full">
              <span>Tags</span>
              <input
                className="admin-input"
                onChange={(event) => setTagsInput(event.target.value)}
                placeholder="seo, nextjs, growth"
                value={tagsInput}
              />
              {parsedTags.length ? (
                <div className="admin-tag-list" style={{ marginTop: "0.5rem" }}>
                  {parsedTags.map((tag) => (
                    <span className="admin-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </label>
          </div>
        )}

        {/* STEP 2 — CONTENT */}
        {step === 1 && (
          <div className="admin-form__grid">
            <label className="admin-field admin-field--full">
              <span>Short Description / Excerpt *</span>
              <textarea
                className="admin-input admin-textarea admin-textarea--sm"
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="A concise one or two sentence summary shown on cards"
                value={values.description}
              />
              {errors.description ? <small className="admin-error">{errors.description}</small> : null}
            </label>

            <label className="admin-field admin-field--full">
              <span>Blog Content *</span>
              <textarea
                className="admin-input admin-textarea"
                onChange={(event) => updateField("content", event.target.value)}
                placeholder={"Use ## for section headings, ### for sub-headings, - for bullet lists, **bold** and _italic_."}
                value={values.content}
              />
              <small style={{ color: "#9ca3af" }}>
                Formatting: <code>## Heading</code>, <code>### Sub-heading</code>, <code>- bullet</code>, <code>**bold**</code>, <code>_italic_</code>. Use the Preview button to check it.
              </small>
              {errors.content ? <small className="admin-error">{errors.content}</small> : null}
            </label>

            <label className="admin-field admin-field--full">
              <span>Featured Image</span>
              <input
                className="admin-input"
                onChange={(event) => updateField("featuredImage", event.target.value)}
                placeholder="/blog/your-image.webp  or  https://…"
                value={values.featuredImage.startsWith("data:") ? "" : values.featuredImage}
              />
              <div className="admin-upload" style={{ marginTop: "0.6rem" }}>
                <input accept="image/*" onChange={handleImageUpload} type="file" />
                <p>Paste an image path/URL above, or upload a file.</p>
              </div>
              <div className="admin-image-preview">
                {values.featuredImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="Featured preview" src={values.featuredImage} />
                ) : (
                  <div className="admin-image-placeholder">No image selected</div>
                )}
              </div>
            </label>
          </div>
        )}

        {/* STEP 3 — PUBLISH & SEO */}
        {step === 2 && (
          <div className="admin-form__grid">
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
                onChange={(event) => updateField("status", event.target.value as BlogInput["status"])}
                value={values.status}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
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
                placeholder="Defaults to the blog title"
                value={values.seoTitle}
              />
            </label>

            <label className="admin-field admin-field--full">
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
                placeholder="Defaults to the short description"
                value={values.seoDescription}
              />
            </label>
          </div>
        )}

        {/* footer nav */}
        <div className="admin-form__footer" style={{ justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {step > 0 ? (
              <button className="admin-button admin-button--ghost" type="button" onClick={goBack}>
                <ArrowLeft size={16} />
                Back
              </button>
            ) : null}
            <button className="admin-button admin-button--ghost" type="button" onClick={() => setShowPreview(true)}>
              <Eye size={16} />
              Preview
            </button>
          </div>

          {step < STEPS.length - 1 ? (
            <button className="admin-button" type="button" onClick={goNext}>
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="admin-button" disabled={isSubmitting} type="submit">
              <Save size={18} />
              {isSubmitting ? "Saving..." : submitLabel}
            </button>
          )}
        </div>
      </form>

      {showPreview ? (
        <BlogPreviewModal values={buildValues()} onClose={() => setShowPreview(false)} />
      ) : null}
    </>
  );
}

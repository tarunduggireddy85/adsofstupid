import React from "react";

type ParsedSection = {
  title: string;
  body: string[];
};

function parseContent(content: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const parts = content.split(/\r?\n\r?\n/);
  let currentSection: ParsedSection = { title: "", body: [] };

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // only a top-level "## " starts a new section; "### " stays in the body
    if (trimmed.startsWith("## ")) {
      if (currentSection.title || currentSection.body.length > 0) {
        sections.push(currentSection);
      }
      currentSection = { title: trimmed.replace(/^##\s*/, ""), body: [] };
    } else {
      currentSection.body.push(trimmed);
    }
  }

  if (currentSection.title || currentSection.body.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

/* lightweight inline formatting: **bold** and _italic_ */
function renderInline(text: string) {
  const nodes: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|_[^_]+_)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-semibold text-zinc-800">
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/* render a single body block: sub-heading, list, or paragraph */
function BodyPart({ part, indent }: { part: string; indent: string }) {
  const trimmed = part.trim();

  if (trimmed.startsWith("### ")) {
    return (
      <h3 className={`font-sans text-[1.15rem] font-semibold text-zinc-900 tracking-tight mt-1 mb-3 ${indent}`}>
        {renderInline(trimmed.slice(4))}
      </h3>
    );
  }

  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const isUnordered = lines.length > 0 && lines.every((l) => /^[-*]\s/.test(l));
  const isOrdered = lines.length > 0 && lines.every((l) => /^\d+\.\s/.test(l));

  if (isUnordered || isOrdered) {
    const items = lines.map((l) => l.replace(/^([-*]|\d+\.)\s+/, ""));
    const cls = `${isOrdered ? "list-decimal" : "list-disc"} pl-5 space-y-2 text-zinc-500 text-[1.05rem] leading-[1.7] mb-5 marker:text-[#5c43fd] ${indent}`;
    return isOrdered ? (
      <ol className={cls}>
        {items.map((it, i) => (
          <li key={i}>{renderInline(it)}</li>
        ))}
      </ol>
    ) : (
      <ul className={cls}>
        {items.map((it, i) => (
          <li key={i}>{renderInline(it)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p className={`text-zinc-500 text-[1.05rem] leading-[1.8] mb-5 ${indent}`}>
      {renderInline(trimmed)}
    </p>
  );
}

export function PostBody({ content }: { content: string }) {
  const sections = parseContent(content);
  return (
    <div className="grid gap-10">
      {sections.map((section, i) => (
        <section key={section.title || i} className="scroll-mt-28">
          {section.title ? (
            <div className="flex items-start gap-3 mb-4">
              <span className="text-[1.1rem] font-black text-[#5c43fd]/25 leading-none mt-1 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-sans text-[1.5rem] font-semibold text-zinc-950 tracking-tight leading-tight">
                {section.title}
              </h2>
            </div>
          ) : null}
          {section.body.map((part, pIdx) => (
            <BodyPart key={pIdx} part={part} indent={section.title ? "ml-8" : ""} />
          ))}
        </section>
      ))}
    </div>
  );
}

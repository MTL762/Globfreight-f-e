"use client";

import { useState, useRef, useMemo } from "react";
import {
  Code2,
  Eye,
  Heading2,
  Heading3,
  Heading4,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Table as TableIcon,
  Minus,
  Sparkles,
  Copy,
  Check,
  Maximize2,
  X,
  Smartphone,
  Monitor,
  Tablet
} from "lucide-react";
import { sanitizeHtml } from "@/utils/sanitizeHtml";

interface HtmlCodeBoxProps {
  value?: string;
  onChange?: (val: string) => void;
  name?: string;
  placeholder?: string;
  className?: string;
}

export default function HtmlCodeBox({
  value = "",
  onChange,
  name,
  placeholder = "Enter or paste your full HTML article content directly here...",
  className = ""
}: HtmlCodeBoxProps) {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDevice, setModalDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const rawHtml = typeof value === "string" ? value : "";

  // Auto-detect Arabic / RTL content
  const isArabicContent = useMemo(() => {
    if (name?.endsWith("Ar") || name?.includes("ar")) return true;
    const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;
    return arabicRegex.test(rawHtml);
  }, [name, rawHtml]);

  // Statistics
  const charCount = rawHtml.length;
  const wordCount = rawHtml.trim()
    ? rawHtml.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
    : 0;
  const tagCount = (rawHtml.match(/<[a-z0-9]+(\s|>)/gi) || []).length;

  const sanitizedPreviewHtml = useMemo(() => {
    return sanitizeHtml(rawHtml);
  }, [rawHtml]);

  const insertTag = (openTag: string, closeTag: string = "", defaultText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = rawHtml.substring(start, end) || defaultText;
    const replacement = `${openTag}${selectedText}${closeTag}`;

    const newHtml = rawHtml.substring(0, start) + replacement + rawHtml.substring(end);
    onChange?.(newHtml);

    setTimeout(() => {
      textarea.focus();
      const cursorTarget = start + openTag.length + selectedText.length;
      textarea.setSelectionRange(cursorTarget, cursorTarget);
    }, 0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawHtml);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  const formatHtml = () => {
    if (!rawHtml.trim()) return;
    let formatted = "";
    let indent = 0;
    const clean = rawHtml.replace(/>\s*</g, "><").trim();
    const tags = clean.split(/(<[^>]+>)/g).filter(Boolean);

    tags.forEach(part => {
      if (part.startsWith("</")) {
        indent = Math.max(0, indent - 1);
        formatted += `${"  ".repeat(indent)}${part}\n`;
      } else if (
        part.startsWith("<") &&
        !part.endsWith("/>") &&
        !part.startsWith("<!") &&
        !["<hr>", "<br>", "<img>", "<input>", "<meta>", "<link>"].some(t =>
          part.toLowerCase().startsWith(t.slice(0, -1))
        )
      ) {
        formatted += `${"  ".repeat(indent)}${part}\n`;
        indent++;
      } else if (part.startsWith("<")) {
        formatted += `${"  ".repeat(indent)}${part}\n`;
      } else {
        const text = part.trim();
        if (text) {
          formatted += `${"  ".repeat(indent)}${text}\n`;
        }
      }
    });

    onChange?.(formatted.trim());
  };

  return (
    <>
      <div
        className={`w-full rounded-2xl border border-border/80 bg-card overflow-hidden shadow-xs flex flex-col ${className}`}
      >
        {/* Top Header / Mode Switcher */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-muted/40 border-b border-border/70 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 p-0.5 rounded-xl bg-background border border-border/60">
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "code"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span>HTML Code</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "preview"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Live Preview</span>
            </button>
          </div>

          {/* Action Helpers */}
          <div className="flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              title="Open full page preview modal before publishing"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Maximize2 className="h-3 w-3 text-primary" />
              <span className="hidden sm:inline font-medium">Full Preview</span>
            </button>

            <button
              type="button"
              onClick={formatHtml}
              title="Auto-format HTML indentation"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              <Sparkles className="h-3 w-3 text-amber-500" />
              <span className="hidden sm:inline">Format</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              title="Copy HTML content"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border/60 bg-background text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
            >
              {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
        </div>

        {/* Quick HTML Tags Toolbar */}
        {activeTab === "code" && (
          <div className="flex items-center gap-1 px-3 py-2 bg-muted/20 border-b border-border/50 flex-wrap overflow-x-auto text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground me-1 shrink-0">
              Tags:
            </span>

            <button
              type="button"
              onClick={() => insertTag("<p>", "</p>", "Paragraph text")}
              className="px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Paragraph tag"
            >
              &lt;p&gt;
            </button>

            <button
              type="button"
              onClick={() => insertTag("<h2>", "</h2>", "Section Heading")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Heading 2"
            >
              <Heading2 className="h-3 w-3" />
              <span>h2</span>
            </button>

            <button
              type="button"
              onClick={() => insertTag("<h3>", "</h3>", "Sub-heading")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Heading 3"
            >
              <Heading3 className="h-3 w-3" />
              <span>h3</span>
            </button>

            <button
              type="button"
              onClick={() => insertTag("<h4>", "</h4>", "Minor Heading")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Heading 4"
            >
              <Heading4 className="h-3 w-3" />
              <span>h4</span>
            </button>

            <button
              type="button"
              onClick={() => insertTag("<strong>", "</strong>", "bold text")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Bold"
            >
              <Bold className="h-3 w-3" />
            </button>

            <button
              type="button"
              onClick={() => insertTag("<em>", "</em>", "italic text")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Italic"
            >
              <Italic className="h-3 w-3" />
            </button>

            <button
              type="button"
              onClick={() => insertTag("<ul>\n  <li>", "</li>\n</ul>", "List item")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Bullet list"
            >
              <List className="h-3 w-3" />
              <span>ul</span>
            </button>

            <button
              type="button"
              onClick={() => insertTag("<ol>\n  <li>", "</li>\n</ol>", "Numbered item")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Numbered list"
            >
              <ListOrdered className="h-3 w-3" />
              <span>ol</span>
            </button>

            <button
              type="button"
              onClick={() =>
                insertTag(
                  '<table class="w-full border-collapse border my-6">\n  <thead>\n    <tr class="bg-muted/50">\n      <th class="p-3 border text-start font-bold">Header 1</th>\n      <th class="p-3 border text-start font-bold">Header 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td class="p-3 border">Data 1</td>\n      <td class="p-3 border">Data 2</td>\n    </tr>\n  </tbody>\n</table>',
                  ""
                )
              }
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Insert Table with headers and cells"
            >
              <TableIcon className="h-3 w-3 text-primary" />
              <span>table</span>
            </button>

            <button
              type="button"
              onClick={() => insertTag("<blockquote>", "</blockquote>", "Quoted insight")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Blockquote"
            >
              <Quote className="h-3 w-3" />
            </button>

            <button
              type="button"
              onClick={() =>
                insertTag(
                  '<a href="https://globfreight.com" target="_blank" rel="nofollow noopener noreferrer">',
                  "</a>",
                  "Link text"
                )
              }
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Link with target and rel attributes"
            >
              <LinkIcon className="h-3 w-3" />
              <span>a</span>
            </button>

            <button
              type="button"
              onClick={() =>
                insertTag(
                  '<img src="https://globfreight.com/og-image.jpg" alt="Description" width="1200" height="630" class="rounded-2xl border my-6 w-full" />',
                  ""
                )
              }
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Image with src, alt, width, height"
            >
              <ImageIcon className="h-3 w-3" />
              <span>img</span>
            </button>

            <button
              type="button"
              onClick={() => insertTag('<hr className="my-8 border-border" />', "")}
              className="inline-flex items-center gap-0.5 px-2 py-1 rounded bg-background hover:bg-muted border border-border/60 text-xs font-mono font-medium text-foreground hover:border-primary/40 transition-colors"
              title="Divider rule"
            >
              <Minus className="h-3 w-3" />
              <span>hr</span>
            </button>
          </div>
        )}

        {/* Editor Body */}
        <div className="relative min-h-[340px] flex-1 flex flex-col bg-background">
          {activeTab === "code" ? (
            <div className="relative flex-1 flex">
              <textarea
                ref={textareaRef}
                id={name}
                name={name}
                dir={isArabicContent ? "rtl" : "ltr"}
                value={rawHtml}
                onChange={e => onChange?.(e.target.value)}
                placeholder={placeholder}
                rows={16}
                spellCheck={false}
                className="w-full flex-1 p-4 font-mono text-xs sm:text-sm leading-relaxed bg-zinc-950 text-zinc-100 dark:bg-zinc-900/90 dark:text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-primary/60 resize-y selection:bg-primary/30"
              />
            </div>
          ) : (
            <div
              dir={isArabicContent ? "rtl" : "ltr"}
              className="p-6 bg-card min-h-[340px] overflow-y-auto"
            >
              {sanitizedPreviewHtml.trim() ? (
                <div
                  className={`prose prose-base sm:prose-lg dark:prose-invert max-w-none text-start
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-3
                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-2
                    prose-h4:text-lg sm:prose-h4:text-xl prose-h4:mt-5 prose-h4:mb-2
                    prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-4
                    prose-strong:text-foreground prose-strong:font-bold
                    prose-ul:my-6 prose-ul:list-disc prose-ul:ps-6 prose-li:my-1.5 prose-li:text-muted-foreground
                    prose-ol:my-6 prose-ol:list-decimal prose-ol:ps-6
                    prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:border prose-table:border-border/70 prose-table:rounded-xl prose-table:overflow-hidden
                    prose-th:bg-muted/60 prose-th:p-3 sm:prose-th:p-4 prose-th:text-start prose-th:font-bold prose-th:text-foreground prose-th:border prose-th:border-border/60
                    prose-td:p-3 sm:prose-td:p-4 prose-td:border prose-td:border-border/60 prose-td:text-muted-foreground prose-tr:even:bg-muted/15 prose-tr:hover:bg-muted/30
                    prose-blockquote:border-s-4 prose-blockquote:border-s-primary prose-blockquote:bg-muted/30 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-e-xl prose-blockquote:italic prose-blockquote:text-foreground/90 prose-blockquote:my-6
                    prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:my-8 prose-img:shadow-sm prose-img:max-w-full prose-img:h-auto
                    prose-a:text-primary prose-a:font-medium prose-a:underline hover:prose-a:opacity-80 transition-opacity
                    prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-pre:rounded-2xl prose-pre:p-5 prose-pre:border prose-pre:border-border/60 prose-pre:overflow-x-auto
                    prose-code:font-mono prose-code:text-xs sm:prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-foreground prose-code:font-medium
                    prose-hr:my-10 prose-hr:border-border/80 ${
                      isArabicContent
                        ? "rtl:prose-blockquote:border-r-primary rtl:prose-blockquote:border-l-0 rtl:prose-blockquote:rounded-l-xl rtl:prose-blockquote:rounded-r-none leading-[1.8]"
                        : ""
                    }`}
                  dangerouslySetInnerHTML={{ __html: sanitizedPreviewHtml }}
                />
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-muted-foreground text-xs gap-2">
                  <Code2 className="h-8 w-8 opacity-40" />
                  <span>No HTML content entered yet. Paste or write HTML code in the Code tab.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Statistics & Meta */}
        <div className="flex items-center justify-between px-3.5 py-2 bg-muted/30 border-t border-border/60 text-[11px] text-muted-foreground flex-wrap gap-2">
          <div className="flex items-center gap-3 font-mono">
            <span>{charCount.toLocaleString()} chars</span>
            <span className="opacity-40">•</span>
            <span>{wordCount.toLocaleString()} words</span>
            <span className="opacity-40">•</span>
            <span>{tagCount} tags</span>
          </div>
          <div className="flex items-center gap-2">
            {isArabicContent && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 text-[10px]">
                RTL Mode
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>HTML Box</span>
            </span>
          </div>
        </div>
      </div>

      {/* Full Page Article Preview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-background/80 backdrop-blur-md flex flex-col justify-between overflow-hidden">
          {/* Top Modal Bar */}
          <div className="h-14 px-4 sm:px-6 bg-card border-b border-border/70 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                <Eye className="h-4 w-4" />
                <span>Full Article Preview</span>
              </div>
              {isArabicContent && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-[10px] border border-emerald-500/20">
                  RTL Active
                </span>
              )}
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-muted border border-border/60">
              <button
                type="button"
                onClick={() => setModalDevice("desktop")}
                className={`p-1.5 rounded-lg transition-colors ${
                  modalDevice === "desktop"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Desktop View"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setModalDevice("tablet")}
                className={`p-1.5 rounded-lg transition-colors ${
                  modalDevice === "tablet"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Tablet View"
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setModalDevice("mobile")}
                className={`p-1.5 rounded-lg transition-colors ${
                  modalDevice === "mobile"
                    ? "bg-background text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                title="Mobile View"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              title="Close Preview"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Preview Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex justify-center bg-muted/20">
            <div
              className={`bg-card rounded-3xl border border-border/70 p-6 sm:p-12 shadow-sm transition-all duration-300 w-full ${
                modalDevice === "desktop"
                  ? "max-w-4xl"
                  : modalDevice === "tablet"
                  ? "max-w-2xl"
                  : "max-w-sm"
              }`}
            >
              <div
                dir={isArabicContent ? "rtl" : "ltr"}
                className={`prose prose-base sm:prose-lg dark:prose-invert max-w-none text-start
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-2
                  prose-h4:text-lg sm:prose-h4:text-xl prose-h4:mt-5 prose-h4:mb-2
                  prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:my-4
                  prose-strong:text-foreground prose-strong:font-bold
                  prose-ul:my-6 prose-ul:list-disc prose-ul:ps-6 prose-li:my-1.5 prose-li:text-muted-foreground
                  prose-ol:my-6 prose-ol:list-decimal prose-ol:ps-6
                  prose-table:w-full prose-table:my-8 prose-table:border-collapse prose-table:border prose-table:border-border/70 prose-table:rounded-xl prose-table:overflow-hidden
                  prose-th:bg-muted/60 prose-th:p-3 sm:prose-th:p-4 prose-th:text-start prose-th:font-bold prose-th:text-foreground prose-th:border prose-th:border-border/60
                  prose-td:p-3 sm:prose-td:p-4 prose-td:border prose-td:border-border/60 prose-td:text-muted-foreground prose-tr:even:bg-muted/15 prose-tr:hover:bg-muted/30
                  prose-blockquote:border-s-4 prose-blockquote:border-s-primary prose-blockquote:bg-muted/30 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-e-xl prose-blockquote:italic prose-blockquote:text-foreground/90 prose-blockquote:my-6
                  prose-img:rounded-2xl prose-img:border prose-img:border-border/60 prose-img:my-8 prose-img:shadow-sm prose-img:max-w-full prose-img:h-auto
                  prose-a:text-primary prose-a:font-medium prose-a:underline hover:prose-a:opacity-80 transition-opacity
                  prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-pre:rounded-2xl prose-pre:p-5 prose-pre:border prose-pre:border-border/60 prose-pre:overflow-x-auto
                  prose-code:font-mono prose-code:text-xs sm:prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-foreground prose-code:font-medium
                  prose-hr:my-10 prose-hr:border-border/80 ${
                    isArabicContent
                      ? "rtl:prose-blockquote:border-r-primary rtl:prose-blockquote:border-l-0 rtl:prose-blockquote:rounded-l-xl rtl:prose-blockquote:rounded-r-none leading-[1.8]"
                      : ""
                  }`}
                dangerouslySetInnerHTML={{ __html: sanitizedPreviewHtml }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

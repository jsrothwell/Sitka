"use client";

import { useState, useRef, useCallback, useId } from "react";
import { Upload, X, File, AlertCircle } from "lucide-react";
import { cn } from "@/lib";

export interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSize,
  onFilesChange,
  label,
  helperText,
  error,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const processFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      setSizeError(null);

      const valid: File[] = [];
      const oversized: string[] = [];

      Array.from(incoming).forEach((f) => {
        if (maxSize && f.size > maxSize) {
          oversized.push(f.name);
        } else {
          valid.push(f);
        }
      });

      if (oversized.length > 0) {
        setSizeError(
          `${oversized.join(", ")} exceed${oversized.length > 1 ? "" : "s"} the ${formatBytes(maxSize!)} limit.`
        );
      }

      const next = multiple ? [...files, ...valid] : valid.slice(0, 1);
      setFiles(next);
      onFilesChange?.(next);
    },
    [files, maxSize, multiple, onFilesChange]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) processFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange?.(next);
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayError = error ?? sizeError;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={id}
          className="text-[12px] font-medium text-[rgb(var(--text-secondary))]"
        >
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label ?? "Upload files"}
        aria-disabled={disabled}
        onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && !disabled) inputRef.current?.click(); }}
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer",
          "px-6 py-8 text-center transition-all duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--accent))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--background))]",
          isDragging
            ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent-subtle))]"
            : "border-[rgb(var(--border))] bg-[rgb(var(--surface-raised))] hover:border-[rgb(var(--accent-muted))] hover:bg-[rgb(var(--surface-hover))]",
          displayError && "border-red-400/60",
          disabled && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => processFiles(e.target.files)}
          aria-hidden="true"
        />
        <Upload
          className={cn(
            "w-6 h-6 transition-colors",
            isDragging ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--text-tertiary))]"
          )}
          strokeWidth={1.5}
        />
        <div>
          <p className="text-[13px] font-medium text-[rgb(var(--text-primary))]">
            {isDragging ? "Drop to upload" : "Drop files here or click to browse"}
          </p>
          {(helperText || accept || maxSize) && (
            <p className="text-[12px] text-[rgb(var(--text-tertiary))] mt-0.5">
              {helperText ??
                [accept && `Accepts ${accept}`, maxSize && `Max ${formatBytes(maxSize)}`]
                  .filter(Boolean)
                  .join(" · ")}
            </p>
          )}
        </div>
      </div>

      {displayError && (
        <p className="flex items-center gap-1.5 text-[12px] text-red-500">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
          {displayError}
        </p>
      )}

      {files.length > 0 && (
        <ul className="flex flex-col gap-1.5 mt-1" aria-label="Selected files">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${i}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[rgb(var(--surface-raised))] border border-[rgb(var(--border))]"
            >
              <File className="w-4 h-4 shrink-0 text-[rgb(var(--accent))]" strokeWidth={1.5} />
              <span className="flex-1 min-w-0 text-[12px] text-[rgb(var(--text-primary))] truncate">
                {file.name}
              </span>
              <span className="text-[11px] text-[rgb(var(--text-tertiary))] shrink-0">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 p-0.5 rounded text-[rgb(var(--text-tertiary))] hover:text-[rgb(var(--text-primary))] hover:bg-[rgb(var(--surface-hover))] transition-colors"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

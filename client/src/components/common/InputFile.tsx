"use client";

import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type InputHTMLAttributes,
} from "react";
import { ImagePlus, UploadCloud, X, FileImage } from "lucide-react";
import Image from "next/image";

type FileInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value" | "onChange"
> & {
  label?: string;
  error?: string;
  helperText?: string;
  maxSizeMB?: number;
  value?: File | null;
  onChange?: (file: File | null) => void;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      label,
      error,
      helperText,
      maxSizeMB = 2,
      accept = "image/png,image/jpeg,image/webp",
      value,
      onChange,
      disabled = false,
      id,
      name,
      ...props
    },
    forwardedRef,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    const inputRef = useRef<HTMLInputElement | null>(null);

    const [internalFile, setInternalFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [localError, setLocalError] = useState("");

    const controlled = value !== undefined;
    const file = controlled ? value : internalFile;

    useEffect(() => {
      if (!file) {
        setPreview(null);
        return;
      }

      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }, [file]);

    const setFile = (newFile: File | null) => {
      if (!controlled) {
        setInternalFile(newFile);
      }

      onChange?.(newFile);
    };

    const validateFile = (selectedFile: File) => {
      setLocalError("");

      if (!selectedFile.type.startsWith("image/")) {
        setLocalError("فایل انتخاب‌شده باید تصویر باشد!");
        return;
      }

      const allowedTypes = accept.split(",").map((type) => type.trim());

      if (
        !allowedTypes.includes(selectedFile.type) &&
        !allowedTypes.includes("image/*")
      ) {
        setLocalError("فرمت تصویر مجاز نیست!");
        return;
      }

      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        setLocalError(`حجم تصویر نباید بیشتر از ${maxSizeMB} مگابایت باشد!`);
        return;
      }

      setFile(selectedFile);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];

      if (selectedFile) {
        validateFile(selectedFile);
      }

      e.target.value = "";
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      if (disabled) return;

      const selectedFile = e.dataTransfer.files?.[0];

      if (selectedFile) {
        validateFile(selectedFile);
      }
    };

    const removeFile = () => {
      setFile(null);
      setLocalError("");

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const currentError = error || localError;

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="mr-2 text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        )}

        <input
          {...props}
          ref={(element) => {
            inputRef.current = element;

            if (typeof forwardedRef === "function") {
              forwardedRef(element);
            } else if (forwardedRef) {
              forwardedRef.current = element;
            }
          }}
          id={inputId}
          name={name}
          type="file"
          accept={accept}
          disabled={disabled}
          onChange={handleInputChange}
          className="sr-only"
          aria-invalid={Boolean(currentError)}
        />

        {file ? (
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
            <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-box">
              {preview ? (
                <Image
                  width={100}
                  height={100}
                  src={preview}
                  alt="پیش‌نمایش تصویر"
                  className="size-40 object-cover"
                />
              ) : (
                <FileImage size={24} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">
                {file.name}
              </p>

              <p className="mt-1 text-xs text-text-secondary">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>

            <button
              type="button"
              onClick={removeFile}
              disabled={disabled}
              aria-label="حذف تصویر"
              className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              if (!disabled) {
                inputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();

              if (!disabled) {
                setIsDragging(true);
              }
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            role="button"
            tabIndex={disabled ? -1 : 0}
            aria-disabled={disabled}
            onKeyDown={(e) => {
              if (disabled) return;

              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            className={[
              "flex cursor-pointer flex-col items-center gap-2",
              "rounded-xl border-2 border-dashed bg-card p-6",
              "transition-colors duration-200",
              "hover:border-primary hover:bg-primary/5",
              "focus-visible:outline-2 focus-visible:outline-primary",
              isDragging ? "border-primary bg-primary/10" : "border-border",
              currentError ? "border-red-500" : "",
              disabled ? "cursor-not-allowed opacity-60" : "",
            ].join(" ")}
          >
            <div className="flex size-12 items-center justify-center rounded-full bg-box text-text-secondary">
              {isDragging ? <ImagePlus size={24} /> : <UploadCloud size={24} />}
            </div>

            <p className="text-sm font-medium text-text-primary">
              برای آپلود تصویر کلیک کنید
            </p>

            <p className="text-xs text-text-secondary">
              یا فایل خود را اینجا رها کنید
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              PNG، JPG، WEBP تا {maxSizeMB} مگابایت
            </p>
          </div>
        )}

        {(currentError || helperText) && (
          <p
            role={currentError ? "alert" : undefined}
            className={`text-xs ${
              currentError ? "text-red-600" : "text-text-secondary"
            }`}
          >
            {currentError || helperText}
          </p>
        )}
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

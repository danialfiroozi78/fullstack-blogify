"use client";

import { useEffect, useRef } from "react";
import { Crepe } from "@milkdown/crepe";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";

type MarkdownEditorProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  rules?: RegisterOptions<T, Path<T>>;
};

type CrepeInputProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function CrepeInput({ value, onChange, onBlur }: CrepeInputProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const initialValue = useRef(value);
  const onChangeRef = useRef(onChange);
  const onBlurRef = useRef(onBlur);

  useEffect(() => {
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;
  }, [onChange, onBlur]);

  useEffect(() => {
    if (!containerRef.current) return;

    let disposed = false;

    const crepe = new Crepe({
      root: containerRef.current,
      defaultValue: initialValue.current,
    });

    crepe.on((listener) => {
      listener.markdownUpdated((_ctx, markdown, previousMarkdown) => {
        if (disposed) return;

        if (markdown !== previousMarkdown) {
          onChangeRef.current(markdown);
        }
      });

      listener.blur(() => {
        if (!disposed) {
          onBlurRef.current();
        }
      });
    });

    void crepe.create().then(() => {
      if (disposed) {
        void crepe.destroy();
      }
    });

    return () => {
      disposed = true;
      void crepe.destroy();
    };
  }, []);

  return <div ref={containerRef} className="min-h-100" />;
}

export function MarkdownEditor<T extends FieldValues>({
  name,
  control,
  label,
  error,
  rules,
}: MarkdownEditorProps<T>) {
  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <label className="mr-2 text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState }) => {
          const errorMessage = error ?? fieldState.error?.message;

          return (
            <div
              className={`overflow-hidden rounded-xl border bg-card ${
                errorMessage ? "border-red-500" : "border-border"
              }`}
            >
              <CrepeInput
                value={field.value ?? ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
              />
            </div>
          );
        }}
      />

      {error && (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function PageLoader() {
  return (
    <div
      role="status"
      aria-label="در حال بارگذاری صفحه"
      className="flex min-h-[65vh] w-full flex-col items-center justify-center gap-7 bg-body"
    >
      {/* Animated Logo */}
      <div className="relative flex size-24 items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-border border-t-primary border-r-accent [animation-duration:1.4s]" />

        {/* Inner Glow */}
        <div className="absolute inset-3 animate-pulse rounded-full bg-primary/5 blur-md" />

        {/* Logo */}
        <div className="flex size-16 items-center justify-center rounded-2xl bg-white shadow-[0_8px_30px_rgba(109,40,217,0.10)]">
          <span className="bg-linear-to-br from-primary to-[#a78bfa] bg-clip-text text-4xl font-black text-transparent">
            B
          </span>
          <span className="absolute top-7 right-6 size-2 rounded-full bg-accent" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-base font-semibold text-text-primary">
          در حال آماده‌سازی صفحه
        </p>

        <p className="text-sm text-text-secondary">چند لحظه صبر کنید...</p>

        {/* Animated Dots */}
        <div className="mt-2 flex items-center gap-2">
          <span className="size-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="size-2 animate-bounce rounded-full bg-[#8b5cf6] [animation-delay:-0.15s]" />
          <span className="size-2 animate-bounce rounded-full bg-accent" />
        </div>
      </div>

      <span className="sr-only">در حال بارگذاری...</span>
    </div>
  );
}

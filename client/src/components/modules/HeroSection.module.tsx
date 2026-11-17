import { BookOpen, Feather, Lightbulb, Sparkles, PenLine } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      dir="rtl"
      className="relative isolate overflow-hidden rounded-4xl bg-linear-to-br from-[#4c1d95] via-primary to-[#9333ea] px-6 py-12 sm:py-16 text-white sm:px-12 lg:px-16 lg:py-20"
    >
      <div className="pointer-events-none absolute -top-32 -left-20 size-96 rounded-full bg-accent/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 size-112.5 rounded-full bg-[#c4b5fd]/20 blur-[110px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2">
        <div className="text-center lg:text-right">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur-sm">
            <Sparkles size={15} className="text-[#ffb36b]" />
            دنیایی از ایده‌ها و داستان‌ها
          </div>

          <h1 className="text-5xl leading-normal font-black tracking-tight sm:leading-[1.6]">
            هر ایده،
            <br />
            <span className="text-[#ffb36b]">آغاز یک داستانه!</span>
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-7 text-white/85 sm:text-base lg:mx-0">
            بلاگیفای جایی برای کشف ایده‌های تازه، یادگیری و به اشتراک گذاشتن
            تجربه‌هاست. اینجا هر نوشته می‌تونه شروع یک مسیر جدید باشه.
          </p>

          {/* Feature Labels */}
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            {[
              { icon: BookOpen, text: "یادگیری" },
              { icon: Lightbulb, text: "ایده‌پردازی" },
              { icon: Feather, text: "خلاقیت" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-medium text-white/90 backdrop-blur-sm"
              >
                <Icon size={16} className="text-[#ffb36b]" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Illustration */}
        <div className="relative mx-auto flex h-75 w-full max-w-md items-center justify-center sm:h-90">
          {/* Rings */}
          <div className="absolute size-70 rounded-full border border-white/10 sm:size-85" />
          <div className="absolute size-55 rounded-full border border-white/10 sm:size-67.5" />

          {/* Main Glass Card */}
          <div className="relative z-10 w-62.5 -rotate-6 rounded-3xl border border-white/25 bg-white/15 p-6 shadow-[0_25px_80px_rgba(30,10,80,0.3)] backdrop-blur-xl transition-transform duration-500 hover:rotate-0 sm:w-72.5">
            <div className="mb-7 flex items-center justify-between">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent shadow-lg shadow-orange-500/20">
                <PenLine size={24} />
              </div>

              <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] text-white/80">
                Blogify
              </span>
            </div>

            <div className="space-y-3">
              <div className="h-3 w-3/4 rounded-full bg-white/80" />
              <div className="h-2.5 w-full rounded-full bg-white/30" />
              <div className="h-2.5 w-5/6 rounded-full bg-white/30" />
              <div className="h-2.5 w-2/3 rounded-full bg-white/30" />
            </div>

            <div className="mt-8 flex items-center gap-2 border-t border-white/15 pt-5">
              <div className="flex size-8 items-center justify-center rounded-full bg-accent/25">
                <Feather size={15} className="text-[#ffb36b]" />
              </div>
              <span className="text-xs text-white/75">
                ایده‌هات ارزش نوشته شدن دارن
              </span>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-5 right-5 flex size-14 animate-bounce items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-md [animation-duration:3s]">
            <Lightbulb size={26} className="text-[#ffb36b]" />
          </div>

          <div className="absolute bottom-6 left-4 flex size-12 animate-bounce items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-xl backdrop-blur-md [animation-delay:0.6s] [animation-duration:3.5s]">
            <BookOpen size={23} />
          </div>

          <div className="absolute top-10 left-10 size-3 rounded-full bg-accent shadow-[0_0_20px_#ff8a34]" />
          <div className="absolute right-12 bottom-10 size-2 rounded-full bg-white/70" />
        </div>
      </div>
    </section>
  );
}

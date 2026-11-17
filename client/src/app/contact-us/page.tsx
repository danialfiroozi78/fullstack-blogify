import type { Metadata } from "next";
import {
  ArrowUpLeft,
  Mail,
  MessageCircle,
  MessagesSquare,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "تماس با ما | بلاگیفای",
  description: "راه‌های ارتباط با بلاگیفای از طریق تلفن، تلگرام و ایمیل.",
};

const contactMethods = [
  {
    title: "تماس تلفنی",
    value: "09915060644",
    description: "برای ارتباط مستقیم می‌تونید از طریق شماره زیر تماس بگیرید.",
    href: "tel:09915060644",
    icon: Phone,
    iconStyle: "bg-violet-100 text-primary",
    buttonText: "تماس تلفنی",
  },
  {
    title: "تلگرام",
    value: "@danialfiroozi78",
    description:
      "برای ارسال پیام، پیشنهاد یا گفت‌وگو می‌تونید از طریق تلگرام در ارتباط باشید.",
    href: "https://t.me/danialfiroozi78",
    icon: MessageCircle,
    iconStyle: "bg-blue-100 text-blue-600",
    buttonText: "ارسال پیام در تلگرام",
  },
  {
    title: "ایمیل",
    value: "danialfirooz78@gmail.com",
    description:
      "برای پیشنهاد همکاری، انتقاد یا مکاتبات می‌تونید ایمیل ارسال کنید.",
    href: "mailto:danialfirooz78@gmail.com",
    icon: Mail,
    iconStyle: "bg-orange-100 text-orange-600",
    buttonText: "ارسال ایمیل",
  },
];

export default function ContactUsPage() {
  return (
    <div dir="rtl" className="pb-10">
      <section className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-primary via-[#7c3aed] to-[#4c1d95] px-6 py-16 text-center text-white sm:px-10 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium">
            <Sparkles className="size-4 text-orange-300" />
            ارتباط با بلاگیفای
          </span>

          <h1 className="mt-7 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            بیایید در ارتباط باشیم!
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-9 text-white/85 sm:text-base">
            سؤال، پیشنهاد، انتقاد یا ایده‌ای برای بهتر شدن بلاگیفای دارید؟ از
            طریق راه‌های ارتباطی زیر می‌تونید مستقیماً با من در تماس باشید.
          </p>
        </div>
      </section>

      {/* روش‌های ارتباطی */}
      <section className="mt-14">
        <div className="mb-9 text-center">
          <span className="text-sm font-bold text-primary">
            راه‌های ارتباطی
          </span>

          <h2 className="mt-3 text-2xl font-black text-text-primary sm:text-3xl">
            چطور با هم در ارتباط باشیم؟
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-text-secondary">
            هر روشی که براتون راحت‌تره انتخاب کنید.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {contactMethods.map((method) => {
            const Icon = method.icon;

            return (
              <article
                key={method.title}
                className="
                  group flex h-full flex-col rounded-2xl
                  border border-border bg-card p-6
                  shadow-[0_8px_30px_rgba(109,40,217,0.05)]
                  transition-all duration-300
                  hover:-translate-y-1.5
                  hover:border-violet-300
                  hover:shadow-[0_18px_45px_rgba(109,40,217,0.12)]
                "
              >
                <div
                  className={`flex size-14 items-center justify-center rounded-2xl ${method.iconStyle}`}
                >
                  <Icon className="size-7" />
                </div>

                <div className="flex items-center justify-between mt-5">
                  <h3 className="text-lg font-extrabold text-text-primary">
                    {method.title}
                  </h3>
                  <p
                    dir="ltr"
                    className="break-all text-left text-sm font-bold text-text-primary"
                  >
                    {method.value}
                  </p>
                </div>

                <p className="mt-3 text-sm leading-8 text-text-secondary">
                  {method.description}
                </p>

                <Link
                  href={method.href}
                  target={
                    method.href.startsWith("https://") ? "_blank" : undefined
                  }
                  rel={
                    method.href.startsWith("https://")
                      ? "opener referrer"
                      : undefined
                  }
                  className="
                    mt-auto flex min-h-12 items-center
                    justify-center gap-2 rounded-xl
                    border border-primary px-4
                    pt-3 pb-3 text-sm font-bold text-primary
                    transition-all duration-300
                    hover:bg-primary hover:text-white
                  "
                >
                  {method.buttonText}
                  <ArrowUpLeft className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14 rounded-3xl border border-border bg-box px-6 py-12 text-center sm:px-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-white text-primary">
          <MessagesSquare className="size-7" />
        </div>

        <h2 className="mt-5 text-xl font-black text-text-primary sm:text-2xl">
          منتظر شنیدن نظرات شما هستیم
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-text-secondary">
          بازخوردها، پیشنهادها و ایده‌های شما کمک می‌کنن بلاگیفای هر روز بهتر
          بشه. خوشحال می‌شیم نظرتون رو با ما در میون بذارید.
        </p>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BookOpen,
  HeartHandshake,
  Lightbulb,
  PenLine,
  Rocket,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "درباره ما | بلاگیفای",
  description:
    "با بلاگیفای بیشتر آشنا شوید؛ فضایی برای یادگیری، نوشتن و به‌اشتراک‌گذاری دانش و تجربه.",
};

const features = [
  {
    title: "یادگیری بدون مرز",
    description:
      "از برنامه‌نویسی و تکنولوژی تا موضوعات روزمره؛ همیشه چیز تازه‌ای برای کشف کردن وجود دارد.",
    icon: BookOpen,
    color: "bg-violet-100 text-primary",
  },
  {
    title: "اشتراک‌گذاری تجربه",
    description:
      "دانش و تجربه وقتی ارزشمندتر می‌شوند که با دیگران به اشتراک گذاشته شوند.",
    icon: PenLine,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "رشد در کنار هم",
    description:
      "با خواندن دیدگاه‌های مختلف و گفت‌وگو درباره ایده‌ها، می‌توانیم هر روز بهتر از دیروز باشیم.",
    icon: UsersRound,
    color: "bg-blue-100 text-blue-600",
  },
];

const values = [
  {
    title: "کنجکاوی",
    description: "از پرسیدن سؤال و کشف موضوعات جدید استقبال می‌کنیم.",
    icon: Lightbulb,
  },
  {
    title: "خلاقیت",
    description: "برای ایده‌های متفاوت و نگاه‌های تازه ارزش قائلیم.",
    icon: Sparkles,
  },
  {
    title: "احترام",
    description: "گفت‌وگوی سازنده و احترام به دیدگاه دیگران برای ما مهم است.",
    icon: HeartHandshake,
  },
];

export default function AboutUsPage() {
  return (
    <main dir="rtl" className="pb-8">
      <section
        className="
          relative isolate overflow-hidden rounded-3xl
          bg-linear-to-br from-primary via-[#7c3aed] to-[#4c1d95]
          px-6 py-16 text-center text-white
          sm:px-10 sm:py-20 lg:py-24
        "
      >
        <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 size-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
            <Sparkles className="size-4 text-orange-300" />
            به دنیای بلاگیفای خوش آمدید
          </span>

          <h1 className="mt-7 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            جایی که ایده‌ها
            <span className="mt-2 block text-orange-300">
              به داستان تبدیل می‌شن!
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-white/85 sm:text-base sm:leading-9">
            بلاگیفای فضایی برای آدم‌های کنجکاوه؛ کسانی که عاشق یاد گرفتن، نوشتن
            و به اشتراک گذاشتن تجربه‌هاشون هستن. اینجا هر ایده می‌تونه شروع یک
            گفت‌وگوی تازه باشه.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/articles"
              className="
                inline-flex min-h-12 items-center gap-2
                rounded-xl bg-white px-6 text-sm font-bold
                text-primary shadow-lg transition-all duration-300
                hover:-translate-y-1 hover:bg-violet-50
              "
            >
              کشف مقالات
              <ArrowLeft className="size-4" />
            </Link>

            <Link
              href="/contact-us"
              className="
                inline-flex min-h-12 items-center gap-2
                rounded-xl border border-white/30
                bg-white/10 px-6 text-sm font-bold text-white
                transition-colors duration-300 hover:bg-white/20
              "
            >
              ارتباط با ما
              <ArrowUpLeft className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid items-center gap-8 py-16 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="text-sm font-bold text-primary">داستان ما</span>

          <h2 className="mt-3 text-2xl font-black leading-relaxed text-text-primary sm:text-3xl">
            بلاگیفای فقط یک وبلاگ نیست!
          </h2>

          <p className="mt-5 text-sm leading-9 text-text-secondary sm:text-base">
            ما باور داریم هر کسی تجربه، ایده یا دانشی داره که می‌تونه برای
            دیگران مفید باشه. بلاگیفای با همین نگاه شکل گرفته؛ تا فضایی ساده و
            دلنشین برای انتشار مطالب، یادگیری و تبادل نظر فراهم کنه.
          </p>

          <p className="mt-4 text-sm leading-9 text-text-secondary sm:text-base">
            فرقی نمی‌کنه به برنامه‌نویسی علاقه داشته باشی، دنبال تازه‌های
            تکنولوژی باشی یا بخوای تجربه‌هات رو بنویسی؛ اینجا جایی برای کشف
            موضوعات تازه و به‌اشتراک‌گذاری دانسته‌هاست.
          </p>
        </div>

        <div className="relative rounded-3xl border border-border bg-card p-5 shadow-[0_15px_50px_rgba(109,40,217,0.07)] sm:p-8">
          <div className="absolute -top-4 left-8 flex size-12 items-center justify-center rounded-2xl bg-accent text-white shadow-lg">
            <Sparkles className="size-6" />
          </div>

          <div className="rounded-2xl bg-box p-6 sm:p-8">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-white">
              <Rocket className="size-7" />
            </div>

            <h3 className="mt-6 text-xl font-extrabold text-text-primary">
              یک ایده کوچک، یک تأثیر بزرگ
            </h3>

            <p className="mt-4 text-sm leading-8 text-text-secondary">
              گاهی یک مقاله، یک تجربه شخصی یا حتی یک سؤال ساده می‌تونه مسیر
              یادگیری فرد دیگه‌ای رو تغییر بده.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { title: "بخوان", icon: BookOpen },
                { title: "بنویس", icon: PenLine },
                { title: "رشد کن", icon: UsersRound },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white px-2 py-5"
                  >
                    <Icon className="size-6 text-primary" />
                    <span className="text-xs font-bold text-text-primary">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="mb-9 text-center">
          <span className="text-sm font-bold text-primary">چرا بلاگیفای؟</span>

          <h2 className="mt-3 text-2xl font-black text-text-primary sm:text-3xl">
            اینجا برای یاد گرفتن و رشد کردنه
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-text-secondary">
            تلاش می‌کنیم تجربه مطالعه و نوشتن، ساده، لذت‌بخش و الهام‌بخش باشه.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="
                  group rounded-2xl border border-border
                  bg-card p-6
                  shadow-[0_8px_30px_rgba(109,40,217,0.04)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-violet-200
                  hover:shadow-[0_15px_40px_rgba(109,40,217,0.1)]
                "
              >
                <div
                  className={`flex size-13 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-6 text-lg font-extrabold text-text-primary">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-8 text-text-secondary">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14 rounded-3xl bg-box px-5 py-12 sm:px-10">
        <div className="mb-9 text-center">
          <h2 className="text-2xl font-black text-text-primary">
            ارزش‌هایی که برامون مهمن
          </h2>

          <p className="mt-3 text-sm text-text-secondary">
            سه اصل ساده برای ساختن یک فضای بهتر
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="rounded-2xl border border-border bg-white p-6 text-center"
              >
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-4 font-extrabold text-text-primary">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-border bg-card px-6 py-12 text-center shadow-[0_8px_35px_rgba(109,40,217,0.05)] sm:px-10">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-box text-primary">
          <PenLine className="size-7" />
        </div>

        <h2 className="mt-5 text-2xl font-black text-text-primary">
          تو هم بخشی از داستان بلاگیفای باش!
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-text-secondary">
          اگه حرفی برای گفتن، تجربه‌ای برای به‌اشتراک‌گذاری یا ایده‌ای برای
          نوشتن داری، بلاگیفای می‌تونه نقطه شروع تو باشه.
        </p>

        <Link
          href="/profile/new-article"
          className="
            mt-7 inline-flex min-h-12 items-center gap-2
            rounded-xl bg-primary px-6 text-sm font-bold
            text-white transition-all duration-300
            hover:-translate-y-1 hover:bg-primary-hover
            hover:shadow-[0_10px_25px_rgba(109,40,217,0.2)]
          "
        >
          شروع به نوشتن
          <ArrowLeft className="size-4" />
        </Link>
      </section>
    </main>
  );
}

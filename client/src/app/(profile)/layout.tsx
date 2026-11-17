"use client";

import { Button } from "@/components/common/Button";
import Avatar from "@/public/images/png/avatar.png";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, Suspense } from "react";
import Modal from "@/components/common/Modal";
import ProfileLayoutSkeletonLoading from "@/components/common/loading/ProfileLayoutSkeletonLoading";
import { BookIcon, PenBoxIcon, User2Icon, UserPen } from "lucide-react";
import useProfileLayout from "@/hooks/useProfileLayout";

export default function UserPanelLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<ProfileLayoutSkeletonLoading />}>
      <ProfileLayoutContent>{children}</ProfileLayoutContent>
    </Suspense>
  );
}

function ProfileLayoutContent({ children }: { children: ReactNode }) {
  const {
    profileData,
    profileFetching,
    logoutMutation,
    logoutLoading,
    replace,
    refresh,
    pathname,
    open,
    setOpen,
    sidebarItems,
  } = useProfileLayout();

  return (
    <section className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-5 items-start">
      {profileFetching ? (
        <ProfileLayoutSkeletonLoading />
      ) : (
        <aside className="lg:col-span-3 bg-white shadow-[0_8px_40px_rgba(65,35,120,0.045)] rounded-xl p-5 md:col-span-2 md:sticky md:top-2 border border-violet-100/60">
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-[#7c3aed] to-[#4c1d95] p-5 text-white shadow-[0_10px_30px_rgba(109,40,217,0.2)]">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />

            <div className="relative flex flex-col items-center gap-3">
              {/* Avatar */}
              <div className="rounded-full border-4 border-white/30 bg-white p-1 shadow-lg">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
                  <Image
                    src={
                      profileData?.data?.profile?.avatar
                        ? `${process.env.NEXT_PUBLIC_SERVER_URL}${profileData?.data?.profile?.avatar}`
                        : Avatar
                    }
                    width={64}
                    height={64}
                    className="rounded-full size-16"
                    alt="آواتار"
                    unoptimized
                  />
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-bold">
                  {profileData?.data?.first_name +
                    " " +
                    profileData?.data?.last_name}
                </h3>
                <p className="mt-1 text-xs text-white/75">
                  به پنل نویسندگی خوش آمدید
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-1 flex-col gap-2">
            <nav className="flex flex-col gap-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/profile"
                    ? pathname === "/profile"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`
            group relative flex min-h-12 items-center gap-3
            overflow-hidden rounded-xl px-4
            text-[15px] font-medium
            transition-all duration-300
            ${
              isActive
                ? "bg-box text-primary"
                : "text-text-primary hover:bg-box hover:text-primary"
            }
          `}
                  >
                    <span
                      className={`
              absolute right-0 top-1/2 h-6 w-1
              -translate-y-1/2 rounded-l-full bg-primary
              transition-opacity duration-300
              ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}
            `}
                    />

                    <Icon
                      className={`
              h-5 w-5 shrink-0
              transition-transform duration-300
              group-hover:scale-110
            `}
                    />

                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-border pt-4">
              <Button
                variant="dangerGhost"
                fullWidth
                onClick={() => setOpen(true)}
              >
                خروج از حساب کاربری
              </Button>
            </div>
          </div>
        </aside>
      )}

      <section className="lg:col-span-9 bg-white shadow-[0_8px_40px_rgba(65,35,120,0.045)] rounded-xl p-5 md:col-span-4 border border-violet-100/60">
        {children}
      </section>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="خروج از حساب کاربری"
        description="آیا از خروج از حساب کاربری اطمینان دارید؟"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>

            <Button
              variant="danger"
              loading={logoutLoading}
              onClick={() =>
                logoutMutation(null).then(() => {
                  replace("/auth");
                  refresh();
                })
              }
            >
              خروج از حساب
            </Button>
          </>
        }
      >
        <p>
          با خروج از حساب کاربری، توکن شما در دسترس نخواهد بود و برای استفاده از
          پنل کاربری باید دوباره لاگین کنید!
        </p>
      </Modal>
    </section>
  );
}

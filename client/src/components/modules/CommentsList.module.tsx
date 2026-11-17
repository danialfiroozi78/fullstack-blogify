import { MessageSquareText, UserRound } from "lucide-react";
import Image from "next/image";
import { getArticleComments } from "@/utils/fetch";
import { cookies } from "next/headers";
import AddComment from "@/components/modules/AddComment.module";
import { GetArticleDetailsResType } from "@/types/query.type";

export default async function CommentsList({
  article,
}: {
  article: GetArticleDetailsResType;
}) {
  const comments = await getArticleComments(article?.data?.id);
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");

  return (
    <>
      {article?.data?.allow_comments ? (
        <AddComment isAuthenticated={!!token} id={article?.data?.id} />
      ) : (
        <div className="rounded-xl border border-orange-200 bg-orange-50 text-orange-900 font-bold text-center p-5">
          این مقاله امکان ثبت نظر را ندارد!
        </div>
      )}

      <div className="space-y-3 grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {comments?.data?.length ? (
          comments?.data?.map((item) => (
            <div
              key={item.id}
              className="
            group rounded-xl border border-border
            bg-card p-4
            transition-all duration-300
            hover:border-violet-200
            hover:shadow-[0_8px_24px_rgba(109,40,217,0.06)]
          "
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="size-10 shrink-0 overflow-hidden rounded-full border-2 border-box bg-box">
                    {item.user?.profile?.avatar ? (
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_SERVER_URL +
                          item.user.profile.avatar
                        }
                        alt={item.user.first_name}
                        width={40}
                        height={40}
                        unoptimized
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-primary">
                        <UserRound className="size-5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-text-primary">
                      {!item?.user
                        ? item?.guest_name
                        : item.user?.first_name + " " + item.user?.last_name}
                    </p>

                    {item.user?.profile?.user_name && (
                      <span className="text-xs text-text-secondary">
                        @{item.user.profile.user_name}
                      </span>
                    )}
                  </div>
                </div>

                <span className="shrink-0 text-[11px] text-text-secondary">
                  {item.createdAt}
                </span>
              </div>

              <p className="mt-4 border-r-2 border-primary/20 pr-3 text-sm leading-7 text-text-primary">
                {item.content}
              </p>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-box/50 px-4 py-10 text-center">
            <MessageSquareText className="size-9 text-primary/40" />

            <p className="text-sm font-semibold text-text-primary">
              هنوز نظری برای این مقاله ثبت نشده است
            </p>

            <p className="text-xs text-text-secondary">
              اولین دیدگاه کاربران در این قسمت نمایش داده می‌شود.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

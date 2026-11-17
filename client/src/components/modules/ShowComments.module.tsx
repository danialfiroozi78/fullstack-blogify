import { MessageSquareText } from "lucide-react";
import CommentsList from "@/components/modules/CommentsList.module";
import { GetArticleDetailsResType } from "@/types/query.type";

export default function ShowComments({
  article,
}: {
  article: GetArticleDetailsResType;
}) {
  return (
    <div className="mt-10 bg-white p-5 rounded-xl">
      <div className="mb-6 flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-[0_8px_30px_rgba(65,35,120,0.05)]">
        <div className="h-11 w-1 shrink-0 rounded-full bg-primary" />

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-box text-primary">
          <MessageSquareText className="size-5" />
        </div>

        <div className="flex-1">
          <h2 className="text-lg font-extrabold text-text-primary">
            نظرات کاربران
          </h2>
          <p className="mt-1 text-xs text-text-secondary">
            دیدگاه‌های ثبت‌شده برای این مقاله
          </p>
        </div>

        {/*<span className="rounded-lg bg-box px-3 py-1.5 text-xs font-bold text-primary">*/}
        {/*  {comments?.data?.length ?? 0} نظر*/}
        {/*</span>*/}
      </div>

      <CommentsList article={article} />
    </div>
  );
}

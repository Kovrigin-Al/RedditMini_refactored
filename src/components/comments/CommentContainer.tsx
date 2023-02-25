import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";
import { IGetPostCommentsData } from "../../types/comments";
import { IReply } from "../../types/replies";
import { bigNumsFormatter } from "../../utils/bigNumFormatter";
import CommentReplies from "./CommentReplies";

type Props = {
  comment: IGetPostCommentsData | IReply;
  repliesQty: number;
  postId: string;
  className: string;
};

const dateFormater = new Intl.DateTimeFormat(undefined, {
  dateStyle: "short",
  timeStyle: "short",
});

const CommentContainer: FC<Props> = ({ comment, repliesQty, postId, className }) => {
  const [isRepliesShown, setIsRepliesShown] = useState(false);

  const changeShowReplies = () => {
    setIsRepliesShown((prev) => !prev);
  };

  const hideReplies = () => {
    setIsRepliesShown(false)
  }

  return (
    <div
      className={className}
      key={comment.data.id}
    >
      <div className="flex items-center justify-between text-slate-500">
        <div>
          {comment.data.author}
        </div>
        <div>{dateFormater.format(comment.data.created_utc * 1000)}</div>
      </div>
      {comment.data.body}
      {repliesQty > 0 && (
        <div
          className="flex flex-nowrap cursor-pointer"
          onClick={changeShowReplies}
        >
          <ChatBubbleBottomCenterIcon className="h-5 w-5 mx-1 mt-1" />
          <div>
            {bigNumsFormatter(repliesQty) +
              (repliesQty > 1 ? " replies" : " reply")}
          </div>
        </div>
      )}
      {isRepliesShown && <div className="flex flex-nowrap">
      <button className="min-h-full rounded-xl bg-sky-200 hover:bg-sky-300 p-[2px] mx-2" onClick={hideReplies}></button>
      <CommentReplies parentCommentId={comment.data.id} subredditName={comment.data.subreddit_name_prefixed!} postId={postId}/>
      </div>
      }
    </div>
  );
};
export default CommentContainer;

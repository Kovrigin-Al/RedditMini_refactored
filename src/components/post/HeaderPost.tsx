import { FC } from "react";
import { IPost } from "../../types/posts";
import { timeFormatter } from "../../utils/timeFormatter";

type Props = {
  className: string;
  post: IPost;
};

const HeaderPost: FC<Props> = ({ post, className }) => {
  return (
    <div className={className}>
      <div className="text-slate-500 text-xs pl-2 py-4">
        <span className="font-semibold text-black">{post.subreddit_name_prefixed}</span> • Posted by u/{post.author} {timeFormatter(post.created_utc)}
      </div>
    </div>
  );
};

export default HeaderPost;

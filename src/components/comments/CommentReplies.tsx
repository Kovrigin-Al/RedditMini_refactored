import { FC } from "react";
import { postsAPI } from "../../store/posts/postsAPI";
import LoadingSpinner from "../ui/LoadingSpinner";
import CommentContainer from "./CommentContainer";

type Props = {
  postId: string;
  parentCommentId: string;
  subredditName: string;
};

const CommentReplies: FC<Props> = ({
  postId,
  parentCommentId,
  subredditName,
}) => {
  const { data, isFetching, isLoading, isError } =
    postsAPI.useGetCommentRepliesQuery({
      parentId: parentCommentId,
      postId,
      subredditName,
    });

  if (data) {
    return (
      <div className="flex flex-col justify-start w-full -mr-2">
        {data.replies.map((reply) => (
          <CommentContainer
            className="mt-3 px-2 bg-white w-full"
            key={reply.data.id}
            comment={reply}
            postId={postId}
            repliesQty={
              reply.data.replies ? reply.data.replies.data.children?.length : 0
            }
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {(isFetching || isLoading) && <LoadingSpinner />}
      {isError && <div>Something went wrong...</div>}
    </>
  );
};
export default CommentReplies;

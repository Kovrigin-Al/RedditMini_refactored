import { FC, useEffect } from "react";
import { postsAPI } from "../../store/posts/postsAPI";
import LoadingSpinner from "../ui/LoadingSpinner";
import CommentContainer from "./CommentContainer";

type Props = {
  postId: string;
};

const CommentList: FC<Props> = ({ postId }) => {
  const [
    fetchPostComments,
    {
      data: postCommentsData,
      isLoading: isPostCommentsLoading,
      isFetching: isPostCommentsFetching,
      isError: isPostCommentsError,
    },
  ] = postsAPI.useLazyGetPostCommentsQuery();

  useEffect(() => {
    fetchPostComments({ postId });
  }, [fetchPostComments, postId]);

  if (isPostCommentsLoading || isPostCommentsFetching) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isPostCommentsError) {
    return <div>Something went wrong...</div>;
  }

  return (
        <div className="w-full mb-5">
          {postCommentsData?.comments.map((comment) => (
            <CommentContainer
              repliesQty={postCommentsData.more[comment.data.name]?.length || 0}
              comment={comment}
              postId={postId}
              key={comment.data.id}
              className="sm:rounded-lg mt-3 px-2 bg-white sm:shadow-lg sm:border border-gray-200 w-full text-ellipsis overflow-x-hidden"
            />
          ))}
        </div>
  );
};
export default CommentList;

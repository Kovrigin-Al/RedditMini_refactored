import { useCallback, useRef, useState } from "react";
import { postsAPI } from "../store/posts/postsAPI";
import LoadingPost from "./post/LoadingPost";
import PostContainer from "./post/PostContainer";
import LoadingSpinner from "./ui/LoadingSpinner";

type Props = {};

const Posts = (props: Props) => {
  const [after, setAfter] = useState("");

  const { isLoading, isError, data, isFetching } = postsAPI.useGetPostsQuery({
    after,
  });

  const observer = useRef<IntersectionObserver>();
  // the callback applies the intersection observer to the last post
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          data && setAfter(data.after);
        }
      });
      node && observer.current.observe(node);
    },
    [data]
  );

  return (
    <>
      {data?.posts.map((post, index) => {
        // this defines the last post in the query and subscribes the intersection observer
        if (index + 1 === data.posts.length) {
          return (
            <PostContainer
              ref={lastPostRef}
              key={post.data.name}
              post={post.data}
            />
          );
        }
        return <PostContainer key={post.data.name} post={post.data} />;
      })}
      {isFetching && !isLoading && (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {isLoading && <LoadingPost />}
      {isError && <h2>Error...</h2>}
    </>
  );
};

export default Posts;

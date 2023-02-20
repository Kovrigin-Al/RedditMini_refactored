import { useCallback, useEffect, useRef } from "react";
import { postsAPI } from "../store/posts/postsAPI";
import { setAfter } from "../store/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import LoadingPost from "./post/LoadingPost";
import PostContainer from "./post/PostContainer";
import LoadingSpinner from "./ui/LoadingSpinner";

type Props = {};

const Posts = (props: Props) => {
  const searchRequest = useAppSelector((state) => state.posts.searchRequest);
  const after = useAppSelector((state) => state.posts.after);
  const dispatch = useAppDispatch()

  const [trigger, {isLoading, data, isError, isFetching}] = postsAPI.useLazyGetPostsQuery()
  const fetchPosts = useCallback(()=>trigger({ searchParam: searchRequest, after }), [after, searchRequest, trigger])
  useEffect(()=>{
    fetchPosts();
  }, [fetchPosts])
 
  useEffect(()=>{
      document.body.scrollIntoView();
  }, [searchRequest])

  const observer = useRef<IntersectionObserver>();
  // the callback applies the intersection observer to the last post and move it when new posts are loaded
  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          data && dispatch(setAfter(data.after));
        }
      });
      node && observer.current.observe(node);
    },
    [data, dispatch]
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

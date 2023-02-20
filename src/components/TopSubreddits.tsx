import React from "react";
import { setSearchRequest } from "../store/posts/postsSlice";
import { useAppDispatch } from "../store/store";
import { subredditsAPI } from "../store/subreddits/subredditsAPI";
import LoadingSpinner from "./ui/LoadingSpinner";

type Props = {};

const TopSubreddits = (props: Props) => {
  const {
    isLoading,
    isError,
    data: subreddits,
  } = subredditsAPI.useGetSubredditsQuery({ limit: 10 });
  const dispatch = useAppDispatch();
  const handleClick = (url: string) => {
    dispatch(setSearchRequest(url));
  };

  const scrollTop = () => {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  };

  if (subreddits?.length) {
    return (
      <div className="relative h-full">
        <div className="flex-col divide-y-2 ring-slate-200/10 shadow-sm bg-white rounded-md">
          <div className="flex items-center justify-around h-12">
            <p className="font-semibold">Top-10 subreddits</p>
          </div>
          {subreddits.map((subreddit) => (
            <div
              key={subreddit.id}
              className="flex h-10 w-full flex-nowrap items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => handleClick(subreddit.display_name_prefixed)}
            >
              <img
                src={subreddit.icon_img || require("../assets/img/logo.png")}
                alt="icon"
                height="30px"
                width="30px"
                className="rounded-full mx-2"
              />
              <p className="block overflow-hidden text-ellipsis">
                {subreddit.display_name}
              </p>
            </div>
          ))}
        </div>
{        <div className="sticky top-[calc(100vh-60px)] mt-[calc(100vh-516px)] h-auto w-32 py-2 mx-auto my-3 rounded-full bg-sky-600 hover:bg-sky-500 hover:ring-2 hover:ring-w hite text-white text-center hover:cursor-pointer" onClick={scrollTop}>Back to Top</div> 
}      </div>
    );
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isError && <h2>Error...</h2>}
    </>
  );
};
export default TopSubreddits;

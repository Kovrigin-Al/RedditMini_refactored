import React from "react";
import { subredditsAPI } from "../store/subreddits/subredditsAPI";
import LoadingSpinner from "./ui/LoadingSpinner";

type Props = {};

const TopSubreddits = (props: Props) => {
  const {
    isLoading,
    isError,
    data: subreddits,
  } = subredditsAPI.useGetSubredditsQuery({ limit: 10 });
  const handleClick = (url: string) => {
    alert('this feature is developing')
  }

  if (subreddits?.length) {
    return (
      <div className="flex-col divide-y-2 ring-slate-200/10 shadow-sm bg-white rounded-md">
        <div className="flex items-center justify-around h-12">
          <p className="font-semibold">Top-10 subreddits</p>
        </div>
        {subreddits.map((subreddit) => (
          <div key={subreddit.id} className="flex h-10 w-full flex-nowrap items-center hover:bg-gray-50 cursor-pointer" onClick={()=>handleClick(subreddit.url)}>
            <img
              src={subreddit.icon_img || require("../assets/img/logo.png")}
              alt="icon"
              height="30px"
              width="30px"
              className="rounded-full mx-3"
            />
            <p className="">{subreddit.display_name}</p>
          </div>
        ))}
      </div>
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

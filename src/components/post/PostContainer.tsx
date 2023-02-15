import { forwardRef } from "react";
import { IPost } from "../../types/posts";
import ContentPost from "./ContentPost";
import FooterPost from "./FooterPost";
import HeaderPost from "./HeaderPost";
import VoterPost from "./VoterPost";

type Props = {
  post: IPost;
};

const PostContainer = forwardRef<HTMLDivElement, Props>(({ post }, ref) => {

  return (
    <div
      ref={ref ? ref : null}
      className="container ring-1 relative  sm:rounded-md lg:container mx-auto bg-white mb-3 pb-1 ring-slate-200/10 shadow-sm  hover:ring-slate-400"
    >
      {/* left voter block */}
      <VoterPost votes={post.ups} className="absolute h-full hidden sm:rounded-l-md w-10 bg-slate-100 left-0 sm:flex flex-col items-center justify-top py-2" />

      {/* main block */}
      <div className="pl-0 sm:pl-10">
          <HeaderPost post={post} className="w-full h-auto bg-white cursor-default sm:rounded-tr-md" />
          <ContentPost post={post} className='w-full '/>
          <FooterPost post={post} className="w-full h-10 bg-white flex justify-start items-center" />
      </div>
    </div>
  );
});

export default PostContainer;

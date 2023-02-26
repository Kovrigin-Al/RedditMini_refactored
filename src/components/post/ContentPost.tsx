import { FC, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import useOnScreen from "../../hooks/useOnScreen";
import { IPost, Resolution } from "../../types/posts";
import { combineClasses } from "../../utils/combineClasses";

type Props = {
  post: IPost;
  className: string;
};

const findResolution = (resolutions: Resolution[]) => {
  // 3 - is equal to 640*640. If it's undefined the smaller is used
  const resolution = resolutions[3] || resolutions[resolutions.length - 1];
  return resolution.url.replaceAll("&amp;", "&");
};

const ContentPost: FC<Props> = ({ post, className }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isOnScreen = useOnScreen(ref, [0.9]);

  if (post.post_hint?.includes(":video")) {
    const url =
      post.post_hint === "hosted:video"
        ? post.media.reddit_video.hls_url
        : post.url;
    return (
      <div className="flex justify-center">
        <div
          ref={ref}
          className={combineClasses(
            className,
            "max-h-[600px] h-auto min-h-[400px] relative"
          )}
        >
          <ReactPlayer
            url={url}
            width="100%"
            className="max-h-[600px] "
            height="100%"
            controls={true}
            playing={isOnScreen}
            muted={true}
          />
        </div>
      </div>
    );
  }

  if (post.post_hint === "image") {
    return (
      <div className={combineClasses(className, "flex justify-center")}>
        <div className="max-h-[80vh] justify-center object-cover flex">
        <img
          src={findResolution(post.preview.images[0].resolutions)}
          alt="post"
          className="max-w-full max-h-full"
          />
          </div>
      </div>
    );
  }

  if (post.post_hint === "link") {
    return (
      <div
        className={combineClasses(
          className,
          "flex sm:h-32 h-auto justify-between overflow-hidden px-5"
        )}
      >
        <div className="h-20">
          {post.title}
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            className="block w-40 truncate underline text-xs text-sky-600"
          >
            {post.url}
          </a>
        </div>
        <a
          href={post.url}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex w-fit h-32 shrink-0"
        >
          <img
            src={findResolution(post.preview.images[0].resolutions)}
            alt="post"
          />
        </a>
      </div>
    );
  }

  return (
    <div className={combineClasses(className, "h-auto px-5")}>{post.title}</div>
  );
};
export default ContentPost;

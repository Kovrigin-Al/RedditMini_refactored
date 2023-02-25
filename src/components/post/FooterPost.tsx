import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { FC, useCallback, useState } from "react";
import { useAppDispatch } from "../../store/store";
import { notifyError, notifySuccess } from "../../store/toastSlice";
import { IPost } from "../../types/posts";
import { bigNumsFormatter } from "../../utils/bigNumFormatter";
import ModalPost from "./ModalPost";
import DropdDown from "../ui/DropdDown";
import VoterPost from "./VoterPost";

type Props = {
  className: string;
  post: IPost;
};

const FooterPost: FC<Props> = ({ post, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal() {
    setIsModalOpen(true);
  }

  const dispatch = useAppDispatch();

  const HandleCopyButtonClick = useCallback(
    (link: string) => {
      const id = Date.now();

      navigator.clipboard.writeText(link).then(
        () => {
          dispatch(notifySuccess({ message: "Copied link!", id }));
        },
        () => {
          dispatch(notifyError({ message: "Something went wrong", id }));
        }
      );
    },
    [dispatch]
  );
  return (
    <div className={className}>
      <VoterPost
        votes={post.ups}
        className="sm:hidden flex h-full justify-between w-20 items-center mx-4"
      />

      <div
        onClick={openModal}
        className="inline-flex justify-center items-center rounded-sm px-2 sm:px-4 py-2 text-base text-slate-600 hover:bg-gray-50 hover:cursor-pointer w-fit"
      >
        <ChatBubbleBottomCenterIcon className="h-5 w-5 mx-1 mt-1" />
        <div>{bigNumsFormatter(post.num_comments) + " Comments"}</div>
      </div>

      <div>
        <DropdDown
          buttonName="Share"
          optionsList={[
            {
              name: "Copy Link",
              callback: () =>
                HandleCopyButtonClick(
                  "https://www.reddit.com/" + post.permalink
                ),
            },
          ]}
        />
      </div>
      
      {isModalOpen && (
        <ModalPost
          post={post}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default FooterPost;

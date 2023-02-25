import { Transition, Dialog } from "@headlessui/react";
import { BookOpenIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, FC } from "react";
import { IPost } from "../../types/posts";
import CommentList from "../comments/CommentList";
import ContentPost from "./ContentPost";
import HeaderPost from "./HeaderPost";
import VoterPost from "./VoterPost";

type Props = {
  post: IPost;
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
};

const ModalPost: FC<Props> = ({ post, isModalOpen, setIsModalOpen }) => {
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto sm:px-10">
            <div className=" min-h-full flex justify-center mx-auto text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" h-screen transform w-full max-w-4xl  overflow-y-auto relative bg-slate-200 text-left shadow-xl transition-all">
                  <div className="sticky justify-between items-center px-3 flex top-0 w-full bg-black h-12 z-30 text-slate-200">
                    <div className="flex flex-nowrap items-center justify-start  shrink max-w-[90%]">
                      <BookOpenIcon className="h-5 w-5 mx-2 shrink-0" />
                      <div className="text-ellipsis whitespace-nowrap overflow-hidden">
                        {post.title}
                      </div>
                    </div>
                    <div
                      className="flex flex-nowrap items-center justify-start cursor-pointer hover:text-slate-300"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-5 h-5 flex flex-nowrap items-center justify-start" />
                      <div className="hidden sm:block">Close</div>
                    </div>
                  </div>

                  <div className="container ring-1 mt-3 sm:mx-5 relative w-full sm:w-auto max-w-4xl sm:rounded-md mx-auto bg-white mb-3 pb-1 ring-slate-200/10 shadow-sm ">
                    {/* left voter block */}
                    <VoterPost
                      votes={post.ups}
                      className="absolute h-full hidden sm:rounded-l-md w-10 bg-slate-100 left-0 sm:flex flex-col items-center justify-top py-2"
                    />

                    {/* main block */}
                    <div className="pl-0 sm:pl-10">
                      <HeaderPost
                        post={post}
                        className="w-full h-auto bg-white cursor-default sm:rounded-tr-md"
                      />
                      <ContentPost post={post} className="w-full " />
                    </div>
                  </div>
                  <div className="bg-slate-600 rounded-full h-[2px] my-3"></div>
                  <div className="sm:px-5">
                    <CommentList postId={post.id} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalPost;

import {
  QuestionMarkCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { FC, useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { removeOne } from "../../store/toastSlice";
import { NotificationType } from "../../types/toast";

type Props = {
  message: string;
  type: NotificationType;
  id: number;
};
export const Toast: FC<Props> = ({ message, type, id }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeOne({ id }));
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, id]);

  const handleClick = () => {
    dispatch(removeOne({ id }));
  };

  if (type === NotificationType.Success) {
    return (
      <div
        className={`flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2 hover:cursor-pointer`}
        onClick={handleClick}
      >
        <CheckCircleIcon className="h-8 w-8 text-green-500 rounded-full bg-white mr-3" />
        <div className="text-white max-w-xs ">{message}</div>
      </div>
    );
  }

  if (type === NotificationType.Info) {
    return (
      <div
        className="flex items-center bg-blue-400 border-l-4 border-blue-700 py-2 px-3 shadow-md mb-2 hover:cursor-pointer"
        onClick={handleClick}
      >
        <QuestionMarkCircleIcon className="h-8 w-8 text-blue-500 rounded-full bg-white mr-3" />
        <div className="text-white max-w-xs ">{message}</div>
      </div>
    );
  }

  if (type === NotificationType.Warning) {
    return (
      <div
        className="flex items-center bg-orange-400 border-l-4 border-orange-700 py-2 px-3 shadow-md mb-2 hover:cursor-pointer"
        onClick={handleClick}
      >
        <ExclamationCircleIcon className="h-8 w-8 text-orange-500 rounded-full bg-white mr-3" />
        <div className="text-white max-w-xs ">{message}</div>
      </div>
    );
  }

  return (
    <div
      className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2 hover:cursor-pointer"
      onClick={handleClick}
    >
      <XCircleIcon className="h-8 w-8 text-red-500 rounded-full bg-white mr-3" />
      <div className="text-white max-w-xs ">{message}</div>
    </div>
  );


};

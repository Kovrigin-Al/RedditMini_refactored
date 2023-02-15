import {
  QuestionMarkCircleIcon,
  XCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { FC, useCallback, useEffect } from "react";
import { useAppDispatch } from "../../../store/store";
import { removeOne } from "../../../store/toastSlice";
import { NotificationType } from "../../../types/toast";

type Props = {
  message: string;
  type: NotificationType;
  id: string;
};
export const Toast: FC<Props> = ({ message, type, id }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeOne({ id }));
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, id]);

  console.log('toast')
  const handleClick = () => {
    dispatch(removeOne({ id }));
  };
  let color = '';
  let icon = (<></>);
  const iconClassName = useCallback((color: string) =>
    `h-8 w-8 text-${color}-500 rounded-full bg-white mr-3`, [])
  const toastClassName = useCallback((color: string) =>
  `flex items-center bg-${color}-500 border-l-4 border-${color}-700 py-2 px-3 shadow-md mb-2`, [])

  switch (type) {
    case NotificationType.Success:
      color = "green";
      icon = <CheckCircleIcon className={iconClassName(color)} />;
      break;
    case NotificationType.Info:
      color = "blue";
      icon = <CheckCircleIcon className={iconClassName(color)} />;
      break;
    case NotificationType.Warning:
      color = "orange";
      icon = <CheckCircleIcon className={iconClassName(color)} />;
      break;
    case NotificationType.Error:
      color = "red";
      icon = <XCircleIcon className={iconClassName(color)} />;
      break;

    default:
      break;
  }

  return (
    <div
      className={toastClassName(color)}
      onClick={handleClick}
    >
        {icon}
      <div className="text-white max-w-xs ">{message}</div>
    </div>
)

//   if (type === NotificationType.Success) {
//     return (
//       <div
//         className={`flex items-center bg-green-500 border-l-4 border-green-700 py-2 px-3 shadow-md mb-2`}
//         onClick={handleClick}
//       >
//         <CheckCircleIcon className="h-8 w-8 text-green-500 rounded-full bg-white mr-3" />
//         <div className="text-white max-w-xs ">{message}</div>
//       </div>
//     );
//   }

//   if (type === NotificationType.Info) {
//     return (
//       <div
//         className="flex items-center bg-blue-400 border-l-4 border-blue-700 py-2 px-3 shadow-md mb-2"
//         onClick={handleClick}
//       >
//         <QuestionMarkCircleIcon className="h-8 w-8 text-blue-500 rounded-full bg-white mr-3" />
//         <div className="text-white max-w-xs ">{message}</div>
//       </div>
//     );
//   }

//   if (type === NotificationType.Warning) {
//     return (
//       <div
//         className="flex items-center bg-orange-400 border-l-4 border-orange-700 py-2 px-3 shadow-md mb-2"
//         onClick={handleClick}
//       >
//         <ExclamationCircleIcon className="h-8 w-8 text-orange-500 rounded-full bg-white mr-3" />
//         <div className="text-white max-w-xs ">{message}</div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="flex items-center bg-red-500 border-l-4 border-red-700 py-2 px-3 shadow-md mb-2"
//       onClick={handleClick}
//     >
//       <XCircleIcon className="h-8 w-8 text-red-500 rounded-full bg-white mr-3" />
//       <div className="text-white max-w-xs ">{message}</div>
//     </div>
//   );


};

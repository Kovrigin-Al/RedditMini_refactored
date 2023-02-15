import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import React, { FC, useState } from "react";
import { bigNumsFormatter } from "../../utils/bigNumFormatter";
import { combineClasses } from "../../utils/combineClasses";

type Props = {
  className: string;
  votes: number
};

enum IVoteType {
  up = "up",
  down = "down",
}

const VoterPost: FC<Props> = ({ className, votes }) => {
  const [vote, setVote] = useState<IVoteType | "">("");
  const handleClick = (type: IVoteType) => {
    setVote((prev) => (prev === type ? "" : type));
  };

  return (
    <div className={className}>
      <HandThumbUpIcon
        onClick={() => handleClick(IVoteType.up)}
        className={combineClasses(
          "h-5 w-5 cursor-pointer",
          vote === IVoteType.up
            ? "text-green-400 hover:text-green-600"
            : "text-slate-400 hover:text-slate-600"
        )}
      />
      <div className="font-medium text-sm">{bigNumsFormatter(votes)}</div>
      <HandThumbDownIcon
        onClick={() => handleClick(IVoteType.down)}
        className={combineClasses(
            "h-5 w-5 cursor-pointer",
            vote === IVoteType.down
              ? "text-red-400 hover:text-red-600"
              : "text-slate-400 hover:text-slate-600"
          )}      />
    </div>
  );
};

export default VoterPost;

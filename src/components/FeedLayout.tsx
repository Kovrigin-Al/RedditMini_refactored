import React, { FC } from "react";

type Props = {
  children: [React.ReactNode, React.ReactNode];
};

const FeedLayout: FC<Props> = ({ children }) => {
  return (
    <div className="grid gap-5 grid-cols-1 lg:grid-cols-10 sm:px-5">
      <div className="lg:col-span-8">{children[0]}</div>
      <div className="lg:col-span-2 hidden lg:block">{children[1]}</div>
    </div>
  );
};

export default FeedLayout;

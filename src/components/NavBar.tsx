import { FC } from "react";
import SearchBar from "./SearchBar";

type Props = {};

const NavBar: FC = (props: Props) => {
  const scrollTop = () => {
    document.body.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="relative h-12 mb-5 z-10">
      <div className="bg-white drop-shadow-md fixed inset-x-0 h-12 px-5 w-full flex justify-between items-center">
        <div
          className="flex h-full p-2 items-center hover:cursor-pointer"
          onClick={scrollTop}
        >
          <img
            src={require("../assets/img/logo.png")}
            className="rounded-full h-full mx-2"
            alt="logo"
          />
          <div className="text-sky-600 hidden sm:block w-32 m-2">
            RedditMini
          </div>
        </div>
        <SearchBar className=" " />
      </div>
    </nav>
  );
};

export default NavBar;

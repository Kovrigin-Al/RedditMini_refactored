import React, { FC, useEffect, useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setSearchRequest } from "../store/posts/postsSlice";
import useDebounceCallback from "../hooks/useDebounceCallback";
type Props = {
  className: string;
};

const SearchBar: FC<Props> = ({ className }) => {
  const searchRequest = useAppSelector((state) => state.posts.searchRequest);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(searchRequest);
  const debouncedDispatch = useDebounceCallback(dispatch, 800);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedDispatch(setSearchRequest(e.target.value));
  };

  const handleClearSearch = () => {
    setValue('')
    dispatch(setSearchRequest(''))
  }

  useEffect(() => {
    setValue(searchRequest);
  }, [searchRequest]);

  return (
    <div className="relative mx-5 flex items-center text-gray-400 focus-within:text-gray-600 w-full max-w-md">
      <MagnifyingGlassIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
      <input
        type="text"
        id="search"
        className="py-2 w-full pl-10 max-w-md h-auto rounded-full border-none ring-1 focus:ring-1  ring-slate-200/10 shadow-sm pr-3 hover:ring-slate-300"
        placeholder="Search Reddit..."
        autoComplete="off"
        value={value}
        onChange={handleChange}
      />
      {value && <XMarkIcon className="h-7 w-7 p-1 absolute right-2 hover:text-sky-600 cursor-pointer rounded-full  hover:bg-sky-200" onClick={handleClearSearch}/>}
    </div>
  );
};

export default SearchBar;

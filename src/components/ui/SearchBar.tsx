import React, { FC, useState } from "react";
import {MagnifyingGlassIcon} from '@heroicons/react/24/outline'

type Props = {
  className: string;
};

const SearchBar: FC<Props> = ({ className }) => {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
      <div className="relative mx-5 flex items-center text-gray-400 focus-within:text-gray-600 w-full max-w-md">

    <MagnifyingGlassIcon className="w-5 h-5 absolute ml-3 pointer-events-none" />
      <input
        type="text"
        id="search"
        className='py-2 w-full pl-10 max-w-md h-auto rounded-full border-none ring-1 focus:ring-1  ring-slate-200/10 shadow-sm pr-3 hover:ring-slate-300'
        placeholder="Search Reddit..."
        autoComplete="off"
        value={search}
        onChange={handleChange}
        />
      </div>
  );
};

export default SearchBar;

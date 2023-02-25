import { FC, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";import { combineClasses } from "../../utils/combineClasses";
import { ShareIcon } from "@heroicons/react/24/outline";

interface MenuItem {
  name: string;
  callback: () => void;
}

type Props = {
  buttonName: string;
  optionsList: MenuItem[];
};
const DropdDown: FC<Props> = ({ buttonName, optionsList }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-sm px-2 sm:px-4 py-2 text-base text-slate-600 hover:bg-gray-50 ">
          <ShareIcon className="mr-1 my-auto h-5 w-5" aria-hidden="true" />
          {buttonName}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {optionsList.map((item) => (
              <Menu.Item 
              key={item.name}
              >
                {({ active }) => (
                  <div
                    className={combineClasses(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm hover:cursor-pointer"
                    )}
                    onClick={item.callback}
                  >
                    {item.name}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default DropdDown;

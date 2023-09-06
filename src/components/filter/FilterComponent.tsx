import { Dispatch, Fragment, SetStateAction } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FilterValues } from "../navigation-filter/NavigationFilter";

function classNames(...classes: string[]) {
  const temp = classes.filter(Boolean).join(" ");
  return temp;
}


const styleSelected = " bg-gray-100 text-gray-900 block px-4 py-2 text-sm";
export default function FilterComponent({
  title = "Title Menu",
  menuItems = ["Menu Item 1", "Menu Item 2"],
  type,
  value,
  setFilterValues,
}: PropsFilterComponent) {

 
  const onChangeFilterHandler = (item: string) =>{
    setFilterValues((prev)=>{
        return {
            ...prev,[type]:item
        }
    })
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex min-w-[80px] max-w-full justify-between gap-x-1.5 bg-white  py-2 text-sm font-semibold text-gray-900  border-b-2 border-gray-300 hover:bg-gray-50">
          {value ? value : title}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
          <div className="py-1">
            {menuItems.map((item, i) => {
              const isSelected = value === item;
              return (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <span
                      onClick={() => onChangeFilterHandler(item)}
                      className={
                        isSelected
                          ? styleSelected
                          : classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )
                      }
                    >
                      {item}
                    </span>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

interface PropsFilterComponent {
  title: string;
  menuItems: string[];
  value: string;
  type:string
  setFilterValues: Dispatch<SetStateAction<FilterValues>>;
}

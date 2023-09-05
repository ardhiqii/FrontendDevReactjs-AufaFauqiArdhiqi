import React, { Dispatch, SetStateAction } from "react";
import { FilterValues } from "../navigation-filter/NavigationFilter";

const styleRadio = "w-4 h-4 rounded-full ";
const styleRadioChecked = "bg-green-400";
const styleRadioUnchecked = "ring-2 ring-inset ring-gray-400";

const RadioComponent = ({ setFilterValues,checked }: PropsRadioComponents) => {
  const changeRadioHandler = (value:boolean) => {
    setFilterValues((prev) => ({ ...prev, open: value }));
  };

  return (
    <div
      className="flex items-center gap-x-2 cursor-pointer border-b-2 border-gray-300 py-2 hover:bg-gray-50"
      onClick={()=>changeRadioHandler(!checked)}
    >
      <div
        className={
          checked
            ? styleRadio + styleRadioChecked
            : styleRadio + styleRadioUnchecked
        }
      ></div>
      <span className="text-sm font-semibold select-none ">Open Now</span>
    </div>
  );
};

export default RadioComponent;

interface PropsRadioComponents {
  setFilterValues: Dispatch<SetStateAction<FilterValues>>;
  checked: boolean
}

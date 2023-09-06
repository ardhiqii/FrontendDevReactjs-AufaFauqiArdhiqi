import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterValues } from "../navigation-filter/NavigationFilter";

function classNames(...classes: string[]) {
  const temp = classes.filter(Boolean).join(" ");
  return temp;
}
const ButtonFilter = ({
  currentFilterValues,
  setFilterValues,
}: PropsButtonFilter) => {
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const { category, open, price } = currentFilterValues;
    const similar =
      category == "Categories" && open == false && price == "Price";
    setIsDisabled(similar);
  }, [currentFilterValues]);

  const resetFilterHandler = () => {
    setFilterValues((prev)=>({...prev,reset:true}));
  };
  return (
    <div
      onClick={resetFilterHandler}
      className={classNames(
        isDisabled
          ? "text-gray-300 cursor-default"
          : "text-black border-black cursor-pointer bg-gray-300 hover:bg-gray-400 ",
        "px-5 py-2 border-2 text-sm font-semibold"
      )}
    >
      CANCEL ALL
    </div>
  );
};

export default ButtonFilter;

interface PropsButtonFilter {
  currentFilterValues: FilterValues;
  setFilterValues: Dispatch<SetStateAction<FilterValues>>;
}

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FilterValues } from "../navigation-filter/NavigationFilter";
import lodash from "lodash";

const emptyFilterValues: FilterValues = {
  category: "Categories",
  open: false,
  price: "Price",
};

function classNames(...classes: string[]) {
  const temp = classes.filter(Boolean).join(" ");
  return temp;
}
const ButtonFilter = ({ currentFilterValues,setFilterValues }: PropsButtonFilter) => {
  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    const similar = lodash.isEqual(currentFilterValues, emptyFilterValues);
    setIsDisabled(similar);
  }, [currentFilterValues]);
  return (
    <div
    onClick={()=>setFilterValues(emptyFilterValues)}
      className={classNames(
        isDisabled
          ? "text-gray-300 cursor-default"
          : "text-black border-black cursor-pointer hover:bg-gray-100 ",
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

import React, { Dispatch, SetStateAction } from "react";
import FilterComponent from "../filter/FilterComponent";
import RadioComponent from "../filter/RadioComponent";
import ButtonFilter from "../button/ButtonFilter";

const categories = [
  "Italia",
  "Sop",
  "Modern",
  "Bali",
  "Jawa",
  "Spanyol",
  "Sunda",
];
const prices = ["<= 400$", "> 400$"];
function NavigationFilter({
  filterValues,
  setFilterValues,
}: PropsNavigationFilter) {
  return (
    <div className="flex border-y-2 py-2 w-full items-center justify-between px-5 ">
      <div className="flex items-center gap-x-5">
        <p>Filter By:</p>
        <RadioComponent
          setFilterValues={setFilterValues}
          checked={filterValues.open}
        />
        <FilterComponent
          title="Price"
          menuItems={prices}
          type="price"
          value={filterValues.price}
          setFilterValues={setFilterValues}
        />
        <FilterComponent
          title="Categories"
          menuItems={categories}
          type="category"
          value={filterValues.category}
          setFilterValues={setFilterValues}
        />
      </div>
      <ButtonFilter
        currentFilterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </div>
  );
}

export default NavigationFilter;

export interface FilterValues {
  open: boolean;
  price: string;
  category: string;
  reset: boolean;
}

interface PropsNavigationFilter {
  filterValues: FilterValues;
  setFilterValues: Dispatch<SetStateAction<FilterValues>>;
}

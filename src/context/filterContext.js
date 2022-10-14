import React, { createContext, useState } from "react";

const FilterContext = createContext({
  filter: "",
  setFilter: () => {},
});

export const FilterProvider = (props) => {
  const [filter, setFilter] = useState("");

  const contextValue = {
    filter: filter,
    setFilter: setFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
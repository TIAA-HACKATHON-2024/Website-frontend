// components/MultiSelectDropdown.js
import React from "react";
import Select from "react-select";
import tickers from "../data/tickers.json";

const options = Object.entries(tickers).map(([value, label]) => ({
  value,
  label,
}));

const MultiSelectDropdown = ({ selectedOptions, setSelectedOptions }) => {
  const handleChange = (selected) => {
    const selectedValues = selected
      ? selected.map((option) => option.value)
      : [];
    setSelectedOptions(selectedValues); // Set only the values of selected options
  };

  return (
    <Select
      isMulti
      name="excludedTickers"
      options={options}
      className="basic-multi-select text-black"
      classNamePrefix="select"
      value={options.filter((option) => selectedOptions.includes(option.value))}
      onChange={handleChange}
    />
  );
};

export default MultiSelectDropdown;

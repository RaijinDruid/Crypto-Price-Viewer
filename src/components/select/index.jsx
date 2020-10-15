import React, { useContext, useEffect } from "react";
import Select from "react-select";
import { ThemeContext } from "styled-components";

const CustomSelect = ({ options }) => {
  useEffect(() => {}, [options]);
  const myTheme = useContext(ThemeContext);
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: myTheme.colors.lightGrey,
    }),
    control: (provided) => ({
      ...provided,
      color: myTheme.colors.lightGrey2,
      marginBottom: 10,
    }),
  };
  return (
    <Select
      options={options}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: myTheme.colors.dark1,
          primary: myTheme.colors.secondary,
          primary50: myTheme.colors.dark1,
          neutral0: myTheme.colors.dark3,
          neutral30: myTheme.colors.lightest,
          neutral20: myTheme.colors.lightGrey2,
          neutral40: myTheme.colors.lightGrey2,
          neutral60: myTheme.colors.lightGrey2,
          neutral50: myTheme.colors.lightest,
          neutral90: myTheme.colors.lightest,
          neutral80: myTheme.colors.lightest,
        },
      })}
      defaultOption={options[0]}
      styles={customStyles}
      placeholder={"Select a model"}
      isSearchable={true}
      isClearable={true}
    />
  );
};

export default CustomSelect;

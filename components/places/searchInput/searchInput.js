import { AutoComplete } from "antd";
import React, { useState } from "react";
import { Radio, Select } from "antd";

const SearchInput = (props) => {
  let { placeNameData, placeCategoryData, placesData } = props;
  const [mode, setMode] = useState("placeName");
  const [textContent, setTextContent] = useState("place name");
  // set autoComplete data source
  // remove repeat value------------------------
  placeNameData = unique(placeNameData);
  let placeNameList = placeNameData.map((ele) => {
    return { value: ele };
  });

  // remove repeat value------------------------
  placeCategoryData = unique(placeCategoryData);
  let placeCategoryList = placeCategoryData.map((ele) => {
    return { value: ele };
  });

  function unique(arr) {
    return Array.from(new Set(arr));
  }

  const [autoCompleteDataSource, setAutoCompleteDataSource] =
    useState(placeNameList);

  const handleModeChange = (e) => {
    setMode(e.target.value);
    setAutoCompleteDataSource(e.target.data);
    setTextContent(e.target.textContent);
  };

  // search in different situations
  const searchHandler = (value) => {
    if (mode === "placeName") {
      const results = placesData.filter((ele) => ele.name === value);
      props.clickHandler(results);
    } else if (mode === "placeCategory") {
      const results = placesData.filter((ele) => ele.category === value);
      props.clickHandler(results);
    }
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <AutoComplete
        style={{
          width: 200,
        }}
        options={autoCompleteDataSource}
        placeholder={`search by  ${textContent}`}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onSelect={searchHandler}
      />
      <div style={{minWidth:'15rem'}}>
        <Radio.Group value={mode} onChange={handleModeChange}>
          <Radio.Button
            value="placeName"
            data={placeNameList}
            textContent="place name"
          >
            place name
          </Radio.Button>
          <Radio.Button
            value="placeCategory"
            data={placeCategoryList}
            textContent="place category"
          >
            place category
          </Radio.Button>
        </Radio.Group>
      </div>
    </div>
  );
};

export default SearchInput;

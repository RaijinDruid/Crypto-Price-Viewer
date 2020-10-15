import React from "react";
import styled from "styled-components";

const Slider = ({ data, setData }) => {
  return (
    <StyledSlider>
      <input type='range' min='1' max='100' defaultValue={data} className='slider' onInput={(e) => setData(e.target.value)} />
      <p className='value'>
        <span className='label'>AI Confidence:</span> {data}
      </p>
    </StyledSlider>
  );
};

const StyledSlider = styled.div`
  width: 250px;
  .value {
    font-weight: bold;
  }
  .slider {
    -webkit-appearance: none;
    width: 100%;
    height: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.lightGrey2};
    outline: none;
    -webkit-transition: 0.2s;
    transition: background-color 0.2s;
    margin: 15px 0px;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.lightest};
      cursor: pointer;
    }
    &::-moz-range-thumb {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      background-color: ${(props) => props.theme.colors.lightest};
      cursor: pointer;
    }
  }
  .label {
    color: ${(props) => props.theme.colors.lightGrey2};
    font-weight: normal;
    margin-right: 5px;
  }
`;
export default Slider;

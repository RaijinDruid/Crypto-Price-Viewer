import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SymbolSearch = (props) => {
  const [search, setSearch] = useState("");
  const [symbols, setSymbols] = useState(props.symbols);
  const { currentSymbol } = props;

  useEffect(() => {
    setSymbols(props.symbols);
  }, [props.symbols]);

  return (
    <StyledSymbolSearch>
      <h5>Symbols</h5>
      <div className='search'>
        <FontAwesomeIcon icon={faSearch} />
        <input onChange={(e) => setSearch(e.target.value)}></input>
      </div>

      <div className='list'>
        {symbols &&
          symbols
            .filter((symbol) => symbol.toLowerCase().includes(search.toLowerCase()) && symbol !== currentSymbol)
            .map((filteredSymbol, index) => {
              return (
                <a className='symbol' onClick={() => props.setSymbol(filteredSymbol)} key={`${filteredSymbol}--${index}`}>
                  {filteredSymbol}
                </a>
              );
            })}
        {symbols && symbols.length === 0 && <p>Loading symbols...</p>}
      </div>
    </StyledSymbolSearch>
  );
};

const StyledSymbolSearch = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0px 15px;
  width: 100px;
  background-color: ${(props) => props.theme.colors.dark1};
  h5 {
    margin: 10px 0px;
    color: ${(props) => props.theme.colors.lightest};
    text-align: center;
  }
  .search {
    position: relative;
    svg {
      position: absolute;
      top: 5px;
      left: 0;
      color: ${(props) => props.theme.colors.lightGrey2};
    }
  }
  input {
    width: calc(100% - 20px);
    background: transparent;
    margin-bottom: 20px;
    border: none;
    border-bottom: solid 1px rgba(255, 255, 255, 0.3);
    border-radius: 3px;
    padding: 5px 10px 5px 20px;
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.colors.lightest};
    &:focus {
      outline: none;
      border-color: ${(props) => props.theme.colors.secondary};
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 9px;
    }
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background-color: darkgrey;
    }
  }
  .symbol {
    margin-bottom: 5px;
    font-size: 12px;
    padding: 5px 10px;
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.colors.dark3};
      color: ${(props) => props.theme.colors.secondary};
    }
  }

  @media ${(props) => props.theme.device.largeDesktop} {
    width: 180px;
    .symbol {
      font-size: 14px;
    }
  }
`;
export default SymbolSearch;

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useComponentVisible from "../../hooks/outsideClick";

const Dropdown = (props) => {
  let { defaultOption, list, click, currentActive } = props;
  const hasDropdown = list && list.length > 1;
  const { ref, isComponentVisible } = useComponentVisible(false);

  return (
    <StyledDropdown ref={hasDropdown ? ref : null}>
      <div className={isComponentVisible || list.includes(currentActive) ? "item active" : "item"} onClick={!hasDropdown ? () => click(defaultOption) : null}>
        <a>{list.includes(currentActive) ? currentActive : defaultOption}</a>
        {hasDropdown && <FontAwesomeIcon icon={faChevronDown} />}
      </div>
      {isComponentVisible && (
        <div className='dropdown'>
          {list.map((link, index) => (
            <a
              onClick={(e) => {
                click(link);
              }}
              key={`${index}-${link}`}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </StyledDropdown>
  );
};

const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  a {
    color: ${(props) => props.theme.colors.lightGrey};
    &:hover {
      color: ${(props) => props.theme.colors.secondary};
      cursor: pointer;
    }
  }
  .dropdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${(props) => props.theme.colors.dark3};
    position: absolute;
    z-index: 10;
    top: 40px;
    width: 100%;
    a {
      padding: 5px 10px;
    }
  }
  .item {
    padding: 5px 10px;
    margin-right: 3px;
    display: inline-flex;
    align-items: center;
    a {
      margin-right: 5px;
      &:hover {
        color: ${(props) => props.theme.colors.lightGrey};
      }
    }
    &:hover {
      background-color: ${(props) => props.theme.colors.dark3};
      border-radius: 3px;
      cursor: pointer;
    }
    &.active {
      a:hover {
        color: ${(props) => props.theme.colors.lightGrey};
      }
      background-color: ${(props) => props.theme.colors.dark3};
    }
    svg {
      color: ${(props) => props.theme.colors.lightest};
      font-size: 10px;
    }
  }
  .active {
    font-weight: bold;
    color: ${(props) => props.theme.colors.lightest};
  }
`;

export default Dropdown;

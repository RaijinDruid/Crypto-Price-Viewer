import React from "react";
import styled from "styled-components";

const Button = ({ text, primary }) => <StyledButton className={!primary ? "secondary" : ""}>{text && <a>{text}</a>}</StyledButton>;

const StyledButton = styled.button`
  min-width: 120px;
  padding: 8px 30px;
  background-color: ${(props) => props.theme.colors.primary};
  text-transform: uppercase;
  border: solid 1px ${(props) => props.theme.colors.primay};
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
  font-family ${(props) => props.theme.fonts.body};
  &.secondary {
    border-color: ${(props) => props.theme.colors.lightGrey};
    background: transparent;
    text-transform: capitalize;
    a {
      color: ${(props) => props.theme.colors.lightGrey};
    }
    &:hover {
      border-color: ${(props) => props.theme.colors.lightest};
      a {
        color: ${(props) => props.theme.colors.lightest};
      }
    }
  }
  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }
  &:focus {
    box-shadow: inset 0 0 100px 100px rgba(0, 0, 0, 0.03);
  }
`;

export default Button;

import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt, faChartBar, faCogs, faBrain, faChartPie, faUser } from "@fortawesome/free-solid-svg-icons";

const SidebarIcon = (props) => {
  let { icon, caption, size, click } = props;
  return (
    icon && (
      <div className={"icon " + (size ? size : "")} onClick={click ? () => click() : null}>
        <FontAwesomeIcon icon={icon} />
        {caption && <p className='caption'>{caption}</p>}
      </div>
    )
  );
};
export default (props) => {
  let { user, isLoggedIn, setIsLoggedIn } = props;
  const signIn = () => {
    setIsLoggedIn(true);
  };
  const signOut = () => {
    setIsLoggedIn(false);
  };
  return (
    <StyledSidebar>
      <div className='profile'>
        {isLoggedIn && user && (
          <>
            <div className='user'>
              <FontAwesomeIcon icon={faUser} className='user__icon' />
            </div>
            <p>{user.name}</p>
          </>
        )}
        {!isLoggedIn && <SidebarIcon icon={faSignInAlt} caption={"Sign In"} click={signIn} />}
      </div>
      {isLoggedIn && user && (
        <>
          <div>
            <SidebarIcon icon={faChartPie} caption={"Portfolio"} />
            <SidebarIcon icon={faChartBar} caption={"Charts"} />
            <SidebarIcon icon={faBrain} caption={"Models"} />
          </div>
          <div>
            <SidebarIcon icon={faCogs} caption={"Settings"} />
            <SidebarIcon icon={faSignOutAlt} caption={"Sign Out"} click={signOut} />
          </div>
        </>
      )}
    </StyledSidebar>
  );
};

const StyledSidebar = styled.div`
  width: 60px;
  height: calc(100vh - 60px);
  background-color: ${(props) => props.theme.colors.dark1};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 30px 10px;

  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    .logout {
      color: ${(props) => props.theme.colors.lightest};
      &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.colors.secondary};
      }
    }
  }
  .user {
    border-radius: 50%;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.light};
    margin-bottom: 10px;
    text-align: center;
    &__icon {
      font-size: 25px;
      color: ${(props) => props.theme.colors.dark1};
    }
  }
  .logo {
    color: ${(props) => props.theme.colors.lightest};
    text-transform: uppercase;
  }
  .icon {
    text-align: center;
    color: ${(props) => props.theme.colors.lightGrey2};
    font-size: 20px;
    margin-bottom: 35px;

    .caption {
      font-size: 14px;
      text-transform: capitalize;
    }
    p {
      color: ${(props) => props.theme.colors.lightGrey2};
    }
    &:hover > p,
    &:hover > svg {
      color: ${(props) => props.theme.colors.lightest};
      cursor: pointer;
    }
  }
  .permutable {
    font-size: 14px;
    color: ${(props) => props.theme.colors.primary};
  }

  @media ${(props) => props.theme.device.largeDesktop} {
    max-width: 100px;
    .icon{
      font-size: 24px;
      margin-bottom: 35px;
      &.small {
        font-size: 20px;
        .caption {
          font-size: 12px;
        }
    }
  }
`;

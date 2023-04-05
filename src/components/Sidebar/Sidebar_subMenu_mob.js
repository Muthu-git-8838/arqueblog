import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../styles/admin_pages.scss";
import Switch from "../Switch";
import Text from "../Text";

const SidebarLink = styled.div`
  display: flex;
  color: #dd7a48 !important;
  justify-content: space between;
  align-items: center;
  padding: 20px;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  list-style: none;
  margin: auto 30px;
  &:hover {
    background: #ce93d8;
    border-radius: 7px;
    width: 60%;
    border: none;
    cursor: pointer;
    color: #fff !important;
  }
`;

const SidebarLabel = styled.span`
  // margin-left: 16px;
  
`;

const DropdownLink = styled(Link)`
  height: 60px;
  padding-left: 3rem;
  display: flex;
  aligh-items: center;
  text-decoration: none;
  color: #dd7a48;
`;

const Sidebar_subMenu_mob = ({ item, onSidebarClick = () => {} }) => {
  const navigate = useNavigate();
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <SidebarLink
        onClick={() => {
          if (item.subNav) {
            showSubnav();
          } else {
            onSidebarClick();
            if (!item.path.startsWith("/#")) {
              navigate(item.path);
            }else{
              window.location.href=item.path;
            }
          }
        }}
      >
        <Box>
          
          <SidebarLabel className="useCallback(({isActive}) => isActive ? classes.active : classes.link)">
          {item.icons}
            <Typography  className="m-0" >{item.title}</Typography>
          </SidebarLabel>
        </Box>
        <Box>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </Box>
      </SidebarLink>
      {subnav &&
        item.subNav.map(
          (item,
          (index) => {
            return (
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            );
          })
        )}
    </>
  );
};

export default Sidebar_subMenu_mob;

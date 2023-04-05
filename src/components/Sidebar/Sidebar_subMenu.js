import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import "../../styles/admin_pages.scss";
import Text from "../Text";

const SidebarLink = styled.div`
  display: flex;
  color: #fff !important;
  justify-content: space between;
  align-items: center;
  height: 40px;
  text-decoration: none;
  font-size: 30px;
  list-style: none;
  margin: auto 70px;
  &:hover {
    background: #ce93d8;
    border-radius: 7px;
    width: 52%;
    border: none;
    cursor: pointer;
    color: #fff !important;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 10px;
  font-size: 80%;
`;

const DropdownLink = styled(Link)`
  height: 60px;
  padding-left: 3rem;
  display: flex;
  aligh-items: center;
  text-decoration: none;
  color: #000;
`;

const Sidebar_subMenu = ({ item, onMenuClick = () => { } }) => {
  const [subnav, setSubnav] = useState(false);
  const { t } = useTranslation();
  const showSubnav = () => setSubnav(!subnav);
  console.log('item--------', item)
  return (
    <>
    <Grid>
    <Typography fontSize={40} color={"#fff"} alignItems={"end"}> </Typography>

      <SidebarLink
        onClick={() => {
          if (item.subNav) showSubnav();
          onMenuClick(item);
        }}
        activeClassName="sidebar-active"
      >
          <SidebarLabel className="useCallback(({isActive}) => isActive ? classes.active : classes.link)">
            <Stack direction={"row"} spacing={2}>
          {item.icons}
            <SidebarLabel className='m-0'> {item.title}</SidebarLabel>
            </Stack>
          </SidebarLabel>
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
                <Box onClick={onMenuClick} key={index}>
                  {item.icon}
                  <SidebarLabel><Typography className='m-0'>{item.title}</Typography></SidebarLabel>
                </Box>
              );
            })
        )}
    </Grid>

    </>
  );
};

export default Sidebar_subMenu;

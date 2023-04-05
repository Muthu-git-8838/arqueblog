import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Sidebar_Data } from "./Sidebar_Data";
import SubMenu from "./Sidebar_subMenu";
import logo from "../../assets/blog.png";
// import "../../styles/sidebar.scss";
import { useTranslation } from "react-i18next";
import Image from "../Image";
import { Divider, Stack, Typography } from "@mui/material";

const Nav = styled.div`
  height: 1px;
  dislay: flex;
  justify-conten: flex-start;
  align-items: center;
  z-index: 9999 !important;
`;

const NavIcon = styled(Link)`
  margin-left: 3rem !important;
  font-size: 1.5rem;
  height: 80px;
  // margin-top: 10rem !important;
  display: none;
  justify-content: flex-start;
  align-items: center;
  color: #b36234;

  @media (max-width: 1045px) {
    display: flex;
    z-index: 45 !important;
  }

  &&:hover {
    color: #0bd0c6;
  }
`;

const SidebarNav = styled.nav`
  background: #0b1632;
  width: 280px;
  height: 100vh;
  display:flex;
  justify-centent:center;
  position:fixed;
  top:0;
  overflow-y: scroll;
  @media (max-width:1045px){
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition:350ms;
  z-index 10;
  width:100%;
  height: 100%;

  }

  `;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Admin_Sidebar = ({ onMenuClick = () => {} }) => {
  const [sidebar, setSidebar] = useState(false);
  const { t } = useTranslation();
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Nav>
        <NavIcon to="#">
        <FaIcons.FaBars onClick={showSidebar} />
        </NavIcon>
      </Nav>

      <SidebarNav sidebar={sidebar}>
        <SidebarWrap>
          {/* <Image src={'Logo.png'} className="my-4 mx-3" alt="" /> */}
          <NavIcon to="#">
          <AiIcons.AiOutlineClose
            className="menu-close"
            onClick={showSidebar}
          />
          <Typography
            fontSize={28}
            color={"#fff"}
            display={"flex"}
            justifyContent={"center"}
          >
            BLOG
          </Typography>
          <Divider sx={{ mt: 1.2 }} />
          {/* <Image src={logo} className="my-2 pb-5 mx-5" alt="" /> */}

          </NavIcon>
          {Sidebar_Data.map((item, index) => {
            return (
              <Stack sx={{ mt: 3 }}>
                <SubMenu
                  onMenuClick={() => {
                    onMenuClick(item);
                    setSidebar(false);
                  }}
                  item={item}
                  key={index}
                />
              </Stack>
            );
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Admin_Sidebar;

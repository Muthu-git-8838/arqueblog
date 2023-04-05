import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Sidebar_Data_mob } from "./Sidebar_Data_mob";
import SubMenu from "./Sidebar_subMenu_mob";
import logo from "../../images/Logo.png";
import "../../styles/sidebar.scss";
import { useTranslation } from "react-i18next";
import Switch from "../Switch";
import Image from "../Image";
import { Typography } from "@mui/material";

const Nav = styled.div`
  height: 80px;
  dislay: flex;
  justify-conten: flex-start;
  align-items: center;
  z-index: 9999;
`;

const NavIcon = styled(Link)`
  margin-left: 3rem !important;
  font-size: 1rem;
  height: 80px;
  // margin-top: 10rem !important;
  display: none;
  justify-content: flex-start;
  align-items: center;
  color: #b36234;
  z-index: 9999 !important;

  @media (max-width: 1107px) {
    display: flex;
  }

  &&:hover {
    color: #0bd0c6;
  }
`;

const SidebarNav = styled.nav`
  background: #0b1632;
  width: 350px;
  height: 100vh;
  display: flex;
  justify-centent: center;
  z-index: 9999 !important;
  position: fixed;
  top: 0;
  @media (max-width: 1107px) {
    left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
    transition: 350ms;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const { t } = useTranslation();
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Nav>
        <NavIcon to="#" className="side-index">
          <FaIcons.FaBars onClick={showSidebar} />
          {/* <img src={logo} className=" mob-sidebar-logo" alt="" /> */}
        </NavIcon>
      </Nav>
      <SidebarNav sidebar={sidebar} className="side-index">
        <SidebarWrap>
          <Image src={'Logo.png'} className="my-2 pb-5 mx-5" alt="" />

          <Box className="container al">
            <Box className="row align-items-center pe-5 justify-content-end">
              <Box className="d-flex justify-content-end">
                <NavIcon to="#" className="position-absolute top-0">
                  <AiIcons.AiOutlineClose
                    className="menu-close"
                    onClick={showSidebar}
                  />
                </NavIcon>
              </Box>
              {/* <Box className="w-50">
                <Switch className={"footerswich"} />
              </Box> */}
            </Box>
          </Box>
          {Sidebar_Data_mob.map((item, index) => {
            return <SubMenu onSidebarClick={showSidebar} item={item} key={index} />;
          })}
        </SidebarWrap>
      </SidebarNav>
    </>
  );
};

export default Sidebar;

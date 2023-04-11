import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { SidebarMenuItems } from "./Constants/constants";
import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import "./index.css";

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Modals from "../../common/Modal";
import { notify } from "../../utils";
import apiRequest, { cookies } from "../../services/auth";
import Tables from "../../components/Table";
import { capitalizeFirstLetter } from "../../helpers/functions";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../constants/portConstants";
import { Typography } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useDispatch } from "react-redux";
import { updateTheme } from "../../store/common/CommonReducers";

const apiNamespaces = {
  Home: null,
  Categories: "category",
  Users: "user",
  Blogs: "post",
  Questions: "post/get",
};

const commonDisabledFields = ["__v", "createdAt", "updatedAt"];

const disabledFieldsForCreate = {
  Home: [],
  Users: [
    "_id",
    "followers_count",
    "followers",
    "categories",
    "posts",
    "recently_visited",
    "wishlist",
    "accessTokenCreatedAt",
    "accessToken",
    "forgotPasswordTokenCreatedAt",
    "forgotPasswordToken",
    "lastLoggedIn",
    "referenceId",
    "verifyToken",
    "verifyTokenCreatedAt",
    "wishlist",
    "recently_visited",
    ...commonDisabledFields,
  ],
  Blogs: [
    "_id",
    "views_count",
    "vote_average",
    "vote_count",
    "parent_id",
    "reviews",
    "attachments",
    "posted_by",
    "viewed_by",
    "category",
    "",
    "",
    "",
    ...commonDisabledFields,
  ],
  Questions: [...commonDisabledFields],
  Categories: ["_id", "image", ...commonDisabledFields],
};

const disabledFields = {
  Home: [],
  Users: [
    "followers_count",
    "followers",
    "categories",
    "posts",
    "recently_visited",
    "wishlist",
    "password",
    "accessTokenCreatedAt",
    "accessToken",
    "forgotPasswordTokenCreatedAt",
    "forgotPasswordToken",
    "lastLoggedIn",
    "referenceId",
    "verifyToken",
    "verifyTokenCreatedAt",
    ...commonDisabledFields,
  ],
  Blogs: [
    "views_count",
    "vote_average",
    "vote_count",
    "parent_id",
    "reviews",
    "attachments",
    "posted_by",
    "viewed_by",
    "category",
    "",
    "",
    "",

    ...commonDisabledFields,
  ],
  Questions: [...commonDisabledFields],
  Categories: ["image", ...commonDisabledFields],
};

const getBodyFields = (row, currentMenu) => {
  return row
    ? Object.keys(row).reduce((acc, key) => {
        if (!disabledFields[currentMenu].includes(key)) {
          acc[key] = row[key];
        }
        return acc;
      }, {})
    : null;
};

const getCreateBodyFields = (row, currentMenu) => {
  return row
    ? Object.keys(row).reduce((acc, key) => {
        if (!disabledFieldsForCreate[currentMenu].includes(key)) {
          acc[key] = row[key];
        }
        return acc;
      }, {})
    : null;
};

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentMenu, setCurrentMenu] = useState("Home");
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalData, setModalData] = useState({
    type: null,
    row: null,
    isCreate: false,
    columns: [],
    disabled: false,
  });
  const [currentMenuTitle, setCurrentMenuTitle] = useState(null);
  const dispatch = useDispatch();
  const [mode, setMode] = React.useState("light");
  const navigate = useNavigate();
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                divider: "#d3d3d3",
                border: "#d3d3d3",
                text: {
                  primary: "#000 !important",
                  secondary: "#676767 !important",
                },
                background: {
                  default: "#e6e7ee !important",
                  primary: "#f1f1f1 !important",
                  secondary: "#fff",
                  success: "#fff",
                },
              }
            : {
                border: "#143a69",
                divider: "#143a69",
                background: {
                  default: "#0b1632 !important",
                  primary: "#242c41 !important",
                  secondary: "#071230 ",
                  success: "#0b1632",
                },
                text: {
                  primary: "#fff",
                  secondary: "#78819c !important",
                },
              }),
        },
      }),
    [mode]
  );

  React.useEffect(() => {
    dispatch(updateTheme(mode));
  }, [mode]);
  const onMenuClick = async (item) => {
    if (item.id === "Logout") {
      await cookies.remove("ASID");
      notify("You have been logged out successfully", "success");
      setTimeout(() => {
        navigate(`/admin/login`);
      }, 1000);
      return;
    }
    setCurrentMenu(item.id);
    setCurrentMenuTitle(item.title);
    setRefresh(!refresh);
  };

  const handleEdit = (row, columns) => {
    setModalData({
      type: currentMenu,
      isCreate: false,
      row,
      columns,
    });
    setShow(true);
  };

  const handleCreate = (columns) => {
    setModalData({
      type: currentMenu,
      isCreate: true,
      row: columns.reduce((acc, col) => {
        acc[col.path] =
          col.type === "Boolean"
            ? col.defaultValue === false
              ? false
              : true
            : col.values
            ? col.values[0]
            : "";

        return acc;
      }, {}),
      columns,
    });
    setShow(true);
  };

  const onCreate = async () => {
    const response = await apiRequest({
      url: apiNamespaces[currentMenu],
      method: "POST",
      data: { ...getCreateBodyFields(modalData.row, currentMenu) },
    });
    if (response.success) {
      setShow(false);
      setRefresh(!refresh);
    }
  };

  const onDelete = async (row) => {
    const response = await apiRequest({
      url: apiNamespaces[currentMenu],
      method: "DELETE",
      data: { _id: row._id },
    });
    if (response.success) {
      setShow(false);
      setRefresh(!refresh);
    }
  };

  const onUpdate = async () => {
    const response = await apiRequest({
      url: apiNamespaces[currentMenu],
      method: "PUT",
      data: {
        ...getBodyFields(modalData.row, currentMenu),
        id: modalData.row.id,
      },
    });
    if (response.success) {
      setShow(false);
      setRefresh(!refresh);
    }
  };

  const onExport = async (rows, address = false) => {
    const response = await apiRequest({
      url: apiNamespaces[currentMenu] + "/export",
      method: "POST",
      data: { ids: rows.map((row) => row.id), address },
    });
    if (response.success) {
      window.location.href =
        BASE_URL + apiNamespaces[currentMenu] + "/download/" + response.data;
    }
  };
  const onUpload = async (files) => {
    for (let file of files) {
      const formData = new FormData();
      formData.append("uploaded_file", file);
      const response = await apiRequest({
        url: apiNamespaces[currentMenu],
        method: "POST",
        data: formData,
      });
      if (response.success) {
        setRefresh(!refresh);
      }
    }
  };

  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography display={"flex"} justifyContent={"center"} alignItems={"center"} fontSize={"42px"} >BLOG</Typography>
      <Divider />
      <List>
        {SidebarMenuItems.map((item, index) => (
          <>
            <ListItem>
              {item.id === "Logout" && <Divider />}
              <ListItem
                onClick={() => onMenuClick(item)}
                key={item.title}
                disablePadding
              >
                <ListItemButton
                  className={item.id === currentMenu ? "menu-active" : ""}
                >
                  <ListItemIcon>{item.icons}</ListItemIcon>
                  <ListItemText color="text.default" primary={item.title} />
                </ListItemButton>
              </ListItem>
            </ListItem>
          </>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {currentMenu || "Home"}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {currentMenu === "Home" ? (
          <AdminDashboard />
        ) : (
          <Tables
            type={currentMenu}
            refresh={refresh}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={onDelete}
            handleExport={onExport}
            handleUpload={onUpload}
            namespace={apiNamespaces[currentMenu]}
          />
        )}
      </Box>
      <Modals
        show={show}
        title={`${t(modalData.isCreate ? "Create" : "Update")} ${t(
          modalData.type
        )}`}
        onSave={() => {
          if (modalData.isCreate) {
            onCreate();
          } else {
            onUpdate();
          }
        }}
        onClose={() => {
          setShow(false);
          setModalData({
            type: null,
            columns: [],
            row: null,
          });
        }}
      >
        {modalData.columns.map((column) => {
          const disabled = modalData.isCreate
            ? disabledFieldsForCreate[currentMenu].includes(column.path)
            : disabledFields[currentMenu].includes(column.path);
          return (
            !(modalData.isCreate && disabled) && (
              <Box className="mb-3">
                {column.instance === "ENUM" ? (
                  <Box>
                    <Box className="select-label">{column.path}</Box>
                    <Select
                      class="admin-edit-input mb-3"
                      aria-label=".form-select-lg"
                      disabled={disabled}
                      value={modalData.row[column.path]}
                      onChange={(e) => {
                        setModalData({
                          ...modalData,
                          row: {
                            ...modalData.row,
                            [column.path]: e.target.value,
                          },
                        });
                      }}
                    >
                      {column.values.map((value) => {
                        return <MenuItem value={value}>{t(value)}</MenuItem>;
                      })}
                    </Select>
                  </Box>
                ) : column.instance === "Boolean" ? (
                  <Box>
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="demo-simple-select-standard-label">
                        {column.path}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        class="admin-edit-input mb-3"
                        aria-label=".form-select-lg"
                        disabled={disabled}
                        value={
                          modalData.row[column.path] === true ? "True" : "False"
                        }
                        onChange={(e) => {
                          
                          setModalData({
                            ...modalData,
                            row: {
                              ...modalData.row,
                              [column.path]:
                                e.target.value === "True" ? true : false,
                            },
                          });
                        }}
                      >
                        <MenuItem value="True">{t("true")}</MenuItem>
                        <MenuItem value="False">{t("false")}</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                ) : column.instance == "Array" ? (
                  <Box>
                    <TextField
                      fullWidth
                      variant="standard"
                      className="admin-edit-input"
                      disabled={disabled}
                      onChange={(e) => {
                        setModalData({
                          ...modalData,
                          row: {
                            ...modalData.row,
                            [column.path]: e.target.value,
                          },
                        });
                      }}
                      placeholder={
                        capitalizeFirstLetter(t(column.path)) +
                        t(
                          column.options.required && !column.references
                            ? ""
                            : ""
                        )
                      }
                      value={modalData.row[column.path]}
                    />
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    variant="standard"
                    className="admin-edit-input"
                    disabled={disabled}
                    onChange={(e) => {
                      setModalData({
                        ...modalData,
                        row: {
                          ...modalData.row,
                          [column.path]: e.target.value,
                        },
                      });
                    }}
                    placeholder={
                      capitalizeFirstLetter(t(column.path)) +
                      t(column.options.required && !column.references ? "" : "")
                    }
                    value={modalData.row[column.path]}
                  />
                )}
              </Box>
            )
          );
        })}
      </Modals>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/system";
import HomeIcon from "@mui/icons-material/Home";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ChatIcon from "@mui/icons-material/Chat";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import "./index.css";
import { Avatar, Button, Divider, Stack } from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { ColorModeContext } from "../Context";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import PersistentDrawerLeft from "../Drawer";
import Modal from "@mui/material/Modal";
import FullWidthTabs from "../PostCreate";
import { useSelector } from "react-redux";
import UserAvatar from "../../common/UserAvatar";

const style = {
  position: "absolute",
  // top: 0,
  // right: 0,
  // left: 0,
  // bottom: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // padding:1,

  top: "50%",
  left: "50%",
  bgcolor: "background.default !important",
  transform: "translate(-50%, -50%)",
  borderRadius: "10px !important",
  boxShadow: 24,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: "0px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ hideControlls = false }) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const loggedInUserId = useSelector((state) => state.user.profile._id);
  const profile = useSelector((state) => state.user.profile);
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: "backgroun",
          width: { xs: "50%", md: "17%" },
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem>
        <UserAvatar
          src={
            profile.user_attachments.length > 0 &&
            profile.user_attachments[0].filename
          }
          userId={profile._id}
          text={profile.first_name}
        />{" "}
        Profile
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <HomeIcon fontSize="small" />
        </ListItemIcon>
        Home
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <GroupAddIcon fontSize="small" />
        </ListItemIcon>
        Following
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <MailIcon fontSize="small" />
        </ListItemIcon>
        Messages
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <NotificationsIcon fontSize="small" />
        </ListItemIcon>
        Notifications
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <BookmarksIcon fontSize="small" />
        </ListItemIcon>
        BookMarks
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <RateReviewIcon fontSize="small" />
        </ListItemIcon>
        Drafts
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        {!hideControlls && !loggedInUserId && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 10,
            }}
            onClick={handleOpenModal}
          >
            Login
          </Button>
        )}
        {!hideControlls && loggedInUserId && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              // maxWidth: "80px",
              borderRadius: 10,
            }}
            onClick={() => navigate("/blog-write")}
          >
            Create new!
          </Button>
        )}
      </MenuItem>

      <MenuItem>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          <Typography component={"span"}>Mode</Typography>
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </MenuItem>
      {/* <MenuItem>
      {!hideControlls && !loggedInUserId && (
        <Stack
          direction={"column"}
          sx={{ display: "flex", alignItems: "center" }}
          rowGap={2}
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 10,
            }}
            onClick={handleOpenModal}
          >
            Login
          </Button>
        </Stack>
      )}
      </MenuItem>
      {!hideControlls && loggedInUserId && (
        <Stack padding={1}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              fontWeight: 600,
              textTransform: "none",
              maxWidth: "80px",
              borderRadius: 10,
            }}
            onClick={() => navigate("/blog-write")}
          >
            Create new!
          </Button>
        </Stack>
      )}
      <IconButton
        sx={{ ml: 3 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        <Typography component={'span'}>Theme:</Typography>
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton> */}
    </Menu>
  );

  return (
    <>
      <Box>
        <AppBar
          position="static"
          sx={{
            bgcolor: "background.primary",
            backgroundImage: "none !important",
            paddingY: 1,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar className="toolbar">
              <Stack direction={"row"}>
                {loggedInUserId && <PersistentDrawerLeft />}
              </Stack>
              <Stack
                direction={"row"}
                width={{ xs: "100%", md: "auto" }}
                alignItems={"center"}
                justifyContent={{ xs: "center", md: "flex-start" }}
              >
                <Typography
                  className="title"
                  variant="h6"
                  noWrap
                  component="div"
                  role={"button"}
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      // backgroundColor: "#979691",
                      // borderRadius: "15px",
                      // padding: "0px 3px",
                      color: "purple",
                    },
                  }}
                  onClick={() => navigate("/")}
                >
                  <span className="arqu">A</span>r{" "}
                  <span className="arque">Q</span>ue
                </Typography>
              </Stack>

              <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

              <Search
                className="search"
                onFocus={() => navigate("/search-results")}
                sx={{
                  mx: 0,
                  width: { xs: "50%", md: "20%" },
                  bgcolor: "background.secondary",
                  display: { xs: "none", md: "block" },
                }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box sx={{ flexGrow: 1 }} />
              {!hideControlls && (
                <Box
                  sx={{
                    display: { xs: "none", md: "flex" },
                    alignItems: "center",
                  }}
                >
                  <Stack spacing={2} direction={"row"}>
                    {!loggedInUserId ? (
                      <Button
                        variant="contained"
                        size={"large"}
                        sx={{
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: 10,
                          paddingY: 1,
                        }}
                        onClick={() => handleOpenModal()}
                      >
                        Login
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        size={"large"}
                        sx={{
                          fontWeight: 600,
                          textTransform: "none",
                          borderRadius: 10,
                          paddingY: 1,
                        }}
                        onClick={() => navigate("/blog-write")}
                      >
                        Create new!
                      </Button>
                    )}
                    <IconButton
                      sx={{ ml: 1 }}
                      onClick={colorMode.toggleColorMode}
                      color="inherit"
                    >
                      {theme.palette.mode === "dark" ? (
                        <Brightness7Icon />
                      ) : (
                        <Brightness4Icon />
                      )}
                    </IconButton>
                  </Stack>

                  {/* <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color='inherit'
                            >
                                <AccountCircle />
                            </IconButton> */}
                </Box>
              )}

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {/* {renderMenu} */}
      </Box>
      <Modal
        sx={{ overflowY: "scroll" }}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} width={{ xs: "100%", md: "auto" }}>
          <FullWidthTabs />
        </Box>
      </Modal>
    </>
  );
}

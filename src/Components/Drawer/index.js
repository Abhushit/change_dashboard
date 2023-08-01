import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  Campaign,
  Chat,
  Dashboard,
  DesignServices,
  Diamond,
  Event,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Logout,
  Notifications,
  RestaurantMenu,
  Search,
  Settings,
  ShoppingBasket,
  Summarize,
  Toys,
  Upcoming,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  ClickAwayListener,
  Collapse,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  SwipeableDrawer,
} from "@mui/material";
import Logo from "./../../images/logo-light.png";
// import Logo from "./../../images/YourStay_Logo.png";
import moment from "moment/moment";
import { deepOrange } from "@mui/material/colors";

const drawerWidth = 320;

const openedMixin = (theme) => ({
  width: drawerWidth,
  backgroundColor: theme.palette.primary.dark,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  // width: `calc(${theme.spacing(7)} + 1px)`,
  width: "0px",
  backgroundColor: theme.palette.primary.dark,

  // [theme.breakpoints.up("sm")]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  // "& img": {
  //   width: "250px",
  //   height: "45px",
  //   marginTop: "7px",
  // },
  "& img": {
    width: "40px",
    height: "40px",
    // marginTop: "7px",
  },
  "& h3":{
    color:"#fff",
    textDecoration:"none",
    letterSpacing:"2px",
    fontSize:"25px",
    margin:"0",
  },
  "& a":{
    display:"flex",
    gap:"10px",
    alignItems:"center",
    justifyContent:"center"
  }
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: theme.palette.primary.dark,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.down("md")]: {
      // width: `calc(100% - 300px)`,
      width: "100%",
      zIndex: theme.zIndex.drawer - 1,
    },
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  backgroundColor: theme.palette.primary.dark,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Swipeable = styled(SwipeableDrawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const MultiLevelList = styled(List)(({ theme }) => ({
  marginLeft: "45px",
  borderLeft: `2px solid ${theme.palette.primary.light}`,
}));

const MenuListButton = styled(ListItemButton)(({ theme }) => ({
  // marginLeft: "11px",
  // marginRight: "10px",
  // borderRadius: "10px",
  opacity: "0.7",
  transition: "0.3s",
  fontWeight: "400",
  margin: "4px 0",
  color: theme.palette.primary.lighter,
  "& svg": {
    color: theme.palette.primary.lighter,
    fontSize: "22px",
  },
  "& span": {
    fontWeight: "400",
    fontSize: "15px",
  },
  "&:hover": {
    opacity: "1",
  },
  "&:active": {
    opacity: "1",
    // background: theme.palette.primary.darker
  },
  "&:focus": {
    opacity: "1",
    // background: theme.palette.primary.darker
  },
}));

const SearchDiv = styled("div")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  "& input": {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "12px",
    padding: "10px 30px",
    border: "2px solid transparent",
    width: "300px",
    outline: "none",
    boxShadow: "none",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    "&:focus": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  button: {
    backgroundColor: theme.palette.primary.lighter,
    border: "none",
    position: "absolute",
    right: "10px",
    transition: "0.3s",
    padding: "4px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  "& svg": {
    position: "absolute",
    left: "7px",
    color: theme.palette.primary.dark,
  },
}));

const AvatarDiv = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",

  "& span": {
    color: theme.palette.primary.lighter,
    fontSize: "18px",
    marginRight: "10px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const drawerList = [
  { menu: "Home", link: "/", icon: <Dashboard /> },
  {
    menu: "Resources",
    link: "",
    icon: <Diamond />,
    multiLevel: true,
    multiMenus: [
      { menuName: "Staff Users & roles", link: "/resources/staff_user_roles" },
      { menuName: "Guest Accounts", link: "/resources/guest_accounts" },
      // { menuName: "Room types", link: "/resources/room_types" },
      // { menuName: "Groups", link: "/resources/groups" },
      // { menuName: "Tags", link: "/resources/tags" },
    ],
  },
  { menu: "Chats", link: "/chats", icon: <Chat /> },
  // {
  //   menu: "Send Push Notification",
  //   link: "/send_notification",
  //   icon: <Notifications />,
  // },
  {
    menu: "Announcements",
    link: "/announcements",
    icon: <Campaign />,
  },
  {
    menu: "Single Pages",
    link: "/single_pages",
    icon: <Summarize />,
  },
  {
    menu: "Internal Activities & Events",
    link: "/internal_activities",
    icon: <Event />,
  },
  {
    menu: "Adventures & Day Trips",
    link: "/adventures_day_trips",
    icon: <Upcoming />,
  },
  {
    menu: "Extra Services",
    link: "/extra_services",
    icon: <DesignServices />,
  },
  {
    menu: "Restaurants",
    link: "/restaurants",
    icon: <RestaurantMenu />,
  },
  {
    menu: "Shopping",
    link: "/shopping",
    icon: <ShoppingBasket />,
  },
  {
    menu: "Settings",
    link: "",
    icon: <Settings />,
    multiLevel: true,
    multiMenus: [
      // { menuName: "Integrations", link: "/settings/integrations" },
      {
        menuName: "Billing & Subscription",
        link: "/settings/billing_subscription",
      },
      // { menuName: "Feedback", link: "/settings/feedback" },
    ],
  },
];

const userData = localStorage.getItem("login");
const userDetails = JSON.parse(userData);

export default function MiniDrawer({ children }) {
  const theme = useTheme();
  const location = useLocation();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(true);
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [currMenuName, setCurrMenuName] = React.useState("");
  const [menuLevelOpen, setMenuLevelOpen] = React.useState(false);
  const [openPopper, setOpenPopper] = React.useState(false);
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const navigate = useNavigate();

  React.useEffect(() => {
    checkLoggedIn();
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  });

  const checkLoggedIn = () => {
    var currentDate = moment(JSON.parse(localStorage.getItem("loggedin")));
    let newDate = moment(new Date());
    if (currentDate < newDate) {
      var diffInMinutes = newDate.diff(currentDate, "minutes");
      if (diffInMinutes >= 60) {
        localStorage.clear();
        window.location = "/";
      }
    }
  };

  const resize = () => {
    setScreenWidth(window.innerWidth);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    // setOpen(prev => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerMobileOpen = () => {
    setMobileOpen(true);
    // setOpen(prev => !prev);
  };

  const handleDrawerMobileClose = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    setOpenPopper(false);

    navigate("/login");
  };

  const handleMenuDown = (name) => {
    setCurrMenuName(name);
    if (name !== currMenuName) {
      setMenuLevelOpen(true);
    } else if (name === currMenuName) {
      setMenuLevelOpen((prev) => !prev);
    } else {
      setMenuLevelOpen(false);
    }
  };

  const handleEditProfile = () => {
    setOpenPopper(false);
  };

  const handlePopperOpen = () => {
    setOpenPopper((prev) => !prev);
  };

  const handleClosePopper = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenPopper(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenPopper(false);
    } else if (event.key === "Escape") {
      setOpenPopper(false);
    }
  };

  const MenuDiv = styled("div")(({ theme }) => ({
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: mobileOpen ? "none" : "block",
    },
  }));

  

  const styles = {
    backgroundColor: theme.palette.primary.dark,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* NAVBAR */}
      <AppBar position="fixed" open={screenWidth > 768 ? open : mobileOpen}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuDiv>
            <IconButton onClick={handleDrawerMobileOpen}>
              <MenuIcon fontSize="large" color="secondary" />
            </IconButton>
          </MenuDiv>
          <SearchDiv>
            <Search fontSize="small" />
            <input type="text" placeholder="Search" />
            <button>⌘ F</button>
          </SearchDiv>
          <AvatarDiv>
            <span>{userDetails.userName}</span>
            <Avatar
              // alt={userDetails.userName}
              // src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              sx={{
                width: 50,
                height: 50,
                cursor: "pointer",
                border: `2px solid #936d60`,
                bgcolor: deepOrange[500]
              }}
              onClick={handlePopperOpen}
              ref={anchorRef}
            >
              {userDetails.userName[0]}
            </Avatar>

            <Popper
              open={openPopper}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom-start" ? "left top" : "left bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClosePopper}>
                      <MenuList
                        autoFocusItem={openPopper}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        {/* <MenuItem onClick={handleEditProfile}>
                          Edit Profile
                        </MenuItem> */}
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </AvatarDiv>
        </Toolbar>
      </AppBar>
      {/* NAVBAR */}

      {/* SIDEBAR OR DRAWER */}
      {screenWidth > 768 ? (
        <Drawer open={true} variant="permanent">
          <DrawerHeader>
            <Link to="/">
              <img src={Logo} alt="Logo" />
              <h3>Dashboard</h3>
            </Link>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerList.map((list, index) => (
              <>
                <ListItem
                  key={list.menu}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <Link to={list.link} style={{ textDecoration: "none" }}>
                    <MenuListButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        background:
                          location.pathname === list.link
                            ? theme.palette.secondary.dark
                            : theme.palette.primary.dark,
                        opacity: location.pathname === list.link ? "1" : "0.7",
                      }}
                      onClick={() =>
                        handleMenuDown(list.multiLevel ? list.menu : "")
                      }
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 1.6 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {list.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={list.menu}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      {list.multiLevel ? (
                        currMenuName === list.menu ? (
                          <KeyboardArrowDown />
                        ) : (
                          <KeyboardArrowUp />
                        )
                      ) : (
                        ""
                      )}
                    </MenuListButton>
                  </Link>
                </ListItem>
                {list.multiLevel && currMenuName === list.menu && (
                  <Collapse
                    // in={((list.menu === currMenuName) && menuLevelOpen) ? menuLevelOpen : false }
                    in={menuLevelOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    {" "}
                    <>
                      <Divider />
                      <MultiLevelList>
                        {list.multiLevel &&
                          list.multiMenus.map((sub, index) => (
                            <ListItem disablePadding sx={{ display: "block" }}>
                              <Link
                                to={sub.link}
                                style={{ textDecoration: "none" }}
                              >
                                <MenuListButton
                                  sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                    background:
                                      location.pathname === sub.link
                                        ? theme.palette.secondary.dark
                                        : theme.palette.primary.dark,
                                    opacity:
                                      location.pathname === sub.link
                                        ? "1"
                                        : "0.7",
                                  }}
                                >
                                  <ListItemText
                                    primary={sub.menuName}
                                    sx={{ opacity: open ? 1 : 0 }}
                                  />
                                </MenuListButton>
                              </Link>
                            </ListItem>
                          ))}
                      </MultiLevelList>
                    </>
                  </Collapse>
                )}
              </>
            ))}
          </List>
        </Drawer>
      ) : (
        <Swipeable
          anchor="left"
          open={mobileOpen}
          onOpen={handleDrawerMobileOpen}
          onClose={handleDrawerMobileClose}
        >
          <DrawerHeader>
            <Link to="/">
              <img src={Logo} alt="Logo" />
              <h3>Dashboard</h3>
            </Link>
            {/* <IconButton onClick={handleDrawerMobileClose}>
            <ChevronLeftIcon fontSize="large" color="secondary" />
          </IconButton> */}
          </DrawerHeader>
          <Divider />
          <List>
            {drawerList.map((list, index) => (
              <>
                <ListItem
                  key={list.menu}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <Link to={list.link} style={{ textDecoration: "none" }}>
                    <MenuListButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        background:
                          location.pathname === list.link
                            ? theme.palette.secondary.dark
                            : theme.palette.primary.dark,
                        opacity: location.pathname === list.link ? "1" : "0.7",
                      }}
                      onClick={() =>
                        handleMenuDown(list.multiLevel ? list.menu : "")
                      }
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {list.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={list.menu}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                      {list.multiLevel ? (
                        currMenuName === list.menu ? (
                          <KeyboardArrowDown />
                        ) : (
                          <KeyboardArrowUp />
                        )
                      ) : (
                        ""
                      )}
                    </MenuListButton>
                  </Link>
                </ListItem>
                {list.multiLevel && currMenuName === list.menu && (
                  <Collapse
                    // in={((list.menu === currMenuName) && menuLevelOpen) ? menuLevelOpen : false }
                    in={menuLevelOpen}
                    timeout="auto"
                    unmountOnExit
                  >
                    <>
                      <Divider />
                      <MultiLevelList>
                        {list.multiLevel &&
                          list.multiMenus.map((sub, index) => (
                            <ListItem disablePadding sx={{ display: "block" }}>
                              <Link
                                to={sub.link}
                                style={{ textDecoration: "none" }}
                              >
                                <MenuListButton
                                  sx={{
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                    background:
                                      location.pathname === sub.link
                                        ? theme.palette.secondary.dark
                                        : theme.secondary.primary.dark,
                                    opacity:
                                      location.pathname === sub.link
                                        ? "1"
                                        : "0.7",
                                  }}
                                >
                                  <ListItemText
                                    primary={sub.menuName}
                                    sx={{ opacity: open ? 1 : 0 }}
                                  />
                                </MenuListButton>
                              </Link>
                            </ListItem>
                          ))}
                      </MultiLevelList>
                    </>
                  </Collapse>
                )}
              </>
            ))}
          </List>
        </Swipeable>
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: theme.palette.primary.light,
          height: "100% !important",
          width: "100%",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}

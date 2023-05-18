/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import ApplicationList from "./ApplicationList";
import ApplicationDetails from "./ApplicationDetails";
import ResourcesList from "./ResourcesList";
import ResourceDetails from "./ResourceDetails";

import "./App.css";
import CloudApplications from "./CloudApplications";
const drawerWidth = 240;

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] =
    React.useState<string>("Applications");
  const [title, setTitle] = React.useState<string>("Application List");
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const titleForHeader = [
    { name: "Cloud Application List", path: "/cloud-applications" },
    { name: "Application List", path: "/application-list" },
    { name: "Application Details", path: "/application-details" },
    { name: "Resources List", path: "/resources-list" },
    { name: "Resources Details", path: "/resource-details" },
  ];

  const menuList = [
    { name: "Cloud Applications", path: "/cloud-applications" },
    { name: "Applications", path: "/application-list" },
    { name: "Resourses", path: "/resources-list" },
  ];

  React.useEffect(() => {
    setTitle(
      titleForHeader.find(
        (item) => window.location.pathname.indexOf(item.path) > -1
      )?.name || "Application List"
    );
  }, [location]);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((menu, index) => (
          <ListItem key={menu.name} disablePadding>
            <Link className="menu-item" to={menu.path}>
              <ListItemButton
                selected={selectedMenu === menu.name}
                onClick={() => {
                  setSelectedMenu(menu.name);
                  // setTitle(
                  //   titleForHeader.find(
                  //     (item) => window.location.pathname.indexOf(item.path) > -1
                  //   )?.name || "Application List"
                  // );
                }}
              >
                {menu.name}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <h3>{title}</h3>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
        <Routes>
          <Route path="/" Component={ApplicationList} />
          <Route path="/application-list" Component={ApplicationList} />
          <Route
            path="/application-details/:appName"
            Component={ApplicationDetails}
          />
          <Route path="/resources-list" Component={ResourcesList} />
          <Route path="/resource-details/:name" Component={ResourceDetails} />
          <Route path="/cloud-applications" Component={CloudApplications} />
        </Routes>
      </Box>
    </Box>
  );
}

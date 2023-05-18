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
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ApplicationList from "./ApplicationList";
import ApplicationDetails from "./ApplicationDetails";
import ResourcesList from "./ResourcesList";
import ResourceDetails from "./ResourceDetails";

import "./App.css"
const drawerWidth = 240;

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuList = [
    { name: "Applications", path: "/application-list" },
    { name: "Resourses", path: "/resources-list" },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuList.map((menu, index) => (
          <ListItem key={menu.name} disablePadding>
            <ListItemButton>
              <Link className="menu-item" to={menu.path}>{menu.name}</Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <BrowserRouter>
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
            <h1>ELANCO TEST APP</h1>
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
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}

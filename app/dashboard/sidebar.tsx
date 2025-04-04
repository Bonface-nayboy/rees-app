"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import Link from "next/link";
import {
  ListItemButton,
  TextField,
  InputAdornment,
  Collapse,
} from "@mui/material";
import {
  AdminPanelSettings,
  ExpandLess,
  ExpandMore,
  Search,
} from "@mui/icons-material";

const drawerWidth = 300;

const SidebarContainer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    backgroundColor: "#f5f5f5",
    color: "white",
    padding: "10px",
  },
});

const NAVIGATION = [
  {
    type: "header",
    title: "DiRa Analyzer",
    icon: <AdminPanelSettings />,
    link: "/",
  },
  {
    type: "item",
    title: "Register",
    icon: <BarChartIcon />,
    children: [
      { title: "Items", icon: <DescriptionIcon />, link: "/items" },
      { title: "Users", icon: <DescriptionIcon />, link: "/users" },
      { title: "Customers", icon: <DescriptionIcon />, link: "/customers" },
      { title: "Suppliers", icon: <DescriptionIcon />, link: "/suppliers" },
      { title: "Accounts", icon: <DescriptionIcon />, link: "/accounts" },
    ],
  },
  {
    type: "item",
    title: "Sales",
    icon: <BarChartIcon />,
    children: [
      { title: "Cash Sales", icon: <DescriptionIcon />, link: "/sales/cash-sales" },
      { title: "Credit Sales", icon: <DescriptionIcon />, link: "/users" },
      { title: "Sales Return", icon: <DescriptionIcon />, link: "/customers" },
    ],
  },
  {
    type: "item",
    title: "Purchases",
    icon: <BarChartIcon />,
    children: [
      { title: "Cash Purchase", icon: <DescriptionIcon />, link: "/items" },
      { title: "Credit Purchase", icon: <DescriptionIcon />, link: "/users" },
      { title: "Purchase Return", icon: <DescriptionIcon />, link: "/customers" },
    ],
  },
  { type: "divider" },
  { type: "header", title: "Analytics" },
  {
    type: "item",
    title: "Reports",
    icon: <BarChartIcon />,
  },
  { type: "item", title: "Integrations", icon: <LayersIcon />, link: "/" },
];

export default function Sidebar() {
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <SidebarContainer variant="permanent">
      <List>
        {NAVIGATION.map((item, index) => {
          if (item.type === "header") {
            return (
              <ListItem
                key={index}
                sx={{ py: 1, fontWeight: "bold", color: "#bbb" }}
              >
                <ListItemIcon sx={{ color: "primary" }}>{item.icon}</ListItemIcon>
                {item.title}
              </ListItem>
            );
          }
          if (item.type === "divider") {
            return <Divider key={index} sx={{ backgroundColor: "#444" }} />;
          }
          if (item.type === "search") {
            return (
              <ListItem key={index} sx={{ py: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Search..."
                  size="small"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    bgcolor: "white",
                    borderRadius: "5px",
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "#555" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </ListItem>
            );
          }
          if (item.children) {
            return (
              <React.Fragment key={index}>
                <ListItem disablePadding sx={{ py: 1, fontWeight: "bold", color: "#bbb" }}>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon sx={{ color: "primary" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={open} timeout={"auto"} unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItem key={childIndex} disablePadding sx={{ pl: 4, color:"#bbb", fontWeight: "bold" }}>
                        <ListItemButton
                          component={Link}
                          href={child.link ?? "#"}
                        >
                          <ListItemIcon sx={{ color: "primary" }}>
                            {child.icon}
                          </ListItemIcon>
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          }
          return (
            <ListItem key={index} disablePadding>
              <ListItemButton component={Link} href={item.link ?? "#"}>
                <ListItemIcon sx={{ color: "primary" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </SidebarContainer>
  );
}

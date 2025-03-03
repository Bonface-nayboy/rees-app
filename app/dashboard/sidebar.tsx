"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import LayersIcon from "@mui/icons-material/Layers";
import Link from "next/link";
import { ListItemButton, TextField, InputAdornment } from "@mui/material";
import { AdminPanelSettings, Analytics, Filter, Notifications, Search, ShowChart } from "@mui/icons-material";

const drawerWidth = 300;

const SidebarContainer = styled(Drawer)({
    width: drawerWidth,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: drawerWidth,
        boxSizing: "border-box",
        backgroundColor: "#111",
        color: "white",
        padding: "10px",
    },
});

const NAVIGATION = [
    { type: "header", title: "DiRa Analyzer", icon: <AdminPanelSettings />, link: "/" },
    { type: "item", title: "Dashboard", icon: <DashboardIcon />, link: "/" },
    { type: "search" },
    { type: "item", title: "Sales Forecusting Behaviour", icon: <ShowChart />, link: "/charts" },
    { type: "item", title: "Inventory analysis", icon: <DashboardIcon />, link: "/" },
    { type: "item", title: "Sales Fraud Detection", icon: <Filter />, link: "/" },
    { type: "item", title: "Promotional Effectiveness", icon: <Notifications />, link: "/" },
    { type: "item", title: "Customer Behaviour", icon: <Analytics />, link: "/" },
    { type: "divider" },
    { type: "header", title: "Analytics" },
    {
        type: "item",
        title: "Reports",
        icon: <BarChartIcon />,
        children: [
            { title: "Sales", icon: <DescriptionIcon />, link: "/" },
            { title: "Purchases", icon: <DescriptionIcon />, link: "/" },
            { title: "Stock", icon: <DescriptionIcon />, link: "/" },
            { title: "Traffic", icon: <DescriptionIcon />, link: "/" },
        ],
    },
    { type: "item", title: "Integrations", icon: <LayersIcon />, link: "/" },
];

export default function Sidebar() {
    const [search, setSearch] = React.useState("");

    return (
        <SidebarContainer variant="permanent">
            <List>
                {NAVIGATION.map((item, index) => {
                    if (item.type === "header") {
                        return (
                            <ListItem key={index} sx={{ py: 1, fontWeight: "bold", color: "#bbb" }}>
                                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                {item.title}
                            </ListItem>
                        );
                    }
                    if (item.type === "divider") {
                        return <Divider key={index} sx={{ backgroundColor: "#444" }} />;
                    }
                    if (item.type === "search") {
                        return (
                            <ListItem key={index} sx={{ py: 1}}>
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
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                                {item.children.map((child, childIndex) => (
                                    <ListItem key={childIndex} disablePadding sx={{ pl: 4 }}>
                                        <ListItemButton component={Link} href={child.link ?? "#"}>
                                            <ListItemIcon sx={{ color: "white" }}>{child.icon}</ListItemIcon>
                                            <ListItemText primary={child.title} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </React.Fragment>
                        );
                    }
                    return (
                        <ListItem key={index} disablePadding>
                            <ListItemButton component={Link} href={item.link ?? "#"}>
                                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </SidebarContainer>
    );
}

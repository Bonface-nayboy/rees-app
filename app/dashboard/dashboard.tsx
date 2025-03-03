import { Box } from "@mui/material";
import React from "react";
import Sidebar from "./sidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex", }}>
      <Sidebar />
      {children}
    </Box>
  );
}

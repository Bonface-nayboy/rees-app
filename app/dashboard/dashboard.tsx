import { Box, ThemeProvider } from "@mui/material";
import React from "react";
import Sidebar from "./sidebar";
import themes from "@/src/theme";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={themes}>
    <Box sx={{ display: "flex", minHeight: "100vh" }} bgcolor="#f5f5f5">
      <Sidebar />
      {children}
    </Box>
    </ThemeProvider>
  );
}

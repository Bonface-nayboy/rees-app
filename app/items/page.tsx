"use client";

import ItemsPageData from "@/src/containers/Items";
import { Box, Typography } from "@mui/material";
import React from "react";

function Items() {
  return (
    <Box
      sx={{
        padding: 2,
        width:"100%",
      }}
    >        
      <ItemsPageData />
    </Box>
  );
}

export default Items;

"use client";

import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SelectActionCard from "./CountiesCard";
import { useState } from "react";
import Dialog from "@/src/components/Dialog";
import CountyForm from "./CountyForm";
import { countiesType } from "@/src/interfaces/counties";

 function Counties({ counties }:{ counties: countiesType[] }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Typography variant="h2" color="info">
        Counties
      </Typography>
      <Typography variant="h4" color="info">
        Explore the counties and their details below.
      </Typography>
      <Button variant="contained" onClick={handleOpen}>Add New County</Button>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <SelectActionCard counties={counties} />
      </Box>
      <Box>
        <Dialog
          open={open}
          handleClose={handleClose}
          modalContent={<CountyForm handleClose={handleClose} />}
        />
      </Box>
    </Box>
  );
}

export default Counties;

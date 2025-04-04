"use client";

import SalesTable from "@/src/components/Table/sales";
import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import Payments from "../payments";
import Dialog from "@/src/components/Dialog";

function CashSales() {
  const [open, setOpen] = useState(false);
  const [totals, setTotals] = useState(0);

  const handleReceivePayments = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box width="100%">
      <Box>
        <SalesTable handleReceivePayments={handleReceivePayments} setTotals={setTotals}/>
      </Box>
      <Dialog
      fullWidth
        open={open}
        handleClose={handleClose}
        modalContent={<Payments handleClose={handleClose} totals={totals}/>}
      />
    </Box>
  );
}

export default CashSales;

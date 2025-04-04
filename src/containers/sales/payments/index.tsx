import {
    Box,
    Button,
    Divider,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import PayType from "./PayType";
  
  function Payments({ totals, handleClose }: any) {
    const [totalPaid, setTotalPaid] = useState(0);
    const [remaining, setRemaining] = useState(totals);
  
    const handlePaymentChange = (paid: number, balance: number) => {
      setTotalPaid(paid);
      setRemaining(balance);
    };
  const finalTotals= totals - totalPaid;

    return (
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2" color="info">
            Receive payments
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="h2" mr={2} color="info">
              Totals
            </Typography>
            <Typography variant="h2" color="error">
              {finalTotals.toLocaleString("en-KE", {
                style: "currency",
                currency: "KES",
              })}
            </Typography>
          </Box>
        </Box>
  
        <Divider sx={{ my: 2 }} />
  
        <PayType totals={totals} onPaymentChange={handlePaymentChange} />
  
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            disabled={remaining !== 0}
            color={remaining === 0 ? "success" : "inherit"}
          >
            Approve
          </Button>
        </Box>
      </Box>
    );
  }
  
  export default Payments;
  
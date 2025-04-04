import { Box, Checkbox, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

interface PayTypeProps {
  totals: number;
  onPaymentChange: (paid: number, remaining: number) => void;
}

const payOptions = ["MPESA", "CASH", "BANK", "PDQ", "CHEQUE"];

function PayType({ totals, onPaymentChange }: PayTypeProps) {
  const [methods, setMethods] = useState(
    payOptions.map((type) => ({
      type,
      selected: false,
      amount: 0,
    }))
  );

  const totalPaid = methods.reduce((sum, method) => sum + method.amount, 0);
  const remaining = totals - totalPaid;

  console.log("balance----", totalPaid, remaining);

  // Notify parent when values change
  useEffect(() => {
    onPaymentChange(totalPaid, remaining);
  }, [totalPaid]);

  const handleCheckboxChange = (index: number) => {
    setMethods((prev) =>
      prev.map((method, i) => {
        if (i !== index) return method;

        const isChecked = !method.selected;
        return {
          ...method,
          selected: isChecked,
          amount: isChecked ? remaining : 0, // ← reset amount to 0 if unchecked
        };
      })
    );
  };

  const handleAmountChange = (index: number, value: string) => {
    // Remove commas and parse to float
    let raw = value.replace(/,/g, "");
    let amount = parseFloat(raw) || 0;

    setMethods((prev) => {
      const currentTotal = prev.reduce(
        (sum, method, i) => (i === index ? sum : sum + method.amount),
        0
      );

      const maxAllowed = totals - currentTotal;
      if (amount > maxAllowed) {
        amount = maxAllowed;
      }

      return prev.map((method, i) => ({
        ...method,
        amount: i === index ? amount : method.amount,
        selected: i === index ? amount > 0 : method.selected,
      }));
    });
  };

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat("en-US").format(amount);

  const isAnotherSelected = methods.some(
    (m) => m.selected && m.amount !== 0 && m.amount !== remaining
  );
  console.log("isAnotherSelected---", isAnotherSelected);

  return (
    <Box mb={2}>
      {methods.map((method, index) => (
        <Box
          display="flex"
          justifyContent="space-between"
          bgcolor="#f5f5f5"
          key={method.type}
        >
          <Box width="10%">
            <Checkbox
              checked={method.selected}
              onChange={() => handleCheckboxChange(index)}
              disabled={
                isAnotherSelected && !method.selected && remaining === 0
              }
            />
          </Box>
          <Box width="20%">
            <Typography lineHeight={2.5}>{method.type}</Typography>
          </Box>
          <Box width="70%">
            <TextField
              variant="standard"
              value={formatAmount(method.amount)}
              onChange={(e) => handleAmountChange(index, e.target.value)}
              disabled={!method.selected && remaining===0}
              fullWidth
              inputProps={{ inputMode: "numeric" }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default PayType;

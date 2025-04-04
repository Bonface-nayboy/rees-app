"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Box,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useEffect } from "react";

const itemsList = [
  {
    code: "P001",
    name: "Newest product with discount to our users",
    price: 10,
    tax: 1,
  },
  {
    code: "P002",
    name: "Newest product with discount to our users 2",
    price: 15,
    tax: 1.5,
  },
  {
    code: "P003",
    name: "Newest product with discount to our users 3",
    price: 20,
    tax: 2,
  },
  {
    code: "T001",
    name: "Newest product with discount to our users 1",
    price: 20,
    tax: 2,
  },
  {
    code: "T002",
    name: "Newest product with discount to our users 2",
    price: 20,
    tax: 2,
  },
  {
    code: "T003",
    name: "Newest product with discount to our users 3",
    price: 20,
    tax: 2,
  },
];

export default function SalesTable({ handleReceivePayments, setTotals }: any) {
  const { control, register, watch, setValue } = useForm({
    defaultValues: {
      items: [{ code: "", name: "", qty: 1, price: 0, tax: 0, total: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const [searchIndex, setSearchIndex] = useState<any>(null);

  const updateRow = (index:any, item:any) => {
    setValue(`items.${index}.code`, item.code);
    setValue(`items.${index}.name`, item.name);
    setValue(`items.${index}.price`, item.price);
    setValue(`items.${index}.tax`, item.tax);
    handleQtyChange(index);
    setSearchIndex(null);
  };

  const handleQtyChange = (index:any) => {
    const qty = watch(`items.${index}.qty`) || 1;
    const price = watch(`items.${index}.price`) || 0;
    const tax = watch(`items.${index}.tax`) || 0;
    setValue(`items.${index}.total`, qty * price + tax);
  };

  const handleKeyPress = (e:any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      append({ code: "", name: "", qty: 1, price: 0, tax: 0, total: 0 });
    }
  };

  const totalTax = watch("items").reduce((sum, row) => sum + (row.tax || 0), 0);
  const totalSales = watch("items").reduce(
    (sum, row) => sum + (row.total || 0),
    0
  );

  useEffect(() => {
    setTotals(totalSales);
  }, [totalSales, setTotals]);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (searchIndex !== null && !event.target.closest(".MuiTextField-root")) {
        setSearchIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchIndex]);
  return (
    <Box sx={{ width: "100%", padding: 2, borderRadius: 2, boxShadow: 1 }}>
      <Typography variant="h6" gutterBottom>
        Sales Table
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Code</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    {...register(`items.${index}.code`)}
                    disabled
                  />
                </TableCell>
                <TableCell sx={{ width: "30%" }}>
                  <TextField
                    fullWidth
                    variant="standard"
                    {...register(`items.${index}.name`)}
                    onFocus={() => setSearchIndex(index)}
                    onKeyPress={(e) => handleKeyPress(e)}
                  />
                  {searchIndex === index && (
                    <Box
                      sx={{
                        position: "absolute",
                        background: "white",
                        boxShadow: 1,
                        padding: 1,
                      }}
                    >
                      {itemsList.map((item) => (
                        <Box key={item.code} display="flex" zIndex={3}>
                          {" "}
                          <MenuItem onClick={() => updateRow(index, item)}>
                            {item.code}
                          </MenuItem>
                          <MenuItem onClick={() => updateRow(index, item)}>
                            {item.name}
                          </MenuItem>
                        </Box>
                      ))}
                    </Box>
                  )}
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type="number"
                    variant="standard"
                    {...register(`items.${index}.qty`, { valueAsNumber: true })}
                    onBlur={() => handleQtyChange(index)}
                    onKeyPress={(e) => handleKeyPress(e)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    {...register(`items.${index}.price`)}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    {...register(`items.${index}.tax`)}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    fullWidth
                    {...register(`items.${index}.total`)}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  {index > 0 && (
                    <IconButton onClick={() => remove(index)}>
                      <Delete />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, textAlign: "right" }}>
        <Typography variant="subtitle1">
          Total Tax: {totalTax.toFixed(2)}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Total Sales: {totalSales.toFixed(2)}
        </Typography>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReceivePayments}
          >
            Receive Payments
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

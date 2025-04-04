import CashSales from "@/src/containers/sales/CashSales";
import Header from "@/src/containers/sales/CashSales/Header";
import { Box, Card } from "@mui/material";
import React from "react";

function Home() {
  return (
    <Card sx={{
        width:"100%"
    }}>
      <Header /> <CashSales />
    </Card>
  );
}

export default Home;

"use client";

import { Box, Card, Typography } from "@mui/material";
import React from "react";
import Graph from "./graph";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MonetizationOn, PersonAdd, AddCircle } from "@mui/icons-material";

export default function Cards() {
  const pathname = usePathname();

  return (
    <Box sx={{ marginTop: 2, marginLeft: 2, minHeight: "100vh", width: "80vw" }} p={1}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ color: "black", fontSize: 24 }}>Dashboard</Typography>

        <Box sx={{ display: "flex", fontSize: 16 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              color: pathname === "/" ? "primary.main" : "black",
              "&:hover": { color: "primary.main" },
              mr: 2,
            }}
          >
            Home
          </Box>
          <Box
            component={Link}
            href="/dashboard"
            sx={{
              textDecoration: "none",
              color: pathname === "/dashboard" ? "primary.main" : "black",
              "&:hover": { color: "primary.main" },
            }}
          >
            Dashboard
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 1 }}>
        <Card
          sx={{
            width: 290,
            height: 130,
            bgcolor: "primary.main",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>150</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <AddCircle sx={{ fontSize: 28 }} />
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              New Orders
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            width: 290,
            height: 130,
            bgcolor: "green",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>150</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MonetizationOn sx={{ fontSize: 28 }} />
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              Sales
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            width: 290,
            height: 130,
            bgcolor: "orange",
            color: "black",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>150</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MonetizationOn sx={{ fontSize: 28 }} />
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              Purchases
            </Typography>
          </Box>
        </Card>

        <Card
          sx={{
            width: 290,
            height: 130,
            bgcolor: "red",
            color: "white",
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: 24, fontWeight: "bold" }}>150</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PersonAdd sx={{ fontSize: 28 }} />
            <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
              User Registration
            </Typography>
          </Box>
        </Card>
      </Box>

      <Graph />
    </Box>
  );
}

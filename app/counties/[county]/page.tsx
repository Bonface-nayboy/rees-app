"use client";
import Constituencies from "@/src/containers/counties/Constituencies";
import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

function Home() {
  const params = useParams();
  const countyId = params.county as string;
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="primary"
      href="/counties"
      onClick={() => {}}
    >
      Counties
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="primary"
      href={`/counties/${countyId}`}
      onClick={() => {}}
    >
      {countyId}
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      Nairobi
    </Typography>,
  ];
  return (
    <Box width="100%">
      <Stack spacing={2} sx={{ padding: 2 }}>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" color="info" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Constituencies countyId={countyId}/>
    </Box>
  );
}

export default Home;

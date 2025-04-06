"use client";

import Wards from "@/src/containers/counties/wards";
import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";

function Home() {
  const param = useParams();
  const { id, county } = param as {
    id: string;
    county: string;
  };
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
      href={`/counties/${county}`}
      onClick={() => {}}
    >
      {county}
    </Link>,
    <Link
      underline="hover"
      key="1"
      color="primary"
      href="/counties"
      onClick={() => {}}
    >
      Constituencies
    </Link>,
    <Typography key="3" sx={{ color: "text.primary" }}>
      {id}
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

      <Wards id={id} />
    </Box>
  );
}

export default Home;

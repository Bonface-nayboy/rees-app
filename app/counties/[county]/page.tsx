"use client";
import Constituencies from "@/src/containers/counties/Constituencies";
import { NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Link, Stack } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export interface countytype {
  id: string;
  name: string;
}

function Home() {
  const params = useParams();
  const countyId = params.county as string;
  const [countyData, setCountyData] = useState<countytype>();
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
      {countyData?.name}
    </Link>,
  ];

  useEffect(() => {
    const fetchCountyById = async (id: string) => {
      try {
        const res = await fetch(`/api/counties/${id}`);
        if (!res.ok) throw new Error("Failed to fetch county");
        const data = await res.json();
        setCountyData(data);
      } catch (error) {
        console.error("Error fetching county: ", error);
      }
    };

    fetchCountyById(countyId);
  }, [countyId]);
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
      <Constituencies countyId={countyId} />
    </Box>
  );
}

export default Home;

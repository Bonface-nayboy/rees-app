import Counties from "@/src/containers/counties";
import { countiesType } from "@/src/interfaces/counties";
import { connectToDatabase } from "@/src/lib/mongodb";
import { County } from "@/src/models/County";
import { Box } from "@mui/material";
import React from "react";

async function Home() {
  await connectToDatabase();
  const counties = await County.find().lean();
  const clientCounties = JSON.parse(JSON.stringify(counties)) as countiesType[];
  return (
    <Box width="100%">
      <Counties counties={clientCounties} />
    </Box>
  );
}

export default Home;

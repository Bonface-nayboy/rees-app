"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { useRouter } from "next/navigation";
import { countiesType } from "@/src/interfaces/counties";

function SelectActionCard({ counties }:{counties:countiesType[]}) {
  const router = useRouter();
  const [selectedCard, setSelectedCard] = React.useState("");
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
      }}
    >
      {counties?.map((county) => (
        <Card
          key={county._id}
          onClick={() => router.push(`/counties/${county._id}`)}
        >
          <CardActionArea
            onClick={() => setSelectedCard(county?._id)}
            data-active={selectedCard === county?._id ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h5" component="div">
                {county?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {county?.region}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default SelectActionCard;

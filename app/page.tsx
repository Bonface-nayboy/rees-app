import { Box } from "@mui/material";

import Cards from "./dashboard/cards";

export default function Home() {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Cards />
      </Box>
    </Box>
  );
}

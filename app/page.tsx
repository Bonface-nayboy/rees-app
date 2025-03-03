import { Box } from "@mui/material";

import Cards from "./dashboard/cards";
import Dashboard from "./dashboard/dashboard";

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

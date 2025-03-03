import Box from "@mui/material/Box";

export default function BackgroundImageBox() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh", // Adjust as needed
        backgroundImage: "url('/analysis1.png')",
        backgroundSize: "contain", // Ensures the image covers the whole area
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

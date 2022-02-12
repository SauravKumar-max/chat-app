import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { MessageBoxProps } from "../components.types";

export function UserMessageBox({ text, sender, index }: MessageBoxProps) {
  return (
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Box sx={{ width: "30%" }}></Box>
      <Typography
        sx={{
          width: "fit-content",
          fontSize: "1.1rem",
          background: "#cbccfd",
          padding: "0.4rem 1.2rem",
          margin: "0.5rem 1.5rem 0 2rem",
          borderRadius: "6px",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

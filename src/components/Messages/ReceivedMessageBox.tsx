import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import { MessageBoxProps } from "../components.types";

export function ReceivedMessageBox({ text, sender, index }: MessageBoxProps) {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      sx={{ width: "70%", margin: "0.5rem 2rem 0 1rem" }}
    >
      <Avatar
        alt={sender.name}
        src={sender.pic}
        sx={{ width: 35, height: 35, border: "solid 1px #b6b6bc" }}
      />
      <Typography
        sx={{
          width: "fit-content",
          color: "#fff",
          fontSize: "1.1rem",
          background: "#3d41d7d9",
          padding: "0.4rem 1.2rem",
          borderRadius: "6px",
          marginLeft: "2.6rem",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}

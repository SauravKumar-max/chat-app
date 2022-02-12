import React from "react";
import { Drawer, Stack, Box, IconButton, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ProfileProps } from "../components.types";
import { useAuth } from "../../context";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileInfo } from "./ProfileInfo";

export function ProfileDrawer({ openProfile, setOpenProfile }: ProfileProps) {
  const { authState } = useAuth();
  const { name, pic, about } = authState.userDetails || {};
  return (
    <Drawer
      anchor={"left"}
      open={openProfile}
      onClose={() => setOpenProfile(false)}
      PaperProps={{
        sx: { width: { xs: 1, sm: 350 } },
      }}
    >
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={3}
          sx={{ m: 2 }}
        >
          <IconButton color="inherit" onClick={() => setOpenProfile(false)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="initial"
            sx={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            Profile
          </Typography>
        </Stack>
        <Stack direction={"column"} alignItems={"center"}>
          <ProfileAvatar name={name!} pic={pic!} fromGroup={false} />
          <ProfileInfo name={name!} about={about!} />
        </Stack>
      </Box>
    </Drawer>
  );
}

import React from "react";
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Avatar,
  Drawer,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { ChatInfoProps } from "../components.types";
import { useAuth, useChat } from "../../context";
import { chatUserDetails } from "../../utils";

export function ChatDrawer({ openChatInfo, setOpenChatInfo }: ChatInfoProps) {
  const { authState } = useAuth();
  const { _id: userId } = authState?.userDetails || {};
  const { chatState } = useChat();
  const { activeChat } = chatState;

  return (
    <Drawer
      anchor={"right"}
      open={openChatInfo}
      onClose={() => setOpenChatInfo(false)}
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
          <IconButton color="inherit" onClick={() => setOpenChatInfo(false)}>
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="initial"
            sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Chat Info
          </Typography>
        </Stack>
        <Stack direction={"column"} alignItems={"center"}>
          <Avatar
            alt={chatUserDetails(activeChat?.users!, userId!).name}
            src={chatUserDetails(activeChat?.users!, userId!).pic}
            sx={{ width: 200, height: 200, border: "solid 1px #b6b6bc" }}
          />
          <Box sx={{ mt: 3, width: "70%" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
              Name
            </Typography>
            <Typography
              sx={{
                marginBottom: "2rem",
                color: "text.secondary",
                fontWeight: "bold",
              }}
            >
              {chatUserDetails(activeChat?.users!, userId!).name}
            </Typography>

            <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
              About
            </Typography>
            <Typography
              sx={{
                marginBottom: "2rem",
                color: "text.secondary",
                fontWeight: "bold",
              }}
            >
              {chatUserDetails(activeChat?.users!, userId!).about}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}

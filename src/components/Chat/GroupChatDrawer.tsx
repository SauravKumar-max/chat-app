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
import { GroupChatInfoProps } from "../components.types";
import { useChat } from "../../context";

export function GroupChatDrawer({
  openGroupChatInfo,
  setOpenGroupChatInfo,
}: GroupChatInfoProps) {
  const { chatState } = useChat();
  const { admin, groupName, groupPic, users } = chatState.activeChat || {};
  return (
    <Drawer
      anchor={"right"}
      open={openGroupChatInfo}
      onClose={() => setOpenGroupChatInfo(false)}
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
          <IconButton
            color="inherit"
            onClick={() => setOpenGroupChatInfo(false)}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="initial"
            sx={{ fontSize: "1.3rem", fontWeight: "bold" }}
          >
            Group Info
          </Typography>
        </Stack>
        <Stack direction={"column"} alignItems={"center"}>
          <Avatar
            alt={groupName}
            src={groupPic}
            sx={{ width: 200, height: 200, border: "solid 1px #b6b6bc" }}
          />

          <Box sx={{ mt: 3, width: "70%" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
              Group Name
            </Typography>
            <Typography
              sx={{
                marginBottom: "2rem",
                color: "text.secondary",
                fontWeight: "bold",
              }}
            >
              {groupName}
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
              Members
            </Typography>
            <Stack direction={"column-reverse"}>
              {users?.map((user) => (
                <Stack
                  key={user._id}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  spacing={1}
                  sx={{ py: 1 }}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Avatar
                      alt={user.name}
                      src={user.pic}
                      sx={{
                        width: 40,
                        height: 40,
                        border: "solid 1px #b6b6bc",
                      }}
                    />
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontWeight: "bold",
                      }}
                    >
                      {user.name}
                    </Typography>
                  </Stack>
                  {user._id === admin && (
                    <Typography
                      sx={{
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                        color: "#3d41d7",
                        border: "solid 1px #3d41d7",
                        padding: "0.2rem 1rem",
                        borderRadius: "1rem",
                      }}
                    >
                      admin
                    </Typography>
                  )}
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
}

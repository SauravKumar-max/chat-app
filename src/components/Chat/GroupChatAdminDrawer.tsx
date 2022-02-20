import React, { useState } from "react";
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Avatar,
  Drawer,
  TextField,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { GroupChatInfoProps } from "../components.types";
import { useChat } from "../../context";
import { ProfileAvatar } from "../Profile/ProfileAvatar";
import { useChatCalls } from "../../hooks";

export function GroupChatAdminDrawer({
  openGroupChatInfo,
  setOpenGroupChatInfo,
}: GroupChatInfoProps) {
  const { chatState } = useChat();
  const { _id, groupName, groupPic, users, admin } = chatState.activeChat || {};
  const [editGroupName, setEditGroupName] = useState(false);
  const [updateGroupName, setUpdateGroupName] = useState(groupName);
  const { changeGroupName } = useChatCalls();

  function updateGroupHandler() {
    changeGroupName(_id!, updateGroupName!);
    setEditGroupName(false);
  }

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
          <ProfileAvatar pic={groupPic!} name={groupName!} fromGroup={true} />

          <Box sx={{ mt: 3, width: "70%" }}>
            <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
              Group Name
            </Typography>
            {editGroupName ? (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ marginBottom: "2rem" }}
              >
                <TextField
                  variant="standard"
                  value={updateGroupName}
                  sx={{ width: 1 }}
                  onChange={(e) => setUpdateGroupName(e.target.value)}
                />
                <IconButton
                  color="primary"
                  aria-label="save picture"
                  component="span"
                  onClick={updateGroupHandler}
                >
                  <CheckIcon />
                </IconButton>
              </Stack>
            ) : (
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                sx={{ width: "15rem", marginBottom: "2rem" }}
              >
                <Typography>{updateGroupName}</Typography>
                <IconButton
                  color="primary"
                  aria-label="save picture"
                  component="span"
                  onClick={() => setEditGroupName(true)}
                >
                  <EditIcon />
                </IconButton>
              </Stack>
            )}
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

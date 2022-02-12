import React from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { SkeletonCard } from "../SkeletonCard";
import { useAuth, useChat } from "../../context";

export function ChatList() {
  const { loader, chatState, dispatchChat } = useChat();
  const { activeChat, chats } = chatState;
  const { authState } = useAuth();
  const { _id: userId } = authState.userDetails || {};
  const skeleton: number[] = [1, 2, 3, 4, 5, 6, 7];

  return (
    <Box
      sx={{
        overflowY: "scroll",
        height: "100vh",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        borderRight: "solid 1px #b6b6bc",
      }}
    >
      <Box sx={{ mt: 8, borderBottom: "solid 1px #b6b6bc" }}></Box>
      {loader &&
        skeleton.map((_, index: number) => <SkeletonCard key={index} />)}

      {!loader &&
        chats?.map((chat) => (
          <Stack
            key={chat._id}
            direction={"row"}
            alignItems={"center"}
            spacing={2}
            sx={{
              p: 2,
              borderBottom: "solid 1px #b6b6bc",
              width: 1,
              cursor: "pointer",
              "&:hover": {
                background: "#d4d4db9e",
              },
              background: activeChat?._id === chat._id ? "#d4d4db9e" : "#fff",
            }}
            onClick={() => dispatchChat({ type: "ACTIVE_CHAT", payload: chat })}
          >
            <Avatar
              alt={
                chat.isGroup
                  ? chat.groupName
                  : chat?.users.filter((user) => user._id !== userId)[0].name
              }
              src={
                chat.isGroup
                  ? chat.groupPic
                  : chat?.users.filter((user) => user._id !== userId)[0].pic
              }
              sx={{ width: 50, height: 50, border: "solid 1px #b6b6bc" }}
            />
            <Box>
              <Typography sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                {chat.isGroup
                  ? chat.groupName
                  : chat?.users.filter((user) => user._id !== userId)[0].name}
              </Typography>
              <Typography color={"text.secondary"}>
                {chat.latestMessage?.text}
              </Typography>
            </Box>
          </Stack>
        ))}
    </Box>
  );
}

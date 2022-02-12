import React from "react";
import { Grid, Box, Typography, useMediaQuery } from "@mui/material";
import { ChatList, Navbar, Messages } from "../components";
import { useChat } from "../context";

export function Home() {
  const matches = useMediaQuery("(min-width:900px)");
  const { chatState } = useChat();
  return (
    <Box>
      {(!chatState.activeChat || matches) && <Navbar />}
      {matches ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={4}>
              <ChatList />
            </Grid>
            <Grid item xs={8}>
              {chatState.activeChat ? (
                <Messages />
              ) : (
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    m: 25,
                  }}
                >
                  Click on Chats to Start conversation
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      ) : chatState.activeChat ? (
        <Messages />
      ) : (
        <ChatList />
      )}
    </Box>
  );
}

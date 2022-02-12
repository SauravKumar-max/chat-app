import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { Box } from "@mui/material";
import { ReceivedMessageBox } from "./ReceivedMessageBox";
import { UserMessageBox } from "./UserMessageBox";
import { MessageType } from "../components.types";
import { useAuth } from "../../context";

export type ScrollableProps = {
  messages: MessageType[];
};

export function ScrollableMessages({ messages }: ScrollableProps) {
  const { authState } = useAuth();
  const { _id: userId } = authState.userDetails || {};

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "scroll",
        background: "#eff3f7",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        pt: 2,
      }}
    >
      <ScrollableFeed>
        <Box>
          {messages.map(({ _id, text, sender }, index) => {
            if (userId === sender._id) {
              return (
                <UserMessageBox
                  key={_id}
                  text={text}
                  sender={sender}
                  index={index}
                />
              );
            } else {
              return (
                <ReceivedMessageBox
                  key={_id}
                  text={text}
                  sender={sender}
                  index={index}
                />
              );
            }
          })}
        </Box>
      </ScrollableFeed>
    </Box>
  );
}

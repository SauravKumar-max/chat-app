import React, { useEffect, useState, KeyboardEvent, ChangeEvent } from "react";
import { Box, Stack, TextField, CircularProgress } from "@mui/material";
import { ScrollableMessages, ChatHeader } from "../index";
import { useAuth, useChat } from "../../context";
import { MessageType } from "../components.types";
import { chatUserDetails } from "../../utils";
import { io } from "socket.io-client";
import axios from "axios";

let socket: any;

export function Messages() {
  const { authState } = useAuth();
  const { _id: userId } = authState?.userDetails || {};
  const { chatState, dispatchChat } = useChat();
  const { activeChat } = chatState;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const uri = process.env.RREACT_APP_API_URL!;
    socket = io(uri);
    socket.emit("setup", userId);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [userId]);

  useEffect(() => {
    if (activeChat) {
      (async () => {
        setLoader(true);
        try {
          const api =
            process.env.REACT_APP_API_URL + `/message/${activeChat._id}`;
          const { data } = await axios.get(api);
          setLoader(false);
          setMessages(data.messages);
          socket.emit("join chat", activeChat._id);
        } catch (error) {
          setLoader(false);
          console.log(error);
        }
      })();
    }

    return () => setNewMessage("");
  }, [activeChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      const { _id, sender, text } = newMessageRecieved;
      setMessages([...messages, newMessageRecieved]);
      dispatchChat({
        type: "UPDATE_LATEST_MESSAGE",
        payload: {
          chatId: activeChat?._id!,
          message: { _id, text, sender: sender._id! },
        },
      });
    });
  });

  const sendMessage = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", activeChat?._id);
      setNewMessage("");
      try {
        const api = process.env.REACT_APP_API_URL + "/message";
        const { data } = await axios.post<{ receiveMessage: MessageType }>(
          api,
          {
            text: newMessage,
            chatId: activeChat?._id,
          }
        );
        socket.emit("new message", data.receiveMessage);
        setMessages([...messages, data.receiveMessage]);
        const { _id, sender, text } = data.receiveMessage;
        dispatchChat({
          type: "UPDATE_LATEST_MESSAGE",
          payload: {
            chatId: activeChat?._id!,
            message: { _id, text, sender: sender._id! },
          },
        });
      } catch (error) {
        console.log({ error });
      }
    }
  };

  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeChat?._id);
    }

    setTimeout(() => {
      if (typing) {
        socket.emit("stop typing", activeChat?._id);
        setTyping(false);
      }
    }, 2000);
  };

  return (
    <Stack direction={"column"} justifyContent={"space-between"} height="100vh">
      <ChatHeader
        isTyping={isTyping}
        name={
          activeChat?.isGroup
            ? activeChat?.groupName
            : chatUserDetails(activeChat?.users!, userId!).name
        }
        pic={
          activeChat?.isGroup
            ? activeChat.groupPic
            : chatUserDetails(activeChat?.users!, userId!).pic
        }
      />
      {loader ? (
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            background: "#eff3f7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <ScrollableMessages messages={messages} />
      )}
      <Box
        sx={{
          margin: "auto",
          width: "100%",
          p: 2,
          background: "#eff3f7",
        }}
      >
        <TextField
          size="small"
          placeholder="Type a message"
          sx={{
            width: "100%",
            background: "#dcdce8a6",
          }}
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={sendMessage}
        />
      </Box>
    </Stack>
  );
}

import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Radio,
  Avatar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { AddChatProps } from "./components.types";
import {
  modalContainer,
  modalHeader,
  textField,
  emptySearchText,
} from "../muistyles";
import { User } from "../context/context.types";
import { useChatCalls } from "../hooks";
import { useAuth, useChat } from "../context";
import { searchUser } from "../utils";
import { excludeExistedChatUsers } from "../utils";

export function AddChatModal({
  openAddChatModal,
  setAddChatOpenModal,
}: AddChatProps) {
  const { chatState } = useChat();
  const { chats } = chatState;
  const { allUsers, authState } = useAuth();
  const { _id: userId } = authState.userDetails || {};
  const [selectUserId, setSelectUserId] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const { loader, createChat } = useChatCalls();
  const newUsersToChat = excludeExistedChatUsers(allUsers, chats, userId!);
  const searchedData: User[] | undefined = searchUser(
    newUsersToChat!,
    searchInput
  );

  function createChatHandler() {
    createChat({
      groupName: "Chat",
      admin: userId!,
      isGroup: false,
      users: [selectUserId, userId!],
    });
    setAddChatOpenModal(false);
  }

  return (
    <div>
      <Modal
        open={openAddChatModal}
        onClose={() => {
          setAddChatOpenModal(false);
          setSearchInput("");
          setSelectUserId("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack direction={"column"} alignItems={"center"} sx={modalContainer}>
          <Typography sx={modalHeader}>Add Chat</Typography>
          <TextField
            size="small"
            placeholder="Search"
            sx={textField}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Box
            sx={{
              width: "100%",
              height: "28vh",
              border: "solid 1px #b6b6bc",
              overflowY: "scroll",
              my: 2,
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {searchedData?.length === 0 && (
              <Typography sx={emptySearchText}>No User Found</Typography>
            )}

            <Box>
              {searchedData?.map((user) => (
                <Stack
                  key={user._id}
                  direction={"row"}
                  alignItems={"center"}
                  spacing={1}
                  sx={{
                    borderBottom: "solid 1px #b6b6bc",
                    p: 1,
                    "&:hover": {
                      background: "#d4d4db9e",
                    },
                  }}
                >
                  <Radio
                    checked={user._id === selectUserId}
                    size="medium"
                    value={user._id}
                    name="radio-buttons"
                    onChange={(e) => setSelectUserId(e.target.value)}
                  />
                  <Stack direction={"row"} alignItems={"center"}>
                    <Avatar
                      src={user.pic}
                      alt={user.name}
                      sx={{
                        width: 35,
                        height: 35,
                        border: "solid 1px #b6b6bc",
                      }}
                    />
                    <Typography sx={{ ml: 1, fontWeight: "bold" }}>
                      {user.name}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Box>
          </Box>
          <Button
            variant="contained"
            disabled={selectUserId ? false : true}
            sx={{ width: "100%", fontWeight: "bold" }}
            onClick={createChatHandler}
          >
            Start Conversation
          </Button>
        </Stack>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 2 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

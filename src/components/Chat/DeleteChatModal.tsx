import React from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { DeleteChatModalProps } from "../components.types";
import { useChatCalls } from "../../hooks";
import { useChat } from "../../context";
import { modalContainer } from "../../muistyles";

export function DeleteChatModal({
  openDeleteModal,
  setOpenDeleteModal,
}: DeleteChatModalProps) {
  const { chatState } = useChat();
  const { activeChat } = chatState;
  const { loader, deleteChat } = useChatCalls();

  function removeHandler() {
    setOpenDeleteModal(false);
    deleteChat(activeChat?._id!);
  }

  return (
    <>
      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalContainer}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h3"
            sx={{ fontWeight: "bold" }}
          >
            Are you sure you want to Delete this{" "}
            {activeChat?.isGroup ? "Group" : "Chat"}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: "1rem" }}>
            <Button
              variant="outlined"
              sx={{ fontWeight: "bold", width: "100%" }}
              onClick={() => setOpenDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ fontWeight: "bold", width: "100%" }}
              onClick={removeHandler}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

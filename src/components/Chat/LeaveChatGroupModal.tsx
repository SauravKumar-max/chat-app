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
import { modalContainer } from "../../muistyles";
import { LeaveGroupModalProps } from "../components.types";
import { useChatCalls } from "../../hooks";
import { useChat } from "../../context";

export function LeaveChatGroupModal({
  openLeaveModal,
  setOpenLeaveModal,
}: LeaveGroupModalProps) {
  const { leaveGroup, loader } = useChatCalls();
  const { chatState } = useChat();
  const { activeChat } = chatState;

  function leaveGroupHandler() {
    leaveGroup(activeChat?._id!);
    setOpenLeaveModal(false);
  }
  return (
    <>
      <Modal
        open={openLeaveModal}
        onClose={() => setOpenLeaveModal(false)}
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
            Are you sure you want to Leave the Group
          </Typography>
          <Stack direction="row" spacing={2} sx={{ marginTop: "1rem" }}>
            <Button
              variant="outlined"
              sx={{ fontWeight: "bold", width: "100%" }}
              onClick={() => setOpenLeaveModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ fontWeight: "bold", width: "100%" }}
              onClick={leaveGroupHandler}
            >
              Leave
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

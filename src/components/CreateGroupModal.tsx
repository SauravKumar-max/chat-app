import React, { useState, ChangeEvent } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  Avatar,
  Checkbox,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { CreateGroupProps } from "./components.types";
import { User } from "../context/context.types";
import { useAuth } from "../context";
import { searchUser } from "../utils";
import { useChatCalls } from "../hooks";
import {
  modalContainer,
  modalHeader,
  textField,
  emptySearchText,
} from "../muistyles";

export function CreateGroupModal({
  openGroupModal,
  setOpenGroupModal,
}: CreateGroupProps) {
  const { allUsers, authState } = useAuth();
  const { _id: userId } = authState.userDetails || {};
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState("");
  const searchedData: User[] = searchUser(allUsers, searchInput) || [];
  const { createChat, loader } = useChatCalls();

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedUsers(
      selectedUsers.includes(value)
        ? selectedUsers.filter((id) => id !== value)
        : [...selectedUsers, value]
    );
  };

  function createGroupHandler() {
    createChat({
      groupName: groupName,
      admin: userId!,
      isGroup: true,
      users: [...selectedUsers, userId!],
    });
    setOpenGroupModal(false);
  }

  return (
    <>
      <Modal
        open={openGroupModal}
        onClose={() => setOpenGroupModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack direction={"column"} alignItems={"center"} sx={modalContainer}>
          <Typography sx={modalHeader}>Create Group Chat</Typography>
          <TextField
            size="small"
            placeholder="Groupe Name"
            sx={{ ...textField, mb: 2 }}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            size="small"
            placeholder="Search"
            sx={{ ...textField, mb: 2 }}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Box
            sx={{
              width: "100%",
              height: "28vh",
              border: "solid 1px #b6b6bc",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {searchedData.length === 0 ? (
              <Typography sx={emptySearchText}>No User Found</Typography>
            ) : (
              <Box>
                {searchedData?.map((user) => (
                  <Stack
                    key={user._id}
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ borderBottom: "solid 1px #b6b6bc", p: 1 }}
                  >
                    <Checkbox
                      size="medium"
                      value={user._id}
                      checked={selectedUsers.includes(user._id) ? true : false}
                      onChange={handleCheck}
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
            )}
          </Box>
          {/* <Grid container sx={{ mt: 1 }}>
            {selectedUsers.map((id) => (
              <Grid
                item
                key={id}
                sx={{
                  background: "#3d41d7",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: "#fff",
                  padding: "5px 8px",
                  borderRadius: "15px",
                  margin: "4px",
                }}
              >
                Saurav Kumar
              </Grid>
            ))}
          </Grid> */}
          <Button
            disabled={groupName && selectedUsers.length > 0 ? false : true}
            variant="contained"
            sx={{ width: "100%", fontWeight: "bold", mt: 1 }}
            onClick={createGroupHandler}
          >
            Create Group
          </Button>
        </Stack>
      </Modal>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 2 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

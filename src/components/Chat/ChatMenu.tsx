import React, { useState } from "react";
import { Typography, Menu, MenuItem } from "@mui/material";
import { MenuProps } from "../components.types";
import {
  ChatDrawer,
  GroupChatDrawer,
  DeleteChatModal,
  LeaveChatGroupModal,
  GroupChatAdminDrawer,
} from "../index";
import { useChat, useAuth } from "../../context";

export function ChatMenu({ menuAnchorEl, setMenuAnchorEl }: MenuProps) {
  const [openChatInfo, setOpenChatInfo] = useState(false);
  const [openGroupChatInfo, setOpenGroupChatInfo] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const { authState } = useAuth();
  const { _id: userId } = authState.userDetails || {};
  const { chatState } = useChat();
  const { activeChat } = chatState;

  const handleCloseUserMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenUserInfo = () => {
    setMenuAnchorEl(null);
    activeChat?.isGroup ? setOpenGroupChatInfo(true) : setOpenChatInfo(true);
  };

  const handleDeleteChatModal = () => {
    setOpenDeleteModal(true);
    setMenuAnchorEl(null);
  };

  const handleLeaveModal = () => {
    setOpenLeaveModal(true);
    setMenuAnchorEl(null);
  };

  return (
    <>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={menuAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleOpenUserInfo}>
          <Typography>
            {activeChat?.isGroup ? "Group Info" : "Chat Info"}
          </Typography>
        </MenuItem>
        {activeChat?.isGroup && (
          <MenuItem onClick={handleLeaveModal}>
            <Typography>Leave Group</Typography>
          </MenuItem>
        )}

        {!activeChat?.isGroup && (
          <MenuItem onClick={handleDeleteChatModal}>
            <Typography>Delete Chat</Typography>
          </MenuItem>
        )}

        {activeChat?.isGroup && activeChat?.admin === userId && (
          <MenuItem onClick={handleDeleteChatModal}>
            <Typography>Delete Group</Typography>
          </MenuItem>
        )}
      </Menu>

      {activeChat?.isGroup ? (
        activeChat.admin === userId ? (
          <GroupChatAdminDrawer
            openGroupChatInfo={openGroupChatInfo}
            setOpenGroupChatInfo={setOpenGroupChatInfo}
          />
        ) : (
          <GroupChatDrawer
            openGroupChatInfo={openGroupChatInfo}
            setOpenGroupChatInfo={setOpenGroupChatInfo}
          />
        )
      ) : (
        <ChatDrawer
          openChatInfo={openChatInfo}
          setOpenChatInfo={setOpenChatInfo}
        />
      )}

      <LeaveChatGroupModal
        openLeaveModal={openLeaveModal}
        setOpenLeaveModal={setOpenLeaveModal}
      />

      <DeleteChatModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
    </>
  );
}

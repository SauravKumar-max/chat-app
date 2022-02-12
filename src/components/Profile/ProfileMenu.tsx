import React, { useState } from "react";
import { Typography, Menu, MenuItem } from "@mui/material";
import { MenuProps } from "../components.types";
import { ProfileDrawer, AddChatModal, CreateGroupModal } from "../index";
import { useUserCalls } from "../../hooks";

export function ProfileMenu({ menuAnchorEl, setMenuAnchorEl }: MenuProps) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openAddChatModal, setAddChatOpenModal] = useState(false);
  const [openGroupModal, setOpenGroupModal] = useState(false);
  const { logout } = useUserCalls();

  const handleLogout = () => {
    setMenuAnchorEl(null);
    logout();
  };

  const handleCloseUserMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleProfile = () => {
    setMenuAnchorEl(null);
    setOpenProfile(true);
  };

  const handleAddChat = () => {
    setMenuAnchorEl(null);
    setAddChatOpenModal(true);
  };

  const handleCreateGroup = () => {
    setMenuAnchorEl(null);
    setOpenGroupModal(true);
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
        <MenuItem onClick={handleProfile}>
          <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleAddChat}>
          <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
            Add Chat
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCreateGroup}>
          <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
            Create Group
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center" sx={{ fontWeight: "bold" }}>
            Logout
          </Typography>
        </MenuItem>
      </Menu>

      <ProfileDrawer
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
      <AddChatModal
        openAddChatModal={openAddChatModal}
        setAddChatOpenModal={setAddChatOpenModal}
      />
      <CreateGroupModal
        openGroupModal={openGroupModal}
        setOpenGroupModal={setOpenGroupModal}
      />
    </>
  );
}

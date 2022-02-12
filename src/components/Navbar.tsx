import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { ProfileMenu } from "./index";
import { useAuth } from "../context";

export function Navbar() {
  const { authState } = useAuth();
  const { name, pic } = authState.userDetails || {};
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <ForumIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: "bold" }}
            >
              BlendChat
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Menu">
                <IconButton
                  onClick={handleOpenUserMenu}
                  size={"small"}
                  sx={{ p: 0 }}
                >
                  <Avatar alt={name} src={pic} sx={{ width: 30, height: 30 }} />
                </IconButton>
              </Tooltip>
              <ProfileMenu
                menuAnchorEl={menuAnchorEl}
                setMenuAnchorEl={setMenuAnchorEl}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

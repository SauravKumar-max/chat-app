import React, { useState } from "react";
import { Avatar, Stack, IconButton, Typography, Box } from "@mui/material";
import { HeaderProps } from "../components.types";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ChatMenu } from "./ChatMenu";
import { useChat } from "../../context";

export function ChatHeader({ isTyping, name, pic }: HeaderProps) {
  const { dispatchChat } = useChat();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  return (
    <Stack
      sx={{ mt: { ms: 0, md: 8 }, py: 2, borderBottom: "solid 1px #b6b6bc" }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton
            color="inherit"
            sx={{ display: { sm: "block", md: "none" } }}
            onClick={() => dispatchChat({ type: "ACTIVE_CHAT", payload: null })}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <Avatar
            alt={name}
            src={pic}
            sx={{ width: 50, height: 50, border: "solid 1px #b6b6bc", mx: 2 }}
          />
          <Box>
            <Typography sx={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              {name}
            </Typography>
            {isTyping && <p>Typing...</p>}
          </Box>
        </Stack>
        <Box>
          <IconButton color="inherit" onClick={handleOpenUserMenu}>
            <MoreVertIcon />
          </IconButton>

          <ChatMenu
            menuAnchorEl={menuAnchorEl}
            setMenuAnchorEl={setMenuAnchorEl}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

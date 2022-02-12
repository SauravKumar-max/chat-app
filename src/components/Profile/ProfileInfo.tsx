import React, { useState } from "react";
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { ProfileInfoProps } from "../components.types";
import { useUserCalls } from "../../hooks";

export function ProfileInfo({ name, about }: ProfileInfoProps) {
  const [editName, setEditName] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  const [updateName, setUpdateName] = useState(name);
  const [updateAbout, setUpdateAbout] = useState(about);
  const { updateProfileCall } = useUserCalls();

  const updateNameHandler = () => {
    setEditName(false);
    updateProfileCall({ name: updateName || "" });
  };

  const updateAboutHandler = () => {
    setEditAbout(false);
    updateProfileCall({ about: updateAbout || "" });
  };

  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
        Your Name
      </Typography>
      {editName ? (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ marginBottom: "2rem" }}
        >
          <TextField
            variant="standard"
            value={updateName}
            sx={{ width: 1 }}
            onChange={(e) => setUpdateName(e.target.value)}
          />
          <IconButton
            color="primary"
            aria-label="save picture"
            component="span"
            onClick={updateNameHandler}
          >
            <CheckIcon />
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "15rem", marginBottom: "2rem" }}
        >
          <Typography>{name}</Typography>
          <IconButton
            color="primary"
            aria-label="save picture"
            component="span"
            onClick={() => setEditName(true)}
          >
            <EditIcon />
          </IconButton>
        </Stack>
      )}

      <Typography sx={{ fontSize: "0.9rem", color: "#3d41d7" }}>
        About
      </Typography>
      {editAbout ? (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ marginBottom: "2rem" }}
        >
          <TextField
            variant="standard"
            value={updateAbout}
            sx={{ width: 1 }}
            onChange={(e) => setUpdateAbout(e.target.value)}
          />
          <IconButton
            color="primary"
            aria-label="save picture"
            component="span"
            onClick={updateAboutHandler}
          >
            <CheckIcon />
          </IconButton>
        </Stack>
      ) : (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "15rem", marginBottom: "2rem", py: 1 }}
        >
          <Typography>{about}</Typography>
          <IconButton
            color="primary"
            aria-label="save picture"
            component="span"
            onClick={() => setEditAbout(true)}
          >
            <EditIcon />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
}

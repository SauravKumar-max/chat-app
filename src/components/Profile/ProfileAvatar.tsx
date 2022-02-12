import React, { useState } from "react";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Avatar, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProfileAvatarProps } from "../components.types";
import { useChatCalls, useUserCalls } from "../../hooks";
import { useChat } from "../../context";

const Input = styled("input")({
  display: "none",
});

export function ProfileAvatar({ name, pic, fromGroup }: ProfileAvatarProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { chatState } = useChat();
  const { activeChat } = chatState;
  const { updateProfileCall } = useUserCalls();
  const { updateGroupPic } = useChatCalls();

  function uploadImage() {
    if (imageFile) {
      setLoading(true);
      const data = new FormData();
      data.append("file", imageFile);
      data.append("upload_preset", "g572gaur");
      data.append("cloud_name", "dizuhgwch");
      fetch("https://api.cloudinary.com/v1_1/dizuhgwch/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          if (fromGroup) {
            updateGroupPic(activeChat?._id!, data.url);
          } else {
            updateProfileCall({ pic: data.url || {} });
          }
          setLoading(false);
          setImageFile(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div>
      <Box sx={{ position: "relative", my: 1 }}>
        <Avatar
          alt={name}
          src={imageFile ? URL.createObjectURL(imageFile) : pic}
          sx={{ width: 200, height: 200, border: "solid 1px #b6b6bc" }}
        />
        {imageFile && (
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 1,
              background: "#3d41d7",
              borderRadius: "50%",
            }}
          >
            <IconButton
              color="secondary"
              aria-label="save picture"
              component="span"
              onClick={() => setImageFile(null)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 1,
            background: "#3d41d7",
            borderRadius: "50%",
          }}
        >
          {imageFile ? (
            <IconButton
              color="secondary"
              aria-label="save picture"
              component="span"
              onClick={uploadImage}
            >
              {loading ? (
                <CircularProgress size={24} color="secondary" />
              ) : (
                <UploadIcon />
              )}
            </IconButton>
          ) : (
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => setImageFile(e.target.files![0])}
              />
              <IconButton
                color="secondary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          )}
        </Box>
      </Box>
    </div>
  );
}

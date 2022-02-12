import React from "react";
import { Stack, Skeleton } from "@mui/material";

export function SkeletonCard() {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={1}
      sx={{ p: 2, borderBottom: "solid 1px #b6b6bc" }}
    >
      <Skeleton animation="wave" variant="circular" width={60} height={50} />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={"100%"}
        height={50}
      />
    </Stack>
  );
}

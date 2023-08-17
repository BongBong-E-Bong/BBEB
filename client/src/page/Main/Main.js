import React from "react";
import { Stack } from "@mui/material";
import Tetris from "../tetris/Tetris";

function Main() {
  return (
    <Stack minHeight="100vh" height="100vh" weight="100%">
      <Tetris />
    </Stack>
  );
}

export default Main;

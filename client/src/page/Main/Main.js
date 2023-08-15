import React from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";
import Tetris from "../../component/tetris";

function Main() {
  return (
    <Stack minHeight="100vh" height="100vh" weight="100%">
      <Header />
      <Tetris />
    </Stack>
  );
}

export default Main;

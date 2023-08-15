import React from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";
import Register from "../../component/register";

function Main() {
  return (
    <Stack minHeight="100vh" height="100vh" weight="100%">
      <Register />
    </Stack>
  );
}

export default Main;

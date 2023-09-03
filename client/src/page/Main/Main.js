import React from "react";
import { Stack } from "@mui/material";
import bongbong from "../../image/bongbong.gif";

function Main() {
  return (
    <Stack minHeight="100vh" height="100vh" weight="100%">
      <img width="100px" height="120px" alt="bongbong" src={bongbong} />
    </Stack>
  );
}

export default Main;

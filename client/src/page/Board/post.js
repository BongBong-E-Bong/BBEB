import React from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";

function Post() {
  return (
    <>
      <Header />
      <Stack
        minHeight="100vh"
        height="100vh"
        width="100%"
        justifyContent="center"
        alignItems="center"
        paddingTop="100px"
      >
        <Stack width="373px" height="28px" bgcolor="#FFDEDE"></Stack>
        <Stack width="1314px" minHeight="800px" bgcolor="#FAF3F0"></Stack>
      </Stack>
    </>
  );
}

export default Post;

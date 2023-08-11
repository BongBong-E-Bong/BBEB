import React from "react";
import { Stack } from "@mui/material";
import AuthModalSuccess from "../../component/authModal_success";
import AuthModalFail from "../../component/authModal_fail";
import Login from "../../component/login";

function Main() {
  return (
    <Stack minHeight="100vh" height="100vh" weight="100%">
      <AuthModalSuccess />
      {/* <AuthModalFail /> */}
      {/* <Login /> */}
    </Stack>
  );
}

export default Main;

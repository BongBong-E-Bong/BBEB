import React from "react";
import { Stack } from "@mui/material";
import bbeblogo from "../image/bbeblogo.png";
// import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <Stack
      bgcolor="black"
      width="100%"
      height="80px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <img src={bbeblogo} alt="logo" width="150px" height="55px" />
      <Stack bgcolor="red" width="30px" height="30px"></Stack>
    </Stack>
  );
}

export default Header;

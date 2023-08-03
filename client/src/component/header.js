import React from "react";
import { Stack } from "@mui/material";
import bbeblogo from "../image/bbeblogo.png";
import profilephoto from "../image/profilephoto.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <Stack
      bgcolor="white"
      width="100%"
      height="80px"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <img
        src={bbeblogo}
        alt="logo"
        width="150px"
        height="50px"
        style={{ cursor: "pointer", marginLeft: "60px" }}
        onClick={() => {
          navigate("/");
        }}
      />
      <Stack style={{ marginRight: "60px" }}>
        {/* <Stack //로그인X
          width="150px"
          height="30px"
          direction="row"
          justifyContent="space-between"
        >
          <Stack style={{ cursor: "pointer" }}>로그인</Stack>
          <Stack>|</Stack>
          <Stack style={{ cursor: "pointer" }}>회원 가입</Stack>
        </Stack> */}
        <Stack>
          <img
            src={profilephoto}
            alt="profilephoto"
            width="60px"
            height="60px"
            style={{ cursor: "pointer" }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Header;

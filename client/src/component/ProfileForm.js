import React from "react";
import { Stack } from "@mui/material";
import Header from "./header";
import Comment from "./comment";

function ProfileForm() {
  return (
    <>
      <Header />
      <Stack
        minHeight="100vh"
        height="fit-content"
        width="100%"
        alignItems="center"
      >
        <Stack marginTop="18vh" width="70%" height="3vh">
          <Stack
            bgcolor="#FFDEDE"
            width="25%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            style={{ fontSize: "36px", cursor: "pointer" }}
          >
            이봉이 형제 프로필
          </Stack>
        </Stack>
        <Stack
          width="70%"
          height="12vh"
          bgcolor="#FAF3F0"
          marginTop="1vh"
        ></Stack>
        <Stack
          width="70%"
          minHeight="40vh"
          height="fit-content"
          bgcolor="#FAF3F0"
          justifyContent="center"
          alignItems="center"
        >
          <Stack
            width="80%"
            minHeight="40vh"
            height="fit-content"
            bgcolor="white"
            style={{
              border: "1px solid",
              borderColor: "#ff8181",
              padding: "10px",
            }}
          ></Stack>
        </Stack>
        <Comment />
      </Stack>
    </>
  );
}

export default ProfileForm;

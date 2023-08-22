import React from "react";
import { Stack } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";

function Sevenbong() {
  const scrollRef = React.useRef(null);

  const scrollClick = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <ProfileForm>
        <Stack width="50%" height="1000px" bgcolor="gray"></Stack>
        <Stack width="50%" height="1000px" bgcolor="pink"></Stack>
        <Stack ref={scrollRef}></Stack>
      </ProfileForm>
      <Comment />
      <Stack
        position="fixed"
        top="35%"
        right="7%"
        color="#D47E7E"
        style={{
          cursor: " pointer",
          fontSize: "20px",
          textDecoration: "underline",
        }}
        gap="15px"
      >
        <Stack>일봉이 소개</Stack>
        <Stack>✨일봉이 tmi</Stack>
        <Stack onClick={scrollClick}>댓글</Stack>
      </Stack>
    </>
  );
}

export default Sevenbong;

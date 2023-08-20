import React from "react";
import { Stack } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";

function Onebong() {
  const scrollRef = React.useRef(null);

  const scrollClick = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <ProfileForm>
        <Stack
          width="50%"
          height="1000px"
          bgcolor="gray"
          onClick={scrollClick}
        ></Stack>
        <Stack width="50%" height="1000px" bgcolor="pink"></Stack>
        <Stack ref={scrollRef}></Stack>
      </ProfileForm>
      <Stack>
        <Stack>일봉이 소개</Stack>
        <Stack>일봉이 tmi</Stack>
        <Stack>댓글</Stack>
      </Stack>
    </>
  );
}

export default Onebong;

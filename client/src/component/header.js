import React from "react";
import { Stack } from "@mui/material";
import bbeblogo from "../image/bbeblogo.png";
import profilephoto from "../image/profilephoto.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Stack
        bgcolor="white"
        width="100%"
        height="80px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
      >
        <img
          src={bbeblogo}
          alt="logo"
          width="150px"
          height="40px"
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
              onClick={menuOpen}
            />
          </Stack>
        </Stack>
      </Stack>
      {isOpen && (
        <Stack padding="80px 0px 0px 1635px">
          {/* 이슈: absolute로 할 경우 스크롤시 같이 내려가버림 */}
          <Stack
            bgcolor="white"
            width="220px"
            height="270px"
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            padding="20px 0px 20px 0px"
            position="fixed"
          >
            <img
              src={profilephoto}
              alt="profilephoto"
              width="150px"
              height="150px"
            />
            <Stack direction="row">
              <Stack style={{ fontWeight: "bold", fontSize: "20px" }}>
                일봉이
              </Stack>
              <Stack style={{ fontSize: "20px" }}>님</Stack>
            </Stack>
            <Stack style={{ cursor: "pointer" }}>프로필 사진 바꾸기</Stack>
            <Stack style={{ cursor: "pointer" }}>내가 작성한 글</Stack>
            <Stack style={{ cursor: "pointer" }}>로그 아웃</Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default Header;

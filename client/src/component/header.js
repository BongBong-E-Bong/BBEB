import React from "react";
import { Stack } from "@mui/material";
import bbeblogo from "../image/bbeblogo.png";
import basicProfile from "../image/profilephoto.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuOpen = () => {
    setIsOpen(!isOpen);
  };
  const [profileImage, setprofileImage] = React.useState(basicProfile);

  const fileInput = React.useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setprofileImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
          {/* <Stack //로그인X일 때
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
              alt="profileImage"
              src={profileImage}
              width="60px"
              height="60px"
              style={{ cursor: "pointer", borderRadius: "50%" }}
              onClick={menuOpen}
            />
          </Stack>
        </Stack>
      </Stack>
      {isOpen && (
        <Stack padding="80px 0px 0px 1635px">
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
              src={profileImage}
              alt="profileImage"
              width="150px"
              height="150px"
            />
            <Stack direction="row">
              <Stack style={{ fontWeight: "bold", fontSize: "20px" }}>
                일봉이
              </Stack>
              <Stack style={{ fontSize: "20px" }}>님</Stack>
            </Stack>
            <Stack
              style={{ cursor: "pointer" }}
              onClick={() => {
                fileInput.current.click();
              }}
            >
              프로필 사진 바꾸기
            </Stack>
            <input
              type="file"
              style={{ display: "none" }}
              accept="image/*,.jpg,.png,.jpeg"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
            <Stack style={{ cursor: "pointer" }}>내가 작성한 글</Stack>
            <Stack style={{ cursor: "pointer" }}>로그 아웃</Stack>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default Header;

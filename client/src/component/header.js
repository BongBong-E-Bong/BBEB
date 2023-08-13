import React from "react";
import { Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import bbeblogo from "../image/bbeblogo.png";
import basicProfile from "../image/profilephoto.png";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const login = true;

  return (
    <>
      <Stack
        bgcolor="white"
        width="100%"
        height="10%"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        boxShadow="0px 10px 20px -10px #EAEAEA"
      >
        <img
          src={bbeblogo}
          alt="logo"
          width="9%"
          height="50%"
          style={{ cursor: "pointer", marginLeft: "5%" }}
          onClick={() => {
            navigate("/");
          }}
        />
        <Stack
          width="30%"
          height="100%"
          style={{ marginRight: "5%" }}
          justifyContent="center"
          alignItems="flex-end"
        >
          {login ? (
            <Stack width="12%" height="70%">
              <img
                alt="profileImage"
                src={profileImage}
                width="100%"
                height="100%"
                style={{ cursor: "pointer", borderRadius: "50%" }}
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Stack>
          ) : (
            <Stack
              width="50%"
              height="10%"
              alignItem="flex-end"
              justifyContent="center"
              direction="row"
              gap="10%"
            >
              <Stack style={{ cursor: "pointer", fontSize: "150%" }}>
                로그인
              </Stack>
              <Stack style={{ fontSize: "150%" }}>|</Stack>
              <Stack style={{ cursor: "pointer", fontSize: "150%" }}>
                회원 가입
              </Stack>
            </Stack>
          )}
        </Stack>
      </Stack>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ width: "80%" }}
      >
        <Stack alignItems="center">
          <img
            alt="profileImage"
            src={profileImage}
            width="80%"
            height="70%"
            style={{ borderRadius: "50%" }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          marginTop="7%"
          marginBottom="3%"
        >
          <Stack style={{ fontSize: "130%", fontWeight: "bold" }}>일봉이</Stack>
          {/* 닉네임 */}
          <Stack style={{ fontSize: "130%" }}>님</Stack>
        </Stack>
        <MenuItem
          onClick={() => {
            fileInput.current.click();
          }}
        >
          프로필 사진 바꾸기
        </MenuItem>
        <input
          type="file"
          style={{ display: "none" }}
          accept="image/*,.jpg,.png,.jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        />
        <MenuItem>내가 작성한 글</MenuItem>
        <MenuItem>로그아웃</MenuItem>
      </Menu>
    </>
  );
}

export default Header;

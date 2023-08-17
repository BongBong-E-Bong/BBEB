import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import bbeblogo from "../image/bbeblogo.png";
import basicProfile from "../image/profilephoto.png";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import Modal from "./Modal";
import Register from "./Register";
import axios from "axios";

function Header() {
  const navigate = useNavigate();

  const [profileImage, setprofileImage] = React.useState(basicProfile);

  const fileInput = React.useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setprofileImage(reader.result);
        const formData = new FormData();

        formData.append("profile", e.target.files[0]);

        const sendPostRequest = async () => {
          try {
            const response = axios.post(
              "http://13.125.105.202:8080/api/members/profile",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization:
                    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdXN1IiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjkyMTYxMjY1fQ.AC4Uf7acGYTcDIQr9MVeNXcXz2pX6pSq61qAv8a3T0Y",
                },
              }
            );
            console.log(response.data);
            getRequest();
          } catch (error) {
            console.error("Error:", error);
          }
        };

        sendPostRequest();
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

  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    getRequest();
  }, []);

  const getRequest = () => {
    axios
      .get("http://13.125.105.202:8080/api/members/profile", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzb3NvIiwiYXV0aCI6IlJPTEVfTUVNQkVSIiwiZXhwIjoxNjkyMTE1NjQ5fQ.CSLUetbEfZB7Wp2RdhdfOH8PKzMZoAcYDzEChqQJLAE",
        },
      })
      .then((response) => {
        setProfileImg(response.data);
      })
      .catch((error) => {
        console.error("profile img error", error);
      });
  };

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
          width="130px"
          height="35px"
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
            <Stack width="12%" height="70%" justifyContent="center">
              <img
                alt="profileImage"
                src={profileImage}
                width="50px"
                height="50px"
                style={{ cursor: "pointer", borderRadius: "50%" }}
                onClick={handleClick}
              />
            </Stack>
          ) : (
            <Stack
              width="100%"
              height="10%"
              alignItem="center"
              justifyContent="flex-end"
              direction="row"
              gap="4%"
            >
              <Stack
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setLoginOpen(true)}
              >
                로그인
              </Stack>
              <Stack style={{ fontSize: "20px" }}>|</Stack>
              <Stack
                style={{ cursor: "pointer", fontSize: "20px" }}
                onClick={() => setRegisterOpen(true)}
              >
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
            width="110px"
            height="110px"
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
      <Modal
        width="70%"
        height="50%"
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
      >
        <Login />
      </Modal>
      <Modal
        width="70%"
        height="50%"
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      >
        <Register />
      </Modal>
    </>
  );
}

export default Header;

import React, { useState } from "react";

import { Stack, TextField } from "@mui/material";
import bbeblogo from "../image/bbeblogo.png";
import basicProfile from "../image/profilephoto.png";
import { useNavigate } from "react-router-dom";
import register from "../image/register.png";
import axios from 'axios';

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

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const RegisterForm = () => {
    const [formData, setFormData] = useState({
      loginId: 'string',
      password: 'string',
      nickname: 'string',
      email: 'string',
    });
  }

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
      <React.Fragment>
        <Stack
          style={{ position: "fixed", cursor: "pointer", color: "black" }}
          onClick={() => {
            setShowRegisterForm(true); // Show the login form when clicked
          }}>회원가입</Stack>
        {showRegisterForm && (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <Stack position="fixed" width="1230px" height="617px"
              display="flex" direction="row" alignItems="center"
              justifyContent="space-around" bgcolor="#F88C8C" >
              <Stack width="753px" height="598px" justifyContent="center" >
                <img
                  src={register} alt="register icon"
                  width="607px" height="601px"
                />
              </Stack>
              <Stack width="440px" height="598px" justifyContent="center" gap="45px">
                <Stack fontSize="36px" display="flex" marginLeft="100px">Register</Stack>
                <Stack gap="45px">
                  <TextField
                    name="loginId"
                    placeholder={"id를 입력하세요"}
                    multiline
                    maxRows={4}
                    InputProps={{
                      style: { backgroundColor: "white", borderRadius: "20px", width: "341px", height: "40px" }
                    }}
                  />
                  <TextField
                    name="password"
                    placeholder={"비밀번호"}
                    multiline
                    maxRows={4}
                    InputProps={{
                      style: { backgroundColor: "white", borderRadius: "20px", width: "341px", height: "40px" }
                    }}
                  />
                  <TextField
                    placeholder={"비밀번호 다시 입력"}
                    multiline
                    maxRows={4}
                    InputProps={{
                      style: { backgroundColor: "white", borderRadius: "20px", width: "341px", height: "40px" }
                    }}
                  />
                  <TextField
                    name="nickname"
                    placeholder={"닉네임"}
                    multiline
                    maxRows={4}
                    InputProps={{
                      style: { backgroundColor: "white", borderRadius: "20px", width: "341px", height: "40px" }
                    }}
                  />
                  <TextField
                    name="email"
                    placeholder={"이메일"}
                    multiline
                    maxRows={4}
                    InputProps={{
                      style: { backgroundColor: "white", borderRadius: "20px", width: "341px", height: "40px" }
                    }}
                  />
                </Stack>
                <Stack
                  bgcolor="#D76464"
                  style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "341px", height: "33px", alignItems: "center", justifyContent: "center", boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.3)" }}
                  onClick={() => {
                    // 클릭 이벤트 처리 코드를 여기에 추가
                  }}>REGISTER</Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </React.Fragment >
      {/* <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="926px" height="573px"
          display="flex" alignItems="center"
          justifyContent="space-around" bgcolor="#F88C8C" boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)">
          <Stack width="906px" height="553px" bgcolor="white" justifyContent="center" alignItems="center" gap="20px">
            <Stack fontSize="55px">회원 가입 성공~!</Stack>
            <img
              src={register} alt="register icon"
              width="266px" height="232px"
            />
            <Stack fontSize="32px">환영해용!!</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "199px", height: "75px", alignItems: "center", justifyContent: "center", fontSize: "32px", boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)" }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가
              }}
            >확 인</Stack>
          </Stack>
        </Stack>
      </Stack> */}
      {/* <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="926px" height="573px"
          display="flex" alignItems="center"
          justifyContent="space-around" bgcolor="#F88C8C" boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)">
          <Stack width="906px" height="553px" bgcolor="white" justifyContent="center" alignItems="center" gap="20px" >
            <Stack fontSize="55px">로그인 성공~!</Stack>
            <img
              src={register} alt="register icon"
              width="266px" height="232px"
            />
            <Stack fontSize="32px">어서오세용!!</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "199px", height: "75px", alignItems: "center", justifyContent: "center", fontSize: "32px", boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)" }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가
              }}
            >확 인</Stack>
          </Stack>
        </Stack>
      </Stack> */}
      {/* <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="926px" height="573px"
          display="flex" alignItems="center"
          justifyContent="space-around" bgcolor="#F88C8C" boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)" >
          <Stack width="906px" height="553px" bgcolor="#FFC7C7" justifyContent="center" alignItems="center" gap="20px" >
            <Stack fontSize="55px">로그인 실패ㅠㅠㅋ</Stack>
            <img
              src={register} alt="register icon"
              width="266px" height="232px"
            />
            <Stack fontSize="32px">아이디/비밀번호가 틀렸어요!!</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "199px", height: "75px", alignItems: "center", justifyContent: "center", fontSize: "32px", boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)" }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가
              }}
            >확 인</Stack>
          </Stack>
        </Stack>
      </Stack> */}
      {/* <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="926px" height="573px"
          display="flex" alignItems="center"
          justifyContent="space-around" bgcolor="#F88C8C" boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)">
          <Stack width="906px" height="553px" bgcolor="#FFC7C7" justifyContent="center" alignItems="center" gap="20px" >
            <Stack fontSize="55px">회원가입 실패</Stack>
            <img
              src={register} alt="register icon"
              width="266px" height="232px"
            />
            <Stack fontSize="32px">비밀번호가 일치하지 않아요!</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "199px", height: "75px", alignItems: "center", justifyContent: "center", fontSize: "32px", boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)" }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가
              }}
            >확 인</Stack>
          </Stack>
        </Stack>
      </Stack> */}
      {/* <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="926px" height="573px"
          display="flex" alignItems="center"
          justifyContent="space-around" bgcolor="#F88C8C" boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)">
          <Stack width="906px" height="553px" bgcolor="#FFC7C7" justifyContent="center" alignItems="center" gap="20px" >
            <Stack fontSize="55px">회원가입 실패</Stack>
            <img
              src={register} alt="register icon"
              width="266px" height="232px"
            />
            <Stack fontSize="32px">이미 사용중인 아이디에요!</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "199px", height: "75px", alignItems: "center", justifyContent: "center", fontSize: "32px", boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)" }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가
              }}
            >확 인</Stack>
          </Stack>
        </Stack>
      </Stack> */}
      {/* <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="926px" height="573px"
          display="flex" alignItems="center"
          justifyContent="space-around" bgcolor="#F88C8C" boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)"  >
          <Stack width="906px" height="553px" bgcolor="#FFC7C7" justifyContent="center" alignItems="center" gap="20px" >
            <Stack fontSize="55px">회원가입 실패</Stack>
            <img
              src={register} alt="register icon"
              width="266px" height="232px"
            />
            <Stack fontSize="32px">이미 사용중인 닉네임이에요!</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "199px", height: "75px", alignItems: "center", justifyContent: "center", fontSize: "32px", boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)" }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가 
              }}>확  인</Stack>
          </Stack>
        </Stack>
      </Stack> */}
    </>
  );
}


export default Header;

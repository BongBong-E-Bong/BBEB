import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import login from "../image/login.png";
import kakaologo from "../image/kakaologo.png";
import Modal from "@mui/material/Modal"

function Header() {
  return (
    <>
        <Stack height="100%" alignItems="center" justifyContent="center">
          <Stack position="fixed" width="1230px" height="617px" display="flex" direction="row" alignItems="center" justifyContent="space-around" bgcolor="#F88C8C">
            <Stack width="753px" height="598px" justifyContent="center">
              <img
                src={login} alt="login icon"
                width="700px" height="598px" />
            </Stack>
            <Stack width="440px" height="598px" alignItems="center" justifyContent="center" gap="3.5%">
              <Stack fontSize="36px">login</Stack>
              <Stack>
                <Stack marginBottom="8px">ID</Stack>
                <TextField
                  placeholder={"id를 입력하세요"}
                  multiline
                  maxRows={4}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: "8px",
                      width: "271px",
                      height: "40px",
                      
                    },
                  }}
                />
              </Stack>
              <Stack>
                <Stack marginBottom="8px">Password</Stack>
                <TextField
                  placeholder={"비밀번호를 입력하세요"}
                  multiline
                  maxRows={4}
                  InputProps={{
                    style: {
                      backgroundColor: "white",
                      borderRadius: "8px",
                      width: "271px",
                      height: "40px",
                    },
                  }}
                />
              </Stack>
              <Stack
                bgcolor="#D76464"
                style={{ cursor: "pointer", color: "white", borderRadius: "20px", width: "271px", height: "33px", alignItems: "center", justifyContent: "center", boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.3)" }}
                onClick={() => {
                  // 클릭 이벤트 처리 코드를 여기에 추가
                }}>SIGN IN</Stack>
              <Stack
                style={{ cursor: "pointer", width: "271px", height: "33px", alignItems: "center", justifyContent: "center" }}
                onClick={() => {
                  // 클릭 이벤트 처리 코드를 여기에 추가
                }}> <img src={kakaologo} alt="kakaologo icon" /></Stack>
            </Stack>
          </Stack>
        </Stack>
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
    </>
  );
}

export default Header;

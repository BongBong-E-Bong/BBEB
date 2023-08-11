import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import login from "../image/login.png";
import kakaologo from "../image/kakaologo.png";

function Login() {

  return (
    <>
      <Stack height="100%" alignItems="center" justifyContent="center">
        <Stack position="fixed" width="62.12%" height="60.25%" display="flex" direction="row" alignItems="center" justifyContent="space-around" bgcolor="#F88C8C">
          <Stack alignItems="center" justifyContent="center" width="57.98%" height="97.39%">
            <img src={login} alt="login icon" 
            style={{ width:"100%", height:"100%"}} />
          </Stack>
          <Stack width="39%" height="97.39%" alignItems="center" justifyContent="center" gap="40px">
            <Stack fontSize="36px">login</Stack>
            <Stack>
            <Stack marginBottom="3%">ID</Stack>
            <TextField
              placeholder={"id를 입력하세요"}
              multiline
              maxRows={4}
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "8px", width: "271px", height: "40px" }
              }}
            />
            </Stack>
            <Stack>
            <Stack marginBottom="3%">Password</Stack>
            <TextField
              id="outlined-multiline-flexible"
              placeholder={"비밀번호를 입력하세요"}
              multiline
              maxRows={4}
              InputProps={{
                style: { backgroundColor: "white", borderRadius: "8px", width: "271px", height: "40px" }
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
    </>
  );
}


export default Login;

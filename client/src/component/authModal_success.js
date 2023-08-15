import React, { useState } from "react";
import { Stack } from "@mui/material";
import register from "../image/register.png";

const AuthModalSuccess = () => {
    const message = '성공했어요!';
    const detaiMessage = '어서오세용!!';
  
    return (
      <Stack Stack height="100%" alignItems="center" justifyContent="center">
        <Stack 
          width="48%"
          height="57%"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          bgcolor="#F88C8C"
          boxShadow="0px 15px 30px rgba(0, 0, 0, 0.5)">
          <Stack width="97%" height="96%" bgcolor="white" justifyContent="center" 
          alignItems="center" gap="3%">
            <Stack fontSize="55px">{message}
            </Stack>
            <img src={register} alt="register icon" width="34%" height="44%" />
            <Stack fontSize="32px">{detaiMessage}</Stack>
            <Stack
              bgcolor="#FF8181"
              style={{
                cursor: "pointer",
                color: "white",
                borderRadius: "20px",
                width: "27%",
                height: "14%",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "32px",
                boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.3)",
              }}
              onClick={() => {
                // 클릭 이벤트 처리 코드를 여기에 추가
              }}>확 인</Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  };
  export default AuthModalSuccess
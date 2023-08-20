import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import login from "../image/login.png";
import kakaologo from "../image/kakaologo.png";
import axios from "axios";
import AuthModalFail from "./authModal_fail";
import AuthModalSuccess from "./authModal_success";
import Modal from "./Modal";

function Login() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const getRequest = () => {
    axios
      .post("http://13.125.105.202:8080/api/auth/signin", {
        loginId: userId,
        password: userPassword,
      })
      .then((response) => {
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        setFailModalOpen(true);
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <Stack
      position="fixed"
      width="100%"
      height="100%"
      display="flex"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      bgcolor="#F88C8C"
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        width="58%"
        height="98%"
      >
        <img
          src={login}
          alt="login icon"
          style={{ width: "100%", height: "100%" }}
        />
      </Stack>
      <Stack
        width="39%"
        height="98%"
        alignItems="center"
        justifyContent="center"
      >
        <Stack fontSize="36px">login</Stack>
        <Stack width="100%" alignItems="center" justifyContent="center">
          <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
            ID
          </Stack>
          <TextField
            name="loginId"
            placeholder={"id를 입력하세요"}
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            multiline
            maxRows={4}
            InputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: "8px",
                height: "60%",
              },
            }}
            sx={{ textAlign: "center", width: "70%" }}
          />
        </Stack>
        <Stack width="100%" alignItems="center" justifyContent="center">
          <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
            Password
          </Stack>
          <TextField
            name="loginPassword"
            placeholder={"비밀번호를 입력하세요"}
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            multiline
            maxRows={4}
            InputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: "8px",
                height: "60%",
              },
            }}
            sx={{ textAlign: "center", width: "70%" }}
          />
        </Stack>
        <Stack
          bgcolor="#D76464"
          style={{
            cursor: "pointer",
            color: "white",
            borderRadius: "20px",
            width: "70%",
            height: "6%",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.3)",
          }}
          onClick={() => {
            getRequest();
          }}
        >
          SIGN IN
        </Stack>
        <Stack
          style={{
            cursor: "pointer",
            width: "271px",
            height: "33px",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"10%",
          }}
          onClick={() => {
            // 카카오톡 나중에 백엔드와 같이 작업
          }}
        >
          {/* {" "} */}
          <img src={kakaologo} alt="kakaologo icon" />
        </Stack>
      </Stack>
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <AuthModalSuccess
          message={"회원가입 성공"}
          detailMessage={errorMessage}
          onClose={() => setSuccessModalOpen(false)}
        />
      </Modal>
      <Modal open={failModalOpen} onClose={() => setFailModalOpen(false)}>
        <AuthModalFail
          message={"회원가입 실패"}
          detailMessage={errorMessage}
          onClose={() => setFailModalOpen(false)}
        />
      </Modal>
    </Stack>
  );
}

export default Login;
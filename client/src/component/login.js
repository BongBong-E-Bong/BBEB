import React, { useState } from "react";
import { Stack, TextField } from "@mui/material";
import login from "../image/login.png";
import kakaologo from "../image/kakaologo.png";
import axios from "axios";
import AuthModalFail from "./authModal_fail";
import AuthModalSuccess from "./authModal_success";
import Modal from "./Modal";

function Login({ setOpen }) {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setOpen(false);
  };

  const handleFailModalClose = () => {
    setFailModalOpen(false);
  };

  const postRequest = () => {
    axios
      .post("http://13.125.105.202:8080/api/auth/signin", {
        loginId: userId,
        password: userPassword,
      })
      .then((response) => {
        setSuccessMessage("어서오세용!!");
        setSuccessModalOpen(true);
        localStorage.setItem("accessDoraTokenDora", response.data.accessToken);
        localStorage.setItem(
          "refreshDoraTokenDora",
          response.data.refreshToken
        );
        console.log("login 아이디:",userId);
      })
      .catch((error) => {
        setFailModalOpen(true);
        setErrorMessage("아이디/비밀번호가 틀렸어요!!");
      });
  };

  const REST_API_KEY='REST API KEY';
  const REDIRECT_URI='http://localhost:3000/oauth2/redirect';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
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
            type="password"
            placeholder={"비밀번호를 입력하세요"}
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
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
            postRequest();
          }}
        >
          SIGN IN
        </Stack>
        <Stack
          style={{
            cursor: "pointer",
            width: "27%",
            height: "8%",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10%",
          }}
          onClick={loginHandler}
        >
          <img src={kakaologo} alt="kakaologo icon" />
        </Stack>
      </Stack>
      <Modal
        width="750px"
        height="430px"
        open={successModalOpen}
        onClose={handleSuccessModalClose}
      >
        <AuthModalSuccess
          message={"로그인 성공"}
          detailMessage={successMessage}
          onClose={handleSuccessModalClose}
        />
      </Modal>
      <Modal
        width="750px"
        height="430px"
        open={failModalOpen}
        onClose={handleFailModalClose}
      >
        <AuthModalFail
          message={"로그인 실패"}
          detailMessage={errorMessage}
          onClose={handleFailModalClose}
        />
      </Modal>
    </Stack>
  );
}

export default Login;

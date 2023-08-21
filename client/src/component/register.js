import register from "../image/register.png";
import { Stack, TextField } from "@mui/material";
import Modal from "./Modal";
import AuthModalFail from "./authModal_fail";
import AuthModalSuccess from "./authModal_success";
import { useState } from "react";
import axios from "axios";

function Register({ setOpen }) {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSuccessModalClose = () => {
    setSuccessModalOpen(false);
    setOpen(false);
    setUserId("");
    setUserPassword("");
    setUserNickname("");
    setUserEmail("");
    setConfirmPassword("");
  };

  const handleFailModalClose = () => {
    setFailModalOpen(false);
  };

  const getRequest = () => {
    if (userPassword !== confirmPassword) {
      setFailModalOpen(true);
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    axios
      .post("http://13.125.105.202:8080/api/auth/signup", {
        loginId: userId,
        password: userPassword,
        nickname: userNickname,
        email: userEmail,
      })
      .then((response) => {
        setsuccessMessage("환영해용!!");
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
          src={register}
          alt="register icon"
          style={{ width: "100%", height: "100%" }}
        />
      </Stack>
      <Stack
        width="39%"
        height="98%"
        alignItems="center"
        justifyContent="center"
        sx={{
          "& > *:not(:last-child)": {
            marginBottom: "-4%", // 원하는 간격으로 조정
          },
        }}
      >
        <Stack
          sx={{
            fontSize: "36px",
            marginTop: "-10px", // 원하시는 만큼 음수값으로 조절
          }}
        >
          Register
        </Stack>
          <Stack marginTop="8%" sx={{ width: "68%", textAlign: "left", height:"6.5%" }}>
            ID
          </Stack>
          <TextField
            name="loginId"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            placeholder={"id를 입력하세요"}
            multiline
            maxRows={4}
            InputProps={{
              style: {
                backgroundColor: "white",
                borderRadius: "20px",
                height: "60%",
              },
            }}
            sx={{ textAlign: "center", width: "70%"}}
          />
        <Stack marginBottom="0.5%" sx={{ width: "68%", textAlign: "left", height:"6.5%" }}>
          Password
        </Stack>
        <TextField
          name="password"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
          placeholder={"비밀번호"}
          multiline
          maxRows={4}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "20px",
              height: "60%",
            },
          }}
          sx={{ textAlign: "center", width: "70%" }}
        />
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left", height:"6.5%" }}>
          Password Check
        </Stack>
        <TextField
          placeholder={"비밀번호 다시 입력"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          multiline
          maxRows={4}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "20px",
              height: "60%",
            },
          }}
          sx={{ textAlign: "center", width: "70%" }}
        />
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left", height:"6.5%" }}>
          NickName
        </Stack>
        <TextField
          name="nickname"
          value={userNickname}
          onChange={(e) => {
            setUserNickname(e.target.value);
          }}
          placeholder={"닉네임"}
          multiline
          maxRows={4}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "20px",
              height: "60%",
            },
          }}
          sx={{ textAlign: "center", width: "70%" }}
        />
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left", height:"6.5%" }}>
          Email
        </Stack>
        <TextField
          name="email"
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
          placeholder={"이메일"}
          multiline
          maxRows={4}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "20px",
              height: "60%",
            },
          }}
          sx={{ textAlign: "center", width: "70%" }}
        />
        <Stack height="6%"></Stack>
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
          REGISTER
        </Stack>
      </Stack>
      <Modal open={successModalOpen} onClose={handleSuccessModalClose}>
        <AuthModalSuccess
          message={"회원가입 성공"}
          detailMessage={successMessage}
          onClose={handleSuccessModalClose}
        />
      </Modal>
      <Modal open={failModalOpen} onClose={handleFailModalClose}>
        <AuthModalFail
          message={"회원가입 실패"}
          detailMessage={errorMessage}
          onClose={handleFailModalClose}
        />
      </Modal>
    </Stack>
  );
}

export default Register;

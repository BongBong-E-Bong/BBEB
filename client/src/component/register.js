import register from "../image/register.png";
import { Stack, TextField } from "@mui/material";
import Modal from "./Modal";
import AuthModalFail from "./authModal_fail";
import AuthModalSuccess from "./authModal_success";
import { useState } from "react";
import axios from "axios";

function Register({setOpen}) {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setsuccessMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getRequest = () => {
    axios
      .post("http://13.125.105.202:8080/api/auth/signup", {
        loginId: userId,
        password: userPassword,
        nickname: userNickname,
        email: userEmail,
      })
      .then((response) => {
        setSuccessModalOpen(true);
        setOpen(false);
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
        // gap="1%"
      >
        <Stack fontSize="36px">Register</Stack>
        <Stack width="100%" alignItems="center" justifyContent="center">
          <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
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
                borderRadius: "8px",
                height: "60%",
              },
            }}
            sx={{ textAlign: "center", width: "70%" }}
          />
        </Stack>
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
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
              width: "341px",
              height: "40px",
            },
          }}
        />
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
          PasswordCheck
        </Stack>
        <TextField
          placeholder={"비밀번호 다시 입력"}
          multiline
          maxRows={4}
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "20px",
              width: "341px",
              height: "40px",
            },
          }}
        />
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
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
              width: "341px",
              height: "40px",
            },
          }}
        />
        <Stack marginBottom="3%" sx={{ width: "68%", textAlign: "left" }}>
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
              width: "341px",
              height: "40px",
            },
          }}
        />
        <Stack
          bgcolor="#D76464"
          style={{
            cursor: "pointer",
            color: "white",
            borderRadius: "20px",
            width: "341px",
            height: "33px",
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
      <Modal open={successModalOpen} onClose={() => setSuccessModalOpen(false)}>
        <AuthModalSuccess
          message={"회원가입 성공"}
          detailMessage={successMessage}
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

export default Register;

import register from "../image/register.png";
import { Stack, TextField } from "@mui/material";
import Modal from "./Modal";
import AuthModalFail from "./authModal_fail";
import AuthModalSuccess from "./authModal_success";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [userId, setUserId] = useState("");

  const getRequest = () => {
    axios
      .post("http://13.125.105.202:8080/api/auth/signup", {
        loginId: userId,
        password: "lkjh",
        nickname: "lkjh",
        email: "lkjh@naver.com",
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
      <Stack width="753px" height="598px" justifyContent="center">
        <img src={register} alt="register icon" width="607px" height="601px" />
      </Stack>
      <Stack width="440px" height="598px" justifyContent="center" gap="45px">
        <Stack fontSize="36px" display="flex" marginLeft="100px">
          Register
        </Stack>
        <Stack gap="45px">
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
                width: "341px",
                height: "40px",
              },
            }}
          />
          <TextField
            name="password"
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
          <TextField
            name="nickname"
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
          <TextField
            name="email"
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
        </Stack>
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
            // 클릭 이벤트 처리 코드를 여기에 추가
            getRequest();
          }}
        >
          REGISTER
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

export default Register;

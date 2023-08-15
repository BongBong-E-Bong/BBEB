import register from "../image/register.png";
import { Stack, TextField } from "@mui/material";

function Register(){
    return(
        <>
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
        </>
    )
}

export default Register;
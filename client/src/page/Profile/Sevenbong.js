import React from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import sevenbong from "../../image/body/sevenbong.png";
import { useNavigate } from "react-router-dom";

function Sevenbong() {
  const commentRef = React.useRef(null);
  const profileRef = React.useRef(null);
  const tmiRef = React.useRef(null);

  const commentClick = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const profileClick = () => {
    profileRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const tmiClick = () => {
    tmiRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const navigate = useNavigate();

  return (
    <>
      <Stack ref={profileRef}></Stack>
      <Header />
      <ProfileForm>
        <Stack
          width="100%"
          height="50vh"
          direction="row"
          alignItems="center"
          paddingTop="10vh"
          gap="7%"
        >
          <img
            src={sevenbong}
            alt="ebongbody"
            width="300px"
            height="350px"
            style={{ marginLeft: "8%" }}
          />
          <Stack gap="20px">
            <Stack direction="row" alignItems="center" gap="3px">
              <Stack
                color="#E98282"
                style={{
                  fontSize: "35px",
                  fontWeight: "700",
                  WebkitTextStroke: "0.1px black",
                }}
              >
                칠봉이
              </Stack>
              <Stack style={{ fontSize: "25px" }}>(7)</Stack>
            </Stack>

            <Stack style={{ fontSize: "21px" }}>미소 천사</Stack>
            <Stack>
              <Stack fontFamily="blackboard" style={{ fontSize: "23px" }}>
                "형아 우리 나가서 놀자~!"
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{ color: "white", fontSize: "20px" }}
              onClick={() => {
                navigate("/choice");
              }}
            >
              칠봉이 투표하러 가기
            </Button>
          </Stack>
        </Stack>

        <Stack width="80%" height="fit-content" margin="20vh 10% 0 10%">
          <Stack ref={tmiRef} />
          <Stack style={{ fontSize: "27px" }} margin="20vh 0 3vh 0">
            ✨칠봉이 tmi
          </Stack>
          <Stack style={{ fontSize: "20px" }} margin="0 5% 20vh 5%">
            꿈 : 개발자
            <br />
            좋아하는 것 : 빵, 형아들, 작고 귀여운 동물
            <br />
            싫어하는 것 : 귀신, 주사 등 평범한 아이들이 싫어하는 것
            <br />
            교우관계 : 원만(중학교~)
            <br />
            성격 : 매우 밝으며 친화력이 좋고 마음씨도 착하다.
            <br />
            특징 : 언제나 활짝 웃고 있다.
          </Stack>
        </Stack>
        <Stack ref={commentRef}></Stack>
      </ProfileForm>
      <Comment />
      <Stack
        position="fixed"
        top="35%"
        right="3%"
        color="#D47E7E"
        style={{
          cursor: " pointer",
          fontSize: "18px",
          textDecoration: "underline",
        }}
        gap="10px"
      >
        <Stack onClick={profileClick}>소개</Stack>

        <Stack onClick={tmiClick}>✨칠봉이 tmi</Stack>
        <Stack onClick={commentClick}>댓글</Stack>
      </Stack>
    </>
  );
}
export default Sevenbong;

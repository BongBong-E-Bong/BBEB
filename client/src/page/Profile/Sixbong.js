import React from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import sixbong from "../../image/body/sixbong.png";
import { useNavigate } from "react-router-dom";

function Sixbong() {
  const commentRef = React.useRef(null);
  const profileRef = React.useRef(null);
  const tmiRef = React.useRef(null);
  const storyRef = React.useRef(null);

  const commentClick = () => {
    commentRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const profileClick = () => {
    profileRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const storyClick = () => {
    storyRef.current.scrollIntoView({ behavior: "smooth" });
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
            src={sixbong}
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
                육봉이
              </Stack>
              <Stack style={{ fontSize: "25px" }}>(중2)</Stack>
            </Stack>

            <Stack style={{ fontSize: "21px" }}>과학 천재</Stack>
            <Stack>
              <Stack fontFamily="blackboard" style={{ fontSize: "23px" }}>
                "이봉이 형의 엉덩이는 연구 가치가 있어
                <br />
                정말 흥미로워!"
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{ color: "white", fontSize: "20px" }}
              onClick={() => {
                navigate("/choice");
              }}
            >
              육봉이 투표하러 가기
            </Button>
          </Stack>
        </Stack>

        <Stack width="80%" height="fit-content" margin="20vh 10% 0 10%">
          <Stack ref={storyRef} />
          <Stack style={{ fontSize: "27px" }} marginBottom="10vh">
            🔎이봉이가 이상한 말투를 쓰는 이유
          </Stack>

          <Stack ref={tmiRef} />
          <Stack style={{ fontSize: "27px" }} margin="20vh 0 3vh 0">
            ✨이봉이 tmi
          </Stack>
          <Stack style={{ fontSize: "20px" }} margin="0 5% 20vh 5%">
            꿈 : 개발자
            <br />
            싫어하는 것 : 알파벳 B, 숫자 3 (눕히면 엉덩이 모양이라서)
            <br />
            좋아하는 것 : 식물
            <br />
            교우관계 : 원만(중학교~)
            <br />
            성격 : 예의바르고 배려심이 깊으며 소심하지만 할 말은 하는 똑부러진
            성격이다. (다만 말한 뒤 눈치를 보는 편)
            <br />
            종교 : 무교 (어릴 적 엉덩이가 작아지게 해달라고 간절히 빌었지만
            이루어지지 않아 신을 매우 불신한다.)
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

        <Stack onClick={storyClick}>
          🔎이봉이가 이상한 말투를 <br />
          쓰는 이유
        </Stack>

        <Stack onClick={tmiClick}>✨이봉이 tmi</Stack>
        <Stack onClick={commentClick}>댓글</Stack>
      </Stack>
    </>
  );
}

export default Sixbong;

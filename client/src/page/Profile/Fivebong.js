import React from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import fivebong from "../../image/body/fivebong.png";
import { useNavigate } from "react-router-dom";

function Fivebong() {
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
            src={fivebong}
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
                오봉이
              </Stack>
              <Stack style={{ fontSize: "25px" }}>(중3)</Stack>
            </Stack>

            <Stack style={{ fontSize: "21px" }}>전교 1등 야구 소년</Stack>
            <Stack>
              <Stack fontFamily="blackboard" style={{ fontSize: "23px" }}>
                "안타는 우리가 더 많이 쳤는데 하 ಠ_ಠ"
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{ color: "white", fontSize: "20px" }}
              onClick={() => {
                navigate("/choice");
              }}
            >
              오봉이 투표하러 가기
            </Button>
          </Stack>
        </Stack>

        <Stack width="80%" height="fit-content" margin="20vh 10% 0 10%">
          <Stack ref={storyRef} />
          <Stack style={{ fontSize: "27px" }} marginBottom="10vh">
            ⚾오봉이의 야구 응원 댄스
          </Stack>
          <Stack ref={tmiRef} />
          <Stack style={{ fontSize: "27px" }} margin="20vh 0 3vh 0">
            ✨오봉이 tmi
          </Stack>
          <Stack style={{ fontSize: "20px" }} margin="0 5% 20vh 5%">
            이상형 : 평소엔 참하지만 야구장에선 누구보다 크게 응원가 부르는 여자
            <br />
            성격 : 야구 볼 때를 제외하고는 감정 기복이 없는 편. 펭귄즈가 진 날은
            극도로 예민해진다.
            <br />
            보물 1호 : 펭귄즈 마스코트 인형
            <br />
            스트레스 해소법 : 야구로 받은 스트레스를 공부로 해소한다.
            <br />
            취미 : 야구 경기 관람
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
        <Stack onClick={storyClick}>⚾오봉이 표정 모음집</Stack>
        <Stack onClick={tmiClick}>✨오봉이 tmi</Stack>
        <Stack onClick={commentClick}>댓글</Stack>
      </Stack>
    </>
  );
}
export default Fivebong;

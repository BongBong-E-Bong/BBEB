import React from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import sixbong from "../../image/body/sixbong.png";
import { useNavigate } from "react-router-dom";
import ongnya from "../../image/story6/ongnya.png";
import gogle from "../../image/story6/gogle.png";
import ring from "../../image/story6/ring.png";

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
            🧪과학 천재 육봉이의 발명품
          </Stack>
          <Stack alignItems="center" gap="25vh">
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="30px"
            >
              <img src={ongnya} alt="story" width="150px" height="200px" />
              <Stack>
                <Stack fontSize="25px">옹냐</Stack>
                <Stack fontSize="18px">
                  옹냐는 이봉이 가족이 어렸을 때 키우던 고양이에요
                  <br />
                  옹냐가 무지개 다리를 건너자 온 가족이 슬픔에 빠졌고
                  <br />
                  육봉이는 옹냐를 개조해 로봇으로 만들었어요
                  <br />
                  옹냐의 눈에는 녹화 기능이 있는 카메라가 들어있고
                  <br />
                  목걸이에는 위치 추적 장치가 달려있어요
                  <br />
                  스윗한 육봉이는 옹냐의 발에 비밀 장치를 달아줬고
                  <br />
                  덕분에 옹냐는 위험으로부터 자신을 지킬 수 있어요
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="30px"
            >
              <Stack>
                <Stack fontSize="25px">멋진 고글</Stack>
                <Stack fontSize="18px">
                  육봉이가 늘 쓰고다니는 고글에는
                  <br />
                  Ai가 탑재되어 여러 기능을 제공해요
                  <br />
                  어느 날 호기심에 고글을 써본 오봉이는
                  <br />
                  이번 달 펭귄즈의 승부 예측 기능을 사용했어요
                  <br />
                  정확도는 100%였지만
                  <br />
                  야구 경기를 보며 느껴지는 쫄깃함을 잃은 오봉이는
                  <br />
                  그 달 내내 극도의 무기력함과 우울함을 느꼈고
                  <br />더 이상 승부 예측 기능을 사용하지 않았어요
                </Stack>
              </Stack>
              <img src={gogle} alt="story" width="150px" height="200px" />
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap="30px"
            >
              <img src={ring} alt="story" width="150px" height="200px" />
              <Stack>
                <Stack fontSize="25px">삼봉이의 반지</Stack>
                <Stack fontSize="18px">
                  옹냐의 발에 탑재된 것과 같은 물질로 이루어진 반지에요
                  <br />
                  현재는 성능 테스트를 위해 삼봉이의 손가락에 끼워져있어요
                  <br />
                  자세한 스토리가 궁금하다면
                  <Button
                    onClick={() => {
                      navigate("/threebong");
                    }}
                  >
                    click!
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack ref={tmiRef} />
          <Stack style={{ fontSize: "27px" }} margin="20vh 0 3vh 0">
            ✨육봉이 tmi
          </Stack>
          <Stack style={{ fontSize: "20px" }} margin="0 5% 20vh 5%">
            꿈 : 과학자
            <br />
            좋아하는 것 : 흥미로운 실험체, 옹냐, 발명품들
            <br />
            싫어하는 것 : 너무나 단순한 것
            <br />
            특징 : 외모를 특별히 가꾸지 않아 머리카락을 자른지 오래 되었으며
            <br />
            앞머리는 실험에 방해가 되어 대충 잘라 쥐가 파먹은 모양이다
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
          🧪과학 천재 육봉이의
          <br /> 발명품
        </Stack>
        <Stack onClick={tmiClick}>✨육봉이 tmi</Stack>
        <Stack onClick={commentClick}>댓글</Stack>
      </Stack>
    </>
  );
}

export default Sixbong;

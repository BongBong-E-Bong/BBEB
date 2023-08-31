import React from "react";
import { Button, Stack } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import ebongbody from "../../image/body2b.png";
import story1 from "../../image/story2/story2b1.gif";
import story2 from "../../image/story2/story2b2.gif";
import story3 from "../../image/story2/story2b3.gif";
import story4 from "../../image/story2/story2b4.gif";
import story5 from "../../image/story2/story2b5.gif";
import story6 from "../../image/story2/story2b6.gif";
import story7 from "../../image/story2/story2b7.gif";
import story8 from "../../image/story2/story2b8.gif";
import story9 from "../../image/story2/story2b9.gif";
import story10 from "../../image/story2/story2b10.png";
import story11 from "../../image/story2/story2b11.png";
import story12 from "../../image/story2/story2b12.png";
import Fade from "react-reveal/Fade";
import Zoom from "react-reveal/Zoom";

function Twobong() {
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
            src={ebongbody}
            alt="ebongbody"
            width="170px"
            height="280px"
            style={{ marginLeft: "20%" }}
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
                이봉이
              </Stack>
              <Stack style={{ fontSize: "25px" }}>(고3)</Stack>
            </Stack>

            <Stack style={{ fontSize: "21px" }}>
              어릴 적 부터 너무나도
              <br />
              큰 엉덩이가 컴플렉스인 이봉이는
              <br />
              과연 엉덩이가 작아질 수 있을까?
            </Stack>
            <Stack fontFamily="blackboard" style={{ fontSize: "25px" }}>
              "내 이름은 이이봉인데!"
            </Stack>
            <Button
              variant="contained"
              sx={{ color: "white", fontSize: "20px" }}
              ref={storyRef}
            >
              이봉이 투표하러 가기
            </Button>
          </Stack>
        </Stack>
        <Stack width="80%" height="fit-content" margin="20vh 10% 0 10%">
          <Stack style={{ fontSize: "27px" }} marginBottom="10vh">
            🔎이봉이가 이상한 말투를 쓰는 이유
          </Stack>
          <Stack alignItems="center" gap="25vh">
            <Zoom>
              <img src={story1} alt="story" width="270px" height="250px" />
            </Zoom>
            <Fade>
              <img src={story2} alt="story" width="340px" height="250px" />
            </Fade>
            <Fade>
              <img src={story3} alt="story" width="340px" height="250px" />
            </Fade>
            <Stack style={{ fontSize: "23px" }} marginTop="10vh">
              어릴 적 친구들에게 무시당한 것이 큰 상처였던 이봉이는
            </Stack>
            <Fade>
              <img src={story4} alt="story" width="320px" height="240px" />
            </Fade>
            <Fade>
              <img src={story5} alt="story" width="400px" height="220px" />
            </Fade>
            <Fade>
              <img src={story6} alt="story" width="300px" height="270px" />
            </Fade>
            <Fade>
              <img src={story7} alt="story" width="300px" height="220px" />
            </Fade>
            <Fade>
              <img
                src={story8}
                alt="story"
                width="400px"
                height="280px"
                style={{ marginRight: "7%" }}
              />
            </Fade>
            <Fade>
              <img src={story9} alt="story" width="350px" height="220px" />
            </Fade>
            <Stack style={{ fontSize: "23px" }} margin="10vh 0 10vh 0">
              혼잣말을 하기 시작했고
            </Stack>
            <Fade>
              <img src={story10} alt="story" width="400px" height="230px" />
            </Fade>
            <Fade>
              <img src={story11} alt="story" width="400px" height="240px" />
            </Fade>
            <Stack style={{ fontSize: "23px" }} marginTop="10vh">
              점점 말버릇이 되어
            </Stack>
            <Fade>
              <img src={story12} alt="story" width="290px" height="480px" />
            </Fade>
            <Stack ref={tmiRef}></Stack>
          </Stack>
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

export default Twobong;

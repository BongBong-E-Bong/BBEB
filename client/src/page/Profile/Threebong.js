import React from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import threebong from "../../image/body/threebong.png";
import { useNavigate } from "react-router-dom";
import story1 from "../../image/story3/story3b1.gif";
import story2 from "../../image/story3/story3b2.gif";
import story3 from "../../image/story3/story3b3.gif";
import story4 from "../../image/story3/story3b4.gif";
import story5 from "../../image/story3/story3b5.gif";
import story6 from "../../image/story3/story3b6.gif";
import story7 from "../../image/story3/story3b7.gif";
import story8 from "../../image/story3/story3b8.png";
import story9 from "../../image/story3/story3b9.png";
import story10 from "../../image/story3/story3b10.png";
import story11 from "../../image/story3/story3b11.png";
import story12 from "../../image/story3/story3b12.gif";
import story13 from "../../image/story3/story3b13.gif";
import story14 from "../../image/story3/story3b14.png";
import story15 from "../../image/story3/story3b15.gif";
import story16 from "../../image/story3/story3b16.gif";
import story17 from "../../image/story3/story3b17.gif";
import story18 from "../../image/story3/story3b18.gif";
import story19 from "../../image/story3/story3b19.png";
import story20 from "../../image/story3/story3b20.gif";
import story21 from "../../image/story3/story3b21.png";
import story22 from "../../image/story3/story3b22.png";
import story23 from "../../image/story3/story3b23.gif";
import story24 from "../../image/story3/story3b24.png";
import story25 from "../../image/story3/story3b25.gif";
import story26 from "../../image/story3/story3b26.png";
import story27 from "../../image/story3/story3b27.png";
import story28 from "../../image/story3/story3b28.gif";
import story29 from "../../image/story3/story3b29.gif";
import story30 from "../../image/story3/story3b30.gif";
import story31 from "../../image/story3/story3b31.png";
import story32 from "../../image/story3/story3b32.png";
import story33 from "../../image/story3/story3b33.png";

function Threebong() {
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
            src={threebong}
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
                삼봉이
              </Stack>
              <Stack style={{ fontSize: "25px" }}>(고2)</Stack>
            </Stack>
            <Stack style={{ fontSize: "21px" }}>
              똥은 무서워서 피하는 것이 아니다.
            </Stack>
            <Stack>
              <Stack fontFamily="blackboard" style={{ fontSize: "23px" }}>
                "뭘 쳐다 봐? 카아아악 퉤!"
              </Stack>
            </Stack>
            <Button
              variant="contained"
              sx={{ color: "white", fontSize: "20px" }}
              onClick={() => {
                navigate("/choice");
              }}
            >
              삼봉이 투표하러 가기
            </Button>
          </Stack>
        </Stack>

        <Stack width="80%" height="fit-content" margin="20vh 10% 0 10%">
          <Stack ref={storyRef} />
          <Stack style={{ fontSize: "27px" }} marginBottom="10vh">
            💍삼봉이 자신감의 근원
          </Stack>

          <Stack alignItems="center" gap="25vh">
            <Stack>*그림이 움직여요 스크롤을 천천히 내려주세요!*</Stack>
            <img src={story1} alt="story" width="370px" height="270px" />
            <img src={story2} alt="story" width="320px" height="270px" />
            <img src={story3} alt="story" width="250px" height="330px" />
            <img src={story4} alt="story" width="350px" height="300px" />
            <img src={story5} alt="story" width="350px" height="300px" />
            <img src={story6} alt="story" width="310px" height="250px" />
            <img src={story7} alt="story" width="360px" height="250px" />
            <img src={story8} alt="story" width="370px" height="250px" />
            <img src={story9} alt="story" width="360px" height="300px" />
            <img src={story10} alt="story" width="300px" height="320px" />
            <img src={story11} alt="story" width="360px" height="300px" />
            <img src={story12} alt="story" width="340px" height="250px" />
            <img src={story13} alt="story" width="360px" height="250px" />
            <img src={story14} alt="story" width="420px" height="300px" />
            <img src={story15} alt="story" width="380px" height="250px" />
            <img src={story16} alt="story" width="270px" height="250px" />
            <img src={story17} alt="story" width="550px" height="290px" />
            <img src={story18} alt="story" width="300px" height="700px" />
            <img src={story19} alt="story" width="370px" height="300px" />
            <img src={story20} alt="story" width="270px" height="280px" />
            <img src={story21} alt="story" width="270px" height="250px" />
            <img src={story22} alt="story" width="270px" height="300px" />
            <img src={story23} alt="story" width="340px" height="320px" />
            <img src={story24} alt="story" width="270px" height="650px" />
            <img src={story25} alt="story" width="300px" height="270px" />
            <img src={story26} alt="story" width="270px" height="300px" />
            <img src={story27} alt="story" width="270px" height="300px" />
            <img src={story28} alt="story" width="420px" height="300px" />
            <img src={story29} alt="story" width="350px" height="310px" />
            <img src={story30} alt="story" width="250px" height="400px" />
            <img src={story31} alt="story" width="350px" height="250px" />
            <Stack>
              <Stack>*귀여운 고양이 옹냐의 정체가 궁금하다면*</Stack>
              <Button
                onClick={() => {
                  navigate("/sixbong");
                }}
              >
                click!
              </Button>
            </Stack>
            <img src={story32} alt="story" width="270px" height="250px" />
            <img src={story33} alt="story" width="350px" height="300px" />
          </Stack>
          <Stack ref={tmiRef} />
          <Stack style={{ fontSize: "27px" }} margin="20vh 0 3vh 0">
            ✨삼봉이 tmi
          </Stack>
          <Stack style={{ fontSize: "20px" }} margin="0 5% 20vh 5%">
            성격 : 자존심이 세고 화가 많은 편이지만 의외로 의리남이다. 같은
            학교에 다니는 이봉이를 창피해하며 무시한다.
            <br />
            성적 : 처참
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
        <Stack onClick={storyClick}>💍삼봉이 자신감의 근원</Stack>

        <Stack onClick={tmiClick}>✨삼봉이 tmi</Stack>
        <Stack onClick={commentClick}>댓글</Stack>
      </Stack>
    </>
  );
}
export default Threebong;

import React from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import ProfileForm from "../../component/ProfileForm";
import Comment from "../../component/comment";
import threebong from "../../image/body/threebong.png";
import { useNavigate } from "react-router-dom";

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

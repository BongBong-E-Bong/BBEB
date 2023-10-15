import React from "react";
import { Stack, Button } from "@mui/material";
import bongbong from "../../image/bongbong.gif";
import webtoon from "../../image/webtoonBanner.png";
import profile from "../../image/profileBanner.png";
import vote from "../../image/voteBanner.png";
import ranking from "../../image/rankingBanner.png";
import minigame from "../../image/minigameBanner.png";
import board from "../../image/boardBanner.png";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";
import Fade from "react-reveal/Fade";

function Main() {
  const navigate = useNavigate();

  const mouseMove = (e) => {
    setPosition({ x: e.pageX, y: e.pageY });
  };

  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const containedButtonStyles = {
    color: "white",
    width: "30%",
    height: "50px",
    fontSize: "22px",
  };

  const outlinedButtonStyles = {
    width: "30%",
    height: "50px",
    fontSize: "22px",
  };

  const buttonsData = [
    {
      label: "웹툰 보러가기",
      navigate: "https://comic.naver.com/challenge/list?titleId=806769",
      variant: "contained",
      openNewTab: true,
      banner: webtoon,
    },
    {
      label: "이봉이 형제 프로필",
      navigate: "/profile",
      variant: "outlined",
      banner: profile,
    },
    {
      label: "투표하러 가기",
      navigate: "/choice",
      variant: "contained",
      banner: vote,
    },
    {
      label: "인기 투표 순위",
      navigate: "/ranking",
      variant: "outlined",
      banner: ranking,
    },
    {
      label: "미니 게임",
      navigate: "/rps",
      variant: "contained",
      banner: minigame,
    },
    {
      label: "오봉이의 게시판",
      navigate: "/writelist",
      variant: "outlined",
      banner: board,
    },
  ];

  return (
    <Stack
      minHeight="100vh"
      height="fit-content"
      weight="100%"
      onMouseMove={mouseMove}
    >
      <Header />
      <Stack
        width="100%"
        alignItems="center"
        gap="100px"
        style={{ marginTop: "150px" }}
      >
        <Stack>
          *회원 가입이 번거로우시다면 우측 상단에서 로그인을 누른 후 아이디,
          비밀번호에 string을 입력하고 이용해주세요!
        </Stack>
        {buttonsData.map((button, i) => (
          <Fade>
            <img
              width="900px"
              height="250px"
              alt="banner"
              src={button.banner}
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (button.openNewTab) {
                  window.open(
                    "https://comic.naver.com/challenge/list?titleId=806769"
                  );
                } else {
                  navigate(button.navigate);
                }
              }}
            />
          </Fade>
        ))}
      </Stack>
      <Fade bottom>
        <Stack
          width="100%"
          alignItems="center"
          style={{ marginTop: "250px", paddingBottom: "150px" }}
          gap="10px"
        >
          {buttonsData.map((button, i) => (
            <Button
              variant={button.variant}
              color="primary"
              style={
                button.variant === "contained"
                  ? containedButtonStyles
                  : outlinedButtonStyles
              }
              onClick={() => {
                if (button.openNewTab) {
                  window.open(
                    "https://comic.naver.com/challenge/list?titleId=806769"
                  );
                } else {
                  navigate(button.navigate);
                }
              }}
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      </Fade>
      <img
        width="100px"
        height="125px"
        alt="bongbong"
        src={bongbong}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, 0%)",
          transition: "left 1s ease-out, top 1s ease-out",
        }}
      />
    </Stack>
  );
}

export default Main;

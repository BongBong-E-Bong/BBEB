import React from "react";
import { Stack, Button } from "@mui/material";
import bongbong from "../../image/bongbong.gif";
import banner from "../../image/banner.png";
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
    },
    // { label: "이봉이 형제 프로필", navigate: "/profile", variant: "outlined" },
    // { label: "투표하러 가기", navigate: "/main", variant: "contained" },
    // { label: "인기 투표 순위", navigate: "/ranking", variant: "outlined" },
    // { label: "미니 게임", navigate: "/main", variant: "contained" },
    // { label: "오봉이의 게시판", navigate: "/main", variant: "outlined" },
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
        {buttonsData.map((button, i) => (
          <Fade>
            <img
              width="900px"
              height="250px"
              alt="banner"
              src={banner}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(button.navigate);
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
                window.open(
                  "https://comic.naver.com/challenge/list?titleId=806769"
                );
              }}
              // onClick={() => {
              //   if (button.openNewTab) {

              //     window.open(button.navigate, "_blank");
              //   } else {
              //     navigate(button.navigate);
              //   }
              // }}
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

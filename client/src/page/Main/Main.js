import React from "react";
import { Stack, Button } from "@mui/material";
import bongbong from "../../image/bongbong.gif";
import banner from "../../image/banner.png";
import Header from "../../component/header";
import RubberBand from "react-reveal/RubberBand";

function Main() {
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

  return (
    <Stack
      minHeight="100vh"
      height="100vh"
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
        <RubberBand>
          <img
            width="900px"
            height="250px"
            alt="banner"
            src={banner}
            style={{ cursor: "pointer" }}
          />
        </RubberBand>
        <RubberBand>
          <img
            width="900px"
            height="250px"
            alt="banner"
            src={banner}
            style={{ cursor: "pointer" }}
          />
        </RubberBand>
        <RubberBand>
          <img
            width="900px"
            height="250px"
            alt="banner"
            src={banner}
            style={{ cursor: "pointer" }}
          />
        </RubberBand>
        <RubberBand>
          <img
            width="900px"
            height="250px"
            alt="banner"
            src={banner}
            style={{ cursor: "pointer" }}
          />
        </RubberBand>
      </Stack>
      <Stack
        width="100%"
        alignItems="center"
        style={{ marginTop: "250px" }}
        gap="10px"
      >
        <Button
          variant="contained"
          color="primary"
          style={containedButtonStyles}
        >
          웹툰 보러가기
        </Button>
        <Button variant="outlined" color="primary" style={outlinedButtonStyles}>
          이봉이 형제 프로필
        </Button>
      </Stack>
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

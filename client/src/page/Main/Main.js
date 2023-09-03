import React from "react";
import { Stack } from "@mui/material";
import bongbong from "../../image/bongbong.gif";
import banner from "../../image/banner.png";
import Header from "../../component/header";
import RubberBand from "react-reveal/RubberBand";

function Main() {
  const mouseMove = (e) => {
    setPosition({ x: e.pageX, y: e.pageY });
  };

  const [position, setPosition] = React.useState({ x: 0, y: 0 });

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

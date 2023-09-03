import React from "react";
import { Stack } from "@mui/material";
import bongbong from "../../image/bongbong.gif";

function Main() {
  const mouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  return (
    <Stack
      minHeight="100vh"
      height="100vh"
      weight="100%"
      onMouseMove={mouseMove}
    >
      <img
        width="100px"
        height="125px"
        alt="bongbong"
        src={bongbong}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,

          transform: "translate(-50%, -50%)",
        }}
      />
    </Stack>
  );
}

export default Main;

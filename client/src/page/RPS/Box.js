import React from "react";
import { Stack } from "@mui/material";
import Paper from "../../image/Paper.png";

const Box = (props) => {
  const item = props.item || { img: Paper };
  const flipImage = props.flipImage; // 이 속성을 통해 이미지를 좌우 반전 여부를 제어합니다.
console.log(flipImage)
  return (
    <Stack
      className={"box " + props.className}
      style={{ alignItems: "center", marginTop: "25%" }}
      spacing={5}
    >
      <Stack>{props.title}</Stack>
      <Stack>
        <img
          className="item-img"
          src={item.img}
          style={{
            width: "100%",
            height: "200px",
            transform: flipImage ? "scaleX(-1)" : "none", // 이미지를 좌우 반전으로 표시
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Box;

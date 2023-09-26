import React from "react";
import { Stack } from "@mui/material";

const Box = (props) => {
  return (
    <Stack
      className={"box " + props.className}
      style={{ alignItems: "center", marginTop:"40%"}}
      spacing={5}
    >
      <Stack>{props.title}</Stack>
      <Stack>
        <img
          className="item-img"
          src={props.item && props.item.img}
          style={{ width: "100px", height: "100px" }}
        />
      </Stack>
      <Stack>{props.result}</Stack>
    </Stack>
  );
};

export default Box;

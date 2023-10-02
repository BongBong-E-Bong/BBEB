import React from "react";
import { Stack } from "@mui/material";
import Paper from "../../image/Paper.png";

const Box = (props) => {
    const item = props.item || { img: Paper };
    return (
      <Stack
        className={"box " + props.className}
        style={{ alignItems: "center", marginTop:"25%"}}
        spacing={5}
      >
        <Stack>{props.title}</Stack>
        <Stack>
          <img
            className="item-img"
            src={item.img}
            style={{ width: "100%", height: "200px" }}
          />
        </Stack>
        {/* <Stack>{props.result}</Stack> */}
      </Stack>
    );
  };
  
  export default Box;
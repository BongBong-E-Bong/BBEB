import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import basicProfile from "../image/profilephoto.png";

function Comment() {
  const comments = [
    "이봉이 좋아",
    "이봉이 싫어",
    "메롱",
    "메롱롱",
    "메롱롱롱롱롱롱롱",
    "메롱롱롱롱롱롱롱",
    "메롱롱롱롱롱롱롱",
    "메롱롱롱롱롱롱롱",
  ];

  return (
    <Stack
      minHeight="12vh"
      height="fit-content"
      weight="100%"
      bgcolor="white"
      alignItems="center"
    >
      <Stack bgcolor="#FAF3F0" width="70%" height="12vh">
        <Stack
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
          direction="row"
        >
          <img
            alt="basicProfile"
            src={basicProfile}
            width="6.5%"
            height="70%"
            style={{ borderRadius: "50%" }}
          />
          <Stack width="65%">
            <TextField
              id="outlined-basic"
              variant="outlined"
              color="primary"
              sx={{ bgcolor: "white" }}
              placeholder="댓글을 입력하세요."
            />
          </Stack>
          <Button variant="contained" color="primary" sx={{ height: "60%" }}>
            <Stack>댓글 쓰기</Stack>
            <Stack direction="row">
              <Stack>(</Stack>
              <Stack>3</Stack>
              {/* 댓글수 */}
              <Stack>)</Stack>
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Stack bgcolor="#FAF3F0" width="70%" height="fit-content">
        <Stack width="100%" height="fit-content">
          {comments.map((comment, i) => {
            return (
              <Stack width="100%" height="10vh">
                {comment}
              </Stack>
              //   <Chip
              //     label={comment}
              //     variant="outlined"
              //     color="primary"
              //     style={{ cursor: "pointer", fontSize: "15px" }}
              //   />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Comment;

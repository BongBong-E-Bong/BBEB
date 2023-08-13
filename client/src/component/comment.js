import React from "react";
import { Stack, TextField, Button } from "@mui/material";
import basicProfile from "../image/profilephoto.png";

function Comment() {
  const comments = [
    [
      basicProfile,
      "이봉",
      "2001.08.23",
      "이봉이좋아 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~ 너무 좋아~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~이봉이좋아 너무 좋아~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",
    ],
    [basicProfile, "이봉", "2001.08.23", "이봉이좋아"],
    [
      basicProfile,
      "이봉",
      "2001.08.23",
      "이봉이좋아 이봉이좋아 이봉이좋아 이봉이좋아 이봉이좋아",
    ],
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
            width="6%"
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
              <Stack>{comments.length}</Stack>
              <Stack>)</Stack>
            </Stack>
          </Button>
        </Stack>
      </Stack>
      <Stack bgcolor="#FAF3F0" width="70%" height="fit-content">
        <Stack width="100%" height="fit-content" alignItems="center">
          {comments.map((comment, i) => {
            return (
              <Stack
                direction="row"
                width="75%"
                minHeight="10vh"
                height="fit-content"
                justifyContent="space-between"
                alignItems="center"
                sx={{ borderBottom: "1px solid #ccc" }}
              >
                <Stack
                  width="87%"
                  height="100%"
                  direction="row"
                  alignItems="flex-start"
                  marginTop="5px 0 5px 0"
                  gap="8px"
                >
                  <Stack width="8%" height="100%" justifyContent="flex-end">
                    <img
                      alt="basicProfile"
                      src={comment[0]}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "50%" }}
                    />
                  </Stack>

                  <Stack gap="2px">
                    <Stack direction="row" alignItems="flex-end" gap="6px">
                      <Stack fontSize="19px">{comment[1]}</Stack>
                      <Stack fontSize="12px"> {comment[2]}</Stack>
                    </Stack>
                    <Stack fontSize="17px" flexWrap="wrap">
                      {comment[3]}
                    </Stack>
                  </Stack>
                </Stack>
                <Stack direction="row" gap="9%" width="11%">
                  {/* 댓글 작성자가 아닐 경우X */}
                  <Stack fontSize="17px" style={{ cursor: "pointer" }}>
                    수정
                  </Stack>
                  <Stack fontSize="17px">|</Stack>
                  <Stack fontSize="17px" style={{ cursor: "pointer" }}>
                    삭제
                  </Stack>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Comment;

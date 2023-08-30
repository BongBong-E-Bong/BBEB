import React, { useState } from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";
import obong from "../../image/obong.png";

function WriteList() {
  return (
    <>
      <Header />
      <Stack minHeight="100vh" height="100%" width="100%" alignItems="center">
        <Stack width="100%" height="22vh">
          <Stack
            width="21%"
            height="10%"
            marginLeft="15%"
            marginTop="10%"
            bgcolor="#FFDEDE"
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ cursor: "pointer" }}
          >
            <Stack
              width="100%"
              height="100%"
              style={{ fontSize: "40px" }}
              alignItems="center"
              justifyContent="center"
            >
              오봉이의 게시판
            </Stack>
            <img src={obong} alt="obong" width="20%" height="400%"></img>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Stack direction="row">
            <Stack>날짜</Stack>
            <Stack>좋아요 순/최신순</Stack>
          </Stack>
          <Stack direction="row">
            <Stack>글 제목</Stack>
            <Stack>검색</Stack>
            <Stack>글쓰기</Stack>
          </Stack>
        </Stack>
        <Stack>'오봉이' 검색 결과(8)</Stack>
        <Stack>목록 부분</Stack>
        <Stack>페이지네이션 부분</Stack>
      </Stack>
    </>
  );
}

export default WriteList;

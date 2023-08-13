import React from "react";
import Header from "../../component/header";
import { Stack, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import basicProfile from "../../image/profilephoto.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Post() {
  const tags = ["이봉이 좋아", "이봉이 싫어", "메롱", "메롱롱"];

  return (
    <>
      <Header />
      <Stack
        minHeight="100vh"
        height="fit-content"
        width="100%"
        alignItems="center"
      >
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

        <Stack
          width="70%"
          marginTop="2%"
          minHeight="22vh" //72-
          height="fit-content"
          bgcolor="#FAF3F0"
        >
          <Stack //제목
            margin="6% 10% 0.6% 10%"
            style={{ fontSize: "40px", fontWeight: "bold" }}
          >
            title
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            margin="0 10% 1% 10%"
            alignItems="center"
          >
            <Stack direction="row" gap="10px">
              <img //프사
                src={basicProfile}
                alt="basicProfile"
                width="8%"
                height="8%"
              ></img>
              <Stack gap="2px" justifyContent="center" alignItems="center">
                {/* 닉네임  */}
                <Stack style={{ fontSize: "17px" }}>nickname</Stack>
                {/* 날짜 */}
                <Stack style={{ fontSize: "14px" }}>2001.08.23</Stack>
              </Stack>
              {/* 태그 */}
            </Stack>
            <Stack direction="row" gap="15px" width="20%">
              {/* 수정 삭제 버튼 글쓴이가 아닐 경우 */}
              <Stack style={{ fontSize: "17px", cursor: "pointer" }}>
                수정
              </Stack>
              <Stack style={{ fontSize: "17px" }}>|</Stack>
              <Stack style={{ fontSize: "17px", cursor: "pointer" }}>
                삭제
              </Stack>
              <Stack direction="row" gap="10px">
                <VisibilityIcon
                  style={{ color: "#767676" }}
                  sx={{ fontSize: "17px" }}
                />
                <Stack style={{ fontSize: "17px" }}>8</Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            gap="10px"
            margin="0 10% 1% 10%"
            alignItems="center"
          >
            {tags.map((tag, i) => {
              return (
                <Chip
                  label={tag}
                  variant="outlined"
                  color="primary"
                  style={{ cursor: "pointer", fontSize: "15px" }}
                />
              );
            })}
          </Stack>
        </Stack>
        <Stack
          width="70%"
          minHeight="50.5vh"
          height="fit-content"
          bgcolor="#FAF3F0"
          // justifyContent="center"
          alignItems="center"
        >
          <Stack
            width="80%"
            minHeight="48vh"
            height="fit-content"
            bgcolor="white"
            justifyContent="space-between"
            alignItems="center"
            style={{ borderRadius: "30px" }}
          >
            <Stack
              width="75%"
              minHeight="18.7vh"
              height="fit-content"
              // bgcolor="white"
              margin="10% 0 10% 0"
              justifyContent="center"
              alignItems="center"
              bgcolor="white"
            >
              hihihihi
              {/* content */}
            </Stack>
            <Stack
              direction="row"
              justifyContent="center"
              gap="4%"
              width="100%"
              height="10vh"
              bgcolor="white"
              style={{ borderRadius: "30px" }}
            >
              <ThumbUpIcon
                fontSize="large"
                style={{ cursor: "pointer", color: "#767676" }}
              ></ThumbUpIcon>
              {/* 따봉수 */}
              <Stack style={{ fontSize: "30px" }}>2</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* <Stack>댓글</Stack> */}
    </>
  );
}

export default Post;

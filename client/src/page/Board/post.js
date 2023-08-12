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
        gap="40px"
      >
        {/* <Stack width="100%" height="5%" marginLeft="10%" marginTop="10%">
          <Stack
            width="20%"
            height="100%"
            bgcolor="#FFDEDE"
            direction="row"
            justifyContent="center"
            alignItems="center"
            // gap="10px"
            style={{ cursor: "pointer" }}
          >
            <Stack style={{ fontSize: "200%" }}>오봉이의 게시판</Stack>
            <img src={obong} alt="obong" width="10%" height="10%"></img>
          </Stack>
        </Stack> */}
        <Stack width="100%" height="30vh" bgcolor="black">
          <Stack
            width="25%"
            height="10%"
            marginLeft="10%"
            marginTop="10%"
            bgcolor="#FFDEDE"
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ cursor: "pointer" }}
          >
            <Stack width="100%" height="100%" style={{ fontSize: "200%" }}>
              오봉이의 게시판
            </Stack>
            <img src={obong} alt="obong" width="10%" height="10%"></img>
          </Stack>
        </Stack>

        <Stack
          width="1314px"
          minHeight="700px"
          height="fit-content"
          bgcolor="#FAF3F0"
          gap="15px"
        >
          <Stack //제목
            margin="80px 150px 0 150px"
            style={{ fontSize: "50px", fontWeight: "bold" }}
          >
            title
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            margin="0 150px 0 150px"
            alignItems="center"
          >
            <Stack direction="row" gap="10px">
              <img //프사
                src={basicProfile}
                alt="basicProfile"
                width="60px"
                height="60px"
              ></img>
              <Stack gap="2px" justifyContent="center" alignItems="center">
                {/* 닉네임  */}
                <Stack style={{ fontSize: "20px" }}>nickname</Stack>
                {/* 날짜 */}
                <Stack style={{ fontSize: "17px" }}>2001.08.23</Stack>
              </Stack>
              {/* 태그 */}
              <Stack
                direction="row"
                gap="10px"
                marginLeft="10px"
                alignItems="center"
              >
                {tags.map((tag, i) => {
                  return (
                    <Chip
                      label={tag}
                      variant="outlined"
                      color="primary"
                      style={{ cursor: "pointer" }}
                    />
                  );
                })}
              </Stack>
            </Stack>
            <Stack direction="row" gap="15px" marginRight="20px">
              {/* 수정 삭제 버튼 글쓴이가 아닐 경우 */}
              <Stack style={{ fontSize: "20px", cursor: "pointer" }}>
                수정
              </Stack>
              <Stack style={{ fontSize: "20px" }}>|</Stack>
              <Stack style={{ fontSize: "20px", cursor: "pointer" }}>
                삭제
              </Stack>
              <Stack direction="row" gap="10px">
                <VisibilityIcon style={{ color: "#767676" }}></VisibilityIcon>
                <Stack style={{ fontSize: "20px" }}>8</Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack alignItems="center">
            <Stack
              width="995px"
              minHeight="450px"
              bgcolor="white"
              height="fit-content"
              marginBottom="30px"
            >
              <Stack margin="70px 140px 40px 140px" alignItems="center">
                {/* content */}
                <Stack bgcolor="gray" width="300px" height="2000px">
                  content
                </Stack>
                <Stack
                  marginTop="60px"
                  direction="row"
                  alignItems="center"
                  gap="20px"
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
        </Stack>
      </Stack>
      <Stack>댓글</Stack>
    </>
  );
}

export default Post;

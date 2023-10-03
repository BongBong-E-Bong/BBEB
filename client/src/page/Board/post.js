import React from "react";
import Header from "../../component/header";
import Comment from "../../component/comment";
import { Stack, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import basicProfile from "../../image/profilephoto.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Post() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const navigate = useNavigate();

  const [likeTotal, setLikeTotal] = React.useState(0);

  const likeClick = () => {
    axios
      .get("http://13.125.105.202:8080/api/posts/likes/213", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setLikeTotal(response.data.total);
      })
      .catch((error) => {
        console.error("like error:", error);
      });
  };

  const [postData, setPostData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://13.125.105.202:8080/api/posts/213", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("post data error", error);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete("http://13.125.105.202:8080/api/posts/213", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("delete error", error);
      });
  };

  const originalDateTimeString = postData?.date;
  const originalDateTime = new Date(originalDateTimeString);

  const year = originalDateTime.getFullYear();
  const month = (originalDateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = originalDateTime.getDate().toString().padStart(2, "0");
  const hours = originalDateTime.getHours().toString().padStart(2, "0");
  const minutes = originalDateTime.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

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
          minHeight="22vh"
          height="fit-content"
          bgcolor="#FAF3F0"
        >
          <Stack
            margin="6% 10% 0.6% 10%"
            style={{ fontSize: "40px", fontWeight: "bold" }}
          >
            {postData?.title}
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            margin="0 10% 1% 10%"
            alignItems="center"
          >
            <Stack direction="row" gap="10px">
              <img
                src={basicProfile}
                alt="basicProfile"
                width="8%"
                height="8%"
              ></img>
              <Stack gap="2px" justifyContent="center" alignItems="flex-start">
                <Stack style={{ fontSize: "17px" }}>{postData?.writer}</Stack>
                <Stack style={{ fontSize: "14px" }}>{formattedDateTime}</Stack>
              </Stack>
            </Stack>

            {/* 여기 수정 부분 수정함 */}
            <Stack direction="row" gap="15px" minWidth="fit-content">
              {postData?.isUpdate ? (
                <>
                  <Stack style={{ fontSize: "17px", cursor: "pointer" }}
                  onClick={navigate=("/write")}>
                    수정
                  </Stack>
                  <Stack style={{ fontSize: "17px" }}>|</Stack>
                  <Stack
                    style={{ fontSize: "17px", cursor: "pointer" }}
                    onClick={handleDelete}
                  >
                    삭제
                  </Stack>
                </>
              ) : null}
              <Stack direction="row" gap="10px">
                <VisibilityIcon
                  style={{ color: "#767676" }}
                  sx={{ fontSize: "17px" }}
                />
                <Stack style={{ fontSize: "17px" }}>{postData?.view}</Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            width="70%"
            gap="10px"
            margin="0 10% 1% 10%"
            alignItems="center"
            height="fit-content"
            flexWrap="wrap"
          >
            {postData?.tags.map((tag, i) => {
              return (
                <Chip
                  label={tag.value}
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
              margin="10% 0 10% 0"
              justifyContent="center"
              alignItems="center"
              bgcolor="white"
            >
              {postData?.contents.map((content, i) => {
                return <Stack>{content.value}</Stack>;
              })}
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
                onClick={likeClick}
              ></ThumbUpIcon>
              <Stack style={{ fontSize: "30px" }}>{likeTotal}</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Comment />
    </>
  );
}

export default Post;
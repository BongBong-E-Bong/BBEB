import React from "react";
import {
  Stack,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Menu,
} from "@mui/material";
import MoodIcon from "@mui/icons-material/Mood";
import basicProfile from "../image/profilephoto.png";
import emoticon0 from "../emoticon/...emoticon.png";
import axios from "axios";

function Comment() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  // const [commentData, setCommentData] = React.useState(0);

  // React.useEffect(() => {
  //   axios
  //     .get(
  //       "http://13.125.105.202:8080/api/comment/221?page=0&size=1&sort=string",
  //       {
  //         headers: {
  //           Authorization: accessToken,
  //         },
  //       }
  //     )
  //     .then((response) => {
  //       setCommentData(response.data.commentData);
  //     })
  //     .catch((error) => {
  //       console.error("conmment data error:", error);
  //     });
  // }, []);

  const commentData = {
    content: [
      {
        value: "이봉이",
        writer: "string",
        profileUrl:
          "https://s3.ap-northeast-2.amazonaws.com/bbeb-image/profile/default.jpg",
        createDate: "2023-09-10T11:09:49.949564",
        commentId: 225,
        type: "EMOTICON",
        emoticonUrl:
          "https://s3.ap-northeast-2.amazonaws.com/bbeb-image/emoticon/%EC%9D%B4%EB%B4%89%EC%9D%B4",
        isUpdate: true,
      },
    ],
    pageable: {
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      pageNumber: 0,
      pageSize: 1,
      paged: true,
      unpaged: false,
    },
    totalPages: 1,
    totalElements: 1,
    last: true,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    size: 1,
    numberOfElements: 1,
    first: true,
    empty: false,
  };

  // const commentData = {
  //   totalPages: 0,
  //   totalElements: 0,
  //   number: 0,
  //   sort: {
  //     empty: true,
  //     sorted: true,
  //     unsorted: true,
  //   },
  //   size: 0,
  //   content: [
  //     {
  //       value: "string",
  //       writer: "string",
  //       profileUrl: "string",
  //       createDate: "2023-08-24T12:59:28.062Z",
  //       type: "string",
  //       emoticonUrl: "string",
  //     },
  //   ],
  //   numberOfElements: 0,
  //   pageable: {
  //     sort: {
  //       empty: true,
  //       sorted: true,
  //       unsorted: true,
  //     },
  //     offset: 0,
  //     pageNumber: 0,
  //     pageSize: 0,
  //     paged: true,
  //     unpaged: true,
  //   },
  //   first: true,
  //   last: true,
  //   empty: true,
  // };

  const emoticons = [
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
    emoticon0,
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const emoticonRef = React.useRef(null);
  const handleClick = (event) => {
    setAnchorEl(emoticonRef.current);
  };

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
            width="5.5%"
            height="66%"
            style={{ borderRadius: "50%", margin: "0.5%" }}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            color="primary"
            ref={emoticonRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClick}
                  >
                    <MoodIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: "65%",
              bgcolor: "white",
              "& .MuiOutlinedInput-input": {
                height: "100%",
                padding: "4px 8px",
                fontSize: "20px",
              },
              "&.MuiTextField-root": {
                height: "60%",
              },
              "& .MuiOutlinedInput-root": {
                height: "100%",
              },
            }}
            placeholder="댓글을 입력하세요."
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: "18px", height: "60%" }}
          >
            댓글쓰기({commentData.content.length})
          </Button>
        </Stack>
      </Stack>
      <Menu
        aria-labelledby="composition-button"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null}
        PaperProps={{
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            width: "45%",
          },
        }}
      >
        <Stack direction="row" flexWrap="wrap" justifyContent="center">
          {emoticons.map((emoticon, i) => {
            return (
              <Stack width="80px" height="90px" margin="20px 20px 20px 20px">
                <img
                  alt="emoticon0"
                  src={emoticon}
                  width="100%"
                  height="100%"
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                />
              </Stack>
            );
          })}
        </Stack>
      </Menu>
      <Stack bgcolor="#FAF3F0" width="70%" height="fit-content">
        <Stack width="100%" height="fit-content" alignItems="center">
          {commentData.content.map((comment, i) => {
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
                  margin="5px 0 5px 0"
                  gap="8px"
                >
                  <Stack
                    width="8%"
                    height="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <img
                      alt="basicProfile"
                      src={commentData.content[i].profileUrl}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "50%" }}
                    />
                  </Stack>

                  <Stack gap="2px" height="100%">
                    <Stack
                      direction="row"
                      alignItems="flex-end"
                      gap="6px"
                      height="!00%"
                    >
                      <Stack fontSize="19px" style={{ fontWeight: "bold" }}>
                        {commentData.content[i].writer}
                      </Stack>
                      <Stack fontSize="12px">
                        {" "}
                        {commentData.content[i].createDate}
                      </Stack>
                    </Stack>
                    <Stack fontSize="16px" flexWrap="wrap">
                      {commentData.content[i].value}
                    </Stack>
                  </Stack>
                </Stack>
                {commentData.content[i].isUpdate ? (
                  <Stack direction="row" gap="9%" width="11%">
                    <Stack fontSize="17px" style={{ cursor: "pointer" }}>
                      수정
                    </Stack>
                    <Stack fontSize="17px">|</Stack>
                    <Stack fontSize="17px" style={{ cursor: "pointer" }}>
                      삭제
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            );
          })}
        </Stack>
        {commentData.totalElements > commentData.content.length && (
          <Stack
            alignItems="center"
            justifyContent="Center"
            width="100%"
            height="5vh"
            style={{ cursor: "pointer" }}
          >
            댓글 더보기
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Comment;

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
import emoticon0 from "../emoticon/...emoticon.png";
import axios from "axios";

function Comment() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [commentData, setCommentData] = React.useState();
  const [size, setSize] = React.useState(5);
  const page = 0;

  const fetchCommentData = (newSize) => {
    axios
      .get(
        `http://13.125.105.202:8080/api/comment/221?page=${page}&size=${newSize}&sort=string`,

        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiUk9MRV9NRU1CRVIiLCJleHAiOjE2OTUxMzE5MjB9.skZ1n-AcXulaTnLPzbtdguzMXGLoxFdJjaJ0UkfP5EU",
          },
        }
      )
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((error) => {
        console.error("comment data error:", error);
      });
  };

  const [imageUrl, setImageUrl] = React.useState("");

  React.useEffect(() => {
    axios
      .get("http://13.125.105.202:8080/api/members/profile", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiUk9MRV9NRU1CRVIiLCJleHAiOjE2OTUxMzE5MjB9.skZ1n-AcXulaTnLPzbtdguzMXGLoxFdJjaJ0UkfP5EU",
        },
      })
      .then((response) => {
        setImageUrl(response.data.url);
      })
      .catch((error) => {
        console.error("comment profile img error", error);
      });
  });

  React.useEffect(() => {
    fetchCommentData(size);
  }, [size]);

  const handleButtonClick = () => {
    setSize((prevSize) => prevSize + 5);
  };

  // const handleDelete = (commentId) => {
  //   const deleteEndpoint = `http://13.125.105.202:8080/api/comment/${commentId}`;

  //   axios
  //     .delete(deleteEndpoint, {
  //       headers: {
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiUk9MRV9NRU1CRVIiLCJleHAiOjE2OTUxMzE5MjB9.skZ1n-AcXulaTnLPzbtdguzMXGLoxFdJjaJ0UkfP5EU",
  //       },
  //     })
  //     .then((response) => {
  //       console.log("comment delete");
  //     })
  //     .catch((error) => {
  //       console.error("comment delete error", error);
  //     });
  // };

  const handleDelete = (commentId) => {
    console.log(commentId);
    axios
      .delete(`http://13.125.105.202:8080/api/comment/${commentId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJhdXRoIjoiUk9MRV9NRU1CRVIiLCJleHAiOjE2OTUxMzE5MjB9.skZ1n-AcXulaTnLPzbtdguzMXGLoxFdJjaJ0UkfP5EU",
        },
      })
      .then((response) => {
        console.log("success");
        window.location.reload();
      })
      .catch((error) => {
        console.error("delete error", error);
      });
  };

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
            src={imageUrl}
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
            댓글쓰기({commentData?.content?.length})
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
          {commentData?.content?.map((comment, i) => {
            const originalDateTimeString = commentData?.content[i]?.createDate;
            const originalDateTime = new Date(originalDateTimeString);

            const year = originalDateTime.getFullYear();
            const month = (originalDateTime.getMonth() + 1)
              .toString()
              .padStart(2, "0");
            const day = originalDateTime.getDate().toString().padStart(2, "0");
            const hours = originalDateTime
              .getHours()
              .toString()
              .padStart(2, "0");
            const minutes = originalDateTime
              .getMinutes()
              .toString()
              .padStart(2, "0");

            const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
            const commentId = commentData?.content[i]?.commentId;

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
                      src={commentData?.content[i]?.profileUrl}
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
                        {commentData?.content[i]?.writer}
                      </Stack>
                      <Stack fontSize="12px"> {formattedDateTime}</Stack>
                    </Stack>
                    <img
                      alt="imoticon"
                      src={commentData?.content[i]?.emoticonUrl}
                      width="50px"
                      height="50px"
                    ></img>
                    <Stack fontSize="16px" flexWrap="wrap">
                      {commentData?.content[i]?.value}
                    </Stack>
                  </Stack>
                </Stack>
                {commentData?.totalElements > page ? (
                  <Stack direction="row" gap="9%" width="11%">
                    <Stack fontSize="17px" style={{ cursor: "pointer" }}>
                      수정
                    </Stack>
                    <Stack fontSize="17px">|</Stack>
                    <Stack
                      fontSize="17px"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(commentId)}
                    >
                      삭제
                    </Stack>
                  </Stack>
                ) : null}
              </Stack>
            );
          })}
        </Stack>
        {commentData?.totalElements > size ? (
          <Stack
            alignItems="center"
            justifyContent="Center"
            width="100%"
            height="5vh"
            style={{ cursor: "pointer" }}
            onClick={handleButtonClick}
          >
            댓글 더보기
          </Stack>
        ) : null}
      </Stack>
    </Stack>
  );
}

export default Comment;

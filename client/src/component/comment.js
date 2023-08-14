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
    setAnchorEl(emoticonRef.current); // Stack 컴포넌트의 ref를 anchorEl로 설정
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
            width="6%"
            height="66%"
            style={{ borderRadius: "50%" }}
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
            댓글쓰기({comments.length})
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
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
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
                      src={comment[0]}
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

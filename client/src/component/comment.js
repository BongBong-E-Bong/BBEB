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
import ebongticon1 from "../emoticon/ebongticon1.png";
import ebongticon2 from "../emoticon/ebongticon2.png";
import ebongticon3 from "../emoticon/ebongticon3.png";
import ebongticon4 from "../emoticon/ebongticon4.png";
import ebongticon5 from "../emoticon/ebongticon5.png";
import ebongticon6 from "../emoticon/ebongticon6.png";
import ebongticon7 from "../emoticon/ebongticon7.png";
import ebongticon8 from "../emoticon/ebongticon8.png";
import axios from "axios";

function Comment() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [commentData, setCommentData] = React.useState();
  const [size, setSize] = React.useState(5);
  const page = 0;

  const fetchCommentData = (newSize) => {
    axios
      .get(
        `http://13.125.105.202:8080/api/comment/221?page&size=${newSize}&sort=string`,

        {
          headers: {
            Authorization: accessToken,
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
          Authorization: accessToken,
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

  const handleDelete = (commentId) => {
    console.log(commentId);
    axios
      .delete(`http://13.125.105.202:8080/api/comment/${commentId}`, {
        headers: {
          Authorization: accessToken,
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
    ebongticon1,
    ebongticon2,
    ebongticon3,
    ebongticon4,
    ebongticon5,
    ebongticon6,
    ebongticon7,
    ebongticon8,
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const emoticonRef = React.useRef(null);
  const handleClick = (event) => {
    setAnchorEl(emoticonRef.current);
  };

  const [emoticonState, setEmoticonState] = React.useState(0);

  const emoticonCancel = () => {
    setEmoticonState(0);
  };

  function emoticonNumber(emoticonState) {
    if (emoticonState === 1) {
      return ebongticon1;
    } else if (emoticonState === 2) {
      return ebongticon2;
    } else if (emoticonState === 3) {
      return ebongticon3;
    } else if (emoticonState === 4) {
      return ebongticon4;
    } else if (emoticonState === 5) {
      return ebongticon5;
    } else if (emoticonState === 6) {
      return ebongticon6;
    } else if (emoticonState === 7) {
      return ebongticon7;
    } else if (emoticonState === 8) {
      return ebongticon8;
    }
  }

  const [response, setResponse] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");

  const postRequest = async () => {
    try {
      const sendData = {
        value: inputValue,
        type: "EMOTICON_TEXT",
        postId: 221,
        emoticonNumber: emoticonState,
      };
      window.location.reload();

      const response = await axios.post(
        "http://13.125.105.202:8080/api/comment",
        sendData,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      setResponse(response.data);
    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const valueClear = (event) => {
    setInputValue("");
  };

  return (
    <Stack
      minHeight="12vh"
      height="fit-content"
      weight="100%"
      bgcolor="white"
      alignItems="center"
    >
      <Stack bgcolor="#FAF3F0" width="70%" height="12vh" position="relative">
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
            value={inputValue}
            onChange={handleChange}
          ></TextField>

          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: "18px", height: "60%" }}
            onClick={() => {
              postRequest();
              emoticonCancel();
              valueClear();
            }}
          >
            댓글쓰기({commentData?.totalElements})
          </Button>
        </Stack>
        {emoticonState !== 0 && (
          <Stack
            position="absolute"
            bottom="80%"
            right="19%"
            width="65%"
            height="160px"
            justifyContent="center"
            alignItems="center"
            bgcolor="rgba(0, 0, 0, 0.2)"
            style={{ borderRadius: "15px 15px 0 0" }}
          >
            <Stack
              position="absolute"
              right="3%"
              top="5%"
              style={{ fontSize: "20px", cursor: "pointer" }}
              color="white"
              onClick={emoticonCancel}
            >
              X
            </Stack>
            <img
              alt={emoticonNumber(emoticonState)}
              src={emoticonNumber(emoticonState)}
              width="110px"
              height="120px"
            />
          </Stack>
        )}
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
            const emoticonClick = () => {
              setEmoticonState(i + 1);
            };

            return (
              <Stack width="110px" height="120px" margin="20px 20px 20px 20px">
                <img
                  alt="emoticon0"
                  src={emoticon}
                  width="100%"
                  height="100%"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    emoticonClick();
                    handleClose();
                  }}
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

            let emoticonNum = commentData?.content[i]?.emoticonNumber;

            function emoticon(emoticonNum) {
              if (emoticonNum === "1") {
                return ebongticon1;
              } else if (emoticonNum === "2") {
                return ebongticon2;
              } else if (emoticonNum === "3") {
                return ebongticon3;
              } else if (emoticonNum === "4") {
                return ebongticon4;
              } else if (emoticonNum === "5") {
                return ebongticon5;
              } else if (emoticonNum === "6") {
                return ebongticon6;
              } else if (emoticonNum === "7") {
                return ebongticon7;
              } else if (emoticonNum === "8") {
                return ebongticon8;
              }
            }

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
                    {commentData?.content[i]?.emoticonNumber !== "0" && (
                      <img
                        alt={emoticon(emoticonNum)}
                        src={emoticon(emoticonNum)}
                        width="110px"
                        height="120px"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      ></img>
                    )}
                    <Stack fontSize="16px" flexWrap="wrap">
                      {commentData?.content[i]?.value}
                    </Stack>
                  </Stack>
                </Stack>
                {commentData?.content[i]?.isUpdate ? (
                  <Stack direction="row" gap="9%" width="11%">
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

import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import { Stack, Checkbox, TextField, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import axios from "axios";
import WriteModal from "./writeModal";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";
import FormatAlignCenter from "../../image/FormatAlignCenter.png";
import FormatAlignLeft from "../../image/FormatAlignLeft.png";
import FormatAlignRight from "../../image/FormatAlignRight.png";

function Write() {
  const [checked, setChecked] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const alignments = ["left", "center", "right"]; // 4개의 정렬 옵션
  const [authModalFailOpen, setAuthModalFailOpen] = useState(false);
  const isLogin = Boolean(localStorage.getItem("accessDoraTokenDora"));
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const handleAlignmentChange = (alignment) => {
    setAlignment(alignment);
  };

  const navigate = useNavigate();

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyPress = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  const handleTagClick = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handlePhotoUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleCreatePost = () => {
    if (isLogin) {
      const postDataToSend = {
        title: "하하!",
        thumbnail: "호두.jpg",
        isPinned: 1,
        content: [
          {
            contentType: "TEXT",
            value: "하하!",
            contentOrder: 0,
          },
        ],
        postTag: tags.map((tag) => ({ value: tag })),
      };
      axios
        .post("http://13.125.105.202:8080/api/posts", postDataToSend, {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log("게시글이 성공적으로 생성되었습니다.", response.data);
          // navigate("/YourNextRoute");
        })
        .catch((error) => {
          setAuthModalFailOpen(true);
        });
    } else {
      // 로그아웃 상태에서 글쓰기를 눌렀을 때 AuthModalFail을 표시
      setAuthModalFailOpen(true);
    }
  };

  const handleAuthModalConfirm = () => {
    setAuthModalFailOpen(false);
  };

  useEffect(() => {
    const textField = document.getElementById("content-textfield"); // ID를 이용해 DOM 요소 가져옴
    if (textField) {
      if (alignment !== "justify") {
        // 양쪽 정렬이 아닐 때만 스타일 변경
        textField.style.textAlign = alignment;
      }
    }
  }, [alignment]);

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
        <Stack
          width="70%"
          marginTop="2%"
          minHeight="74vh"
          height="fit-content"
          bgcolor="#FAF3F0"
        >
          <Stack spacing={1}>
            <Stack spacing={2}>
              <Stack justifyContent="flex-end" alignItems="center">
                <Checkbox checked={checked} onChange={handleChange} />
                {checked ? "고정 되었습니다." : "고정되지 않은 상태입니다."}
              </Stack>
              <Stack alignItems="center">
                <TextField
                  label="제목"
                  placeholder="제목을 입력하세요."
                  variant="outlined"
                  style={{ width: "80%", backgroundColor: "#FFF" }}
                />
              </Stack>
              <Stack alignItems="center">
                <TextField
                  label="태그"
                  placeholder="태그를 입력하세요."
                  variant="outlined"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyPress={handleTagInputKeyPress}
                  style={{ width: "80%", backgroundColor: "#FFF" }}
                />
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ width: "80%" }} // 텍스트 필드 너비를 기준으로 설정
                >
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      style={{
                        margin: "4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%", // 넘어가도 최대 너비 설정
                        color: "#FF8181",
                        backgroundColor: "#FAF3F0",
                        border: "1px solid #FF8181",
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
            <Stack width="100%" height="100%" alignItems="center" spacing={2}>
              <Stack
                width="100%"
                height="100%"
                direction="row"
                justifyContent="center"
                spacing={3}
              >
                {alignments.map((align) => (
                  <Stack
                    key={align}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleAlignmentChange(align);
                    }}
                  >
                    <Stack>
                      {align === "left" ? (
                        <img src={FormatAlignLeft} alt="FormatAlignLeft" />
                      ) : align === "center" ? (
                        <img src={FormatAlignCenter} alt="FormatAlignCenter" />
                      ) : align === "right" ? (
                        <img src={FormatAlignRight} alt="FormatAlignRight" />
                      ) : null}
                    </Stack>
                  </Stack>
                ))}
              </Stack>
              <TextField
                id="content-textfield"
                placeholder="내용을 입력하세요."
                variant="outlined"
                multiline
                rows={15}
                style={{
                  width: "80%",
                  backgroundColor: "#FFF",
                }}
              />

              <Stack
                width="100%"
                height="100%"
                direction="row"
                justifyContent="center"
                spacing={3}
              >
                <Stack
                  bgcolor="#FFF"
                  sx={{
                    cursor: "pointer",
                    color: "black",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #FF8181",
                    width: "6%",
                    height: "30px",
                  }}
                  onClick={() => {
                    //이후 추가
                  }}
                >
                  <Stack fontSize="20px">나가기</Stack>
                </Stack>
                <Stack
                  bgcolor="#FF8181"
                  sx={{
                    cursor: "pointer",
                    color: "white",
                    borderRadius: "10px",
                    alignItems: "center",
                    border: "1px solid #FF8181",
                    justifyContent: "center",
                    width: "6%",
                    height: "30px",
                  }}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <Stack fontSize="20px">글쓰기</Stack>
                </Stack>
                {modalOpen && (
                  <WriteModal
                    setOpen={setModalOpen}
                    onCreatePost={handleCreatePost}
                    setAuthModalFailOpen={setAuthModalFailOpen}
                  />
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Write;

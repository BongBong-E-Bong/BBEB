import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import { Stack, Checkbox, TextField, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import axios from "axios";
import WriteModal from "./writeModal";
import { useNavigate } from "react-router-dom";
import FormatAlignCenter from "../../image/FormatAlignCenter.png";
import FormatAlignLeft from "../../image/FormatAlignLeft.png";
import FormatAlignRight from "../../image/FormatAlignRight.png";
import AddPhotoAlternate from "../../image/AddPhotoAlternate.png";
import AuthModalFail from "../../component/authModal_fail";
import Modal from "../../component/Modal";
import jwt_decode from "jwt-decode";

function Write() {
  const [checked, setChecked] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const alignments = ["left", "center", "right"];
  const [authModalFailOpen, setAuthModalFailOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");
  const [thumbnail, setThumbnail] = useState(null);
  const isLogin = Boolean(localStorage.getItem("accessDoraTokenDora"));
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const [decodedToken, setDecodedToken] = useState({});
  const userId = decodedToken ? decodedToken.sub : "";
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  const handleFailModalClose = () => {
    setFailModalOpen(false);
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleImageUpload = (event) => {
    const selectedFiles = event.target.files;

    if (selectedFiles.length > 0) {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        const imageFile = selectedFiles[0];
        const newImageTag = `![${imageFile.name}](${e.target.result})`;
        const newText = `${text}\n${newImageTag}`;
        setText(newText);
      };

      fileReader.readAsDataURL(selectedFiles[0]);
    }
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

  const handleAlignmentChange = (alignment) => {
    setTextAlignment(alignment);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleCreatePost = () => {
    if (isLogin) {
      const contentData = content.map((contentItem, index) => ({
        contentType: "TEXT",
        value: contentItem,
        contentOrder: index,
      }));

      const postDataToSend = {
        title: title,
        thumbnail: thumbnail ? thumbnail.name : "",
        isPinned: checked ? 1 : 0,
        content: contentData,
        postTag: postTags,
      };

      axios
        .post("http://13.125.105.202:8080/api/posts", postDataToSend, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((response) => {
          console.log("isAdmin:", isAdmin);
          console.log(decodedToken);
          console.log("Write 아이디:", userId);
          console.log("제목:", title);
          console.log("썸네일:", thumbnail);
          console.log("고정:", checked);
          console.log("내용:", contentData);
        })
        .catch((error) => {
          setAuthModalFailOpen(true);
        });
    } else {
      setAuthModalFailOpen(true);
    }
  };

  useEffect(() => {
    const textField = document.getElementById("content-textfield");
    if (textField) {
      textField.style.textAlign = textAlignment;
    }
  }, [textAlignment]);

  useEffect(() => {
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setDecodedToken(decoded);
    }
  }, [accessToken]);

  const isAdmin = decodedToken && decodedToken.isAdmin;

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
                {isAdmin && (
                  <Checkbox checked={checked} onChange={handleChange} />
                )}
              </Stack>
              <Stack alignItems="center">
                <TextField
                  label="제목"
                  placeholder="제목을 입력하세요."
                  variant="outlined"
                  style={{ width: "80%", backgroundColor: "#FFF" }}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  style={{ width: "80%" }}
                >
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onClick={() => handleTagClick(tag)}
                      style={{
                        margin: "4px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                        color: "#FF8181",
                        backgroundColor: "#FAF3F0",
                        border: "1px solid #FF8181",
                        cursor: "pointer",
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
                <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                  <img src={AddPhotoAlternate} alt="AddPhotoAlternate" />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image-upload"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  multiple
                />
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
                value={text}
                onChange={(e) => setText(e.target.value)}
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
                    height: "35px",
                  }}
                  onClick={() => {
                    // 이후 추가
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
                    height: "35px",
                  }}
                  onClick={() => {
                    if (isLogin) {
                      setModalOpen(true);
                    } else {
                      setFailModalOpen(true);
                    }
                  }}
                >
                  <Stack fontSize="20px">글쓰기</Stack>
                </Stack>
                {modalOpen && (
                  <WriteModal
                    setOpen={setModalOpen}
                    onCreatePost={handleCreatePost}
                    setAuthModalFailOpen={setAuthModalFailOpen}
                    thumbnail={thumbnail} // 수정된 부분
                  />
                )}
              </Stack>
              <Modal
                width="750px"
                height="430px"
                open={failModalOpen}
                onClose={handleFailModalClose}
              >
                <AuthModalFail
                  message="실패"
                  detailMessage="회원만 글을 작성할 수 있어!"
                  onClose={handleFailModalClose}
                />
              </Modal>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
export default Write;

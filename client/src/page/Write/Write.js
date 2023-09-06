import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import { Stack, Checkbox, TextField, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import axios from "axios";
import WriteModal from "./writeModal";
import { useNavigate } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

function Write() {
  const [checked, setChecked] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alignment, setAlignment] = useState("left");

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

      // Chip을 추가하는 로직 추가
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

  useEffect(() => {
    const textField = document.getElementById("content-textfield");
    if (textField) {
      if (alignment !== "justify") {
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
            marginTop="8%"
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
          marginTop="0%"
          minHeight="74vh"
          height="fit-content"
          bgcolor="#FAF3F0"
        >
          <Stack spacing={1}>
            <Stack spacing={2}>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                sx={{ justifyContent: "flex-end" }}
              />
              {/* <span style={{ marginLeft: "auto" }}>
    {checked ? "고정 됐는데!!" : ""}
  </span> */}
            </Stack>

            <Stack alignItems="center">
              <TextField
                label="제목"
                placeholder="제목을 입력하세요."
                variant="outlined"
                style={{ width: "65%", backgroundColor: "#FFF" }}
              />
            </Stack>
            <Stack alignItems="center">
            <Stack alignItems="center">
  <Stack direction="row" alignItems="center" style={{ width: "65%" }}> {/* 수정된 부분 */}
    <TextField
      label="태그"
      placeholder="태그를 입력하세요."
      variant="outlined"
      style={{ width: "100%", backgroundColor: "#FFF" }}
      value={tagInput}
      onChange={handleTagInputChange}
      onKeyPress={handleTagInputKeyPress}
    />
    {tags.map((tag, index) => (
      <Chip
        key={index}
        label={tag}
        onDelete={() => handleTagClick(tag)}
        variant="outlined"
        style={{ margin: "4px" }}
      />
    ))}
  </Stack>
</Stack>



            <Stack height="100%" spacing={2}>
              <Stack
                className="edit_wrap"
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Editor
                  initialValue="내용을 입력하세요."
                  previewStyle="vertical"
                  height="400px" // 높이를 300px로 설정
                  initialEditType="wysiwyg"
                  useCommandShortcut={false}
                  plugins={[colorSyntax]}
                  language="ko-KR"
                />
              </Stack>

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
                    border: "1px solid #FF8181",
                    width: "6%",
                    height: "10%",
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
                    width: "6%",
                    height: "10%",
                  }}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  <Stack fontSize="20px">글쓰기</Stack>
                </Stack>

                {modalOpen && <WriteModal setOpen={setModalOpen} />}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Write;

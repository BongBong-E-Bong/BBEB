import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import { Stack, Checkbox, TextField, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import FormatAlignCenter from "../../image/FormatAlignCenter.png";
import FormatAlignLeft from "../../image/FormatAlignLeft.png";
import FormatAlignRight from "../../image/FormatAlignRight.png";
import AddPhotoAlternate from "../../image/AddPhotoAlternate.png";
import axios from "axios";
import WriteModal from "./writeModal";
import { useNavigate } from "react-router-dom";

function Write() {
  const [checked, setChecked] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [alignment, setAlignment] = useState("left");
  const alignments = ["left", "center", "right"]; // 4개의 정렬 옵션

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
      setSelectedImage(URL.createObjectURL(selectedFile)); // 이미지 파일을 저장
    }
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
          {/* 여기 6이 태그랑 내용 사이 공백 */}
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
              </Stack>
              <Stack width="100%">
                <Stack direction="row" spacing={2} marginLeft="10%">
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onClick={() => handleTagClick(tag)}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#FAF3F0",
                        border: "1px solid #FF8181",
                        color: "#FF8181",
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
                <Stack>
                  <input
                    type="file"
                    id="photo-input"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="photo-input">
                    <img
                      src={AddPhotoAlternate}
                      alt="AddPhotoAlternate"
                      style={{ cursor: "pointer" }}
                    />
                  </label>
                </Stack>
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
    border: "1px solid #FF8181",
    width: "6%",
    height: "10%" // 백분율(%)로 높이 조정 (원하는 비율로 수정)
  }}
  onClick={() => {
    navigate("/writeList");
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
    height: "10%" // 백분율(%)로 높이 조정 (원하는 비율로 수정)
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

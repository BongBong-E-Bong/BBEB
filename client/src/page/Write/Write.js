import React, { useState, useEffect, useRef } from "react";
import Header from "../../component/header";
import { Stack, Checkbox, TextField, Chip } from "@mui/material";
import obong from "../../image/obong.png";
import axios from "axios";
import WriteModal from "./writeModal";
import { useNavigate } from "react-router-dom";
import AuthModalFail from "../../component/authModal_fail";
import Modal from "../../component/Modal";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import jwt_decode from "jwt-decode";

function Write() {
  const [checked, setChecked] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [authModalFailOpen, setAuthModalFailOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [postTags, setPostTags] = useState([]);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const isLogin = Boolean(localStorage.getItem("accessDoraTokenDora"));
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const [decodedToken, setDecodedToken] = useState({});
  const userId = decodedToken ? decodedToken.sub : "";
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [content, setContent] = useState([]);

  const handleFailModalClose = () => {
    setFailModalOpen(false);
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagInputKeyPress = (event) => {
    if (event.key === "Enter" && tagInput.trim() !== "") {
      const newTag = tagInput.trim();
      setTags([...tags, newTag]);
      setPostTags([...postTags, { value: newTag }]);
      setTagInput("");
    }
  };

  const handleTagClick = (tagToRemove) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);

    const updatedPostTags = postTags.filter(
      (tagObj) => tagObj.value !== tagToRemove
    );
    setPostTags(updatedPostTags);
  };
  const editorRef = useRef(null);
  const handleCreatePost = () => {
    if (isLogin) {
      const editorInstance =
        editorRef.current && editorRef.current.getInstance();

      if (editorInstance) {
        const markdownContent = editorInstance.getMarkdown();
        const textContents = markdownContent.split("\n");

        let contentOrderCounter = 0;

        const textContentObjects = textContents.map((textContent) => {
          const trimmedTextContent = textContent.trim();
          const isBlankLine = !trimmedTextContent;
          if (isBlankLine) {
            return {
              contentType: "TEXT",
              value: "<br>",
              contentOrder: contentOrderCounter++,
            };
          }

          if (trimmedTextContent.startsWith("![")) {
            const imageValue = trimmedTextContent;

            const imageObject = {
              contentType: "IMAGE",
              value: imageValue,
              contentOrder: contentOrderCounter++,
            };

            return imageObject;
          }

          const contentObject = {
            contentType: "TEXT",
            value: trimmedTextContent,
            contentOrder: contentOrderCounter++,
          };

          return contentObject;
        });

        const postDataToSend = {
          title: title,
          thumbnail: thumbnail ? thumbnail.name : "",
          isPinned: checked ? 1 : 0,
          content: [...content, ...textContentObjects],
          postTag: postTags,
        };

        axios
          .post("http://13.125.105.202:8080/api/posts", postDataToSend, {
            headers: {
              Authorization: accessToken,
            },
          })
          .then((response) => {
            console.log("제목:", title);
            console.log("썸네일:", thumbnail ? thumbnail.name : "");
            console.log("고정:", checked ? 1 : 0);
            console.log("내용:", [...content, ...textContentObjects]);
            console.log("태그:", postTags);
          })
          .catch((error) => {
            setAuthModalFailOpen(true);
            console.error("Error creating post:", error.response);
          });
      } else {
        console.error("Editor instance is not available.");
      }
    } else {
      setAuthModalFailOpen(true);
    }
  };

  //관리자 권한시 체크박스 보이게 해주는 코드
  useEffect(() => {
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      setDecodedToken(decoded);
      console.log(accessToken);
      if (decoded && decoded.auth === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
      console.log(decoded);
    }
  }, [accessToken]);

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
          <Stack spacing={1} marginTop="2%">
            <Stack spacing={2}>
              {isAdmin && (
                <Stack justifyContent="flex-end" alignItems="center">
                  <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                </Stack>
              )}
              <Stack alignItems="center">
                <TextField
                  label="제목"
                  placeholder="제목을 입력하세요."
                  variant="outlined"
                  style={{ width: "71%", backgroundColor: "#FFF" }}
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
                  style={{ width: "71%", backgroundColor: "#FFF" }}
                />
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ width: "71%" }}
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
              ></Stack>
              <Editor
                ref={editorRef}
                initialValue="내용을 입력하세요."
                previewStyle="vertical"
                height="450px"
                initialEditType="wysiwyg"
                useCommandShortcut={false}
                onChange={(e) => setEditorContent(e)}
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
                    thumbnail={thumbnail}
                    setThumbnail={(file) => setThumbnail(file)}
                    editorContent={editorContent}
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

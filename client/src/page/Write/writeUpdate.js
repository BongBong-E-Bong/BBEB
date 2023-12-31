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
import { useParams } from "react-router-dom";

function WriteUpdate() {
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
  const accessToken = localStorage.getItem("accessDoraTokenDora");
  const [decodedToken, setDecodedToken] = useState({});
  const userId = decodedToken ? decodedToken.sub : "";
  const navigate = useNavigate();
  const [editorContent, setEditorContent] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { postId } = useParams();

  const handleFailModalClose = () => {
    setFailModalOpen(false);
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

// useEffect를 사용하여 postTags 상태를 초기화
useEffect(() => {
  setPostTags(tags.map((tag) => ({ value: tag })));
}, [tags]);

const handleTagInputKeyPress = (event) => {
  if (event.key === "Enter" && tagInput.trim() !== "") {
    const newTag = tagInput.trim();
    if (!tags.includes(newTag)) {
      const newTags = [...tags, newTag];
      setTags(newTags);

      setTagInput("");
    }
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

  const handleUpdatePostTags = (newTags) => {
    setPostTags(newTags);
  };

  const editorRef = useRef(null);

  //수정 api연동 연동
  const handleCreatePost = () => {
    if (isLogin) {
      const editorInstance =
        editorRef.current && editorRef.current.getInstance();

      if (editorInstance) {
        const markdownContent = editorInstance.getMarkdown();

        const newContent = {
          contentType: "TEXT",
          value: markdownContent,
          contentOrder: 0,
        };

        const postTagArray = tags.map((tag) => ({ value: tag }));

        const postDataToSend = {
          title: title,
          thumbnail: thumbnail ? thumbnail.name : "",
          isPinned: checked ? 1 : 0,
          sortType: 1,
          contents: [newContent],
          tags: postTags,
        };

        axios
          .put(`http://13.125.105.202:8080/api/posts/${postId}`, postDataToSend, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((response) => {
            console.log(postDataToSend);
            console.log("태그 현 상황",postTags)
          })
          .catch((error) => {
            setAuthModalFailOpen(true);
            console.error("Error updating post:", error.response);
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

  //값 가져오기 api
  React.useEffect(() => {
    const editorInstance = editorRef.current && editorRef.current.getInstance();

    if (editorInstance) {
      axios
        .get(`http://13.125.105.202:8080/api/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          setTitle(response.data.title);
          const tagsArray = response.data.tags.map((tagObj) => tagObj.value);
          setTags(tagsArray);
          setChecked(response.data.isPinned);

          // 에디터 내용 설정
          const newContent = response.data.contents[0].value;
          setEditorContent(newContent); // 에디터 내용 업데이트

          // initialValue를 업데이트하지 않고 내용을 설정하면 됩니다.
          editorInstance.setMarkdown(newContent);
          console.log("내용값->", newContent);
        })
        .catch((error) => {
          console.error("post data error", error);
        });
    }
  }, [postId, accessToken]);

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
              {isAdmin && isLogin && (
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
              <Editor
                ref={editorRef}
                initialValue="내용을 입력하세요."
                value={editorContent}
                previewStyle="vertical"
                height="450px"
                initialEditType="markdown"
                useCommandShortcut={false}
                hideModeSwitch={true}
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
                    postTags={postTags} // 수정: postTags 상태 전달
                    onUpdatePostTags={handleUpdatePostTags} // 수정: 업데이트 함수 전달
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
export default WriteUpdate;

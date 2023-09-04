import React, { useState } from "react";
import Header from "../../component/header";
import {
  Stack,
  Switch,
  Autocomplete,
  TextField,
  Paper,
  Pagination,
} from "@mui/material"; // TextField와 Autocomplete 불러오기
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import obong from "../../image/obong.png";
import thumnail from "../../image/thumnail.png";
import hit from "../../image/hit.png";
import like from "../../image/like.png";
import comment from "../../image/comment.png";
import { useNavigate } from "react-router-dom";

function WriteList() {
  const itemsPerPage = 8; // 페이지당 표시할 게시글 수
  const totalItems = 100; // 전체 게시글 수 (예시로 8개)

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const titleOptions = ["글 제목", "태그", "작성자", "글 내용"];

  const [selectedTitle, setSelectedTitle] = useState("글 제목");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      <Header />
      <Stack alignItems="center">
        <Stack width="100%" height="22vh">
          <Stack
            width="26%"
            height="10%"
            marginLeft="15%"
            marginTop="9%"
            bgcolor="#FFDEDE"
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ cursor: "pointer" }}
          >
            <Stack
              width="100%"
              height="100%"
              style={{ fontSize: "55px" }}
              alignItems="center"
              justifyContent="center"
            >
              오봉이🐷의 게시판
            </Stack>
            <img src={obong} alt="obong" width="25%" height="600%"></img>
          </Stack>
        </Stack>
        <Stack
          width="70%"
          marginTop="2%"
          // minHeight="74vh"
          // height="fit-content"
          // bgcolor="#FAF3F0"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            height="100%"
          >
            <Stack direction="row" spacing={2} justifyContent="">
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker />
                </LocalizationProvider>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Stack fontSize="12px">좋아요 순</Stack>
                <Switch></Switch>
                <Stack fontSize="12px">최신순</Stack>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={1}>
              <Stack>
                <Autocomplete
                  id="title-autocomplete"
                  options={titleOptions}
                  value={selectedTitle}
                  onChange={(event, newValue) => setSelectedTitle(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
              <Stack>
                <TextField
                  label="검색"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Stack>
              <Stack
                bgcolor="#FF8181"
                sx={{
                  cursor: "pointer",
                  color: "white",
                  borderRadius: "10px",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "35%",
                }}
                onClick={() => {
                  navigate("/Write");
                }}
              >
                <Stack fontSize="20px">글쓰기</Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack>'오봉이' 검색 결과(8)</Stack>
          <Stack spacing={10} marginTop="2%" height="100%" width="100%">
            <Stack direction="row" justifyContent="space-between">
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={thumnail}
                  alt="thumnail"
                  style={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={obong}
                    alt="obong"
                    style={{
                      width: "13%",
                      borderRadius: "50px",
                      padding: "3%",
                      marginLeft: "5%",
                    }}
                  />
                  <Stack width="100%">
                    <Stack fontSize="14px">안녕 난 오봉이야</Stack>
                    <Stack fontSize="12px">2001-08-23</Stack>
                    <Stack fontSize="12px">🐷오봉이</Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} width="100%">
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={like} alt="like" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={hit} alt="hit" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={comment} alt="comment" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={thumnail}
                  alt="thumnail"
                  style={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={obong}
                    alt="obong"
                    style={{
                      width: "13%",
                      borderRadius: "50px",
                      padding: "3%",
                      marginLeft: "5%",
                    }}
                  />
                  <Stack>
                    <Stack fontSize="14px">안녕 난 오봉이야</Stack>
                    <Stack fontSize="12px">2001-08-23</Stack>
                    <Stack fontSize="12px">🐷오봉이</Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ padding: "8%" }}>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={like} alt="like" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={hit} alt="hit" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={comment} alt="comment" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <img
                  src={thumnail}
                  alt="thumnail"
                  style={{
                    width: "100%",
                    height: "70%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                />
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  spacing={1}
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={obong}
                    alt="obong"
                    style={{
                      width: "13%",
                      borderRadius: "50px",
                      padding: "3%",
                      marginLeft: "5%",
                    }}
                  />
                  <Stack>
                    <Stack fontSize="14px">안녕 난 오봉이야</Stack>
                    <Stack fontSize="12px">2001-08-23</Stack>
                    <Stack fontSize="12px">🐷오봉이</Stack>
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={like} alt="like" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={hit} alt="hit" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                    <Stack direction="row" spacing={0.5}>
                      <Stack>
                        <img src={comment} alt="comment" />
                      </Stack>
                      <Stack>5</Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                }}
              >
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  sx={{
                    marginTop: "50%",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <Stack>이미지</Stack>
                  <Stack>
                    <Stack>제목 </Stack>
                    <Stack>작성일</Stack>
                    <Stack>작성자</Stack>
                  </Stack>
                  <Stack>
                    <Stack>따봉</Stack>
                    <Stack>조회수</Stack>
                    <Stack>댓글 수</Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                }}
              >
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  sx={{
                    marginTop: "50%",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <Stack>이미지</Stack>
                  <Stack>
                    <Stack>제목 </Stack>
                    <Stack>작성일</Stack>
                    <Stack>작성자</Stack>
                  </Stack>
                  <Stack>
                    <Stack>따봉</Stack>
                    <Stack>조회수</Stack>
                    <Stack>댓글 수</Stack>
                  </Stack>
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                }}
              >
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  sx={{
                    marginTop: "50%",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <Stack>이미지</Stack>
                  <Stack>
                    <Stack>제목 </Stack>
                    <Stack>작성일</Stack>
                    <Stack>작성자</Stack>
                  </Stack>
                  <Stack>
                    <Stack>따봉</Stack>
                    <Stack>조회수</Stack>
                    <Stack>댓글 수</Stack>
                  </Stack>
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                }}
              >
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  sx={{
                    marginTop: "50%",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <Stack>이미지</Stack>
                  <Stack>
                    <Stack>제목 </Stack>
                    <Stack>작성일</Stack>
                    <Stack>작성자</Stack>
                  </Stack>
                  <Stack>
                    <Stack>따봉</Stack>
                    <Stack>조회수</Stack>
                    <Stack>댓글 수</Stack>
                  </Stack>
                </Stack>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#D9D9D9",
                  width: "24%",
                }}
              >
                <Stack
                  direction="row"
                  bgcolor="#FAF3F0"
                  sx={{
                    marginTop: "50%",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                >
                  <Stack>이미지</Stack>
                  <Stack>
                    <Stack>제목 </Stack>
                    <Stack>작성일</Stack>
                    <Stack>작성자</Stack>
                  </Stack>
                  <Stack>
                    <Stack>따봉</Stack>
                    <Stack>조회수</Stack>
                    <Stack>댓글 수</Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
          </Stack>

          <Stack alignItems="center" marginTop="5%">
            <Pagination
              count={Math.ceil(totalItems / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default WriteList;
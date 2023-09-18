import React, { useState, useEffect } from "react";
import Header from "../../component/header";
import {
  Stack,
  Switch,
  Autocomplete,
  TextField,
  Paper,
  Pagination,
  InputAdornment,
} from "@mui/material";
import { LocalizationProvider, DateRangePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns"; // Date Adapter에 맞는 패키지를 import 해야 합니다.
import obong from "../../image/obong.png";
import thumnail from "../../image/thumnail.png";
import hit from "../../image/hit.png";
import like from "../../image/like.png";
import comment from "../../image/comment.png";
import SearchIcon from "../../image/Search.png";
import { useNavigate } from "react-router-dom";

function WriteList() {
  const itemsPerPage = 8;
  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [sortByDate, setSortByDate] = useState(false); // 스위치 상태 추가
  const posts = [
    {
      id: 1,
      thumbnail: thumnail,
      obongImage: obong,
      title: "안녕 난 오봉이야",
      date: "2001-08-23",
      author: "🐷오봉이",
      likeCount: 1,
      hitCount: 1,
      commentCount: 5,
    },
    {
      id: 1,
      thumbnail: thumnail,
      obongImage: obong,
      title: "저 졸려요",
      date: "2001-03-02",
      author: "🐷오봉이",
      likeCount: 2,
      hitCount: 1,
      commentCount: 5,
    },
    {
      id: 1,
      thumbnail: thumnail,
      obongImage: obong,
      title: "실례합니다",
      date: "2001-06-16",
      author: "🐷오봉이",
      likeCount: 3,
      hitCount: 5,
      commentCount: 5,
    },
  ];

  const handleSwitchChange = () => {
    setSortByDate(!sortByDate);
  };

  const filteredPosts = posts.filter((post) => {
    const postDate = new Date(post.date);
    const startDate = selectedDateRange[0];
    const endDate = selectedDateRange[1];

    return (
      (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate)
    );
  });

  const totalItems = posts.length;

  const [currentPage, setCurrentPage] = useState(1);
  const [groupedPosts, setGroupedPosts] = useState([]);

  useEffect(() => {
    // 스위치 상태에 따라 게시물을 날짜별 또는 좋아요 순으로 정렬
    const sortedPosts = filteredPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortByDate) {
        // 스위치가 켜진 경우, 좋아요 수를 비교해서 정렬
        return b.likeCount - a.likeCount;
      } else {
        // 스위치가 꺼진 경우, 날짜를 기준으로 최신 순으로 정렬
        return dateB - dateA;
      }
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentGroupedPosts = sortedPosts.slice(startIndex, endIndex);
    setGroupedPosts(currentGroupedPosts);
  }, [currentPage, filteredPosts, sortByDate]);

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
  const handleSearchClick = () => {
    console.log("검색 버튼 또는 아이콘이 클릭되었습니다.");
    // 검색 로직을 실행할 수 있음
  };

  return (
    <>
      <Header />
      <Stack alignItems="center">
        <Stack width="100%" height="22vh">
          <Stack
            width="25%"
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
              width="fit-content"
              height="100%"
              style={{ fontSize: "40px" }}
              alignItems="center"
              justifyContent="center"
            >
              오봉이의 게시판
            </Stack>
            <img src={obong} alt="obong" width="25%" height="600%" />
          </Stack>
        </Stack>
        <Stack width="70%" marginTop="2%">
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            height="100%"
          >
            <Stack direction="row" spacing={2} justifyContent="">
              <Stack>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateRangePicker
                    startText="시작 날짜"
                    endText="종료 날짜"
                    value={selectedDateRange}
                    onChange={(newDateRange) =>
                      setSelectedDateRange(newDateRange)
                    }
                    renderInput={(startProps, endProps) => (
                      <>
                        <TextField {...startProps} />
                        <span style={{ margin: "0 8px" }}>~</span>
                        <TextField {...endProps} />
                      </>
                    )}
                  />
                </LocalizationProvider>
              </Stack>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Stack fontSize="12px">최신순</Stack>
                <Switch
                  checked={sortByDate}
                  onChange={handleSwitchChange}
                ></Switch>
                <Stack fontSize="12px">좋아요 순</Stack>
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <img
                          src={SearchIcon}
                          alt="search"
                          onClick={handleSearchClick}
                          style={{ cursor: "pointer" }}
                        />
                      </InputAdornment>
                    ),
                  }}
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
          <Stack spacing={8} marginTop="2%" height="100%" width="100%">
            {Array.from({ length: Math.ceil(totalItems / 4) }).map(
              (_, rowIndex) => (
                <Stack
                  key={rowIndex}
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  {groupedPosts
                    .slice(rowIndex * 4, (rowIndex + 1) * 4)
                    .map((post) => (
                      <Paper
                        key={post.id}
                        elevation={0}
                        sx={{
                          borderRadius: "20px",
                          // backgroundColor: "#D9D9D9",
                          flex: "1",
                          cursor: "pointer",
                          width: "30%",
                          height: "80%",
                        }}
                      >
                        <img
                          src={thumnail}
                          alt="thumnail"
                          style={{
                            width: "100%",
                            borderTopLeftRadius: "20px",
                            borderTopRightRadius: "20px",
                          }}
                        />
                        <Stack
                          direction="row"
                          bgcolor="#FAF3F0"
                          spacing={1}
                          sx={{
                            bottom: 0,
                            left: 0,
                            borderBottomLeftRadius: "20px",
                            borderBottomRightRadius: "20px",
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
                            <Stack fontSize="14px">{post.title}</Stack>
                            <Stack fontSize="12px">{post.date}</Stack>
                            <Stack fontSize="12px">{post.author}</Stack>
                          </Stack>
                          <Stack direction="row" spacing={1}>
                            <Stack direction="row" spacing={0.5}>
                              <Stack>
                                <img src={like} alt="like" />
                              </Stack>
                              <Stack>{post.likeCount}</Stack>
                            </Stack>
                            <Stack direction="row" spacing={0.5}>
                              <Stack>
                                <img src={hit} alt="hit" />
                              </Stack>
                              <Stack>{post.hitCount}</Stack>
                            </Stack>
                            <Stack direction="row" spacing={0.5}>
                              <Stack>
                                <img src={comment} alt="comment" />
                              </Stack>
                              <Stack>{post.commentCount}</Stack>
                            </Stack>
                          </Stack>
                        </Stack>
                        <Stack direction="row">
                          <Stack
                            sx={{
                              margin: "4px",
                              color: "#FF8181",
                              border: "1px solid #FF8181",
                              cursor: "pointer",
                              borderRadius: "20px",
                              width: "fit-content",
                              height: "25px",
                              justifyContent: "center",
                            }}
                          >
                            <Stack alignItems="center">태그 1</Stack>
                          </Stack>
                          <Stack
                            sx={{
                              margin: "4px",
                              color: "#FF8181",
                              border: "1px solid #FF8181",
                              cursor: "pointer",
                              borderRadius: "20px",
                              width: "fit-content",
                              height: "25px",
                              justifyContent: "center",
                            }}
                          >
                            <div>태그 2</div>
                          </Stack>
                        </Stack>
                      </Paper>
                    ))}
                </Stack>
              )
            )}
          </Stack>
          <Stack alignItems="center">
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

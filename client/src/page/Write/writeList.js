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
// import { LocalizationProvider, DateRangePicker } from "@mui/lab";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
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
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("글 제목");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupedPosts, setGroupedPosts] = useState([]);

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
      tags: ["하이", "나야"],
    },
    {
      id: 2,
      thumbnail: thumnail,
      obongImage: obong,
      title: "저 졸려요",
      date: "2001-03-02",
      author: "박소정",
      likeCount: 2,
      hitCount: 1,
      commentCount: 5,
      tags: ["야", "호"],
    },
    {
      id: 3,
      thumbnail: thumnail,
      obongImage: obong,
      title: "실례합니다",
      date: "2001-06-16",
      author: "정태규",
      likeCount: 3,
      hitCount: 5,
      commentCount: 5,
      tags: ["밥", "줘"],
    },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    const filteredPosts = posts.filter((post) => {
      const postDate = new Date(post.date);
      const startDate = selectedDateRange[0];
      const endDate = selectedDateRange[1];

      return (
        (!startDate || postDate >= startDate) && (!endDate || postDate <= endDate)
      );
    });

    const sortedPosts = filteredPosts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortByDate) {
        return b.likeCount - a.likeCount;
      } else {
        return dateB - dateA;
      }
    });

    const filteredAndSortedPosts = sortedPosts.filter((post) => {
      let showPost = true;
      const query = searchQuery.toLowerCase().trim();

      if (selectedTitle === "글 제목") {
        const title = post.title.toLowerCase().trim();
        showPost = title.includes(query);
      } else if (selectedTitle === "태그") {
        const tags = post.tags.map((tag) => tag.toLowerCase().trim());
        showPost = tags.includes(query);
      } else if (selectedTitle === "작성자") {
        const author = post.author.toLowerCase().trim();
        showPost = author.includes(query);
      } else if (selectedTitle === "글 내용") {
        const content = post.content.toLowerCase().trim();
        showPost = content.includes(query);
      }

      return showPost;
    });

    setGroupedPosts(filteredAndSortedPosts);
  }, [selectedDateRange, sortByDate, selectedTitle, searchQuery]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const titleOptions = ["글 제목", "태그", "작성자", "글 내용"];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSwitchChange = () => {
    setSortByDate((prevSortByDate) => !prevSortByDate);
  };

  const totalItems = groupedPosts.length;

  const [currentPage, setCurrentPage] = useState(1);
   
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
              {/* <Stack>
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
              </Stack> */}

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
          <Stack>'오봉이' 검색 결과({totalItems})</Stack>
          <Stack spacing={8} marginTop="2%" height="100%" width="100%">
            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }).map(
              (_, rowIndex) => (
                <Stack
                  key={rowIndex}
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                >
                  {filteredUniquePosts
                    .slice(
                      (currentPage - 1) * itemsPerPage,
                      currentPage * itemsPerPage
                    )
                    .map((post) => {
                      let showPost = true;
                      if (selectedTitle === "글 제목") {
                        const query = searchQuery.toLowerCase().trim();
                        const title = post.title.toLowerCase().trim();
                        showPost = title.includes(query);
                      } else if (selectedTitle === "태그") {
                        const query = searchQuery.toLowerCase().trim();
                        const hasMatchingTag = post.tags.some((tag) =>
                          tag.toLowerCase().includes(query)
                        );
                        showPost = hasMatchingTag;
                      } else if (selectedTitle === "작성자") {
                        const query = searchQuery.toLowerCase().trim();
                        const author = post.author.toLowerCase().trim();
                        showPost = author.includes(query);
                      } else if (selectedTitle === "글 내용") {
                        const query = searchQuery.toLowerCase().trim();
                        const content = post.content.toLowerCase().trim();
                        showPost = content.includes(query);
                      }
                      if (showPost) {
                        return (
                          <Paper
                            key={post.id}
                            elevation={0}
                            sx={{
                              borderRadius: "20px",
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
                              {post.tags.map((tag, index) => (
                                <Stack
                                  key={index}
                                  sx={{
                                    margin: "5px",
                                    color: "#FF8181",
                                    border: "1px solid #FF8181",
                                    borderRadius: "15px",
                                    width: "fit-content",
                                    height: "25px",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Stack
                                    alignItems="center"
                                    fontSize="13px"
                                    margin="10px"
                                  >
                                    {tag}
                                  </Stack>
                                </Stack>
                              ))}
                            </Stack>
                          </Paper>
                        );
                      }
                      return null;
                    })}
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

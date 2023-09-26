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
import obong from "../../image/obong.png";
import thumbnail from "../../image/thumbnail.png";
import hit from "../../image/hit.png";
import like from "../../image/like.png";
import comment from "../../image/comment.png";
import PushPin from "../../image/PushPin.png";
import SearchIcon from "../../image/Search.png";
import notThumbnail from "../../image/notThumbnail.png";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";

function WriteList() {
  const itemsPerRow = 4;
  const itemsPerPage = 8;

  const [selectedDateRange, setSelectedDateRange] = useState([null, null]);
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("글 제목");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupedPosts, setGroupedPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const filteredPosts = post.filter((post) => {
      const postDate = new Date(post.date);
      const startDate = selectedDateRange[0];
      const endDate = selectedDateRange[1];

      return (
        (!startDate || postDate >= startDate) &&
        (!endDate || postDate <= endDate)
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
    setTotalItems(filteredAndSortedPosts.length);
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

  const [totalItems, setTotalItems] = useState(groupedPosts.length);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = groupedPosts.slice(startIndex, endIndex);

  const rows = [];
  for (let i = 0; i < Math.ceil(currentItems.length / itemsPerRow); i++) {
    const startIndex = i * itemsPerRow;
    const endIndex = startIndex + itemsPerRow;
    const rowItems = currentItems.slice(startIndex, endIndex);

    while (rowItems.length < itemsPerRow) {
      rowItems.push(null);
    }

    rows.push(rowItems);
  }
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://13.125.105.202:8080/api/posts/126", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.log("error 내용", error);
      });
  }, []);

  const [likeTotal, setLikeTotal] = React.useState(0);
  const likeClick = () => {
    axios
      .get("http://13.125.105.202:8080/api/posts/likes/126", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setLikeTotal(response.data.total);
      })
      .catch((error) => {
        console.error("like error:", error);
      });
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
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="시작 날짜"
                    value={selectedDateRange[0]}
                    onChange={(newDate) =>
                      setSelectedDateRange([newDate, selectedDateRange[1]])
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                  <Stack>~</Stack>
                  <DatePicker
                    label="종료 날짜"
                    value={selectedDateRange[1]}
                    onChange={(newDate) =>
                      setSelectedDateRange([selectedDateRange[0], newDate])
                    }
                    renderInput={(params) => <TextField {...params} />}
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
                  // navigate("/Write");
                }}
              >
                <Stack fontSize="20px">글쓰기</Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            {searchQuery && `'${searchQuery}' 검색 결과 (${totalItems})`}
          </Stack>
          <Stack spacing={4} marginTop="2%" height="100%" width="100%">
            {Array.from({
              length: Math.ceil(totalItems / itemsPerRow),
            }).map((_, rowIndex) => (
              <Stack
                key={rowIndex}
                direction="row"
                justifyContent="space-between"
                spacing={2}
              >
                {currentItems
                  .slice(
                    rowIndex * itemsPerRow,
                    Math.min((rowIndex + 1) * itemsPerRow, currentItems.length)
                  )
                  .map((post, index) => {
                    let showPost = true;
                    if (selectedTitle === "글 제목") {
                      const query = searchQuery.toLowerCase().trim();
                      const title = post.title.toLowerCase().trim();
                      showPost = title.includes(query);
                    } else if (selectedTitle === "태그") {
                      const query = searchQuery.toLowerCase().trim();
                      const hasMatchingTag = post.tags.some((postTag) =>
                        postTag.toLowerCase().includes(query)
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
                            width: "calc(100% / 4)",
                            minHeight: "50%",
                            position: "relative",
                            marginBottom: index < 4 ? "16px" : "0",
                          }}
                        >
                          {post.isPinned === 1 && (
                            <img
                              src={PushPin}
                              alt="push-pin"
                              style={{
                                position: "absolute",
                                top: "-4%",
                                left: "0%",
                              }}
                            />
                          )}
                          <img
                            src={
                              post.thumbnail === ""
                                ? notThumbnail
                                : post.thumbnail
                            }
                            alt="thumbnail"
                            style={{
                              width: "100%",
                              height: "160px",
                              objectFit: "cover",
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
                              <Stack fontSize="14px">{post?.title}</Stack>
                              <Stack fontSize="12px">{post?.date}</Stack>
                              <Stack fontSize="12px">{post?.writer}</Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                              <Stack direction="row" spacing={0.5}>
                                <Stack>
                                  <img src={like} alt="like" />
                                </Stack>
                                <Stack>{likeTotal}</Stack>
                              </Stack>
                              <Stack direction="row" spacing={0.5}>
                                <Stack>
                                  <img src={hit} alt="hit" />
                                </Stack>
                                <Stack>{post?.view}</Stack>
                              </Stack>
                              <Stack direction="row" spacing={0.5}>
                                <Stack>
                                  <img src={comment} alt="comment" />
                                </Stack>
                                <Stack>{post?.commentCount}</Stack>
                              </Stack>
                            </Stack>
                          </Stack>
                          <Stack direction="row">
                            {post.tags.map((postTag, index) => (
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
                                  {post?.postTag}
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
            ))}
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

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
      .get(
        `http://13.125.105.202:8080/api/posts?page=0&size=8&sort=string&startDate=2001-05-05&endDate=2023-08-23&order=0`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
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

  console.log(post);
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
          {/* 이제 우리가 적어야 하는 곳 */}
          <Stack marginBottom="-11%">
            <Stack spacing={2} width="100%" direction="row" marginTop="2%">
              {post.content?.slice(0, 4).map((content, i) => {
                return (
                  <Stack width="24%" height="350px">
                    <Stack height="50%">
                      <img
                        src={content.thumbnail}
                        width="100%"
                        height="100%"
                        alt=""
                        style={{
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                    </Stack>
                    <Stack
                      width="100%"
                      height="20%"
                      bgcolor="#FAF3F0"
                      borderRadius="0px 0px 20px 20px"
                      alignItems={"center"}
                      direction={"row"}
                      gap="15%"
                    >
                      <Stack width="7%" marginLeft="5%">
                        <img src={content.memberProfile} alt="" width="100%" />
                      </Stack>
                      <Stack>
                        <Stack
                          style={{
                            width: "100%",
                            whiteSpace:
                              "nowrap" /* 글 내용이 한 줄로 표시되도록 설정 */,
                            overflow: "hidden",
                            textOverflow:
                              "ellipsis" /* 일정 길이 이상의 텍스트일 때 "..." 표시 */,
                          }}
                        >
                          {content.title.length > 7
                            ? `${content.title.slice(0, 7)}...`
                            : content.title}
                        </Stack>
                        <Stack>{content.date.slice(0, 10)} </Stack>
                        <Stack>{content.writer} </Stack>
                      </Stack>
                      <Stack direction="row" gap="30%">
                        <Stack>
                          <img src={like} /> {content.like}{" "}
                        </Stack>
                        <Stack>
                          <img src={hit} /> {content.view}{" "}
                        </Stack>
                        <Stack>
                          <img src={comment} /> {content.commentCount}{" "}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction="row">
                      {content.postTag.slice(0, 2).map((postTag, i) => (
                        <Stack
                          key={i}
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
                            {postTag.value}
                          </Stack>
                        </Stack>
                      ))}
                      {content.postTag.length > 2 && (
                        <Stack
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
                            ...
                          </Stack>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
            <Stack spacing={2} width="100%" direction="row" marginTop="-3%">
              {post.content?.slice(4, 8).map((content, i) => {
                return (
                  <Stack width="24%" height="350px">
                    <Stack height="50%">
                      <img
                        src={content.thumbnail}
                        width="100%"
                        height="100%"
                        alt=""
                        style={{
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                      />
                    </Stack>
                    <Stack
                      width="100%"
                      height="20%"
                      bgcolor="#FAF3F0"
                      borderRadius="0px 0px 20px 20px"
                      alignItems={"center"}
                      direction={"row"}
                      gap="15%"
                    >
                      <Stack width="7%" marginLeft="5%">
                        <img src={content.memberProfile} alt="" width="100%" />
                      </Stack>
                      <Stack>
                        <Stack
                          style={{
                            width: "100%",
                            whiteSpace:
                              "nowrap" /* 글 내용이 한 줄로 표시되도록 설정 */,
                            overflow: "hidden",
                            textOverflow:
                              "ellipsis" /* 일정 길이 이상의 텍스트일 때 "..." 표시 */,
                          }}
                        >
                          {content.title.length > 7
                            ? `${content.title.slice(0, 7)}...`
                            : content.title}
                        </Stack>
                        <Stack>{content.date.slice(0, 10)} </Stack>
                        <Stack>{content.writer} </Stack>
                      </Stack>
                      <Stack direction="row" gap="30%">
                        <Stack>
                          <img src={like} /> {content.like}{" "}
                        </Stack>
                        <Stack>
                          <img src={hit} /> {content.view}{" "}
                        </Stack>
                        <Stack>
                          <img src={comment} /> {content.commentCount}{" "}
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack direction="row">
                      {content.postTag.slice(0, 2).map((postTag, i) => (
                        <Stack
                          key={i}
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
                            {postTag.value}
                          </Stack>
                        </Stack>
                      ))}
                      {content.postTag.length > 2 && (
                        <Stack
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
                            ...
                          </Stack>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
          <Stack alignItems="center" marginTop="7%">
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

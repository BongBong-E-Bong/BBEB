import React, { useState } from "react";
import Header from "../../component/header";
import { Stack, Pagination } from "@mui/material";
import obong from "../../image/obong.png";
import hit from "../../image/hit.png";
import like from "../../image/like.png";
import comment from "../../image/comment.png";
import PushPin from "../../image/PushPin.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyWriteList() {
  const itemsPerRow = 4;
  const itemsPerPage = 8;

  const [groupedPosts, setGroupedPosts] = useState([]);

  const navigate = useNavigate();

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [totalItems, setTotalItems] = useState(groupedPosts.length);
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = groupedPosts.slice(startIndex, endIndex);
  const itemsPerColumn = 2;

  const rows = [];
  for (let i = 0; i < itemsPerColumn; i++) {
    const rowItems = currentItems.slice(i * itemsPerRow, (i + 1) * itemsPerRow);
    rows.push(rowItems);
  }
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const accessToken = localStorage.getItem("accessDoraTokenDora");

  const [post, setPost] = React.useState([]);

  React.useEffect(() => {
    const apiUrl = `http://13.125.105.202:8080/api/posts/my?page=${
      currentPage - 1
    }&size=${itemsPerPage}&sort=string`;

    axios
      .get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPost(response.data);
        setTotalItems(response.data.totalElements);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error 내용", error);
      });
  }, [currentPage]);

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
              onClick={() => {
                navigate("/writeList");
              }}
            >
              오봉이의 게시판
            </Stack>
            <img src={obong} alt="obong" width="25%" height="600%" />
          </Stack>
        </Stack>
        <Stack width="70%" marginTop="2%">
          <Stack marginBottom="-11%">
            <Stack spacing={2} width="100%" direction="row" marginTop="2%">
              {post.content?.slice(0, 4).map((content, i) => {
                return (
                  <Stack width="24%" height="350px" position="relative">
                    <Stack
                      height="50%"
                      style={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        position: "relative",
                      }}
                    >
                      {content.isPinned === 1 && (
                        <img
                          src={PushPin}
                          alt="PushPin"
                          style={{
                            position: "absolute",
                            top: "-10%",
                            left: "10px",
                            zIndex: 2,
                          }}
                        />
                      )}
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
                      width="fit-content"
                      height="20%"
                      bgcolor="#FAF3F0"
                      borderRadius="0px 0px 20px 20px"
                      alignItems={"center"}
                      direction={"row"}
                      justifyContent={"space-between"}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/post/" + content.postId);
                      }}
                    >
                      <Stack width="13%" marginLeft="5%">
                        <img src={content.memberProfile} alt="" width="100%" />
                      </Stack>
                      <Stack width="40%">
                        <Stack
                          style={{
                            width: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {content.title.length > 7
                            ? `${content.title.slice(0, 7)}...`
                            : content.title}
                        </Stack>
                        <Stack>{content.date.slice(0, 10)} </Stack>
                        <Stack>{content.writer} </Stack>
                      </Stack>
                      <Stack width="30%" gap="8%" direction="row">
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
                  <Stack width="24%" height="350px" position="relative">
                    <Stack
                      height="50%"
                      style={{
                        borderTopLeftRadius: "20px",
                        borderTopRightRadius: "20px",
                        position: "relative",
                      }}
                    >
                      {content.isPinned === 1 && (
                        <img
                          src={PushPin}
                          alt="PushPin"
                          style={{
                            position: "absolute",
                            top: "-10%",
                            left: "10px",
                            zIndex: 2,
                          }}
                        />
                      )}
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
                      width="fit-content"
                      height="20%"
                      bgcolor="#FAF3F0"
                      borderRadius="0px 0px 20px 20px"
                      alignItems={"center"}
                      direction={"row"}
                      justifyContent={"space-between"}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/post/" + content.postId);
                      }}
                    >
                      <Stack width="13%" marginLeft="5%">
                        <img src={content.memberProfile} alt="" width="100%" />
                      </Stack>
                      <Stack width="50%">
                        <Stack
                          style={{
                            width: "100%",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {content.title.length > 7
                            ? `${content.title.slice(0, 7)}...`
                            : content.title}
                        </Stack>
                        <Stack>{content.date.slice(0, 10)} </Stack>
                        <Stack>{content.writer} </Stack>
                      </Stack>
                      <Stack width="30%" gap="8%" direction="row">
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
          <Stack alignItems="center" marginTop="10%">
            <Pagination
              count={pageCount}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default MyWriteList;

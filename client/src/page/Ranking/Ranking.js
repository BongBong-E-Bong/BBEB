import React from "react";
import Header from "../../component/header";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import spotlight from "../../image/spotlight.png";
import ebongsad from "../../image/ebongsad.png";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import axios from "axios";

function Ranking() {
  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;

  const [voteTotal, setVoteTotal] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("http://13.125.105.202:8080/api/vote", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setVoteTotal(response.data);
      })
      .catch((error) => {
        console.error("vote error:", error);
      });
  }, []);

  const navigate = useNavigate();

  const bong = [
    [],
    ["일봉", spotlight, ebongsad],
    ["이봉", spotlight, ebongsad],
    ["삼봉", spotlight, ebongsad],
    [],
    ["오봉", spotlight, ebongsad],
    ["육봉", spotlight, ebongsad],
    ["칠봉", spotlight, ebongsad],
    ["팔봉", spotlight, ebongsad],
  ];

  return (
    <>
      <Header />
      <Stack
        minHeight="100vh"
        height="fit-content"
        width="100%"
        bgcolor="#293424"
        alignItems="center"
      >
        <Stack
          margin="11% 0 4% 0"
          color="white"
          fontFamily="blackboard"
          style={{ fontSize: "55px" }}
        >
          <Bounce top cascade>
            이봉이 형제 인기투표 순위
          </Bounce>
        </Stack>
        <Stack width="70%" justifyContent="flex-end" direction="row">
          <Stack
            direction="row"
            height="100px"
            alignItems="center"
            gap="20px"
            justifyContent="center"
          >
            <Fade right>
              <Button
                variant="outlined"
                color="secondary"
                style={{
                  fontSize: "20px",
                  fontFamily: "blackboard",
                }}
                onClick={() => {
                  navigate("/Profile");
                }}
              >
                이봉이 형제 소개
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                style={{ fontSize: "20px", fontFamily: "blackboard" }}
              >
                투표하러 가기
              </Button>
            </Fade>
          </Stack>
        </Stack>
        {voteTotal.map((vote, i) => {
          return (
            bong[vote.order].length > 0 && (
              <Stack
                direction="row"
                justifyContent="center"
                gap="25%"
                width="50%"
                height="40vh"
                margin="50px 0 50px 0"
                alignItems="center"
              >
                <Slide left>
                  <Stack
                    alignItems="center"
                    color="white"
                    style={{ fontSize: "40px", fontFamily: "blackboard" }}
                  >
                    <Stack direction="row" gap="20px">
                      <Stack
                        style={{
                          color:
                            i === 0
                              ? "#FFD700"
                              : i === 1
                              ? "#B6B6B6"
                              : i === 2
                              ? "#B48C89"
                              : "white",
                          WebkitTextStroke: i < 3 ? "1px white" : "none",
                          fontFamily: "blackboardbold",
                        }}
                      >
                        {i + 1}등
                      </Stack>
                      <Stack>{bong[vote?.order]?.[0]}</Stack>
                    </Stack>
                    <Stack>{vote.likeCount}표</Stack>
                  </Stack>
                  <img
                    src={
                      i < 3 ? bong[vote?.order]?.[1] : bong[vote?.order]?.[2]
                    }
                    alt="spotlight"
                    width="200px"
                    height="300px"
                  />
                </Slide>
              </Stack>
            )
          );
        })}

        <Stack
          width="100%"
          height="50vh"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            color="white"
            fontFamily="blackboard"
            style={{ fontSize: "17px" }}
          >
            떠든 사람
            <br />
            김수돌
            <br />
            신채연
            <br />
            박소정
            <br />
            장희권
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Ranking;

import React from "react";
import Header from "../../component/header";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Bounce from "react-reveal/Bounce";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";
import onebongHover from "../../image/body/onebongHover.png";
import onebongCry from "../../image/body/onebongCry.png";
import twobongHover from "../../image/body/twobongHover.png";
import twobongCry from "../../image/body/twobongCry.png";
import threebongHover from "../../image/body/threebongHover.png";
import threebongCry from "../../image/body/threebongCry.png";
import fivebong from "../../image/body/fivebong.png";
import sixbong from "../../image/body/sixbong.png";
import sixbongCry from "../../image/body/sixbongCry.png";
import sevenbongHover from "../../image/body/sevenbongHover.png";
import sevenbongCry from "../../image/body/sevenbongCry.png";
import eightbongHover from "../../image/body/eightbongHover.png";
import eightbongCry from "../../image/body/eightbongCry.png";
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
    ["일봉", onebongHover, onebongCry],
    ["이봉", twobongHover, twobongCry],
    ["삼봉", threebongHover, threebongCry],
    [],
    ["오봉", fivebong, fivebong],
    ["육봉", sixbong, sixbongCry],
    ["칠봉", sevenbongHover, sevenbongCry],
    ["팔봉", eightbongHover, eightbongCry],
  ];

  {
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
                      width="300px"
                      height="350px"
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
}

export default Ranking;

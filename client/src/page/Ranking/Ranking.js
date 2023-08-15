import React from "react";
import Header from "../../component/header";
import { Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import spotlight from "../../image/spotlight.png";

function Ranking() {
  const navigate = useNavigate();

  const ebongrankingg = [
    ["일봉", 11, spotlight],
    ["이봉", 23, spotlight],
    ["삼봉", 55, spotlight],
    ["오봉", 78, spotlight],
    ["육봉", 99, spotlight],
    ["칠봉", 115, spotlight],
    ["팔봉", 9, spotlight],
  ];

  const ebongranking = ebongrankingg.sort((a, b) => b[1] - a[1]);

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
          margin="8% 0 4% 0"
          color="white"
          fontFamily="blackboard"
          style={{ fontSize: "55px" }}
        >
          이봉이 형제 투표 순위👑
        </Stack>
        <Stack width="70%" justifyContent="space-between" direction="row">
          <Stack>
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

          <Stack
            direction="row"
            height="100px"
            alignItems="center"
            gap="20px"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              color="secondary"
              style={{ fontSize: "20px", fontFamily: "blackboard" }}
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
          </Stack>
        </Stack>
        <Stack
          width="100%"
          height="40vh"
          bgcolor="yellow"
          margin="20px 0 20px 0"
        >
          {ebongranking.map((ebongranking, i) => {
            return (
              <Stack direction="row">
                <Stack>
                  {ebongranking[0]}
                  {ebongranking[1]}표
                </Stack>
                <img
                  src={ebongranking[2]}
                  alt="spotlight"
                  width="30px"
                  height="30px"
                />
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}

export default Ranking;

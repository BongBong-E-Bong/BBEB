import React, { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import Paper from "../../image/Paper.png";
import Rock from "../../image/Rock.png";
import Scissors from "../../image/Scissors.png";
import register from "../../image/register.png";
import Box from "./Box.js";
import RPS_sample from "../../image/RPS_sample.png";
import axios from "axios";
import basicProfile from "../../image/profilephoto.png";
import RPS_comeputer from "../../image/RPS_comeputer.png";

const choice = {
  rock: {
    name: "Rock",
    img: Rock,
  },
  scissors: {
    name: "Scissors",
    img: Scissors,
  },
  paper: {
    name: "Paper",
    img: Paper,
  },
};

const RPS = () => {
  const [userSelect, setUserSelect] = useState();
  const [result, setResult] = useState(" ");
  const [comResult, setComResult] = useState(" ");
  const [gameCount, setGameCount] = useState(1000000);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [ComputerSelect, setComputerSelect] = useState();

  const play = (userChoice) => {
    if (gameOver) return;

    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    let userResult = judgement(choice[userChoice], computerChoice);
    setResult(userResult);
    setComResult(comJudgement(userResult));

    if (userResult === "win") {
      setWinCount(winCount + 1);
    } else if (userResult === "lose") {
      setGameOver(true);
      postRequest(winCount);
    } else {
      setDrawCount(drawCount + 1);
    }

    if (gameCount > 0) {
      setGameCount(gameCount - 1);
    } else {
      setGameOver(true);
    }
  };

  const comJudgement = (result) => {
    return result === "win" ? "lose" : result === "tie" ? "tie" : "win";
  };

  const judgement = (user, computer) => {
    console.log("use", user, "computer", computer);

    if (user.name === computer.name) {
      return "tie";
    } else if (user.name === "Rock")
      return computer.name === "Scissors" ? "win" : "lose";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    console.log("item Array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let final = itemArray[randomItem];
    return choice[final];
  };

  const restartGame = () => {
    setUserSelect(null);
    setComputerSelect(null);
    setResult(" ");
    setComResult(" ");
    setGameCount(10);
    setWinCount(0);
    setLoseCount(0);
    setDrawCount(0);
    setGameOver(false);
  };

  const data = [];

  const accessToken = localStorage.getItem("accessDoraTokenDora");
  const sortedData = [...data].reverse();
  // const topThreeData = sortedData.slice(0, 3);

  console.log("엑세스 토큰:", accessToken);

  const postRequest = () => {
    axios
      .post(
        "http://13.125.105.202:8080/api/tetris",
        {
          score: winCount,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log("성공");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [topThreeData, setTopThreeData] = useState([]);

  React.useEffect(() => {
    axios
      .get(
        "http://13.125.105.202:8080/api/tetris?page=0&size=3&sort=string",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((response) => {
        const sortedData = response.data.content.slice(0, 3); // 상위 3개 데이터만 가져옵니다.
        setTopThreeData(sortedData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderRank = (index) => {
    if (index === 0) {
      return "1";
    } else if (index === 1) {
      return "2";
    }
    return "3";
  };

  useEffect(() => {
    getRequest();
  }, []);

  const [profileImage, setprofileImage] = React.useState(basicProfile);
  const [profileImg, setProfileImg] = useState("");
  const isLogin = Boolean(localStorage.getItem("accessDoraTokenDora"));
  const getRequest = () => {
    axios
      .get("http://13.125.105.202:8080/api/members/profile", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setProfileImg(response.data);
      })
      .catch((error) => {
        console.error("profile img error", error);
      });
  };

  return (
    <Stack>
      <Stack>
        <Header />
      </Stack>
      <Stack
        width="21%"
        height="10%"
        marginLeft="15%"
        marginTop="5%"
        alignItems="center"
        direction="row"
      >
        <img src={register} alt="register" width="30%" height="400%" />
        <Stack
          width="100%"
          height="100%"
          style={{ fontSize: "40px" }}
          alignItems="center"
          marginLeft="-20%"
          marginTop="11%"
        >
          MINI GAME
        </Stack>
      </Stack>
      <Stack alignItems="center">
        <Stack
          width="68%"
          minHeight="74vh"
          height="fit-content"
          bgcolor="#FAF3F0"
        >
          <Stack
            className="main"
            direction="row"
            justifyContent="space-around"
            display="flex"
          >
            <Stack justifyContent="center" spacing={5}>
              {topThreeData.length > 0 ? (
                topThreeData.map((content, i) => (
                  <Stack key={content.nickname} direction="row" spacing={4}>
                    <Stack color="black" fontSize="48px">
                      {renderRank(i)}
                    </Stack>
                    <Stack>
                      <img
                        src={content.url}
                        alt={content.nickname}
                        style={{ height: "50px", width: "50px" }}
                      />
                    </Stack>
                    <Stack spacing={2.5}>
                      <Stack color="black" fontSize="13px">
                        {content.nickname}
                      </Stack>
                      <Stack color="black" fontSize="13px">
                        score: {content.score}
                      </Stack>
                    </Stack>
                  </Stack>
                ))
              ) : (
                <Stack></Stack>
              )}
            </Stack>
            <Stack spacing={10} marginTop="5%">
              <Stack direction="row" spacing={10} fontSize="30px">
                <Stack direction="row">
                  {isLogin && (
                    <Stack width="12%" height="70%" marginTop="100%">
                      <img
                        alt="profileImage"
                        src={profileImage}
                        width="50px"
                        height="50px"
                        style={{ borderRadius: "50%" }}
                        border="1px solid #FF8181"
                      />
                    </Stack>
                  )}
<Box
  title="나인데!"
  className={result}
  img={choice.scissors.img}
  item={userSelect}
  flipImage={true} // 모든 경우에 대해 이미지를 좌우 반전
/>

                </Stack>
                <Stack justifyContent="center" fontSize="50px">
                  VS
                </Stack>
                <Stack direction="row">
                  <Box
                    title="컴퓨터인데!"
                    className={comResult}
                    item={ComputerSelect}
                  />
                  <Stack width="12%" height="70%" marginTop="100%">
                    <img
                      alt="RPS_comeputer"
                      src={RPS_comeputer}
                      width="50px"
                      height="50px"
                      style={{ borderRadius: "50%" }}
                      border="1px solid #FF8181"
                    />
                  </Stack>
                </Stack>
              </Stack>
              {gameOver ? (
                <Stack direction="row" justifyContent="center">
                  <Stack
                    style={{
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "15px",
                      alignItems: "center",
                      border: "1px solid #FF8181",
                      justifyContent: "center",
                      width: "25%",
                      height: "30px",
                      backgroundColor: "#FF8181",
                      fontSize: "20px",
                    }}
                    onClick={() => {
                      restartGame();
                    }}
                  >
                    Replay
                  </Stack>
                </Stack>
              ) : (
                <Stack direction="row" justifyContent="space-around">
                  <Stack
                    style={{
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "15px",
                      alignItems: "center",
                      border: "1px solid #FF8181",
                      justifyContent: "center",
                      width: "25%",
                      height: "30px",
                      backgroundColor: "#FF8181",
                      fontSize: "20px",
                    }}
                    onClick={() => play("scissors")}
                  >
                    가위
                  </Stack>
                  <Stack
                    style={{
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "15px",
                      alignItems: "center",
                      border: "1px solid #FF8181",
                      justifyContent: "center",
                      width: "25%",
                      height: "30px",
                      backgroundColor: "#FF8181",
                      fontSize: "20px",
                    }}
                    onClick={() => play("rock")}
                  >
                    바위
                  </Stack>
                  <Stack
                    style={{
                      cursor: "pointer",
                      color: "white",
                      borderRadius: "15px",
                      alignItems: "center",
                      border: "1px solid #FF8181",
                      justifyContent: "center",
                      width: "25%",
                      height: "30px",
                      backgroundColor: "#FF8181",
                      fontSize: "20px",
                    }}
                    onClick={() => play("paper")}
                  >
                    보
                  </Stack>
                </Stack>
              )}
            </Stack>
            <Stack sx={{ marginTop: "4%" }} spacing={2}>
              <Stack>이긴횟수 : {winCount}</Stack>
              <Stack>비긴횟수 : {drawCount}</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RPS;

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

  const data = [

  ];

  const accessToken = process.env.REACT_APP_ACCESS_TOKEN;
  const sortedData = [...data].reverse();
  const topThreeData = sortedData.slice(0, 3);

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
            Authorization: accessToken,
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

  const [gameData, setGameData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://13.125.105.202:8080/api/tetris", {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {})
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
              {topThreeData.map((item, index) => (
                <Stack key={item.number} direction="row" spacing={4}>
                  <Stack color="black" fontSize="48px">
                    {renderRank(index)}
                  </Stack>
                  <Stack>{gameData?.url}</Stack>
                  <Stack spacing={2.5}>
                    <Stack color="black" fontSize="13px">
                      {gameData?.nickname}
                    </Stack>
                    <Stack color="black" fontSize="13px">
                      score: {gameData?.score}
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Stack spacing={10}>
              <Stack direction="row" spacing={10} fontSize="30px">
                <Box
                  title="나인데!"
                  className={result}
                  img={choice.scissors.img}
                  item={userSelect}
                />
                <Box
                  title="컴퓨터인데!"
                  className={comResult}
                  item={ComputerSelect}
                />
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

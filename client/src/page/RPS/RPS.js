import React, { useState, useEffect } from "react";
import { Stack, Button } from "@mui/material";
import Header from "../../component/header";
import Paper from "../../image/Paper.png";
import Rock from "../../image/Rock.png";
import Scissors from "../../image/Scissors.png";
import register from "../../image/register.png";
import Box from "./Box.js";

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
  const [userSelect, setUserSelect] = useState(null);
  const [ComputerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState(" ");
  const [comResult, setComResult] = useState(" ");
  const [gameCount, setGameCount] = useState(20);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const play = (userChoice) => {
    if (gameOver) return;

    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    let userResult = judgement(choice[userChoice], computerChoice);
    setResult(userResult);
    setComResult(comJudgement(userResult));
    if (gameCount > 0) {
      setGameCount(gameCount - 1);
    } else {
      setGameOver(true);
      alert("게임 종료");
    }
    if (userResult === "win") {
      setWinCount(winCount + 1);
    }
    if (userResult === "lose") {
      setLoseCount(loseCount + 1);
    }
    if (userResult === "tie") {
      setDrawCount(drawCount + 1);
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
    setGameCount(20);
    setWinCount(0);
    setLoseCount(0);
    setDrawCount(0);
    setGameOver(false); // 게임 종료 상태 초기화
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
            <Stack>랭킹 부분</Stack>
            <Stack spacing={20}>
              <Stack direction="row" spacing={10} fontSize="30px">
                <Box
                  title="You"
                  className={result}
                  img={choice.scissors.img}
                  item={userSelect}
                  result={result}
                />
                <Box
                  title="Computer"
                  className={comResult}
                  item={ComputerSelect}
                  result={comResult}
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
                      restartGame(); // "Replay" 버튼 클릭 시 게임 다시 시작
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
            <Stack>
              <Stack>게임횟수 : {gameCount}</Stack>
              <Stack>이긴횟수 : {winCount}</Stack>
              <Stack>진횟수 : {loseCount}</Stack>
              <Stack>비긴횟수 : {drawCount}</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default RPS;

import React, { useState } from "react";
import { Stack, Checkbox } from "@mui/material";
import axios from "axios";
import Modal from "../../component/Modal";
import obong from "../../image/obong.png";
import writepoto from "../../image/write_poto.png";

function WriteModal({ setOpen }) {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <Modal open={true} onClose={handleCloseModal}>
      <Stack
        position="fixed"
        width="100%"
        height="100%"
        display="flex"
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        bgcolor="#F88C8C"
      >
        <Stack
          width="450px"
          height="450px"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            borderTop="1px solid black"
            borderBottom="1px solid black"
            spacing={2}
          >
            <Stack></Stack>
            <Stack fontSize="36px" alignItems="center">
              Thumbnail upload
            </Stack>
            <Stack
              bgcolor="#FFFBEE"
              alignItems="center"
              justifyContent="space-around"
              fontSize="36px"
              width="350px"
              height="200px"
              spacing={-10}
            >
              <Stack>안녕 난 오봉이야</Stack>
              <Stack>게시판 규칙을 설명해줄게</Stack>
            </Stack>
            <Stack alignItems="center">
              <img
                src={writepoto}
                alt="writeouto"
                width="40px"
                height="40px"
              ></img>
            </Stack>
            <Stack></Stack>
          </Stack>
        </Stack>
        <Stack
          bgcolor="#fff"
          alignItems="center"
          justifyContent="center"
          width="450px"
          height="450px"
        >
          <Stack
            sx={{
              cursor: "pointer",
              color: "black",
              marginLeft: "390px",
              marginTop: "-40px",
            }}
            onClick={handleCloseModal}
          >
            <Stack fontSize="40px">x</Stack>
          </Stack>
          <Stack
            direction="row"
            marginLeft="300px"
            width="500px"
            spacing={1}
            marginTop="30px"
          >
            <Stack spacing={2}>
              <Stack>🐷오봉이</Stack>
              <Stack
                fontSize="13px"
                bgcolor="#FAF3F0"
                width="200px"
                height="30px"
                alignItems="center"
                justifyContent="center"
                borderRadius="40px"
              >
                게시판 규칙은 확인 했니?
              </Stack>
            </Stack>
            <Stack>
              <img src={obong} alt="obong" width="20%" height="400%"></img>
            </Stack>
          </Stack>
          <Stack fontSize="16px">
            <ul>
              <li style={{ marginBottom: "10px" }}>욕설을 사용하지 않는다.</li>
              <li style={{ marginBottom: "10px" }}>
                다른 사람을 비난하지 않는다.
              </li>
              <li style={{ marginBottom: "10px" }}>
                음란성 게시물을 올리지 않는다.
              </li>
              <li style={{ marginBottom: "10px" }}>
                게시물을 도배하지 않는다.
              </li>
              <li style={{ marginBottom: "10px" }}>어그로를 끌지 않는다.</li>
              <li style={{ marginBottom: "10px" }}>
                친구를 왕따시키지 않는다.
              </li>
            </ul>
          </Stack>
          <Stack spacing={1}>
            <Stack
              bgcolor="#D76464"
              direction="row"
              sx={{
                color: "white",
                borderRadius: "20px",
                alignItems: "center",
                width: "170px",
                height: "30px",
                "& .MuiIconButton-root": {
                  backgroundColor: "white",
                },
              }}
            >
              <Stack fontSize="15px" marginLeft="30%">
                확인 했어요~!
              </Stack>
              <Checkbox
                sx={{
                  color: "white",
                  "&.Mui-checked": {
                    color: "white",
                  },
                }}
              />
            </Stack>

            <Stack
              bgcolor="#7AAAA7"
              sx={{
                cursor: "pointer",
                color: "white",
                borderRadius: "20px",
                alignItems: "center",
                width: "170px",
                height: "30px",
                justifyContent: "center",
              }}
              onClick={() => {
                //이후 추가
              }}
            >
              <Stack fontSize="15px">글쓰기</Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Modal>
  );
}

export default WriteModal;

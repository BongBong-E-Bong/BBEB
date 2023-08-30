import React, { useState } from "react";
import { Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import Modal from "../../component/Modal";

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
          spacing={5}
          width="450px"
          height="450px"
          alignItems="center"
          justifyContent="space-around"
        >
          <Stack borderTop="2px solid black" borderBottom="2px solid black">
            <Stack fontSize="36px">Thumbnail upload</Stack>
            <Stack
              bgcolor="#FFFBEE"
              alignItems="center"
              justifyContent="space-around"
              fontSize="36px"
            >
              <Stack>안녕 난 오봉이야</Stack>
              <Stack>게시판 규칙을 설명해줄게</Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          bgcolor="#fff"
          alignItems="center"
          justifyContent="center"
          width="450px"
          height="450px"
        >
          오른쪽 부분
        </Stack>
      </Stack>
    </Modal>
  );
}

export default WriteModal;

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
          alignItems="center"
          justifyContent="center"
          width="47%"
          height="95%"
          bgcolor="black"
        ></Stack>
        <Stack
          bgcolor="#fff"
          alignItems="center"
          justifyContent="center"
          width="47%"
          height="95%"
        ></Stack>
      </Stack>
    </Modal>
  );
}

export default WriteModal;

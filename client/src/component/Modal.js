import { Box, Modal as MuiModal } from "@mui/material";
import React from "react";

function Modal({ width = "70%", height = "50%", children, ...rest }) {
  return (
    <MuiModal {...rest}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width,
          height,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 0,
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
}

export default Modal;

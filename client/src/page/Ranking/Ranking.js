import React from "react";
import Header from "../../component/header";
import { Stack, Button } from "@mui/material";

function Ranking() {
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
          marginTop="8%"
          marginBottom="3%"
          color="white"
          fontFamily="blackboard"
          style={{ fontSize: "55px" }}
        >
          이봉이 형제 투표 순위👑
        </Stack>
        <Stack direction="row">
          <Stack color="white">
            떠든 사람
            <br />
            이봉이
          </Stack>
          <Stack>
            <Button variant="outlined" color="secondary">
              Outlined
            </Button>
            <Button variant="outlined" color="secondary">
              Outlined
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Ranking;

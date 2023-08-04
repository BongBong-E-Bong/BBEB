import React from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";
import ebongbody from "../../image/ebongbody.png";

function Profile() {
  return (
    <>
      <Header zIndex="30" />
      <Stack alignItems="center" gap="30px" height="100vh">
        <Stack height="150px" />
        <Stack
          bgcolor="#FFDEDE"
          width="1300px"
          height="25px"
          justifyContent="center"
          style={{ fontWeight: "500", fontSize: "70px" }}
          paddingLeft="80px"
        >
          이봉이 형제 프로필
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          width="1380px"
          gap="20px"
        >
          <Stack
            bgcolor="#FF8181"
            width="200px"
            height="60px"
            justifyContent="center"
            alignItems="center"
            style={{
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "40px",
              color: "white",
              WebkitTextStroke: "1px black",
              boxShadow: "0px 10px 20px -10px gray",
            }}
          >
            순위보기
          </Stack>
          <Stack
            bgcolor="#98C6BD"
            width="200px"
            height="60px"
            justifyContent="center"
            alignItems="center"
            style={{
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "40px",
              color: "white",
              WebkitTextStroke: "1px black",
              boxShadow: "0px 10px 20px -10px gray",
            }}
          >
            투표하러GO
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
          height="550px"
          width="1380px"
          justifyContent="space-between"
        >
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
          <img
            src={ebongbody}
            alt="ebongbody"
            width="190px"
            height="400px"
            style={{ cursor: "pointer" }}
          />
        </Stack>
      </Stack>
    </>
  );
}

export default Profile;

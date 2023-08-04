import React from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";
import ebongbody from "../../image/ebongbody.png";
import ebongbodyhover from "../../image/ebongbodyhover.png";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [twobongHovered, setTwobongHovered] = React.useState(false);
  const [onebongHovered, setOnebongHovered] = React.useState(false);

  const handleMouseOver = () => {
    setTwobongHovered(true);
  };
  const handleMouseOut = () => {
    setTwobongHovered(false);
  };
  const handleMouseOver2 = () => {
    setOnebongHovered(true);
  };
  const handleMouseOut2 = () => {
    setOnebongHovered(false);
  };

  const goRangkingStyles = {
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "40px",
    color: "white",
    WebkitTextStroke: "1px black",
    boxShadow: "0px 10px 20px -10px gray",
  };

  const goVoteStyles = {
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "40px",
    color: "white",
    WebkitTextStroke: "1px black",
    boxShadow: "0px 10px 20px -10px gray",
  };

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
          style={{
            fontWeight: "500",
            fontSize: "70px",
          }}
          paddingLeft="80px"
        >
          <Stack>이봉이 형제 프로필</Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          width="1380px"
          gap="20px"
        >
          <Stack
            width="200px"
            height="60px"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FF8181"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#EB7C7C";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FF8181";
            }}
            onClick={() => {
              navigate("/Rangking");
            }}
            style={goRangkingStyles}
          >
            순위보기
          </Stack>
          <Stack
            width="200px"
            height="60px"
            justifyContent="center"
            alignItems="center"
            bgcolor="#98C6BD"
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#8BADA7";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#98C6BD";
            }}
            onClick={() => {
              navigate("/Vote");
            }}
            style={goVoteStyles}
          >
            투표하러GO
          </Stack>
        </Stack>
        <Stack
          direction="row"
          alignItems="flex-end"
          height="550px"
          width="1380px"
          justifyContent="space-around"
        >
          <Stack>
            {twobongHovered ? (
              <Stack alignItems="center" gap="70px">
                <Stack bgcolor="#FFF8D4" style={{ fontSize: "30px" }}>
                  이봉🌱
                </Stack>
                <img
                  src={ebongbodyhover}
                  alt="ebongbodyhover"
                  width="190px"
                  height="400px"
                  onMouseOut={handleMouseOut}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            ) : (
              <Stack alignItems="center" gap="70px">
                <Stack style={{ fontSize: "30px" }}>이봉🌱</Stack>
                <img
                  src={ebongbody}
                  alt="ebongbody"
                  width="190px"
                  height="400px"
                  onMouseOver={handleMouseOver}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            )}
          </Stack>
          <Stack>
            {onebongHovered ? (
              <Stack alignItems="center" gap="70px">
                <Stack bgcolor="#FFF8D4" style={{ fontSize: "30px" }}>
                  이봉🌱
                </Stack>
                <img
                  src={ebongbodyhover}
                  alt="ebongbodyhover"
                  width="190px"
                  height="400px"
                  onMouseOut={handleMouseOut2}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            ) : (
              <Stack alignItems="center" gap="70px">
                <Stack style={{ fontSize: "30px" }}>이봉🌱</Stack>
                <img
                  src={ebongbody}
                  alt="ebongbody"
                  width="190px"
                  height="400px"
                  onMouseOver={handleMouseOver2}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default Profile;

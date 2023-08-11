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

  const buttonStyles = {
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "240%",
    color: "white",
    WebkitTextStroke: "1px black",
    boxShadow: "0px 10px 20px -10px gray",
  };

  return (
    <>
      <Header />
      <Stack alignItems="center" width="100%" height="100vh" bgcolor="white">
        <Stack width="100%" height="20%" />
        <Stack
          bgcolor="#FFDEDE"
          width="80%"
          height="3%"
          justifyContent="center"
          style={{
            fontWeight: "500",
            fontSize: "360%",
          }}
          paddingLeft="5%"
        >
          <Stack>이봉이 형제 프로필</Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          width="80%"
          height="8%"
          gap="2%"
          marginTop="1%"
        >
          <Stack
            width="17%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            bgcolor="#FF8181"
            sx={{
              ":hover": {
                backgroundColor: "#EB7C7C",
              },
              ":active": {
                backgroundColor: "#FFCBCB",
              },
            }}
            onClick={() => {
              navigate("/Rangking");
            }}
            style={buttonStyles}
          >
            순위보기
          </Stack>
          <Stack
            width="17%"
            height="100%"
            justifyContent="center"
            alignItems="center"
            bgcolor="#98C6BD"
            sx={{
              ":hover": {
                backgroundColor: "#81ABA4",
              },
              ":active": {
                backgroundColor: "#C8DAD7",
              },
            }}
            onClick={() => {
              navigate("/Vote");
            }}
            style={buttonStyles}
          >
            투표하러GO
          </Stack>
        </Stack>
        <Stack
          direction="row"
          height="70%"
          width="85%"
          justifyContent="space-around"
        >
          <Stack height="100%" width="100%">
            {twobongHovered ? (
              <Stack
                alignItems="center"
                justifyContent="flex-end"
                height="100%"
                width="14%"
              >
                <Stack
                  bgcolor="#FFF8D4"
                  height="7%"
                  style={{
                    padding: "0px 3%",
                    fontSize: "150%",
                  }}
                  marginBottom="10%"
                >
                  이봉🌱
                </Stack>
                <img
                  src={ebongbodyhover}
                  alt="ebongbodyhover"
                  width="100%"
                  height="70%"
                  onMouseOut={handleMouseOut}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            ) : (
              <Stack
                height="100%"
                width="14%"
                alignItems="center"
                justifyContent="flex-end"
              >
                <Stack
                  height="7%"
                  style={{ padding: "0px 3%", fontSize: "150%" }}
                  marginBottom="10%"
                >
                  이봉🌱
                </Stack>
                <img
                  src={ebongbody}
                  alt="ebongbody"
                  width="100%"
                  height="70%"
                  onMouseOver={handleMouseOver}
                  style={{ cursor: "pointer" }}
                />
              </Stack>
            )}
          </Stack>
          {onebongHovered ? (
            <Stack
              alignItems="center"
              justifyContent="flex-end"
              height="100%"
              width="14%"
            >
              <Stack
                bgcolor="#FFF8D4"
                height="7%"
                style={{
                  padding: "0px 3%",
                  fontSize: "150%",
                }}
                marginBottom="10%"
              >
                이봉🌱
              </Stack>
              <img
                src={ebongbodyhover}
                alt="ebongbodyhover"
                width="100%"
                height="70%"
                onMouseOut={handleMouseOut2}
                style={{ cursor: "pointer" }}
              />
            </Stack>
          ) : (
            <Stack
              height="100%"
              width="14%"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Stack
                height="7%"
                style={{ padding: "0px 3%", fontSize: "150%" }}
                marginBottom="10%"
              >
                이봉🌱
              </Stack>
              <img
                src={ebongbody}
                alt="ebongbody"
                width="100%"
                height="70%"
                onMouseOver={handleMouseOver2}
                style={{ cursor: "pointer" }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default Profile;

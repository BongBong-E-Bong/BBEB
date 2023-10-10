import React from "react";
import Header from "../../component/header";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import onebong from "../../image/body/onebong.png";
import onebongHover from "../../image/body/onebongHover.png";
import twobong from "../../image/body/twobong.png";
import twobongHover from "../../image/body/twobongHover.png";
import threebong from "../../image/body/threebong.png";
import threebongHover from "../../image/body/threebongHover.png";
import fivebong from "../../image/body/fivebong.png";
import fivebongHover from "../../image/body/fivebongHover.png";
import sixbong from "../../image/body/sixbong.png";
import sixbongHover from "../../image/body/sixbongHover.png";
import sevenbong from "../../image/body/sevenbong.png";
import sevenbongHover from "../../image/body/sevenbongHover.png";
import eightbong from "../../image/body/eightbong.png";
import eightbongHover from "../../image/body/eightbongHover.png";

function Profile() {
  const navigate = useNavigate();

  const [onebongHovered, setOnebongHovered] = React.useState(false);
  const [twobongHovered, setTwobongHovered] = React.useState(false);
  const [threebongHovered, setThreebongHovered] = React.useState(false);
  const [fivebongHovered, setFivebongHovered] = React.useState(false);
  const [sixbongHovered, setSixbongHovered] = React.useState(false);
  const [sevenbongHovered, setSevenbongHovered] = React.useState(false);
  const [eightbongHovered, setEightbongHovered] = React.useState(false);

  const handleMouseOver = () => {
    setOnebongHovered(true);
  };
  const handleMouseOut = () => {
    setOnebongHovered(false);
  };
  const handleMouseOver2 = () => {
    setTwobongHovered(true);
  };
  const handleMouseOut2 = () => {
    setTwobongHovered(false);
  };
  const handleMouseOver3 = () => {
    setThreebongHovered(true);
  };
  const handleMouseOut3 = () => {
    setThreebongHovered(false);
  };
  const handleMouseOver5 = () => {
    setFivebongHovered(true);
  };
  const handleMouseOut5 = () => {
    setFivebongHovered(false);
  };
  const handleMouseOver6 = () => {
    setSixbongHovered(true);
  };
  const handleMouseOut6 = () => {
    setSixbongHovered(false);
  };
  const handleMouseOver7 = () => {
    setSevenbongHovered(true);
  };
  const handleMouseOut7 = () => {
    setSevenbongHovered(false);
  };
  const handleMouseOver8 = () => {
    setEightbongHovered(true);
  };
  const handleMouseOut8 = () => {
    setEightbongHovered(false);
  };

  const buttonStyles = {
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "30px",
    color: "white",
    WebkitTextStroke: "1px black",
    boxShadow: "0px 10px 20px -10px gray",
  };

  return (
    <>
      <Header />
      <Stack alignItems="center" width="100%" height="100vh" bgcolor="white">
        <Stack
          bgcolor="#FFDEDE"
          width="80%"
          height="3%"
          justifyContent="center"
          style={{
            fontWeight: "500",
            fontSize: "55px",
          }}
          paddingLeft="5%"
          marginTop="9%"
        >
          <Stack>이봉이 형제 프로필</Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          width="80%"
          height="8%"
          gap="2%"
          marginTop="2%"
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
              navigate("/Ranking");
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
              navigate("/choice");
            }}
            style={buttonStyles}
          >
            투표하러GO
          </Stack>
        </Stack>
        <Stack height="70%" width="85%">
          <Stack height="100%" direction="row" justifyContent="space-around">
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
                  일봉🌱
                </Stack>
                <img
                  src={onebongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/onebong");
                  }}
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
                  일봉🌱
                </Stack>
                <img
                  src={onebong}
                  alt="ebongbody"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/onebong");
                  }}
                />
              </Stack>
            )}

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
                  src={twobongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut2}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/twobong");
                  }}
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
                  src={twobong}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver2}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/twobong");
                  }}
                />
              </Stack>
            )}

            {threebongHovered ? (
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
                  삼봉🌱
                </Stack>
                <img
                  src={threebongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut3}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/threebong");
                  }}
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
                  삼봉🌱
                </Stack>
                <img
                  src={threebong}
                  alt="ebongbody"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver3}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/threebong");
                  }}
                />
              </Stack>
            )}
            {fivebongHovered ? (
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
                  오봉🌱
                </Stack>
                <img
                  src={fivebongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut5}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/fivebong");
                  }}
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
                  오봉🌱
                </Stack>
                <img
                  src={fivebong}
                  alt="ebongbody"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver5}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/fivebong");
                  }}
                />
              </Stack>
            )}
            {sixbongHovered ? (
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
                  육봉🌱
                </Stack>
                <img
                  src={sixbongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut6}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/sixbong");
                  }}
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
                  육봉🌱
                </Stack>
                <img
                  src={sixbong}
                  alt="ebongbody"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver6}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/sixbong");
                  }}
                />
              </Stack>
            )}
            {sevenbongHovered ? (
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
                  칠봉🌱
                </Stack>
                <img
                  src={sevenbongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut7}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/sevenbong");
                  }}
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
                  칠봉🌱
                </Stack>
                <img
                  src={sevenbong}
                  alt="ebongbody"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver7}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/sevenbong");
                  }}
                />
              </Stack>
            )}
            {eightbongHovered ? (
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
                  팔봉🌱
                </Stack>
                <img
                  src={eightbongHover}
                  alt="ebongbodyhover"
                  width="300px"
                  height="350px"
                  onMouseOut={handleMouseOut8}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/eightbong");
                  }}
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
                  팔봉🌱
                </Stack>
                <img
                  src={eightbong}
                  alt="ebongbody"
                  width="300px"
                  height="350px"
                  onMouseOver={handleMouseOver8}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate("/eightbong");
                  }}
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

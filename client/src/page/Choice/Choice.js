import React, { useState } from "react";
import { Stack, Checkbox } from "@mui/material";
import register from "../../image/register.png";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";
import SuccessModal from "./successModal";
import AuthModalFail from "../../component/authModal_fail";
import axios from "axios";

const candidateItems = [
  { name: "일봉이", image: register },
  { name: "이봉이", image: register },
  { name: "삼봉이", image: register },
  { name: "사봉이", image: register },
  { name: "오봉이", image: register },
  { name: "육봉이", image: register },
  { name: "칠봉이", image: register },
];

function Choice() {
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [failModalOpen, setFailModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCheckboxChange = (checkboxName) => {
    if (selectedCheckboxes.includes(checkboxName)) {
      setSelectedCheckboxes((prevSelected) =>
        prevSelected.filter((name) => name !== checkboxName)
      );
    } else {
      if (selectedCheckboxes.length < 3) {
        setSelectedCheckboxes((prevSelected) => [
          ...prevSelected,
          checkboxName,
        ]);
      }
    }
  };

  const handleVoteSuccess = () => {
    setSuccessModalOpen(true);
  };

  const handleVoteFail = (errorType) => {
    let errorMessage = "";
    if (errorType === "noSelection") {
      errorMessage = "클릭 하라고!!";
    } else if (errorType === "notLoggedIn") {
      errorMessage = "회원만 투표할 수 있어!";
    }
    setFailModalOpen(true);
    setErrorMessage(errorMessage);
  };


  const handleVoteSubmit = () => {
    const login = true; 

    if (!login) {
      handleVoteFail("notLoggedIn");
      return;
    }
    if (selectedCheckboxes.length === 0) {
      handleVoteFail("noSelection");
      return;
    }
    if (login && selectedCheckboxes.length > 0) {
      handleVoteSuccess(); // 모달 창 열기
    }

    const selectedOrder = selectedCheckboxes.map((item) => item.name).join(",");

    axios
      .post("http://13.125.105.202:8080/api/vote", {
        order: selectedOrder,
      })
      .then((response) => {
        //then이 안먹어서 위에 71행의 if문에서 처리해줌
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setFailModalOpen(true);
          setErrorMessage(error.response.data.message);
        }
      });
  };
  return (
    <>
      <Header />
      <Stack
        width="68%"
        height="62%"
        backgroundColor="#FAF3F0"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        top="25%"
        left="17%"
      >
        <Stack
          direction="row"
          spacing={-13}
          justifyContent="center"
          marginTop="6%"
        >
          {candidateItems.map((candidate) => (
            <Stack key={candidate.name} alignItems="center" spacing={2}>
              <Stack fontSize="32px">{candidate.name}</Stack>
              <img
                src={candidate.image}
                alt={`${candidate.name} 사진`}
                width="60%"
                height="100%"
              />
              <Checkbox
                checked={selectedCheckboxes.some(
                  (item) => item.name === candidate.name
                )}
                onChange={() => handleCheckboxChange(candidate)}
              />
            </Stack>
          ))}
        </Stack>
        <Stack
          height="100%"
          width="100%"
          alignItems="center"
          spacing={2}
          marginTop="3%"
        >
          <Stack
            bgcolor="#FF8181"
            style={{
              cursor: "pointer",
              color: "white",
              borderRadius: "20px",
              width: "15%",
              height: "30%",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.3)",
              textShadow:
                "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000",
            }}
            onClick={handleVoteSubmit}
          >
            <Stack fontSize="32px">투표하기</Stack>
          </Stack>
          <Stack
            bgcolor="#FFF"
            style={{
              cursor: "pointer",
              color: "white",
              borderRadius: "20px",
              width: "15%",
              height: "30%",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.3)",
              textShadow:
                "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000",
              border: "2px solid #FF8181",
            }}
            onClick={() => {
              navigate("/Ranking");
            }}
          >
            <Stack fontSize="32px">결과보기</Stack>
          </Stack>
        </Stack>
      </Stack>
      <Modal
        width="750px"
        height="430px"
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      >
        <SuccessModal
          message={"투표 성공"}
          detailMessage={"날 선택해줘서 정말 고마워"}
          onClose={() => setSuccessModalOpen(false)}
        />
      </Modal>
      <Modal
        width="750px"
        height="430px"
        open={failModalOpen}
        onClose={() => setFailModalOpen(false)}
      >
        <AuthModalFail
          message={"투표 실패"}
          detailMessage={errorMessage}
          onClose={() => setFailModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default Choice;

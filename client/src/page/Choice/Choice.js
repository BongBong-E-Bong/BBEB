import React, { useState } from "react";
import { Stack, Checkbox } from "@mui/material";
import register from "../../image/register.png";
import Header from "../../component/header";
import { useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";
import SuccessModal from "./successModal";
import AuthModalFail from "../../component/authModal_fail";
import axios from "axios";

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

  const login = true;

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
    if (!login) {
      handleVoteFail("notLoggedIn");
      return;
    }
    if (selectedCheckboxes.length === 0) {
      handleVoteFail("noSelection");
      return;
    }
    if (login) {
      if (selectedCheckboxes.length > 0) {
        handleVoteSuccess();
      }
    }
    const selectedOrder = selectedCheckboxes.join;
    axios
      .post("http://13.125.105.202:8080/api/vote",{
        order: selectedOrder,
      })
      .then((response) => {
        //여기 코드가 계속 안먹혀서 handleVoteSubmit의 이중 if문에 넣었습니다..
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
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">일봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("일봉이")}
              onChange={() => handleCheckboxChange("일봉이")}
            />
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">이봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("이봉이")}
              onChange={() => handleCheckboxChange("이봉이")}
            />
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">삼봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("삼봉이")}
              onChange={() => handleCheckboxChange("삼봉이")}
            />
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">오봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("사봉이")}
              onChange={() => handleCheckboxChange("사봉이")}
            />
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">육봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("오봉이")}
              onChange={() => handleCheckboxChange("오봉이")}
            />
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">칠봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("육봉이")}
              onChange={() => handleCheckboxChange("육봉이")}
            />
          </Stack>
          <Stack alignItems="center" spacing={2}>
            <Stack fontSize="32px">팔봉이</Stack>
            <img src={register} alt="일봉 사진" width="60%" height="100%" />
            <Checkbox
              checked={selectedCheckboxes.includes("칠봉이")}
              onChange={() => handleCheckboxChange("칠봉이")}
            />
          </Stack>
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

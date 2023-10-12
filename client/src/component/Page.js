import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Page() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/');
  }, [])
  return (
    <></>
  )
}

export default Page
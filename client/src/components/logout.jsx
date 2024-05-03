"use client";

import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  function logoutUser() {
    localStorage.clear();
    router.push("/");
  }

  return (
    <Button onClick={logoutUser} variant="secondary">
      Logout
    </Button>
  );
};

export default Logout;

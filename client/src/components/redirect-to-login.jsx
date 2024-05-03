"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const RedirectToLogin = ({ text, ...props }) => {
  const router = useRouter();
  return (
    <Button {...props} onClick={() => router.push("/login")}>
      {text}
    </Button>
  );
};

export default RedirectToLogin;

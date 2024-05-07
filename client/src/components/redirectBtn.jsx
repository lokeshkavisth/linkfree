"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const RedirectBtn = ({ text, path, ...props }) => {
  const router = useRouter();
  return (
    <Button {...props} onClick={() => router.push(path)}>
      {text}
    </Button>
  );
};

export default RedirectBtn;

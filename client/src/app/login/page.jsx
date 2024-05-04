"use client";

import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.uid) return router.push("/admin");

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;

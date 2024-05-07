"use client";

import { LoginForm } from "@/components/login-form";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const { isAuthenticated } = useAuth();
  const user = isAuthenticated();
  const router = useRouter();

  if (user && user.uid) return router.push("/dashboard");

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;

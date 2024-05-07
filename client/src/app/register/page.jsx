"use client";

import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import React from "react";

const Register = () => {
  const { isAuthenticated } = useAuth();
  const user = isAuthenticated();
  const router = useRouter();

  if (user && user.uid) return router.push("/dashboard");

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;

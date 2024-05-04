"use client";

import { RegisterForm } from "@/components/register-form";
import { useAuth } from "@/lib/authContext";
import { useRouter } from "next/navigation";
import React from "react";

const Register = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (user && user.uid) return router.push("/admin");

  return (
    <div>
      <RegisterForm />
    </div>
  );
};

export default Register;

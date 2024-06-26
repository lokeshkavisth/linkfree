"use client";

import Image from "next/image";
import React from "react";
import MockupExample from "@/assets/mockups.png";
import RedirectBtn from "./redirectBtn";
import { useAuth } from "@/lib/authContext";
const Hero = () => {
  const { isAuthenticated } = useAuth();
  const user = isAuthenticated();

  return (
    <section className="my-40">
      <div className="flex flex-col items-center gap-10 justify-center max-w-3xl mx-auto text-center">
        <div className="space-y-4">
          <h1 className="text-center leading-tight">
            Simplify your online presence. One link to rule them all.
          </h1>
          <p>
            Join 40M+ people using Linkfree for their link in bio. One link to
            help you share everything you create, curate and sell from your
            Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
        </div>
        {user && user?.uid ? (
          <RedirectBtn text="Go to Your Dashboard" path={"/dashboard"} />
        ) : (
          <RedirectBtn text="Get Started For Free" path={"/login"} />
        )}
        <div className="mt-12 bg-green-400 rounded-xl p-6">
          <Image
            src={MockupExample}
            alt="linkfree examples"
            className="w-4/5"
            quality={100}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;

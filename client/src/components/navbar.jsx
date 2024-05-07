"use client";

import React from "react";
import { ThemeSwitcher } from "./theme-switcher";
import Image from "next/image";
import Link from "next/link";
import Logout from "./logout";
import { useAuth } from "@/lib/authContext";
import RedirectBtn from "./redirectBtn";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const user = isAuthenticated();

  return (
    <header className="bg-background border-b border-border p-4">
      <section className="flex items-center justify-between max-w-7xl mx-auto">
        <div>
          <Logo />
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div>
              <span className="capitalize border-b border-white">
                Welcome, {user.username}
              </span>
            </div>
          )}

          <ThemeSwitcher />

          {user && user.uid ? (
            <Logout />
          ) : (
            <RedirectBtn
              path={"/login"}
              text="Login/Register"
              variant="secondary"
            />
          )}
        </div>
      </section>
    </header>
  );
};

export default Navbar;

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10  aspect-square overflow-hidden">
        <Image
          src={"https://asset.brandfetch.io/id_tNIm05N/idJgd2UeGc.png"}
          alt="linkfree logo"
          width={100}
          height={100}
          className="rounded-xl"
        />
      </div>
      <span className="font-semibold">Linkfree</span>
    </Link>
  );
}

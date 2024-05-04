import { BASE_URL } from "@/constants/constants";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

async function UserPublicProfile({ params }) {
  const { username } = params;

  const res = await axios.get(`${BASE_URL}/profile/${username}`);
  // console.log("userDetails", res);

  if (res.data.success && res.data.success === false) {
    toast.error(res.data.message);
    return <div>User not found</div>;
  }
  const {
    _id,
    username: userName,
    displayName,
    bio,
    avatar,
    links,
  } = res?.data?.userProfile;

  return (
    <section className="grid h-screen place-content-center text-background">
      <div className="relative flex flex-col h-[520px] w-[250px]  rounded-2xl border border-muted bg-foreground px-1 shadow-md shadow-foreground space-y-4 overflow-y-scroll">
        {/* Notch */}
        <span class="min-h-5 w-28 rounded-bl-xl rounded-br-xl border border-border bg-background mx-auto sticky top-0 z-30" />

        {/* Inner content */}
        <section className="space-y-4 py-2">
          <div className="flex flex-col items-center gap-2">
            <Image
              src={avatar}
              alt={userName}
              width={100}
              height={100}
              className="rounded-full object-cover w-20 aspect-square border-2"
            />
            <h3>{displayName}</h3>

            <p className="text-sm text-center rounded-md">{bio}</p>
          </div>

          <div>
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link._id} className="w-full">
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-block py-2 px-3 bg-primary-foreground rounded-md text-primary text-center capitalize text-sm font-medium hover:bg-primary-foreground/90 transition-all"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </section>
  );
}

export default UserPublicProfile;

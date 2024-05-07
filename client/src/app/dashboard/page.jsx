"use client";

import RedirectBtn from "@/components/redirectBtn";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constants/constants";
import { useAuth } from "@/lib/authContext";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const user = isAuthenticated();
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);

  if (!user || !user.uid) return router.push("/login");

  useEffect(() => {
    async function createdLinks() {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/profile/${user.username}`
        );

        if (data && data.success) {
          setUserProfile(data.userProfile);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    }

    createdLinks();
  }, []);

  function handleEdit() {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    router.push("/edit-profile");
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <div className="mb-10">
        <h3>Welcome, to Dashboard</h3>
        <p>On this page, you can manage all of your created links.</p>
      </div>

      {!userProfile ? (
        <section>
          <RedirectBtn text="Create your profile" path="/create-profile" />
        </section>
      ) : (
        <section className="flex items-center justify-between gap-2 border rounded-md p-2">
          <div>
            <Image
              src={userProfile?.avatar}
              alt="profile pic"
              width={100}
              height={100}
              className="rounded-full w-12 h-12 aspect-square object-cover"
            />
          </div>
          <h5>{userProfile?.displayName}</h5>
          <span>{userProfile?._id}</span>
          <Button onClick={() => handleEdit()}>Edit</Button>
        </section>
      )}
    </div>
  );
};

export default Dashboard;

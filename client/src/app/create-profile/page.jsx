"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/authContext";
import { LinkFreeAPI } from "@/utils/api";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateProfile = () => {
  const { isAuthenticated } = useAuth();
  const user = isAuthenticated();
  const router = useRouter();

  const [links, setLinks] = useState([{ title: "", url: "" }]);

  function addNewLink() {
    setLinks([...links, { title: "", url: "" }]);
  }

  function removeLink(index) {
    setLinks(links.filter((_, i) => i !== index));
  }

  function handleLinkChange(index, e) {
    const updatedLinks = [...links];
    updatedLinks[index][e.target.name] = e.target.value;
    setLinks(updatedLinks);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const file = e.target.avatar.files[0];
    const displayName = e.target.displayName.value;
    const bio = e.target.bio.value;

    try {
      // Client-side validation
      if (
        !file ||
        !displayName ||
        !bio ||
        links.some((link) => !link.title || !link.url)
      ) {
        return toast.error("Please fill out all required fields");
      }

      // Additional client-side validation can be added for file type and size

      const reader = new FileReader();
      reader.onload = async function (event) {
        const avatar = event.target.result;

        const requestConfig = {
          method: "POST",
          url: "/profile",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          data: {
            displayName,
            bio,
            links,
            avatar,
            username: user?.username,
          },
        };

        const res = await LinkFreeAPI(requestConfig);

        if (res?.data?.success && res.data.success === false) {
          toast.error(res.data.message);
        }

        if (res.success) {
          toast.success(res.message);
          // Redirect or perform any other action upon successful submission
          router.push("/dashboard");
        }
      };

      reader.readAsDataURL(file);

      // Clear the form and link inputs after submission
      e.target.reset();
      setLinks([{ title: "", url: "" }]);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while processing your request");
    }
  }

  if (!user || !user.uid) return router.push("/login");

  return (
    <section className="max-w-3xl mx-auto my-10">
      <form onSubmit={handleSubmit} className="grid w-full items-center gap-4">
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile Picture *</Label>
          <Input
            name="avatar"
            type="file"
            id="avatar"
            required
            accept="image/png, image/jpg, image/jpeg"
          />
          <p className="text-sm text-muted-foreground">
            Accepts .png, .jpg, .jpeg files only
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="displayName">Display Name *</Label>
          <Input
            name="displayName"
            id="displayName"
            placeholder="John Doe"
            required
            maxLength={30}
            minLength={3}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio *</Label>
          <Textarea
            name="bio"
            id="bio"
            placeholder="Tell us a little bit about yourself"
            required
            maxLength={150}
            minLength={3}
          />
          <p className="text-sm text-muted-foreground">
            Please limit your input to 150 characters.
          </p>
        </div>

        {links.map((link, index) => (
          <div className="flex items-end justify-between gap-2" key={index}>
            <div className="w-full space-y-2">
              <Label htmlFor={`title${index}`}>Title *</Label>
              <Input
                name={"title"}
                id={`title${index}`}
                placeholder="Title"
                value={link.title}
                onChange={(e) => handleLinkChange(index, e)}
                required
              />
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor={`url${index}`}>URL *</Label>
              <Input
                name="url"
                id={`url${index}`}
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, e)}
                required
                pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              disabled={links.length === 1}
              onClick={(e) => removeLink(index)}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={addNewLink}
          className="gap-2 justify-self-end"
          variant="outline"
        >
          <PlusIcon />
          Add New Link
        </Button>

        <Button className="gap-2">Save & Publish</Button>
      </form>
    </section>
  );
};

export default CreateProfile;

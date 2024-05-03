"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BASE_URL } from "@/constants/constants";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .regex(
      /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){2,26}[a-zA-Z0-9]$/,
      {
        message:
          "Username must be between 2 and 26 characters long and can only contain letters, numbers, and underscores.",
      }
    ),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, {
      message: "Password must be at most 32 characters.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/,
      {
        message:
          "Password must contain at least one lowercase, one uppercase, one number and one special character.",
      }
    ),
});

export function RegisterForm() {
  const router = useRouter();

  const createUser = async (values) => {
    const { data } = await axios.post(`${BASE_URL}/register`, values);
    return data;
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      // console.log("Response data:", data);
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    mutation.mutate(values);
    // console.log(mutation.isError, mutation.isSuccess, mutation.isLoading);

    // console.log(mutation);

    // try {
    //   const url = BASE_URL + "/register";
    //   const { data } = await axios.post(url, values);

    //   if (data.message) {
    //     toast(data.message);
    //   }

    //   if (data.success) {
    //     return router.push("/login");
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
    <Card className="w-full max-w-sm mx-auto my-20">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Enter your details to register.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full items-center gap-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Example@123"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create an account</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link href={"/login"}>Already have an account?</Link>
      </CardFooter>
    </Card>
  );
}

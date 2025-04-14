"use client"

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgetPassword = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

       
 const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    setIsSubmitting(true)
    try {
     const email=data.email
      const response=await axios.post("/api/forget-password",{email})
      if(response.data.success){
        toast.info("if your account exits email is forget password send to that!")

      }
    } catch (error:any) {
      console.log("Error:", error);
      toast.error(error?.response?.data?.error||"An unexpected error occurred. Please try again.", {
        duration: 3000,
        style: {
          backgroundColor: "red", 
          color: "white", 
          borderRadius: "8px",
        },
      });
    }
    finally{
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-[40vw] h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full p-3 px-10">
          <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
          <p className="text-sm text-center text-gray-600">Enter your email to receive a password reset link.</p>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your Email" {...field} className="bg-gray-400/10 h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            disabled={form.formState.isSubmitting || isSubmitting}
            className="bg-sky-600 text-white rounded-full px-6 py-7 text-xl w-full mx-auto hover:bg-sky-700">
         
           {form.formState.isSubmitting ? "Sending Reset Link..." : "Send Reset Link"}

          </Button>
          <div className="text-center">
            <Link href={'/login'} className="text-sky-600 font-semibold text-lg">Back to Login</Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ForgetPassword;
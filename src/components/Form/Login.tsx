"use client"
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "../ui/input"
  import { zodResolver } from "@hookform/resolvers/zod"
  import { SubmitHandler, useForm } from "react-hook-form"
  import { z } from "zod"
import { Checkbox } from "../ui/checkbox"
import Image from "next/image"
import AppleButton from "@/assets/AppleButton.svg"   
import GoogleButton from "@/assets/GoogleButton.png"   
import Google from "@/assets/Google.png"
import Facebook from "@/assets/facebook.png"
import Link from "next/link"
import Signup from "./Signup"
import { toast } from "sonner";
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password:z.string().min(3,"Password is not enough!")

  })
   
const Login=()=>{ 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:""
        },
      })

      
const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
  setIsSubmitting(true);
  try {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      console.log("Error:", response.error);
      toast.error(`Login failed: ${response.error}`, {
        duration: 3000,
        style: {
          backgroundColor: "red", 
          color: "white", 
          borderRadius: "8px",
        },
      });
    } else if (response?.ok) {
      // Success case
      toast.success("Login successful!", {
        duration: 3000, 
        style: {
          backgroundColor: "green", 
          color: "white", 
          borderRadius: "8px", 
        },}
      );
      router.push("/t");
    } else {
      toast.error("Something went wrong! Please try again.", {
        duration: 3000,
        style: {
          backgroundColor: "red", 
          color: "white", 
          borderRadius: "8px",
        },
      });
    }
  } catch (error: any) {
    console.log("Error:", error);
    toast.error(error?.response?.data?.error||"An unexpected error occurred. Please try again.", {
      duration: 3000,
      style: {
        backgroundColor: "red", 
        color: "white", 
        borderRadius: "8px",
      },
    });
  } finally {
    setIsSubmitting(false); 
  }
};
    return(
<div className="flex flex-col  justify-center items-center w-full lg:w-[40vw] h-full   ">
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full   lg:mr-auto  p-3 px-10">
        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
            <FormControl>
            <Input placeholder="Enter your Email" {...field} className="bg-gray-400/10 h-10"/>
            </FormControl>
          <FormMessage />
              </FormItem>
            )}
          />   
           <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
          <Input placeholder="Enter your Password" {...field} className="bg-gray-400/10 h-10"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <span className="flex flex-row w-full items-center justify-around">
            <Button 
            type="submit" 
            disabled={form.formState.isSubmitting || isSubmitting}
            className="bg-sky-600 text-white rounded-full px-6 py-7 text-xl w-auto hover:bg-sky-700"
            >
           {form.formState.isSubmitting ? "log In..." : "log-In"}
            </Button>

            <Link href={'/forget-password'} className="text-sky-600 font-semibold text-lg">Forgetten Password ?..</Link>
            </span>
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
          <Checkbox id="terms" className="text-blue-600 checked:bg-blue-600 checked:border-blue-600" />
          <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
          >
                Keep me signed in

          </label>
        </div>

        </form>
      </Form>
      <hr className="px-20"></hr>
      <div className="flex flex-col w-full lg:w-[30vw]  items-center justify-center lg:mr-auto lg:ml-12 text-center space-y-6">
  <p className="text-sm italic">Login with Socials</p>

  {/* Google Login Button */}
   <div className="flex flex-row items-center justify-center h-10 rounded-full border-2 border-gray-300 bg-white cursor-pointer text-semibold text-black px-4 shadow-lg transition-all duration-300 space-x-3"
   onClick={()=>signIn("google",{callbackUrl:"/t"})}
  >
    <Image src={Google} alt="GoogleIcon" height={24} width={24} className="h-full object-contain" />
    <p className="text-lg font-medium">Sign in with Google</p>
  </div>

  {/* Facebook Login Button */}
  <div className="flex flex-row items-center justify-center h-10 rounded-full border-2 border-gray-300 bg-white cursor-pointer text-semibold text-black px-4 shadow-lg transition-all duration-300 space-x-3" onClick={()=>signIn("facebook",{callbackUrl:"/t"})}>
    <Image src={Facebook} alt="FacebookIcon" height={24} width={24} className="h-full object-contain" />
    <p className="text-lg font-medium">Sign in with Facebook</p>
  </div>

  <div className="flex flex-row lg:w-[20vw] items-center justify-around mt-6 gap-3">
    <Image src={AppleButton} alt="Apple download" height={100} width={100} className="w-auto h-auto" />
    <Image src={GoogleButton} alt="Android download" height={100} width={100} className="w-auto h-auto" />
  </div>
</div>

</div>

    )
 }
 export default Login
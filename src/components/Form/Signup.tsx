"use client"

import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "../ui/checkbox"
import Image from "next/image"
import AppleButton from "@/assets/AppleButton.svg"   
import GoogleButton from "@/assets/GoogleButton.png"   
import Google from "@/assets/Google.png"
import Facebook from "@/assets/facebook.png"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"
const formSchema = z.object({
  username: z.string().min(6, "Username must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const Signup = () => { 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [CheckMark,setCheckMark]=useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async(data: any) => {
  setIsSubmitting(true)
  try {
    const response=await axios.post("/api/signup",data)
    console.log(response)
    if(!response.data.success){
      toast.error(`${response.data.error}`, {
        duration: 3000,
        style: {
          backgroundColor: "red", 
          color: "white", 
          borderRadius: "8px",
        },
      });
      return null;
    }
    else{
      toast.success(`${response?.data?.message}`, {
        duration: 3000,
        style: {
          backgroundColor: "green", 
          color: "white", 
          borderRadius: "8px",
        },
      });
    }
    
    
  } catch (error:any) {
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
    setIsSubmitting(false)
  }
    
  }

  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-[40vw] h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full p-3 px-10">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter your Username" {...field} className="bg-gray-400/10 h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Enter your Password" {...field} className="bg-gray-400/10 h-10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2 justify-center lg:justify-start">
            <Checkbox id="terms" checked={CheckMark} className="text-blue-600 checked:bg-blue-600 checked:border-blue-600" onClick={()=>setCheckMark((prev)=>!prev)}/>
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I agree to the terms & conditions
            </label>
          </div>
          <span className="flex flex-row w-full items-center justify-around">
        
              <Button 
                        type="submit" 
                        disabled={form.formState.isSubmitting || isSubmitting || !CheckMark}
                        className="bg-sky-600 text-white rounded-full px-6 py-7 text-xl w-auto hover:bg-sky-700 cursor-pointer"
                        >
                       {form.formState.isSubmitting ? "Sign up..." : "Sign-Up"}
                        </Button>
            <Link href={'/login'} className="text-sky-600 font-semibold text-lg">Already have an account?</Link>
          </span>
          
        </form>
      </Form>
      <hr className="px-20" />
      <div className="flex flex-col w-full lg:w-[30vw] items-center justify-center text-center space-y-6">
        <p className="text-sm italic">Sign up with Socials</p>
        <div className="flex flex-row items-center justify-center h-10 rounded-full border-2 border-gray-300 bg-white cursor-pointer text-semibold text-black px-4 shadow-lg transition-all duration-300 space-x-3">
          <Image src={Google} alt="GoogleIcon" height={24} width={24} className="h-full object-contain" />
          <p className="text-lg font-medium">Sign up with Google</p>
        </div>
        <div className="flex flex-row items-center justify-center h-10 rounded-full border-2 border-gray-300 bg-white cursor-pointer text-semibold text-black px-4 shadow-lg transition-all duration-300 space-x-3">
          <Image src={Facebook} alt="FacebookIcon" height={24} width={24} className="h-full object-contain" />
          <p className="text-lg font-medium">Sign up with Facebook</p>
        </div>
        <div className="flex flex-row lg:w-[20vw] items-center justify-around mt-6 gap-3">
          <Image src={AppleButton} alt="Apple download" height={100} width={100} className="w-auto h-auto" />
          <Image src={GoogleButton} alt="Android download" height={100} width={100} className="w-auto h-auto" />
        </div>
      </div>
    </div>
  )
}

export default Signup;

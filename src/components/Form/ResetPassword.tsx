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
  import { SubmitHandler, useForm } from "react-hook-form"
  import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"
const formSchema = z.object({
    password: z.string()
      .min(6, "Password must be at least 6 characters long!") // Password should have at least 6 characters
      .regex(/[a-zA-Z0-9]/, "Password must contain letters and numbers"), // Example regex for password pattern
  
    confirm: z.string()
      .min(6, "Re-entered password must be at least 6 characters long!") // Re-password must have the same length
      .refine((data:any)=> data.password === data.confirm
      , {
        message: "Passwords do not match", // Error message if passwords don't match
      }),
  });
  
const Resetpassword=()=>{ 
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          password: "",
          confirm:""
        },
      })

      
const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
  setIsSubmitting(true);
 try {
    const SubmitingData={
        password:data.password,
        token:token
    }
    const response=await axios.post("/api/reset-password",SubmitingData)
    console.log(response.data)
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
        toast.success(`${response.data.message}`, {
          duration: 3000,
          style: {
            backgroundColor: "green", 
            color: "white", 
            borderRadius: "8px",
          },
        });
      }
      
    router.push("/login")  
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
            name="password"
            render={({ field }) => (
              <FormItem>
            <FormControl>
            <Input type="password" placeholder="Enter new password" {...field} className="bg-gray-400/10 h-10"/>
            </FormControl>
          <FormMessage />
              </FormItem>
            )}
          />   
           <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormControl>
          <Input type="password" placeholder="Confirm your new password" {...field} className="bg-gray-400/10 h-10"/>
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
           {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            </span>

        </form>
      </Form>

</div>

    )
 }
 export default Resetpassword
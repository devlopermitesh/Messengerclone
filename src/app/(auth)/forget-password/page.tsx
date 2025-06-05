import ForgetPassword from "@/components/Form/forgetpassword";
import LogoComponent from "@/components/Header/Logo";

const page=()=>{
return(
<div className="  flex flex-col justify-center items-center w-full h-full  space-y-5">
<LogoComponent className="mt-15"/>

<h2 className="text-base sm:text-lg md:text-2xl font-semibold italic font-mono">
  Connect with your favourite people
</h2>

<ForgetPassword/>

</div>)
}
export default page;
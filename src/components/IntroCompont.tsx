import Image from "next/image";
import Login from "./Form/Login";
import Information from "@/assets/Information.png"
const InfroComp=()=>{
    return(
    <div className="flex flex-col lg:flex-row w-full h-auto">

        <div className="flex flex-col  flex-1 w-full h-auto  items-center  py-10 text-wrap ">
            <span className="w-full h-auto mt-35">
            <h2 className="hidden lg:flex text-sky-600 text-8xl font-bold mx-4">A place for meaningful conversations</h2>
            <p className=" max-w-xl lg:w-full lg:text-xl selecting-none text-lg mx-4">Messenger helps you connect with your Facebook friends and family, build your community and deepen your interests</p>
            </span>
            <Login/>
            </div>

            <div className="flex-1 w-full h-auto p-2 flex items-center justify-center">
<Image src={Information} alt="Information Image" height={100} width={100} className="object-contain h-full w-full lg:h-3/4 lg:w-3/4"/>
            </div>
    </div>)
}
export default InfroComp;
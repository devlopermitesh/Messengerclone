import Image from "next/image"
import { SelectLanguage } from "./SelectLanguage"
import FooterLogo from "@/assets/Footerlogo.png"
import { ChevronDown } from "lucide-react"
const Footer=()=>{
return(
<div className="flex flex-col lg:flex-row justify-between items-center space-y-10 lg:space-y-0">
    <p className=" font-semibold text-black lg:ml-60">@Myta2025</p>
<ul className="flex flex-row justify-between items-center gap-4 text-md">
<li className="text-thin cursor-pointer hover:underline">Privacy Policy</li>
<li className="text-thin  cursor-pointer hover:underline">Cookie Policy</li>
<li className="text-thin cursor-pointer hover:underline">Terms</li>
<li className="text-thin cursor-pointer hover:underline flex flex-row gap-2 items-center">
<SelectLanguage/>
<ChevronDown
      className="relative right-[5px]  h-5 w-5 transition duration-200 "
    
    />
</li>

</ul>
<Image src={FooterLogo} alt="Meta from "height={100} width={100}  className="w-auto h-15 mx-1"/>
</div>)
}
export default Footer
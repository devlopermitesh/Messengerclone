import { MoveRight } from "lucide-react"
import Link from "next/link"
import React from "react"
import { twMerge } from "tailwind-merge"

interface Featurelinkprops{
    title:string
    description:string
    href:string ,
    className:string
}
const Featurelink:React.FC<Featurelinkprops>=({title,description,href,className})=>{
return(
    <Link href={href} className={twMerge("bg-white lg:bg-sky-300/20 rounded-lg flex flex-row justify-between lg:flex-col items-center  text-wrap px-5 space-y-3",className)}>
        <h2 className=" text-lg lg:text-2xl font-bold mr-auto py-3">{title}</h2>
        <p className="hidden max-w-sm text-xl lg:block">{description}</p>
        <MoveRight size={33} className="text-sky-500" />
    </Link>

)
}
export default Featurelink
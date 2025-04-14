import { User } from "@prisma/client";
import React from "react";
import UserinsearchBox from "./UserInSearchBox";

interface SearchListProps{
data:User[]
}
const SearchList:React.FC<SearchListProps>=({data})=>{
    
    return(
    <div className="w-full h-full flex flex-col space-y-2 overflow-x-hidden overflow-y-scroll">
{data && data.map((item)=><UserinsearchBox key={item.id} data={item}/>)}
</div>)
}
export default SearchList;
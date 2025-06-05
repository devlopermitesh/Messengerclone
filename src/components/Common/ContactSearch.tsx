import { User } from "@prisma/client";
import SearchList from "./Searchlist";

interface ContactSearchProps{
users:User[]
}
const ContactSearch:React.FC<ContactSearchProps>=({users})=>{
return (
<div className="absolute -top-1 border left-10 w-3/4 md:w-1/2 h-3/4 rounded-lg flex flex-col bg-white px-2 py-3">
<h2 className="font-semibold text-gray-400 text md:text-md lg:text-lg">More People on Messenger</h2>
<SearchList data={users}/>
</div>

)
}
export default ContactSearch;
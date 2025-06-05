import { useState } from "react";
import GifGrid from "./GifGrid";

const GifSearch=()=>{
    const [searchTerm, setSearchTerm] = useState('');

return (

   <div className=" absolute bottom-15 flex justify-center items-center w-80 h-100 py-4 px-6 rounded-lg flex-col space-y-2 overlfow-x-hidden p-2 shadow-md bg-slate-50 z-50">
<div className="w-full max-w-lg bg-gray-200 rounded-lg flex items-center px-4 py-2">
        <input
          type="text"
          placeholder="Search GIFs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-200 text-gray-700 rounded-lg border-none focus:outline-none focus:ring-0 hover:ring-0"
        />
      </div>
      <GifGrid setSearchTerm={setSearchTerm}  searchTerm={searchTerm} />
   </div>
)
}
export default GifSearch;
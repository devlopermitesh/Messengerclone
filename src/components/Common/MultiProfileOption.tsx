import { Pin } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import IconButton from "./IconButton"

const MultiProfileOption=()=>{
    return (<div>
  <Accordion type="multiple"  className="w-full h-auto space-y-2">
  <AccordionItem value="item-1" >
        <AccordionTrigger className="text md:text-md lg:text-lg  font-semibold hover:no-underline bg-white hover:bg-slate-100/40 px-2"> Chat Info</AccordionTrigger>
        <AccordionContent >

        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">View Pin messages</h2>
        </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" >
        <AccordionTrigger className="text md:text-md lg:text-lg  font-semibold hover:no-underline bg-white hover:bg-slate-100/40 px-2"> Customize chat</AccordionTrigger>
        <AccordionContent>

        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Change theme</h2>
        </div>
        
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Edit nickname</h2>
        </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3" >
        <AccordionTrigger className="text md:text-md lg:text-lg  font-semibold hover:no-underline bg-white hover:bg-slate-100/40 px-2"> Media,files and links</AccordionTrigger>
        <AccordionContent>

        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Media</h2>
        </div>
        
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Gif</h2>
        </div>
          
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Files</h2>
        </div>
        
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Links</h2>
        </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4" >
        <AccordionTrigger className="text md:text-md lg:text-lg  font-semibold hover:no-underline bg-white hover:bg-slate-100/40 px-2"> Privacy and support</AccordionTrigger>
        <AccordionContent>

        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Mute notifications</h2>
        </div>
        
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Delete chat</h2>
        </div>
          
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Block</h2>
        </div>
        
        <div className=" flex flex-row text items-center md:text-md lg:text-lg  font-semibold hover:no-underline bg-white cursor-pointer hover:bg-gray-300/30 px-2  p-2 rounded-md">
        <IconButton icon={Pin} size={20} tooltipId="Pin" tooltipText="View Pin messages"/>
        <h2 className="text-black text md:text-md lg:text-lg">Reports</h2>
        <small className="text-xs font-thin ">Give a Feedbacka or report conversation</small>
        </div>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
    </div>)
}

export default MultiProfileOption
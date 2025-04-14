import { useGroupChatmodel } from "@/hooks/uihooks/useGroupChatmodel";
import Modals from "../Common/Model";
import { Button } from "../ui/button";
import useConversationReady from "@/hooks/useConversationReady";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
  const formSchema = z.object({
    title: z.string().min(3,"Group chat name at least have more char then 3").max(50,"Group chat name cant have this much longer name limit 50 char"),

  })
   
const GroupChatProvider=()=>{
    const {isOpen,onClose,onOpen}=useGroupChatmodel();
    const {listusers,removeuser}=useConversationReady()
      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title:""
            },
          })

     
 const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
   }       
return (
    <Modals
    isopen={isOpen}
    onchange={isOpen?onClose:onOpen}
    title="Group Chat"
    description="Start a new group chat and connect with friends all in one place."

    footer={<p className="font-thin italice text-md">Made for moments that matter — together in one chat.</p>}
>
<Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full   lg:mr-auto  p-3 px-10">
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
            <FormControl>
            <Input placeholder="Enter your Group title" {...field} className="bg-gray-400/10 h-10"/>
            </FormControl>
          <FormMessage />
              </FormItem>
            )}
          />   
            <span className="flex flex-row w-full items-center justify-around">
 <Button 
 type="button"
  onClick={() => {
    removeuser(listusers[listusers.length - 1].id);
    onClose();
  }} 
  className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-800/80 to-red-900/90 shadow-lg hover:brightness-110 transition duration-300 cursor-pointer"
>
  Cancel
</Button>

<Button
  type="submit"
  className="px-8 py-4 rounded-md font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-md hover:brightness-110 transition duration-300 cursor-pointer"
>
  Create
</Button>
        </span>
        </form>
      </Form>
</Modals>
)
}
export default GroupChatProvider;
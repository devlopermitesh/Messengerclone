import { useGroupChatmodel } from "@/hooks/uihooks/useGroupChatmodel";
import useConversationReady from "@/hooks/useConversationReady";
import Modals from "../Common/Model";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Label } from "../ui/label";
import FileUpload from "./Fileupload";
import Image from "next/image";
import DefaultProfile from "@/assets/default.png"
import { FileDiff } from "lucide-react";
// Schema
const formSchema = z.object({
  title: z.string().min(3, "Minimum 3 characters").max(50, "Max 50 characters allowed"),
  type: z.enum(["private", "public"], {
    required_error: "Please select a group type",
  }),
});

const GroupChatProvider = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profile, setProfile] = useState<string | null>(null);
  
  const { isOpen, onClose, onOpen } = useGroupChatmodel();
  const { listusers, removeuser } = useConversationReady();
  const router=useRouter()
  const ImageInputRef = useRef<HTMLInputElement | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: undefined,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
    try {
      const response = await axios.post("/api/newconversation", {
        userId: listusers.map((user) => user.id),
        isGroup: true,
        Image:profile,
        type:data.type,
        title: (listusers.length > 1 ? data.title : "GroupChat"),
  
      })
  
      if(response.data.success) {
        router.push(`/t/${response.data.data[0].id}`)
        toast.success("New conversation created successfully!");
  }
  else{
    toast.error("Failed to create new conversation. Please try again.");
  }
      
    } catch (error) {
console.log(error)      
toast.error("Something went wrong!",{
  duration: 3000,
  style: {
    backgroundColor: "red", 
    color: "white", 
    borderRadius: "8px",
  }
})

    }finally{

    }
  };
  const handeImageclick=()=>{
  
    if (ImageInputRef.current) {
      ImageInputRef.current.click(); 
    }
  }
  return (
    <Modals
      isopen={isOpen}
      onchange={isOpen ? onClose : onOpen}
      title="Create Group Chat"
      description="Make a new space to talk, plan, and share moments with friends."
      footer={
        <p className="text-sm italic text-gray-400">
          Group chats bring people together 🎉
        </p>
      }
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full p-3 px-6"
        >
                {/* Group Profile */}
        
                <div className="relative w-[100px] h-[100px] mx-auto">
  {/* Gradient Border */}
  {uploadProgress < 100 && (
    <div
      className="absolute inset-0 rounded-full z-0 transition-all"
      style={{
        background: `conic-gradient(from 0deg, #38bdf8 ${uploadProgress}%,rgb(132, 35, 222) ${uploadProgress}%)`,
        transform: `rotate(${(uploadProgress / 100) * 360}deg)`,
        padding: "3px", // border width
        filter: "drop-shadow(0 0 10px #a855f7) drop-shadow(0 0 5px #38bdf8)",
      }}
    ></div>
  )}

  {/* Main Image */}
  <Image
    onClick={handeImageclick}
    src={profile ?? DefaultProfile}
    alt="Profile"
    height={100}
    width={100}
    className={`rounded-full z-10 relative border border-gray-300 transition-all duration-300 ${
      uploadProgress < 100 ? "shadow-[0_0_15px_rgba(168,85,247,0.7)]" : ""
    }`}
  />
</div>

<FileUpload
  fileType="image"
  ref={ImageInputRef}
  onSuccess={(data) => {
    setProfile(data.thumbnailUrl);
    setUploadProgress(100);
  }}
  onProgress={(progress) => {
    setUploadProgress(progress);
  }}
/>

   <Label htmlFor="picture">Profile Group</Label>

          {/* Group Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Group chat name"
                    {...field}
                    className="bg-gray-100 h-10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Group Type */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select group type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Group Type</SelectLabel>
                        <SelectItem value="private">Private Group</SelectItem>
                        <SelectItem value="public">Public Community</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => {
                if (listusers.length > 0) {
                  removeuser(listusers[listusers.length - 1].id);
                }
                onClose();
              }}
              variant="destructive"
            >
              Cancel
            </Button>

            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modals>
  );
};

export default GroupChatProvider;

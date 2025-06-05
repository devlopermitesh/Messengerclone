import Modals from "../Common/Model";
import { useSession } from "next-auth/react";
import { useProfileSetting } from "@/hooks/uihooks/useProfilemodel";
import Listitem from "../Common/ListItem";
import { BellDot, Eye, EyeClosed, User, VolumeOff } from "lucide-react";
import { Switch } from "../ui/switch";
import { useState } from "react";
const ProfileSettingProvider=()=>{
const session=useSession();
const {isOpen,onClose,onOpen}=useProfileSetting()
const [isActiveStatus,setIsActiveStatus]=useState(true);
    return(
        <Modals
        isopen={isOpen}
        onchange={isOpen?onClose:onOpen}
        title="Settings"
        description="Manage your profile settings"
        size="w-full h-[90%] overflow-y-auto  sm:max-w-[525px] "
      >
       <div className="w-full h-full bg-white text-black md:space-y-2">
        <Listitem Icon={User} headingList="Account">
            <div className="flex flex-col w-auto h-full ">
                <h2 className="text lg:text-md font-semibold">{session.data?.user.name}</h2>
                <p className="text-xs text-gray-600 select-none leading-relaxed">See your profile</p>
            </div>
        </Listitem>
        <hr className="w-full border-[0.5px] border-gray-500"></hr>
            <Listitem Icon={isActiveStatus? Eye:EyeClosed}>
            <div className="flex flex-col w-auto h-full ">
                <h2 className="text lg:text-md font-semibold">Active Status :{`ON`}</h2>
                <p className="text-xs text-gray-600 select-none leading-relaxed">change your Active status</p>
            </div>
        </Listitem>
        <hr className="w-full border-[0.5px] border-gray-500"></hr>
            <Listitem Icon={BellDot} headingList="Notifications">
            <div className="flex items-center space-x-4 w-auto h-full">
  <div className="flex flex-col">
    <h2 className="text-lg font-semibold">Notification sounds :</h2>
    <p className="text-xs text-gray-600 select-none leading-relaxed max-w-xs">
      Use sounds to notify you about incoming messages, chats and in-app sounds.
    </p>
  </div>
  <Switch  />
</div>
        </Listitem>
        <Listitem Icon={VolumeOff}>
            <div className="flex items-center space-x-4 w-auto h-full">
  <div className="flex flex-col">
    <h2 className="text-lg font-semibold">Do Not Disturb :</h2>
    <p className="text-xs text-gray-600 select-none leading-relaxed max-w-xs">Mute notifications for a specific period of time and in-apps sounds.
    </p>
  </div>
  <Switch className=" " />
</div>
        </Listitem>
       </div>
      </Modals>
    )
}

export default ProfileSettingProvider;
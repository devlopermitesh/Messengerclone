
import Sidebar from "@/components/Common/Sidebar";
import { getServerSession } from "next-auth";
import { Authoptions } from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import Providers from "@/components/Providers/ImagekitProvider";
import ModalProvider from "@/components/Providers/ModelProvider";
const MessengerLayout = async({ children }: { children: React.ReactNode }) => {
  const session= await getServerSession(Authoptions)
  if (!session) {
    // redirect("/login"); 
  }


  return (
    <div className="flex h-screen w-full bg-gray-100 bg-opacity-20">
      <Providers>
      <ModalProvider/>
      <Sidebar>
      {children}
      </Sidebar>
      </Providers>
    </div>
  );
};

export default MessengerLayout;

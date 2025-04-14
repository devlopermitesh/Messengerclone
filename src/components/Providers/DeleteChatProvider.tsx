import { useDeleteChatmodel } from "@/hooks/uihooks/useDeleteChatmodel"
import Modals from "../Common/Model"
import { Button } from "../ui/button"

const DeleteChatProvider=()=>{
    const {isOpen,onClose,onOpen}=useDeleteChatmodel()
return (
    <Modals
    isopen={isOpen}
    onchange={isOpen?onClose:onOpen}
    title="Delete Chat"
    description="Are you sure you wanna delete this chat? operation is not recoverable!."
    footer={
          <>
            <Button 
  onClick={() => onClose()} 
  className="px-5 py-2 rounded-full font-medium bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 shadow-md hover:from-gray-300 hover:to-gray-400 transition duration-300"
>
  Cancel
</Button>

<Button 
  type="submit" 
  className="px-5 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-500 via-red-600 to-red-500 shadow-lg hover:brightness-110 transition duration-300"
>
  Delete
</Button>

          </>
        }
      >
        <hr></hr>

    </Modals>
)
}
export default DeleteChatProvider
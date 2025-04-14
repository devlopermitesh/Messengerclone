interface CurrentChatProps{
    data:any,
    activeId?:string
}
const useCurrentChat=({data,activeId}:CurrentChatProps)=>{
if(!activeId || activeId.trim()==="" || !data || data?.length==0){
    return [];
}

return data?.filter((chat:any)=>chat.id===activeId)

}

export default useCurrentChat
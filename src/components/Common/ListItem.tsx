interface ListItemProps {
    headingList?:string;
    Icon?: React.ElementType;
    children: React.ReactNode;
    active?: boolean;
}
const Listitem:React.FC<ListItemProps>=({headingList,Icon,children,active})=>{
    return (
        <div className="flex flex-col "> 
        <p className="text-gray-700 select-none leading-relaxed">{headingList}</p>

    <div className="flex flex-row items-center  py-5 px-2 rounded-lg  hover:bg-gray-200 transition-colors duration-200  gap-1 md:gap-3">
{Icon && (<Icon size={39} className={'bg-gray-100 rounded-full border-2 border-gray-200 p-1'}  />)} 
{children}
    </div>
    </div>)
}
export default Listitem;
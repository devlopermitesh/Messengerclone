import Link from "next/link";
import { twMerge } from "tailwind-merge";

const NavMenuItem = ({ Label, href="/",className }: { Label: string; href:string; className?: string }) => {
  return (
    <Link href={href}
      className={twMerge(
        "text-md sm:text-lg lg:text-xl text-black font-semibold cursor-pointer mx-4 sm:mx-6 lg:mx-10",
        "transition-all decoration-4 hover:underline decoration-sky-500 delay-75",
        "flex items-center justify-center",
        className 
      )}
    >
      {Label}
    </Link>
  );
};

export default NavMenuItem;

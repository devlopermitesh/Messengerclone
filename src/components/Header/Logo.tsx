import Image from "next/image";
import Logo from "@/assets/Logo.svg";
import clsx from "clsx";  

const LogoComponent = ({ className }: { className?: string }) => {
    return (
        <div
            className={clsx(
         'w-12 h-12 sm:w-15 sm:h-15 md:w-12 md:h-12 lg:w-14 lg:h-14 flex justify-center items-center',
        className
            )}
        >
            <Image
                src={Logo}
                alt="Logo"
                height={100}
                width={100}
                className="object-contain m-auto"
            />
        </div>
    );
};

export default LogoComponent;

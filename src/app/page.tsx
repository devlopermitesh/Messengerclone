import Footer from "@/components/Footer/Footer";
import FeaturesMenu from "@/components/Header/FeaturesMenu";
import Navbar from "@/components/Header/navbar";
import InfroComp from "@/components/IntroCompont";

const page=()=>{
    return (
        <div className="absolute h-full w-full flex flex-col">
            <Navbar/>
          

            <InfroComp/>
            <Footer/>
        </div>
        )
}

export default page;
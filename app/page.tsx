import { Hero } from "@/components/main/Hero";
import Product from "@/components/main/Product";
import Service from "@/components/main/Service";
import OtherProduct from "@/components/main/OtherProduct";
import Information from "@/components/main/Information";
import Footer from "@/components/main/FooterContact";


 

export default function Home() {
  return (
    <main className="h-full w-full bg-white">
      <div className="flex flex-col gap-20"></div>
       <Hero />
       {/* <Product /> */}
       <Service />
       <Information />
       {/* <OtherProduct /> */}
       <Footer/>
    </main>
    
  );
}

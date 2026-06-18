import FeaturedEbooks from "@/components/FeaturedEbooks";
import Genres from "@/components/Genres";
import Hero from "@/components/Hero";
import TopWriters from "@/components/TopWriters";
import Image from "next/image";


export default function Home() {
  return (
   <div>
   <Hero/>
   <FeaturedEbooks/>
   <TopWriters/>
   <Genres/>
   </div>
  );
}

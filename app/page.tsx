import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ImageSlider from "@/components/sliding";
import Image from "next/image";

export default function Home() {
  return (
  <div>
    <Navbar/>
    <ImageSlider/>
    <Footer/>
  </div>
  );
}

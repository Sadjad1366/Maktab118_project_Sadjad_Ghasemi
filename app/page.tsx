import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CategoryList from "@/components/categoryList";
import ExtraInfoComp from "@/components/extraInfo";
import ImageSlider from "@/components/sliding";


export default function Home() {
  return (
  <div>
    <Navbar/>
    <ImageSlider/>
    <CategoryList/>
    <ExtraInfoComp/>
    <Footer/>
  </div>
  );
}

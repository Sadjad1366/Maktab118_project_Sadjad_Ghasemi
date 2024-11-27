import CategoryList from "@/components/categories/categoryList";
import ExtraInfoComp from "@/components/extraInfo/extraInfoComp";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
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

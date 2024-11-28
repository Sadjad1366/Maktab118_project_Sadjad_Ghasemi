import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CategoryList from "@/containers/categoryList";
import ExtraInfoComp from "@/containers/extraInfo";
import ImageSlider from "@/containers/sliding";


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

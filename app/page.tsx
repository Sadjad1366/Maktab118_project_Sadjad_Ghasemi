import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CategoryList from "@/container/categoryList";
import ExtraInfoComp from "@/container/extraInfo";
import ImageSlider from "@/container/sliding";

export default function Home() {
  return (
  <div>
    <ImageSlider/>
    <CategoryList/>
    <ExtraInfoComp/>
  </div>
  );
}

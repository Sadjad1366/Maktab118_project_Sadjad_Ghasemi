import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CategoryList from "@/container/categoryList";
import ExtraInfoComp from "@/container/extraInfo";
import ImageSlider from "@/container/sliding";

export default function Home() {

  return (
    <div className="py-0 mx-0 bg-slate-100">
      <Navbar />
      <div className="container mx-auto px-0">
        <ImageSlider />
      </div>

      <div className="container mx-auto px-0">
        <CategoryList />
      </div>

      <div className="container mx-auto px-0">
        <ExtraInfoComp />
      </div>
      <Footer />
    </div>
  );
}

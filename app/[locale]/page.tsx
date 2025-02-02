import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BrandsSection from "@/container/brands";
import CategoryList from "@/container/categoryList";
import ExtraInfoComp from "@/container/extraInfo";
import FeaturedProducts from "@/container/feature";
import CustomerReviews from "@/container/reviews";
import ImageSlider from "@/container/sliding";
import VideoSection from "@/container/video";
import WhyChooseUs from "@/container/whyChooseUs";

export default function Home() {
  return (
    <div className="py-0 mx-0 bg-slate-100">
      <Navbar />
      <div className="mx-3">
      <ImageSlider />
      </div>
      <div className="container mx-auto px-0">
        <BrandsSection/>
        <CategoryList />
        <ExtraInfoComp />
        <FeaturedProducts/>
        <CustomerReviews/>
        <VideoSection/>
        <WhyChooseUs/>
      </div>

      <Footer />
    </div>
  );
}

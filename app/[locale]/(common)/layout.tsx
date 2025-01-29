import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

interface ICommonLayout {
  children: React.ReactNode;
}

const FooterLayout: React.FC<ICommonLayout> = ({ children }) => {
  return (
    <div className="p-2">
      <Navbar />
      {children}
      <Footer/>
      </div>
  );
};

export default FooterLayout;

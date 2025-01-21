const brands = [
  { id: 1, name: "Rolex", logo: "/images/brands/rolex.webp" },
//   { id: 2, name: "guess", logo: "/images/brands/guess.jpg" },
  { id: 3, name: "ingersoll", logo: "/images/brands/ingersoll.png" },
  { id: 4, name: "Omega", logo: "/images/brands/omega.jpg" },
  { id: 5, name: "seiko", logo: "/images/brands/seiko.png" },
  { id: 6, name: "orient", logo: "/images/brands/orient2.jpg" },

];

const BrandsSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold my-6">برندهای موجود</h2>
      <div className="bg-slate-50 py-10 rounded-lg">
          <div className="flex justify-center items-center py-3">
            {brands.map((brand) => (
              <div key={brand.id} className="w-full flex items-center justify-center gap-6 px-8">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-48 h-48 object-contain"
                />
                {/* <p className="mt-2 text-gray-700">{brand.name}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default BrandsSection;

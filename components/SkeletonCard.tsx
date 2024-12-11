export const SkeletonCard: React.FC = () => {

      // {loading
      //       ? Array.from({ length: itemsPerPage }).map((_, index) => (
      //           <SkeletonCard key={index} />
      //         ))
      //       : products.map((product, index) => (
      //           <ProductCard key={index} product={product} />
      //         ))}
      return(
      <div className="animate-pulse flex flex-col space-y-4 p-4 bg-gray-200 rounded-lg">
        <div className="h-40 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    );}

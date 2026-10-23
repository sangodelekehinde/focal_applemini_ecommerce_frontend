import Skeleton from "react-loading-skeleton";
import ProductCardSkeleton from "./ProductCardSkeleton";

function ProductListSkeleton({ count = 8 }) {
  return (
    <div className="wrapper">
      {/* banner */}
      <div className="flex justify-center mt-4">
        <Skeleton
          containerClassName="block md:w-[50vw] w-[80vw]"
          height="35vh"
          borderRadius={12}
        />
      </div>

      {/* cards */}
      <div className="flex justify-center md:mt-[70px] mt-[40px]">
        <div className="flex gap-8 flex-wrap justify-center">
          {Array.from({ length: count }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListSkeleton;

import Skeleton from "react-loading-skeleton";

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col items-center p-2">
      <div className="flex flex-col gap-3">
        {/* NEW badge */}
        <Skeleton
          containerClassName="block w-[9vw] md:w-[3vw]"
          height={16}
          borderRadius={999}
        />

        {/* image */}
        <Skeleton
          containerClassName="block md:w-[18vw] w-[40vw]"
          className="h-[25vh] md:h-[42vh]"
          borderRadius={8}
        />

        {/* name */}
        <Skeleton width="70%" />

        {/* price */}
        <Skeleton width="30%" />

        {/* add to bag button */}
        <Skeleton height={36} borderRadius={6} />
      </div>
    </div>
  );
}

export default ProductCardSkeleton;
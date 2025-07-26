const SkeletonCard = () => (
  <div className="skeleton-card" />
);

export default SkeletonCard;

export const renderSkeletons = (count = 4) => (
  <div className="horizontal-scroll">
    {Array.from({ length: count }).map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

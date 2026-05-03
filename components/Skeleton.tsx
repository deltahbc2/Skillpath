type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className = "h-4 w-full" }: SkeletonProps) => {
  return <div className={`animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800 ${className}`} />;
};

export default Skeleton;
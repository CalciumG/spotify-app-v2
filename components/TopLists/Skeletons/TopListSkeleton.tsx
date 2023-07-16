import { ListItemSkeleton } from "./ListItemSkeleton";

type TopListSkeletonProps = {
  children: React.ReactNode;
};

export const TopListSkeleton: React.FC<TopListSkeletonProps> = ({
  children,
}) => (
  <div className="w-[400px] max-w-sm p-4">
    {children}
    <div className="my-4 max-w-sm">
      <div className="h-8 bg-gray-300 animate-pulse w-1/2 mb-4"></div>
      <ul className="grid grid-cols-1 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </ul>
    </div>
  </div>
);

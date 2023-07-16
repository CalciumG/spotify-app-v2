export const ListItemSkeleton: React.FC = () => (
  <li className="list-none bg-white shadow overflow-hidden sm:rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105 w-full">
    <div className="flex items-center">
      <div className="w-16 h-16 mr-4 bg-gray-300 animate-pulse"></div>
      <div className="flex-1 ml-4">
        <div className="h-4 bg-gray-300 animate-pulse mb-2 w-2/5"></div>
        <div className="h-3 bg-gray-300 animate-pulse w-3/4"></div>
      </div>
    </div>
  </li>
);

import Image from "next/image";

type ListItemProps = {
  imageUrl: string;
  title: string;
  description: string;
};

export const ListItem: React.FC<ListItemProps> = ({
  imageUrl,
  title,
  description,
}) => (
  <li className="bg-white shadow overflow-hidden sm:rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
    <div className="flex items-center">
      <Image
        src={imageUrl}
        alt={title}
        className="w-16 h-16 mr-4"
        width={64}
        height={64}
        quality={100}
      />
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{description}</p>
      </div>
    </div>
  </li>
);

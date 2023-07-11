type Props = {
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  children: React.ReactNode;
};

export const Tab: React.FC<Props> = ({
  active,
  setActive,
  index,
  children,
}) => (
  <button
    onClick={() => setActive(index)}
    className={`transition-all duration-200 cursor-pointer px-4 py-2 font-semibold ${
      active === index
        ? "bg-green-600 text-white"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
    } ${index === 0 ? "rounded-l-lg" : "rounded-r-lg"}`}
  >
    {children}
  </button>
);

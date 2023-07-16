export const Forbidden = () => {
  return (
    <div role="status" className="flex h-screen items-center justify-center">
      <svg
        aria-hidden="true"
        className="mr-2 h-16 w-16 text-red-600 dark:text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
        />
      </svg>
      <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
        No access
      </span>
    </div>
  );
};

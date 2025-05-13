'use client'

const LoadingSkeleton = () => {
  return (
    <div className="flex justify-center mt-32 h-screen text-xl font-medium text-gray-700 dark:text-gray-300 rtl">
      در حال بارگذاری
      <span className="dots ml-2 inline-block w-6 h-6 relative">
        <span className="absolute left-0 animate-bounce [animation-delay:0s]">.</span>
        <span className="absolute left-2 animate-bounce [animation-delay:0.2s]">.</span>
        <span className="absolute left-4 animate-bounce [animation-delay:0.4s]">.</span>
      </span>
    </div>
  );
};

export default LoadingSkeleton;

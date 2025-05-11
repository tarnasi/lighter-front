export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
      </div>
    </div>
  );
}

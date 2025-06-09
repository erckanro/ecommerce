export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse outline outline-slate-200 p-2 rounded-lg">
      <div className="w-full h-48 bg-gray-200 rounded-md" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-3/4" />
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2" />
      <div className="mt-3 flex justify-between items-center">
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-8 w-8 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
}

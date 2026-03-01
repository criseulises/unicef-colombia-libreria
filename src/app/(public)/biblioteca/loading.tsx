export default function BibliotecaLoading() {
  return (
    <div className="min-h-screen">
      {/* Header skeleton */}
      <div className="bg-gradient-to-br from-unicef-light via-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 w-32 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-80 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-96 bg-gray-100 rounded mx-auto animate-pulse" />
          <div className="mt-8 max-w-md mx-auto h-12 bg-white border-2 border-gray-200 rounded-lg animate-pulse" />
        </div>
      </div>

      {/* Books grid skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="h-5 w-40 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-video bg-gray-200 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-100 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

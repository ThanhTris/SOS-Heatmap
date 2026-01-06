export default function Home() {
  return (
    <div className="flex w-full h-screen bg-amber-50">
      <div className="w-72 h-full bg-white border-r border-gray-200 flex flex-col p-4">
        <div className="text-xl font-bold mb-6">Menu</div>
        {/* Sidebar component can be included here */}
        <div className="flex-1">Slide Bar</div>
      </div>
      <div className="flex-1 h-full relative">
        <div className="absolute inset-0">
          {/* Map component can be included here */}
          <div>Map Component</div>
        </div>
      </div>
    </div>
  );
}
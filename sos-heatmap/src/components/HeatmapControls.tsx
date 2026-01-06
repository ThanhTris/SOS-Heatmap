export default function HeatmapControls() {
  return (
    <div className="flex flex-col p-4 bg-white border border-gray-200 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Heatmap Controls</h2>
      <div className="flex flex-col space-y-2">
        <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Toggle Layer
        </button>
        <button className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
          Adjust Settings
        </button>
        {/* Additional controls can be added here */}
      </div>
    </div>
  );
}
export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white shadow">
        <h1 className="text-xl font-bold p-4">SOS Heatmap</h1>
      </header>
      <main className="flex flex-1">
        {children}
      </main>
    </div>
  );
}
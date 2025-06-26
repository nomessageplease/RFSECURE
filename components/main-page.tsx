export default function MainPage() {
  const currentRole = "admin" // Example role, replace with actual role

  return (
    <main className="flex-1 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Титул</h2>
            <p className="text-sm text-gray-500">Роль: {currentRole}</p>
          </div>
        </div>
      </div>
    </main>
  )
}

// src/app/catalogo/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Cargando catálogo...</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Skeletons para simular carga */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg shadow-md"></div>
        ))}
      </div>
    </div>
  )
}
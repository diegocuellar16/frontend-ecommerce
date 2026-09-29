import { Suspense } from 'react'
import ProductList from '@/components/ProductList'

export const metadata = {
  title: 'Catálogo de Productos | E-Commerce',
  description: 'Explora nuestros productos disponibles',
}

export default function CatalogoPage() {
  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Catálogo de Productos</h1>
      </div>

      <Suspense fallback={<p className="text-center text-blue-500 font-bold">Cargando lista de productos...</p>}>
        <ProductList />
      </Suspense>
    </main>
  )
}
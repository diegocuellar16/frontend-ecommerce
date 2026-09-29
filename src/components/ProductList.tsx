// src/components/ProductList.tsx
import { fetchAPI } from '@/lib/api'
import { Product } from '@/types'
import Link from 'next/link'
import AddToCartButton from './AddToCartButton' // Importamos nuestro botón de cliente

// Función para obtener los productos desde Laravel
async function getProducts(): Promise<Product[]> {
  const response = await fetchAPI('/products', {
    cache: 'no-store' // Garantiza que siempre traiga datos frescos (ideal para ecommerce)
  })

  if (!response.ok) {
    throw new Error('Fallo al obtener los productos desde la API.')
  }

  const data = await response.json()
  
  // Laravel suele devolver los datos anidados dentro de una propiedad "data"
  return data.data || data 
}

export default async function ProductList() {
  const products = await getProducts()

  if (products.length === 0) {
    return <p className="text-center text-gray-500">No hay productos disponibles por ahora.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white flex flex-col">
          <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
             {/* Aquí iría la imagen si la tuvieras */}
             <span className="text-gray-400">Sin Imagen</span>
          </div>
          <h2 className="text-lg font-bold truncate">{product.name}</h2>
          <p className="text-gray-600 font-semibold mt-2">${product.price}</p>
          
          <div className="mt-auto pt-4 flex flex-col gap-2">
            <Link 
              href={`/catalogo/${product.id}`}
              className="w-full text-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
            >
              Ver detalle
            </Link>
            
            {/* Nuestro Client Component para agregar al carrito */}
            <AddToCartButton product={product} />
          </div>
        </div>
      ))}
    </div>
  )
}
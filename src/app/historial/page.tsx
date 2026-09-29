// src/app/historial/page.tsx
import { fetchAPI } from '@/lib/api'
import { Order } from '@/types'
import Link from 'next/link'

// Función para obtener las órdenes desde Laravel
async function getOrders(): Promise<Order[]> {
  const response = await fetchAPI('/orders', {
    cache: 'no-store' // Para garantizar que no cachee datos viejos
  })
  
  if (!response.ok) {
    return [] // Si da error (ej. el usuario no está logueado), devolvemos vacío
  }

  const data = await response.json()
  return data.data || []
}

export default async function HistorialPage() {
  const orders = await getOrders()

  if (orders.length === 0) {
    return (
      <main className="container mx-auto p-4 text-center mt-20 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">No tienes compras aún o no has iniciado sesión</h1>
        <Link href="/catalogo" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Ir al catálogo
        </Link>
      </main>
    )
  }

  return (
    <main className="container mx-auto p-4 max-w-4xl min-h-screen mt-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Historial de Compras</h1>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md border">
            <div className="flex justify-between border-b pb-4 mb-4">
              <div>
                <p className="font-bold text-gray-700 text-lg">Orden #{order.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-xl text-blue-600">${Number(order.total).toFixed(2)}</p>
                <span className="inline-block mt-1 text-sm px-3 py-1 bg-green-100 text-green-800 rounded-full capitalize font-semibold">
                  {order.status}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-gray-700">Artículos comprados:</h3>
              <ul className="space-y-2">
                {order.items.map(item => (
                  <li key={item.id} className="flex justify-between text-gray-600 bg-gray-50 p-2 rounded">
                    <span>Producto ID: {item.product_id} (x{item.quantity})</span>
                    <span className="font-medium">${Number(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
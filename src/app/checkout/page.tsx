// src/app/checkout/page.tsx
'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/actions/order'

export default function CheckoutPage() {
  const { cart, removeFromCart, total, clearCart } = useCart()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleCreateOrder = async () => {
    setLoading(true)
    setErrorMsg('')
    
    // Llamamos a nuestro Server Action pasándole los datos del carrito
    const result = await createOrder(cart, total)
    
    if (result.error) {
      setErrorMsg(result.error)
      setLoading(false)
    } else {
      // ¡Orden creada en Laravel! Vaciamos el carrito
      clearCart() 
      alert('¡Orden creada con éxito! Aquí luego conectaremos con Stripe.')
      router.push('/catalogo')
    }
  }

  // Vista si el carrito está vacío
  if (cart.length === 0) {
    return (
      <main className="container mx-auto p-4 text-center mt-20 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">Parece que aún no has agregado productos a tu orden.</p>
        <Link href="/catalogo" className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
          Volver al catálogo
        </Link>
      </main>
    )
  }

  // Vista del resumen de compra
  return (
    <main className="container mx-auto p-4 max-w-4xl mt-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Resumen de Compra</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center border-b py-4 last:border-0">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Cantidad: {item.quantity} x ${item.price}</p>
            </div>
            <div className="flex items-center gap-6">
              <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-semibold transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-8 border-t pt-6 flex justify-between items-center text-2xl">
          <span className="font-bold">Total a Pagar:</span>
          <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
        </div>

        {/* Mensaje de error si falla la creación de la orden (ej. no está logueado) */}
        {errorMsg && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded mb-4 text-center font-semibold">
            {errorMsg}
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleCreateOrder}
            disabled={loading}
            className={`bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition shadow-lg text-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
            }`}
          >
            {loading ? 'Procesando...' : 'Proceder al Pago'}
          </button>
        </div>
      </div>
    </main>
  )
}
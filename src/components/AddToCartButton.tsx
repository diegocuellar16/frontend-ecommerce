// src/components/AddToCartButton.tsx
'use client'

import { useCart } from '@/context/CartContext'
import { Product } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <button 
      onClick={() => {
        addToCart(product)
        alert(`¡${product.name} agregado al carrito!`) // Feedback rápido para probar
      }}
      className="w-full mt-2 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
    >
      Agregar al Carrito
    </button>
  )
}
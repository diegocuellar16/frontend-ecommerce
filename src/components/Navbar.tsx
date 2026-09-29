// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const { cart, total } = useCart()
  
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/catalogo" className="text-xl font-bold tracking-wider">
          E-Commerce UDB
        </Link>
        <div className="flex gap-4 items-center">
          <Link href="/catalogo" className="hover:text-gray-300 transition">
            Catálogo
          </Link>
          
          <Link href="/historial" className="hover:text-gray-300 transition">
            Mis Compras
          </Link>

          <Link href="/login" className="hover:text-gray-300 transition mr-2">
            Iniciar Sesión
          </Link>

          <Link href="/checkout" className="bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
            🛒 Carrito ({itemCount}) <span className="font-normal border-l border-blue-400 pl-2 ml-1">${total.toFixed(2)}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
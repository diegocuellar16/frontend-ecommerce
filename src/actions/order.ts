// src/actions/order.ts
'use server'

import { fetchAPI } from '@/lib/api'
import { revalidatePath } from 'next/cache'
import { CartItem } from '@/context/CartContext'

export async function createOrder(cart: CartItem[], total: number) {
  try {
    // Transformamos los datos del carrito al formato que espera la API
    const items = cart.map(item => ({
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }))

    const response = await fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify({
        total: total,
        items: items
      })
    })

    const data = await response.json()

    if (!response.ok) {
       // Si hay un error (ej: el usuario no está logueado, devolverá 401)
       return { error: data.message || 'Error al procesar la orden. ¿Iniciaste sesión?' }
    }

    // Revalidamos la ruta del historial de compras para que muestre la nueva orden (Requisito)
    revalidatePath('/historial')

    return { success: true, order: data.order }

  } catch (error) {
    console.error("Error creating order:", error)
    return { error: 'Ocurrió un error inesperado al intentar crear la orden.' }
  }
}
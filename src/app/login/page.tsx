// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { login } from '@/actions/auth' // Importamos la acción de servidor que creaste antes

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)

  // En Next.js 14/15 podemos pasar FormData directamente a las Server Actions
  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setErrorMsg('')

    // Llamamos a la función de autenticación
    const result = await login(formData)

    // Si la función nos devuelve un error, lo mostramos.
    // (Si es exitoso, la función hace redirect() internamente)
    if (result?.error) {
      setErrorMsg(result.error)
      setLoading(false)
    }
  }

  return (
    <main className="container mx-auto p-4 flex justify-center items-center min-h-[80vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h1>
        
        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm font-semibold">
            {errorMsg}
          </div>
        )}

        {/* El atributo action acepta nuestra función handleSubmit */}
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">Correo Electrónico</label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="tu@correo.com"
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              required
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="********"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded transition ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {loading ? 'Iniciando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </main>
  )
}
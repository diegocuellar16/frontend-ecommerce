// src/actions/auth.ts
'use server'

import { fetchAPI } from '@/lib/api'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return { error: 'El email y la contraseña son obligatorios.' }
  }

  try {
    const response = await fetchAPI('/login', { 
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
       return { error: data.message || 'Credenciales incorrectas.' }
    }

    const token = data.token 

    if (token) {
        // CORRECCIÓN: Agregamos await antes de cookies()
        const cookieStore = await cookies() 
        
        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, 
            path: '/',
        })
    }
  } catch (error) {
     console.error("Error en login action:", error)
     return { error: 'Ocurrió un error inesperado al intentar iniciar sesión.' }
  }

  redirect('/catalogo') 
}

export async function register(formData: FormData) {
  const name = formData.get('name')
  const email = formData.get('email')
  const password = formData.get('password')
  const password_confirmation = formData.get('password_confirmation')

  if (!name || !email || !password || !password_confirmation) {
    return { error: 'Todos los campos son obligatorios.' }
  }

  if (password !== password_confirmation) {
    return { error: 'Las contraseñas no coinciden.' }
  }

  try {
    const response = await fetchAPI('/register', { 
      method: 'POST',
      body: JSON.stringify({ name, email, password, password_confirmation }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.message || 'Error al registrar el usuario.' }
    }

    const token = data.token 

    if (token) {
        // CORRECCIÓN: Agregamos await antes de cookies()
        const cookieStore = await cookies()
        cookieStore.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })
    } else {
        redirect('/login')
    }

  } catch (error) {
    console.error("Error en register action:", error)
    return { error: 'Ocurrió un error inesperado durante el registro.' }
  }

  redirect('/catalogo')
}

export async function logout() {
  // CORRECCIÓN: Agregamos await antes de cookies()
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  redirect('/login')
}
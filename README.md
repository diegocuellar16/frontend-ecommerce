# Frontend E-commerce | Next.js App Router

Este proyecto es el frontend de una aplicación e-commerce construida con **Next.js 16+ (App Router)** y **TypeScript**, desarrollada como evaluación práctica de optimización de rendimiento y mutaciones asíncronas en el servidor.

El backend que consume esta aplicación es una API REST construida en **Laravel 12**.

## Stack Tecnológico
- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Estado Global:** Context API (Carrito de compras)
- **Autenticación:** JWT/Sanctum vía HTTP-Only Cookies nativas de Next.js.

## Funcionalidades Implementadas
- [x] **Catálogo Público:** Listado de productos obtenido mediante Server Components.
- [x] **Autenticación:** Login seguro gestionado mediante Server Actions y `cookies()` de Next.js.
- [x] **Carrito y Orden:** Estado local interactivo y creación de orden mediante mutación asíncrona hacia la API.
- [x] **Historial de Compras:** Vista protegida del usuario.
- [x] **Resiliencia:** Implementación de `loading.tsx` y `error.tsx` en el catálogo.
- [x] **Optimización:** Uso de `Suspense` y revalidación de rutas post-mutación (`revalidatePath`).

## Pasos para ejecutar el proyecto en local

1. Clonar este repositorio:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO>
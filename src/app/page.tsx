import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige automáticamente la raíz al catálogo
  redirect('/catalogo');
}
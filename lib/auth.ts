import { cookies } from 'next/headers'
export async function isAdmin() {
  return (await cookies()).get('adm')?.value === process.env.ADMIN_TOKEN
}

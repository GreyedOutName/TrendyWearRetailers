'use server'

import { createClient } from '@/utils/supabase/server'

export async function updateItem({
  itemId,
  name,
  description,
  tags,
}: {
  itemId: number
  name: string
  description: string
  tags: string
}) {
  const supabase = await createClient()

  // 1️⃣ Get current auth user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('Not authenticated')
  }

  // 2️⃣ Check if admin
  const { data: dbUser, error: userError } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (userError || !dbUser?.is_admin) {
    throw new Error('Unauthorized')
  }

  // 3️⃣ Update item
  const { error } = await supabase
    .from('items')
    .update({
      name,
      description,
      tags: JSON.parse(tags), 
    })
    .eq('id', itemId)

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}
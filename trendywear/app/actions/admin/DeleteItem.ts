'use server'

import { createClient } from '@/utils/supabase/server'

export async function deleteItem(itemId: number) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) throw new Error('Not authenticated')

  const { data: dbUser, error: userError } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (userError || !dbUser?.is_admin) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('items')
    .update({ is_active: false })
    .eq('id', itemId)

  if (error) throw new Error(error.message)

  return { success: true }
}
'use server'

import { createClient } from '@/utils/supabase/server'

export async function createItem(data: {
  name: string
  description: string
  tags: string
  image_id: string
  basePrice: number
}) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  console.log('AUTH USER:', user?.id)
  console.log('AUTH ERROR:', authError)

  const { data: dbUser, error: dbError } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user?.id)
    .single()

  console.log('DB USER:', dbUser)
  console.log('DB ERROR:', dbError)

  if (!dbUser?.is_admin) throw new Error('Unauthorized')

  // 2️⃣ Insert item
  const { data: item, error: itemError } = await supabase
    .from('items')
    .insert({
      name: data.name,
      description: data.description,
      tags: JSON.parse(data.tags),
      image_id: JSON.parse(data.image_id),
    })
    .select()
    .single()

  if (itemError || !item) throw new Error(itemError?.message || 'Failed to create item')

  // 3️⃣ Insert base price
  const { error: priceError } = await supabase.from('prices').insert({
    item_id: item.id,
    price: data.basePrice,
    priority: 0,
    valid_from: new Date(),
    valid_to: null
  })

  if (priceError) throw new Error(priceError.message)

  return item
}
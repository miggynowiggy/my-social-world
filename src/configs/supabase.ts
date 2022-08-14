import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_PUBLIC_KEY } from 'constants/env'

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

export {
  supabase
}
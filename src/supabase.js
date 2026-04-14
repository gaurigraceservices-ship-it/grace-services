import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://plthfzntnlbogtdwboja.supabase.co"
const supabaseKey = "sb_publishable_U1mdD98TNyS_dRslGGQPqQ_YVGRMNGJ"

export const supabase = createClient(supabaseUrl, supabaseKey)
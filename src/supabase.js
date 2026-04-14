import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://plthfzntnlbogtdwboja.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdGhmem50aGxib2d0ZHdib2phIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwNzA1MjQsImV4cCI6MjA5MTY0NjUyNH0.x95G6bte9pU3VV23_Eh1GYN7T2tj_njjPuW1-2MdtNY";

export const supabase = createClient(supabaseUrl, supabaseKey);
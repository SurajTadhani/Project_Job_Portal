import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = "https://qnoflbiyquegffrcpcgs.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFub2ZsYml5cXVlZ2ZmcmNwY2dzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzQyMDcsImV4cCI6MjA1MzcxMDIwN30.jCE5LRNhB_hB5c5t2K7u4b8xnFf4chxFY9d4uqMiKBc"
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
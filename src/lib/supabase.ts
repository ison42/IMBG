import { createClient } from '@supabase/supabase-js';

// Supabase 项目配置
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

import { supabase } from "../config/SupabaseConfig.js";

export async function getUserById(s_id) {
  const { data, error } = await supabase
    .from("s_auth")
    .select("*")
    .eq("s_id", s_id);
  if (error) throw error;
  return data;
}

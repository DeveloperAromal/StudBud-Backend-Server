import { supabase } from "../config/SupabaseConfig.js";

export async function createFlashCard(title, quesans, time, progress) {
  const { data, error } = await supabase
    .from("fourm")
    .insert([{ title, quesans, time, progress }])
    .select();

  if (error) throw error;
  return data;
}

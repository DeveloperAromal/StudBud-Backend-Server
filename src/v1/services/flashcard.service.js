import { supabase } from "../config/SupabaseConfig.js";

export async function createFlashCard(title, subject, quesans, time, progress) {
  const { data, error } = await supabase
    .from("flashcard")
    .insert([{ title, subject, quesans, time, progress }])
    .select();

  if (error) throw error;
  return data;
}
export async function getFlashCard() {
  const { data, error } = await supabase.from("flashcard").select("*");
  if (error) throw error;
  return data;
}

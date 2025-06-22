import { supabase } from "../config/SupabaseConfig.js";
import { getProcessedContent } from "../utils/ai.js";
import { fetchTranscript } from "../utils/transcript.js";

export async function createFlashCard(videoUrl) {
  const response = await fetchTranscript(videoUrl);
  if (response != null) {
    const content = await getProcessedContent(response);
    const { data, error } = await supabase
      .from("flashcard")
      .insert([{ content }])
      .select("flash_id");
    if (error) throw error;
    return data;
  } else {
    console.log("Error occured");
  }
}

export async function getFlashCardById(flash_id) {
  const { data, error } = await supabase
    .from("flashcard")
    .select("*")
    .eq("flash_id", flash_id);
  if (error) throw error;
  return data;
}

export async function updateFlashProgress(progress, flash_id) {
  const { data, error } = await supabase
    .from("flashcard")
    .update({ progress })
    .eq("flash_id", flash_id)
    .select("progress");
  if (error) throw error;
  return data;
}

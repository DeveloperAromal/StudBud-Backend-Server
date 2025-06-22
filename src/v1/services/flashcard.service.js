import { supabase } from "../config/SupabaseConfig.js";
import { getProcessedContent } from "../utils/ai.js";
import { fetchTranscript } from "../utils/transcript.js";

export async function getTranscript(videoUrl) {
  const response = await fetchTranscript(videoUrl);
  console.log(response);
  console.log("AI is processing the transcript.......");
  if (response != null) {
    const content = await getProcessedContent(response);
    // const { processedContent } = JSON.stringify(rawContent);
    const { data, error } = await supabase
      .from("flashcard")
      .insert([{ content }])
      .select("flash_id");
    if (error) throw error;
    return data;
  } else {
    console.log("Error occured");
  }
  // const response = await fetchTranscript(videoUrl);
  // console.log(response);
}

export async function getFlashCard() {
  const { data, error } = await supabase.from("flashcard").select("*");
  if (error) throw error;
  return data;
}

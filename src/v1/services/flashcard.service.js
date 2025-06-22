import { supabase } from "../config/SupabaseConfig.js";
import { getProcessedContent } from "../utils/ai.js";
import { fetchTranscript } from "../utils/transcript.js";

export async function getTranscript(videoUrl) {
  const response = await fetchTranscript(videoUrl);
  // console.log(response != null);

  if (response != null) {
    const proceedContent = await getProcessedContent(response);
    console.log(`This is the problem: =====> ${proceedContent}`);
    return proceedContent;
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

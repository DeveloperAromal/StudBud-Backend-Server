import { questionMakerAi, summarizer } from "../utils/ai.js";
import { fetchTranscript } from "../utils/transcript.js";

export async function summarizeAi(videoUrl) {
  console.log(videoUrl);
  const response = await fetchTranscript(videoUrl);
  console.log(`i got ${response}`);
  const summary = await summarizer(response);
  console.log(`i got summary ${summary}`);
  return summary;
}

export async function questionAi(summary) {
  const questions = await questionMakerAi(summary);
  return questions;
}

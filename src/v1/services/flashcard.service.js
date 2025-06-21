import { supabase } from "../config/SupabaseConfig.js";
import axios from "axios";
import { fetchTranscript } from "../utils/transcript.js";

export async function generateFlashcardsFromYoutube(
  videoUrl,
  title,
  subject,
  time,
  progress
) {
  try {
    const transcript = await fetchTranscript(videoUrl);

    const prompt = `
Split the following transcript into question-answer flashcards.
Return JSON like:
[
  { "question": "What is X?", "answer": "X is..." }
]

Transcript:
${transcript}
    `;

    const aiRes = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemma-3-27b-it:free",
        messages: [
          {
            role: "system",
            content: "You're an assistant that creates study flashcards.",
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const flashcardsJson = aiRes.data.choices[0].message.content;
    const quesans = JSON.parse(flashcardsJson);

    // Now save using your original `createFlashCard` function 👇
    const flashcard = await createFlashCard(
      title,
      subject,
      quesans,
      time,
      progress
    );
    return flashcard;
  } catch (err) {
    console.error("AI Flashcard error:", err.message);
    throw err;
  }
}

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

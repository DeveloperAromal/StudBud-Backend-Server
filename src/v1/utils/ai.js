// import axios from "axios";

// export async function generateFlashcardsFromYoutube(transcript) {
//   try {
//     const prompt = `
//   Split the following transcript into question-answer flashcards.
//   Return JSON like:
//   [
//     { "question": "What is X?", "answer": "X is..." }
//   ]

//   Transcript:
//   ${transcript}
//       `;

//     const aiRes = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "google/gemma-3-27b-it:free",
//         messages: [
//           {
//             role: "system",
//             content: "You're an assistant that creates study flashcards.",
//           },
//           { role: "user", content: prompt },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     const flashcardsJson = aiRes.data.choices[0].message.content;
//     const quesans = JSON.parse(flashcardsJson);

//     return quesans;
//   } catch (err) {
//     console.error("AI Flashcard error:", err.message);
//     throw err;
//   }
// }

const url = "https://openrouter.ai/api/v1/chat/completions";

const api_key =
  "Bearer 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";

const transcript = "";

// const options = {
//   method: "POST",
//   headers: {
//     Authorization: api_key,
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     model: "google/gemma-3n-e4b-it:free",
//     messages: [
//       {
//         role: "user",
//         content: `From the transcript below, create exactly 10 short flashcards in this format:

// Q: <question>
// A: <answer>
// \\n

// Transcript:
// ${transcript}`,
//       },
//     ],
//   }),
// };
// fetch(url, options)
//   .then((res) => res.json())
//   .then((data) => {
//     const rawText = data.choices[0].message.content;

//     console.log("🧠 RAW AI RESPONSE:\n");
//     console.log(rawText); // <--- DEBUG THIS FIRST

//     const flashcards = [];

//     // Try splitting by real line breaks instead of escaped \n
//     const lines = rawText.split("\n").filter((line) => line.trim() !== "");

//     for (let i = 0; i < lines.length; i++) {
//       const qMatch = lines[i].match(/^Q:\s*(.+)$/i);
//       const aMatch = lines[i + 1]?.match(/^A:\s*(.+)$/i);

//       if (qMatch && aMatch) {
//         flashcards.push({
//           question: qMatch[1].trim(),
//           answer: aMatch[1].trim(),
//         });
//         i++; // Skip the answer line next loop
//       }
//     }

//     console.log("\n✅ FLASHCARDS JSON:\n");
//     console.log(JSON.stringify(flashcards, null, 2));
//   })
//   .catch((error) => {
//     console.log("Error fetching data:", error);
//   });
import dotenv from "dotenv";

dotenv.config();

const auth_key = process.env.OPENROUTER_API_KEY;

export async function getProcessedContent(transcript) {
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const api_key =
    "Bearer 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";

  // old api key : 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

  const options = {
    method: "POST",
    headers: {
      Authorization: api_key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemma-3n-e4b-it:free",
      messages: [
        {
          role: "user",
          content: `From the transcript below, generate flashcards in this exact JSON format:

[
  {
    "details": {
      "time": <duration in minutes>,
      "subject": "<subject name>"
    }
  },
  [
    {
      "question": "<question 1>",
      "answer": "<answer 1>"
    },
    ...
    {
      "question": "<question 10>",
      "answer": "<answer 10>"
    }
  ]
]

⚠️ Important:
- The flashcards must be in a JSON array (surrounded by square brackets).
- Include exactly 10 flashcards.
- Do not output individual flashcards as separate objects outside an array.
- Do not include extra text, explanation, or markdown.
Transcript: 
${transcript}`,
        },
      ],
    }),
  };
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    console.log(data);
    const rawText = data.choices[0].message.content;

    const cleanedData = rawText.replace(/```|json/g, "").trim();
    return JSON.parse(cleanedData);
  } catch (e) {
    console.log(e);
  }
}

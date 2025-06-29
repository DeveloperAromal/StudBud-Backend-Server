import dotenv from "dotenv";
dotenv.config();

const auth_key = process.env.OPENROUTER_API_KEY;

export async function getProcessedContent(transcript) {
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const api_key = `Bearer ${auth_key}`;

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

export async function studyBuddyAi(question) {
  const url = "https://openrouter.ai/api/v1/chat/completions";

  const api_key = `Bearer ${auth_key}`;

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
          content: `Act as a concise study buddy. 
Give helpful, short responses without any markdown, bullet points, or formatting.
Only say what is needed to answer or support learning.

Question: ${question}`,
        },
      ],
    }),
  };

  try {
    console.log("Thinking...");
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Error ${res.status}: ${errorBody}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No reply.";
  } catch (e) {
    console.error("StudyBuddy AI error:", e.message);
    return "Sorry, I couldn’t answer that right now.";
  }
}

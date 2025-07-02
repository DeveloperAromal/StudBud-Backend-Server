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

export async function personalAiAgent(question) {
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
          content: `You are StudBud AI, an intelligent assistant for the StudBud SaaS platform.
          Your role is to represent the product and help users understand how StudBud makes school life easier.
          Provide short, clear answers without markdown, bullet points, or formatting.
          
          StudBud offers features like smart dashboards, attendance tracking, assignments, communication tools, and more—all in a single dynamic web ERP for schools.
          
          Respond helpfully and to the point.
          
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

export async function summarizer(transcript) {
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
          content: `
        You are StudBud AI, an intelligent academic assistant designed for the StudBud SaaS learning platform.
        
        
        Your job is to read the transcript of an educational YouTube video and generate a **clear, concise, and student-friendly summary**.
        
        
        Goals:
        
        - Highlight key concepts and takeaways.
        
        - Avoid filler or repetition from the transcript.
        
        - Make it easy for students to revise or understand core ideas.
        
        - Use simple, structured, and academic language.
        - add \n for line break
        
        Here is the transcript to summarize:
        
        
        ${transcript}
        
        `,
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
    console.error("StudyBuddy summarizer AI error:", e.message);
    return "Sorry, I couldn’t answer that right now.";
  }
}

export async function questionMakerAi(summary) {
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
          content: `
        You are an expert educational assistant specialized in creating high-quality study material for students.
        
        Based on the following summary, generate **at least 5 clear and concise questions** that test comprehension and critical thinking. For each question, also provide a well-explained answer.
        
        Format your response in markdown as a numbered list, where each item includes the question followed by its answer separated by a newline. Add an extra blank line between each question-answer pair for readability.
        
        Summary:
        \`\`\`
        ${summary}
        \`\`\`
        
        Example format:
        
        1. **Question:** What is...?
        
           **Answer:** The answer is...
        \n
        2. **Question:** How does...?
        
           **Answer:** The explanation is...
        \n
        Please ensure the questions vary in difficulty and cover different aspects of the summary content.
        `,
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
    console.error("StudyBuddy summarizer AI error:", e.message);
    return "Sorry, I couldn’t answer that right now.";
  }
}

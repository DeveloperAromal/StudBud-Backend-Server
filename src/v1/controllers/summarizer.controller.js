import { questionAi, summarizeAi } from "../services/summarizer.service.js";

export const summarizerAi = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const answer = await summarizeAi(videoUrl);
    res.json({ answer });
  } catch (e) {
    console.error("Buddy AI error:", e);
    res.status(500).json({ error: "Failed to get response from Buddy AI." });
  }
};

export const questionsMaker = async (req, res) => {
  try {
    const { summary } = req.body;
    const answer = await questionAi(summary);
    res.json({ answer });
  } catch (e) {
    console.error("Buddy AI error:", e);
    res.status(500).json({ error: "Failed to get response from Buddy AI." });
  }
};

import { createFlashCard } from "../services/flashcard.service";

export const createFlashCardPost = async (req, res) => {
  try {
    const { title, quesans, time, progress } = req.body;
    const post = await createFlashCard(title, quesans, time, progress);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

import {
  createFlashCard,
  getFlashCard,
} from "../services/flashcard.service.js";

export const createFlashCardPost = async (req, res) => {
  try {
    const { title, subject, quesans, time, progress } = req.body;
    const post = await createFlashCard(title, subject, quesans, time, progress);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

export const getFlashCardPost = async (req, res) => {
  try {
    const allFlashCards = await getFlashCard();
    res.json(allFlashCards);
  } catch (e) {
    console.log(e);
  }
};

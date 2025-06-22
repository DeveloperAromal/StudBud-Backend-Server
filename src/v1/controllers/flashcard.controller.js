import {
  createFlashCard,
  getFlashCardById,
  updateFlashProgress,
} from "../services/flashcard.service.js";

export const createFlash = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const transcript = await createFlashCard(videoUrl);
    res.json(transcript);
  } catch (e) {
    console.log(e);
  }
};

export const getFlashCard = async (req, res) => {
  try {
    const { flash_id } = req.params;
    const allFlashCards = await getFlashCardById(flash_id);
    res.json(allFlashCards);
  } catch (e) {
    console.log(e);
  }
};

export const updateFlash = async (req, res) => {
  try {
    const { progress, flash_id } = req.body;
    const updatedData = await updateFlashProgress(progress, flash_id);
    res.json(updatedData);
  } catch (e) {
    console.log(e);
  }
};

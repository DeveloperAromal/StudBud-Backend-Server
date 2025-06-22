import {
  // createFlashCard,
  getFlashCard,
  // generateFlashcardsFromYoutube,
  getTranscript,
} from "../services/flashcard.service.js";

// export const generateFlashCardFromYoutubePost = async (req, res) => {
//   try {
//     const { videoUrl, title, subject, time, progress } = req.body;
//     const generated = await generateFlashcardsFromYoutube(
//       videoUrl,
//       title,
//       subject,
//       time,
//       progress
//     );
//     res.json(generated);
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ error: "Failed to generate flashcards" });
//   }
// };

export const getFlashTranscript = async (req, res) => {
  try {
    const { videoUrl } = req.body;
    const transcript = await getTranscript(videoUrl);
    res.json(transcript);
  } catch (e) {
    console.log(e);
  }
};

// export const createFlashCardPost = async (req, res) => {
//   try {
//     const { title, subject, quesans, time, progress } = req.body;
//     const post = await createFlashCard(title, subject, quesans, time, progress);
//     res.json(post);
//   } catch (e) {
//     console.log(e);
//   }
// };

export const getFlashCardPost = async (req, res) => {
  try {
    const allFlashCards = await getFlashCard();
    res.json(allFlashCards);
  } catch (e) {
    console.log(e);
  }
};

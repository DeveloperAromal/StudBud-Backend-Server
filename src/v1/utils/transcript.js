import axios from "axios";

export async function fetchTranscript(videoUrl) {
  const res = await axios.post(
    // "https://flask-transcript.onrender.com/transcript",
    "http://127.0.0.1:5000/transcript",
    {
      url: videoUrl,
    }
  );
  return res.data.transcript;
}

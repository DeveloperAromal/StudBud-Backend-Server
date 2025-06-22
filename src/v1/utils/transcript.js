// import axios from "axios";

// export async function fetchTranscript(videoUrl) {
//   const res = await axios.post(
//     "https://flask-transcript.onrender.com/transcript",
//     {
//       url: videoUrl,
//     }
//   );
//   return res.data.transcript;
// }

// fetchTranscript("https://www.youtube.com/watch?v=wIuVvCuiJhU")
//   .then((transcript) => console.log(transcript))
//   .catch((err) => console.error(err));
//
//
//
//
//
//
//exporting transcript.js WARNING WARNING WARNING
// src/v1/utils/transcript.js

import axios from "axios";

export async function fetchTranscript(videoUrl) {
  const res = await axios.post(
    "https://flask-transcript.onrender.com/transcript",
    {
      url: videoUrl,
    }
  );
  return res.data.transcript;
}

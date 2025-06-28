import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.ZOOM_CLIENT_ID;
const client_secret = process.env.ZOOM_CLIENT_SECRET;
const account_id = process.env.ZOOM_ID;

let cachedToken = null;
let tokenExpiryTime = null;

export async function getZoomAccessToken() {
  const now = Date.now();

  if (cachedToken && tokenExpiryTime && now < tokenExpiryTime) {
    return cachedToken;
  }

  const authHeader = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  try {
    const res = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${account_id}`,
      {},
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    cachedToken = res.data.access_token;
    tokenExpiryTime = now + res.data.expires_in * 1000;

    return cachedToken;
  } catch (error) {
    console.error(
      "Failed to get Zoom token:",
      error.response?.data || error.message
    );
    throw error;
  }
}

import axios from "axios";
import { supabase } from "../config/SupabaseConfig.js";
import { getZoomAccessToken } from "../utils/zoomClient.js";

export async function CreateMeeting(meetingData, classname, subdomain) {
  const access_token = await getZoomAccessToken();
  try {
    const meetRes = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      meetingData,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = meetRes.data;
    const join_url = data?.join_url;
    const start_url = data?.start_url;

    const recordToInsert = {
      classname,
      subdomain,
      meetingData: {
        ...meetingData,
      },
      join_url,
      start_url,
    };

    const { data: meetData, error } = await supabase
      .from("meet")
      .insert([recordToInsert]);

    if (error) throw error;
    return meetData;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getMeetingByClass(classname, subdomain) {
  const { data, error } = await supabase
    .from("meet")
    .select("*")
    .eq("classname", classname)
    .eq("subdomain", subdomain);

  if (error) throw error;

  return data;
}

export async function CreateMeeting(meetingData, class_name) {
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
      ...meetingData,
      settings: JSON.stringify(meetingData.settings), // convert to JSON string if needed
      join_url,
      start_url,
      class_name, // ✅ insert separately
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

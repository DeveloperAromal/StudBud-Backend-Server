import { CreateMeeting } from "../services/zoom.service.js";

export const createMeetingLink = async (req, res) => {
  try {
    const meetingData  = req.body;
    const link = await CreateMeeting(meetingData);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

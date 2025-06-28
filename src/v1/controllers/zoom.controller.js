import { CreateMeeting } from "../services/zoom.service.js";

export const createMeetingLink = async (req, res) => {
  try {
    const { meetingData, classname } = req.body;
    const link = await CreateMeeting(meetingData, classname);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

import { CreateMeeting, getMeetingByClass } from "../services/zoom.service.js";

export const createMeetingLink = async (req, res) => {
  try {
    const { meetingData, classname } = req.body;
    const link = await CreateMeeting(meetingData, classname);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

export const getMeetingData = async (req, res) => {
  try {
    const { classname } = req.params;
    const link = await getMeetingByClass(classname);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

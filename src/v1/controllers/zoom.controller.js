import { CreateMeeting, getMeetingByClass, getMeetingBysubdomain } from "../services/zoom.service.js";

export const createMeetingLink = async (req, res) => {
  try {
    const { meetingData, classname, subdomain } = req.body;
    const link = await CreateMeeting(meetingData, classname, subdomain);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

export const getMeetingData = async (req, res) => {
  try {
    const { classname, subdomain } = req.params;
    const link = await getMeetingByClass(classname, subdomain);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

export const getMeetingDataBySubdomain = async (req, res) => {
  try {
    const { subdomain } = req.params;
    const link = await getMeetingBysubdomain(subdomain);
    res.json(link);
  } catch (e) {
    console.log(e);
  }
};

import { createAnnouncement, getAnnouncement } from "../services/announcement.service.js";

export const createAnnouncementPost = async (req, res) => {
  try {
    const { title, description, classname } = req.body;
    const announcement = await createAnnouncement(title, description, classname);
    res.json(announcement);
  } catch (e) {
    console.log(e);
  }
};

export const getAnnouncementByClass = async (req, res) => {
  try {
    const { classname } = req.params;
    const announcementByClass = await getAnnouncement(classname);
    res.json(announcementByClass);
  } catch (e) {
    console.log(e);
  }
};

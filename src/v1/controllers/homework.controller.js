import {
  getHomework,
  postHomework,
  updateUserDataInHomeWork,
} from "../services/homework.service.js";

export const homeworkUpload = async (req, res) => {
  try {
    const { title, duration, question, classname, subdomain } = req.body;
    const homework = await postHomework(
      title,
      duration,
      question,
      classname,
      subdomain
    );
    res.json(homework);
  } catch (e) {
    console.log(e);
  }
};

export const fetchHomeworkByClass = async (req, res) => {
  try {
    const { classname, subdomain } = req.params;
    const fetchHomework = await getHomework(classname, subdomain);
    res.json(fetchHomework);
  } catch (e) {
    console.log(e);
  }
};

export const updateHwStatus = async (req, res) => {
  try {
    const { status, hwId } = req.body;
    const updateHw = await updateUserDataInHomeWork(status, hwId);
    res.json(updateHw);
  } catch (e) {
    console.log(e);
  }
};

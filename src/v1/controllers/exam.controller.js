import { createExam, getExam } from "../services/exam.service.js";

export const createExamPost = async (req, res) => {
  try {
    const { title, question, duration, classname, subject } = req.body;
    const exam = await createExam(
      title,
      question,
      duration,
      classname,
      subject
    );
    res.json(exam);
  } catch (e) {
    console.log(e);
  }
};

export const getExamByClass = async (req, res) => {
  try {
    const { classname } = req.params;
    const examByClass = await getExam(classname);
    res.json(examByClass);
  } catch (e) {
    console.log(e);
  }
};

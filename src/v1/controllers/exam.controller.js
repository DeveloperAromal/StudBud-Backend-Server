import {
  createExam,
  getExam,
  insertStatus,
  getStatusByClassname,
  updateMark,
} from "../services/exam.service.js";

export const createExamPost = async (req, res) => {
  try {
    const { title, question, duration, classname, subject, subdomain } =
      req.body;
    const exam = await createExam(
      title,
      question,
      duration,
      classname,
      subject,
      subdomain
    );
    res.json(exam);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create exam." });
  }
};

export const getExamByClass = async (req, res) => {
  try {
    const { classname, subdomain } = req.params;
    const examByClass = await getExam(classname, subdomain);
    res.json(examByClass);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch exams." });
  }
};

export const insertNewStatus = async (req, res) => {
  try {
    const { examid, status } = req.body;
    const insertStatusToDb = await insertStatus(examid, status);
    res.json(insertStatusToDb);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to insert status." });
  }
};

export const getStatusWithNamesAndMarks = async (req, res) => {
  try {
    const { examId } = req.params;
    const result = await getStatusByClassname(examId);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch status by classname." });
  }
};

export const postMarkForStudent = async (req, res) => {
  try {
    const { examid, s_id, mark } = req.body;
    const updated = await updateMark(examid, s_id, mark);
    res.json({ success: true, data: updated });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to update mark." });
  }
};

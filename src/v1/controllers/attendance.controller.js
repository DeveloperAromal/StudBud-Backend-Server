import {
  getAbsentDaysByStudent,
  markStudent,
} from "../services/attendance.service.js";

export const markStudentsAbsentes = async (req, res) => {
  try {
    const { s_id, newDaysByMonth } = req.body;

    const absent = await markStudent(s_id, newDaysByMonth);
    res.json(absent);
  } catch (e) {
    console.log(e);
  }
};

export const getAbsentDays = async (req, res) => {
  try {
    const { s_id } = req.params;

    const absent = await getAbsentDaysByStudent(s_id);
    res.json(absent);
  } catch (e) {
    console.log(e);
  }
};

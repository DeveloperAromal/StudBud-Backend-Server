import { supabase } from "../config/SupabaseConfig.js";
import axios from "axios";

export async function createExam(
  title,
  question,
  duration,
  classname,
  subject
) {
  const { data, error } = await supabase
    .from("exams")
    .insert([{ title, question, duration, classname, subject }])
    .select();

  if (error) throw error;
  return data;
}

export async function getExam(classname) {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("classname", classname);

  if (error) throw error;
  return data;
}

export async function insertStatus(examId, status) {
  const { data: existingData, error: fetchError } = await supabase
    .from("exams")
    .select("status")
    .eq("examId", examId)
    .single();

  if (fetchError) throw fetchError;

  const existingStatus = existingData?.status || [];
  const updatedStatus = [...existingStatus, ...status];
  const { data, error } = await supabase
    .from("exams")
    .update({ status: updatedStatus })
    .eq("examId", examId)
    .select();

  if (error) throw error;

  return data;
}

export async function updateMark(examId, s_id, mark) {
  const { data: existing, error: fetchError } = await supabase
    .from("exams")
    .select("marks")
    .eq("examId", examId)
    .single();

  if (fetchError) throw fetchError;

  const currentMark = existing?.mark || {};
  currentMark[s_id] = mark;

  const { data, error } = await supabase
    .from("exams")
    .update({ marks: currentMark })
    .eq("examId", examId)
    .select();

  if (error) throw error;
  return data;
}

export async function getStatusByClassname(examId) {
  const { data: exams, error } = await supabase
    .from("exams")
    .select("status, marks, question")
    .eq("examId", examId);

  if (error) throw error;

  const results = [];

  for (const exam of exams) {
    const statusList = exam.status || [];
    const marks = exam.marks || {};
    const question = exam.question;

    for (const entry of statusList) {
      const s_id = Object.keys(entry)[0];
      const studentData = entry[s_id];

      results.push({
        s_id,
        question,
        answers: studentData.answers || {},
        tabSwitched: studentData.tabSwitched || false,
        marks: marks[s_id] || null,
      });
    }
  }

  return results;
}

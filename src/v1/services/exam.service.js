import { supabase } from "../config/SupabaseConfig.js";

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

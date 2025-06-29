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

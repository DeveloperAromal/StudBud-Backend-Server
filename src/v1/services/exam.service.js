import { supabase } from "../config/SupabaseConfig.js";

export async function createExam(
  title,
  question,
  duration,
  classname,
  subject,
  subdomain
) {
  const { data, error } = await supabase
    .from("exams")
    .insert([{ title, question, duration, classname, subject, subdomain }])
    .select();

  if (error) throw error;
  return data;
}

export async function getExam(classname, subdomain) {
  const { data, error } = await supabase
    .from("exams")
    .select("*")
    .eq("classname", classname)
    .eq("subdomain", subdomain);

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

  const currentMarks = Array.isArray(existing?.marks) ? existing.marks : [];

  const index = currentMarks.findIndex((entry) => entry.s_id === s_id);

  if (index !== -1) {
    currentMarks[index].mark = mark;
  } else {
    currentMarks.push({
      examid: examId,
      s_id,
      mark,
    });
  }

  // Update the marks column in Supabase
  const { data, error } = await supabase
    .from("exams")
    .update({ marks: currentMarks })
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

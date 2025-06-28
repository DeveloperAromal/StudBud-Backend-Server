import { supabase } from "../config/SupabaseConfig.js";

export async function postHomework(title, duration, question, classname) {
  const { data, error } = await supabase
    .from("homework")
    .insert([{ title, duration, question, classname }])
    .select();

  if (error) throw error;
  return data;
}

export async function getHomework(classname) {
  const { data, error } = await supabase
    .from("homework")
    .select("*")
    .eq("classname", classname);

  if (error) throw error;

  return data;
}
export async function updateUserDataInHomeWork(statusEntry, hwId) {
  const { data: existingData, error: fetchError } = await supabase
    .from("homework")
    .select("status")
    .eq("hwId", hwId)
    .single();

  if (fetchError) throw fetchError;

  const currentStatusArray = Array.isArray(existingData?.status)
    ? existingData.status
    : [];

  const updatedStatusArray = [...currentStatusArray, statusEntry];
  const { data, error } = await supabase
    .from("homework")
    .update({ status: updatedStatusArray })
    .eq("hwId", hwId)
    .select();

  if (error) throw error;
  return data;
}

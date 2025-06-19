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

import { supabase } from "../config/SupabaseConfig.js";

export async function createPost(title, description, classname) {
  const { data, error } = await supabase
    .from("fourm")
    .insert([{ title, description, classname }])
    .select();

  if (error) throw error;
  return data;
}

export async function getPost(classname) {
  const { data, error } = await supabase
    .from("fourm")
    .select("*")
    .eq("classname", classname);
  if (error) throw error;
  return data;
}

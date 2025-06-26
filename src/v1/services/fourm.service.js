import { supabase } from "../config/SupabaseConfig.js";

export async function createPost(title, description, classname) {
  const { data, error } = await supabase
    .from("discussion")
    .insert([{ title, description, classname }])
    .select();

  if (error) throw error;
  return data;
}

export async function getPost(classname) {
  const { data, error } = await supabase
    .from("discussion")
    .select("*")
    .eq("classname", classname);
  if (error) throw error;
  return data;
}

export async function getDissusionDataByDisId(disid) {
  const { data, error } = await supabase
    .from("discussion")
    .select("*")
    .eq("disid", disid);

  if (error) throw error;
  return data;
}

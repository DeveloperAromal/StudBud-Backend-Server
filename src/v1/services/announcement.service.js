import { supabase } from "../config/SupabaseConfig.js";

export async function createAnnouncement(title, description, classname) {
  const { data, error } = await supabase
    .from("announcement")
    .insert([{ title, description, classname }])
    .select();

  if (error) throw error;
  return data; 
}

export async function getAnnouncement(classname) {
  const { data, error } = await supabase
    .from("announcement")
    .select("*")
    .eq("classname", classname);
  if (error) throw error;
  return data;
}



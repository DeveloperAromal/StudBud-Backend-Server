import { supabase } from "../config/SupabaseConfig.js";

export async function createPost(title, description, classname, subdomain) {
  const { data, error } = await supabase
    .from("discussion")
    .insert([{ title, description, classname, subdomain }])
    .select();

  if (error) throw error;
  return data;
}

export async function getPost(classname, subdomain) {
  const { data, error } = await supabase
    .from("discussion")
    .select("*")
    .eq("classname", classname)
    .eq("subdomain", subdomain);
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

export async function insertCmt(disid, comment) {
  const { data: existingData, error: fetchError } = await supabase
    .from("discussion")
    .select("comment")
    .eq("disid", disid)
    .single();

  if (fetchError) throw fetchError;

  const existingComments = existingData?.comment || [];
  const updatedComments = [...existingComments, ...comment];
  const { data, error } = await supabase
    .from("discussion")
    .update({ comment: updatedComments })
    .eq("disid", disid)
    .select();

  if (error) throw error;

  return data;
}

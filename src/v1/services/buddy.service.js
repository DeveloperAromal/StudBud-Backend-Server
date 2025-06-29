import { supabase } from "../config/SupabaseConfig.js";

export async function reqBuddy(from_id, req_id) {
  const { data, error } = await supabase
    .from("studybuddy")
    .insert([{ from_id, req_id }]);

  if (error) throw error;
  return data;
}

export async function acceptBuddy(from_id, req_id) {
  const { data, error } = await supabase
    .from("studybuddy")
    .update({ status: "accepted" })
    .match({ from_id, req_id });

  if (error) throw error;
  return data;
}

export async function rejectBuddy(from_id, req_id) {
  const { data, error } = await supabase
    .from("studybuddy")
    .update({ status: "rejected" })
    .match({ from_id, req_id });

  if (error) throw error;
  return data;
}

export async function getStatusData(s_id) {
  const { data, error } = await supabase
    .from("studybuddy")
    .select("*")
    .eq("from_id", s_id);
  if (error) throw error;
  return data;
}

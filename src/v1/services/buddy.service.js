import { supabase } from "../config/SupabaseConfig.js";
import { personalAiAgent, studyBuddyAi } from "../utils/ai.js";

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

export async function getStatusDataFrom(s_id) {
  const { data, error } = await supabase
    .from("studybuddy")
    .select("*")
    .eq("from_id", s_id);
  if (error) throw error;
  return data;
}

export async function getStatusDataReq(s_id) {
  const { data, error } = await supabase
    .from("studybuddy")
    .select("*")
    .eq("req_id", s_id);
  if (error) throw error;
  return data;
}

export async function buudyAi(question) {
  if (!question || question.trim() === "") {
    return "Please enter a valid question.";
  }

  try {
    const response = await studyBuddyAi(question);
    return response;
  } catch (err) {
    console.error("Error in buudyAi:", err.message);
    return "Oops! Something went wrong while answering your question.";
  }
}

export async function personalAi(question) {
  if (!question || question.trim() === "") {
    return "Please enter a valid question.";
  }

  try {
    const response = await personalAiAgent(question);
    return response;
  } catch (err) {
    console.error("Error in buudyAi:", err.message);
    return "Oops! Something went wrong while answering your question.";
  }
}

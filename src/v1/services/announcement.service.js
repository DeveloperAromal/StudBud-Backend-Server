import { supabase } from "../config/SupabaseConfig.js";

export async function createAnnouncement(
  title,
  description,
  classname,
  subdomain
) {
  const { data, error } = await supabase
    .from("announcement")
    .insert([{ title, description, classname, subdomain }])
    .select();

  if (error) throw error;
  return data;
}

export async function getAnnouncement(classname, subdomain) {
  const { data, error } = await supabase
    .from("announcement")
    .select("*")
    .eq("classname", classname)
    .eq("subdomain", subdomain);
  if (error) throw error;
  return data;
}
export async function getAnnouncementBySubDomain(subdomain) {
  const { data, error } = await supabase
    .from("announcement")
    .select("*")
    .eq("subdomain", subdomain);
  if (error) throw error;
  return data;
}

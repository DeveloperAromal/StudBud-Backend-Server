import { supabase } from "../config/SupabaseConfig.js";

export async function getDomain() {
  const { data, error } = await supabase.from("subdomains").select("*");
  if (error) throw error;
  return data;
}

export async function getSubdomainData(subdomain) {
  const { data, error } = await supabase
    .from("subdomains")
    .select("*")
    .eq("subdomain", subdomain);
  if (error) throw error;
  return data;
}

export async function createSubdomain(
  subdomain,
  email,
  phonenumber,
  owner,
  designation,
  capacity
) {
  const { data, error } = await supabase
    .from("subdomains")
    .insert([
      {
        subdomain,
        owner,
        email,
        phonenumber,
        designation,
        capacity,
      },
    ])
    .select();

  if (error) throw error;
  return data;
}

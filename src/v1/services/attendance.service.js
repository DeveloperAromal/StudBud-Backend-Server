import { supabase } from "../config/SupabaseConfig.js";

export async function markStudent(s_id, newDaysByMonth, subdomain) {
  if (typeof newDaysByMonth !== "object" || Array.isArray(newDaysByMonth)) {
    console.error(
      "newDaysByMonth must be an object like { '2025-06': [1, 2, 3] }"
    );
    return null;
  }

  try {
    console.log("Fetching record for s_id:", s_id);
    const { data: record, error: fetchError } = await supabase
      .from("absentees")
      .select("absData")
      .eq("s_id", s_id)
      .maybeSingle();

    if (fetchError) {
      console.error(
        "Fetch error details:",
        fetchError.message,
        fetchError.details,
        fetchError.hint
      );
      return null;
    }

    if (!record) {
      console.log("No record found, inserting new record");
      const { data, error: insertError } = await supabase
        .from("absentees")
        .insert([{ s_id, absData: newDaysByMonth, subdomain }])
        .select();

      if (insertError) {
        console.error(
          "Insert error details:",
          insertError.message,
          insertError.details,
          insertError.hint
        );
        return null;
      }
      console.log("Inserted new record:", data);
      return data;
    }

    console.log("Record found, merging data");
    const existingData = record.absData || {};
    for (const [month, days] of Object.entries(newDaysByMonth)) {
      const existingDays = existingData[month] || [];
      const combinedDays = Array.from(new Set([...existingDays, ...days]));
      existingData[month] = combinedDays;
    }

    console.log("Updating with merged data:", existingData);
    const { data, error: updateError } = await supabase
      .from("absentees")
      .update({ absData: existingData })
      .eq("s_id", s_id)
      .select();

    if (updateError) {
      console.error(
        "Update error details:",
        updateError.message,
        updateError.details,
        updateError.hint
      );
      return null;
    }
    console.log("Updated record:", data);
    return data;
  } catch (error) {
    console.error("Unexpected error details:", error.message, error.stack);
    return null;
  }
}

export async function getAbsentDaysByStudent(s_id) {
  const { data, error } = await supabase
    .from("absentees")
    .select("absData")
    .eq("s_id", s_id)
    .single();

  if (error) {
    console.error("Error fetching absent days:", error);
    return null;
  }

  return data || {};
}

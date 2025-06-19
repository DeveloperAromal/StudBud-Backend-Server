import axios from "axios";
import { supabase } from "../config/SupabaseConfig.js";
import { generateJwtToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const apiBaseUrl = process.env.API_BASE_URL;
const port = process.env.PORT;

export async function signUp(name, email, password, classname) {
  const { data, error } = await supabase
    .from("s_auth")
    .insert(name, email, password, classname)
    .select();
  if (error) throw error;
  return data;
}

export const signIn = async ({ email, password }) => {
  const { data: studentData, error: studentError } = await supabase
    .from("s_auth")
    .select("*")
    .eq("email", email)
    .single();

  if (studentError) {
    console.log(studentError);
  }

  const isValid = await bcrypt.compare(password, studentData.password);

  if (!isValid) {
    console.log("password mismatch");
    return null;
  }

  if (studentData && !studentError) {
    const token = generateJwtToken({
      id: studentData.id,
      s_id: studentData.s_id,
    });
    return token;
  }
};

export const validate = async (s_id) => {
  const { data: studentData, error: studentError } = await supabase
    .from("s_auth")
    .select("s_id")
    .eq("s_id", s_id)
    .single();
  if (studentData && !studentError) {
    const s_id = studentData.s_id;

    const apiRespose = await axios.get(
      `${apiBaseUrl}:${port}/api/v1/userById/${s_id}`
    );
    return {
      message: "Authenticated",
      user: s_id,
      response: apiRespose.data,
    };
  }
};

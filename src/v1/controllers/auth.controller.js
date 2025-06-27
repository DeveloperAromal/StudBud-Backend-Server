import { signUp, signUpTeachers } from "../services/auth.service.js";
import { signIn } from "../services/auth.service.js";
import { validate } from "../services/auth.service.js";
import bcrypt from "bcrypt";

export const signUpUser = async (req, res) => {
  try {
    const { name, password, email, classname } = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    const createUser = await signUp({
      name,
      password: hashPass,
      email,
      classname,
    });

    res.json(createUser);
  } catch (e) {
    console.log(e);
  }
};

export const signUpTeacher = async (req, res) => {
  try {
    const { name, password, phonenumber } = req.body;

    const hashPass = await bcrypt.hash(password, 10);

    const createTeacher = await signUpTeachers({
      name,
      password: hashPass,
      phonenumber,
    });

    res.json(createTeacher);
  } catch (e) {
    console.log(e);
  }
};

export const signInUser = async (req, res) => {
  try {
    const token = await signIn(req.body);

    if (!token) res.status(401).json({ error: "Authentication failed" });
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server Error" });
  }
};

export const signInTeachers = async (req, res) => {
  try {
    const token = await signInTeacher(req.body);

    if (!token) res.status(401).json({ error: "Authentication failed" });
    res.json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Server Error" });
  }
};

export const validateUser = async (req, res) => {
  try {
    const s_id = req.user.s_id;

    const user = await validate(s_id);

    res.json({ authenticated: "True", user });
  } catch (e) {
    console.log(e);
  }
};

export const validateTeacher = async (req, res) => {
  try {
    const t_id = req.user.s_id;

    const user = await validate(t_id);

    res.json({ authenticated: "True", user });
  } catch (e) {
    console.log(e);
  }
};

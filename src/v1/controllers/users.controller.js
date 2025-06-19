import { getUserById } from "../services/users.service.js";

export const fetchUser = async (req, res) => {
  try {
    const { s_id } = req.params;
    const user = await getUserById(s_id);

    res.json(user);
  } catch (e) {
    console.log(e);
  }
};

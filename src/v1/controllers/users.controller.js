import { getUsersById } from "../services/users.service.js";

export const fetchUsers = async (req, res) => {
  try {
    const { s_id } = req.params;
    const user = await getUsersById(s_id);

    res.json(user);
  } catch (e) {
    console.log(e);
  }
};

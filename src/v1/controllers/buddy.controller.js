import {
  acceptBuddy,
  rejectBuddy,
  reqBuddy,
} from "../services/buddy.service.js";

export const reqForBuddy = async (req, res) => {
  try {
    const { from_id, req_id } = req.body;
    const resBud = await reqBuddy(from_id, req_id);
    res.json(resBud);
  } catch (e) {
    console.log(e);
  }
};

export const acceptBud = async (req, res) => {
  try {
    const { from_id, req_id } = req.body;
    const resBud = await acceptBuddy(from_id, req_id);
    res.json(resBud);
  } catch (e) {
    console.log(e);
  }
};

export const rejectBud = async (req, res) => {
  try {
    const { from_id, req_id } = req.body;
    const resBud = await rejectBuddy(from_id, req_id);
    res.json(resBud);
  } catch (e) {
    console.log(e);
  }
};

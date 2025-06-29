import {
  acceptBuddy,
  buudyAi,
  getStatusDataFrom,
  getStatusDataReq,
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

export const getStatusByIdFrom = async (req, res) => {
  try {
    const { s_id } = req.params;
    const statusData = await getStatusDataFrom(s_id);
    res.json(statusData);
  } catch (e) {
    console.log(e);
  }
};

export const getStatusByIdReq = async (req, res) => {
  try {
    const { s_id } = req.params;
    const statusData = await getStatusDataReq(s_id);
    res.json(statusData);
  } catch (e) {
    console.log(e);
  }
};

export const buddyQuestions = async (req, res) => {
  try {
    const { question } = req.params;
    const answer = await buudyAi(question);
    res.json({ answer });
  } catch (e) {
    console.error("Buddy AI error:", e);
    res.status(500).json({ error: "Failed to get response from Buddy AI." });
  }
};

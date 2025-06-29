import { Leaderboard } from "../services/leaderboard.service.js";

export const getLeaderboardData = async (req, res) => {
  try {
    const { classname } = req.params;
    const leaderboardData = await Leaderboard(classname);
    console.log(`this is the response befor json====> ${leaderboardData}`);
    res.json(leaderboardData);
  } catch (e) {
    console.log(e);
  }
};

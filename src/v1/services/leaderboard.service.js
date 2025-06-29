import { LeaderboardFilter } from "../utils/leaderboardFilter.js";

export async function Leaderboard(classname) {
  const filteredData = await LeaderboardFilter(classname);
  console.log(`filtered===>  ${filteredData}`);
  const data = filteredData;
  return data;
}

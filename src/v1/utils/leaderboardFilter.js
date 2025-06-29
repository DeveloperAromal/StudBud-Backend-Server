import axios from "axios";
const app_base_url = "http://localhost:8080/api/v1";

export async function LeaderboardFilter(classname) {
  try {
    const userActivity = {};

    const disRes = await axios.get(
      `${app_base_url}/get/fourm/post/${classname}`
    );
    const post = disRes.data;

    const hwRes = await axios.get(`${app_base_url}/get/homework/${classname}`);
    const homework = hwRes.data;

    if (Array.isArray(post)) {
      post.forEach((postItem) => {
        if (Array.isArray(postItem.comment)) {
          postItem.comment.forEach((c) => {
            const userId = c.userId;
            if (!userActivity[userId]) userActivity[userId] = 0;
            userActivity[userId]++;
          });
        }
        if (Array.isArray(postItem.reply)) {
          postItem.reply.forEach((r) => {
            const userId = r.userId;
            if (!userActivity[userId]) userActivity[userId] = 0;
            userActivity[userId]++;
          });
        }
      });
    }

    if (Array.isArray(homework)) {
      homework.forEach((hw) => {
        if (Array.isArray(hw.status)) {
          hw.status.forEach((statusRecord) => {
            const userId = statusRecord.s_id;
            if (!userActivity[userId]) userActivity[userId] = 0;
            userActivity[userId]++;
          });
        }
      });
    }

    const leaderboardArray = Object.entries(userActivity).map(
      ([userId, count]) => ({
        userId,
        count,
      })
    );

    leaderboardArray.sort((a, b) => b.count - a.count);

    let rank = 1;
    let prevCount = null;
    let skip = 0;

    leaderboardArray.forEach((entry) => {
      if (entry.count === prevCount) {
        entry.rank = rank;
        skip++;
      } else {
        rank = rank + skip;
        skip = 1;
        entry.rank = rank;
        prevCount = entry.count;
      }
    });

    // Return full sorted leaderboard with ranks
    return leaderboardArray;
  } catch (e) {
    console.error("Error in LeaderboardFilter:", e);
    return [];
  }
}

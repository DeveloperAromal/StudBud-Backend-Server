import axios from "axios";
const app_base_url = "http://localhost:8080/api/v1";

export async function LeaderboardFilter(classname) {
  try {
    const disRes = await axios.get(
      `${app_base_url}/get/fourm/post/${classname}`
    );
    const post = disRes.data;

    const hwRes = await axios.get(`${app_base_url}/get/homework/${classname}`);
    const homework = hwRes.data;

    const userActivity = {};

    post.forEach((post) => {
      console.log("loop started for post");
      post.comment.forEach((c) => {
        const userId = c.userId;
        console.log(`loop started for comment ${userId}`);
        if (!userActivity[userId]) {
          userActivity[userId] = 0;
        }
        userActivity[userId]++;
      });

      post.reply.forEach((r) => {
        const userId = r.userId;
        if (!userActivity[userId]) {
          userActivity[userId] = 0;
        }
        userActivity[userId]++;
      });
    });

    homework.forEach((hw) => {
      hw.status.forEach((statusRecord) => {
        const userId = statusRecord.s_id;
        if (!userActivity[userId]) {
          userActivity[userId] = 0;
        }
        userActivity[userId]++;
      });
    });
    console.log(userActivity);

    return userActivity;
  } catch (e) {
    console.log(e);
  }
}

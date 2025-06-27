import {
  createPost,
  getDissusionDataByDisId,
  getPost,
  insertCmt,
} from "../services/fourm.service.js";

export const createFourmPost = async (req, res) => {
  try {
    const { title, description, classname } = req.body;
    const post = await createPost(title, description, classname);
    res.json(post);
  } catch (e) {
    console.log(e);
  }
};

export const getPostByClass = async (req, res) => {
  try {
    const { classname } = req.params;
    const postByClass = await getPost(classname);
    res.json(postByClass);
  } catch (e) {
    console.log(e);
  }
};

export const getDissusionData = async (req, res) => {
  try {
    const { disid } = req.params;
    const getData = await getDissusionDataByDisId(disid);
    res.json(getData);
  } catch (e) {
    console.log(e);
  }
};

export const InsertNewComment = async (req, res) => {
  try {
    const { disid, comment } = req.body;
    const inserCmtToDb = await insertCmt(disid, comment);
    res.json(inserCmtToDb);
  } catch (e) {
    console.log(e);
  }
};

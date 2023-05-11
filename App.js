const express = require("express");
const connection = require("./server");
const postModel = require("./postModel.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.json(posts);
  } catch (e) {
    console.log(e);
  }
});

app.get("/", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.json(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    await post.remove();
    res.json("deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(id, { title, content });
    res.json(post);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = await postModel.create({
      title,
      content,
    });
    res.json(newPost);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
import express from "express";
import { magic } from "./utils";

const app = express();

app.get("/nft/:id", (req, res) => {
  const id = req.params.id;
  magic(id).then((buffer) => {
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  });
});

app.listen(3456, () => {
  console.log("Server started on port 3456");
});

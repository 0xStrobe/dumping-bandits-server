import fs from "fs";
import { addTextToImage, parseTokenInfo } from "./utils";

const main = async () => {
  // const inputBuffer = fs.readFileSync("./images/uponly.png");

  // const outputBuffer = await addTextToImage("1", "1", inputBuffer);
  // fs.writeFileSync("output.png", outputBuffer);
  parseTokenInfo("5");
};

main();

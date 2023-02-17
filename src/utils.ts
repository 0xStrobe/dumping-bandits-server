import { createCanvas, loadImage, registerFont } from "canvas";
registerFont("./fonts/MS-Sans-Serif-Bold.ttf", { family: "MS Sans Serif Bold" });

import { ethers } from "ethers";
import { abi } from "./DumpingBandits.json";

const padTo6Digits = (num: string) => {
  return num.padStart(6, "0");
};

const padTo4Digits = (num: string) => {
  return num.padStart(4, "0");
};

export async function addTextToImage(roundId: string, tokenId: string, file: string | Buffer): Promise<Buffer> {
  const image = await loadImage(file);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);
  ctx.font = "30px 'MS Sans Serif Bold'";
  ctx.fillStyle = "black";
  ctx.strokeStyle = "rgba(0, 255, 0, 0.8)";
  ctx.lineWidth = 5;
  ctx.strokeText("#" + padTo4Digits(roundId) + "-" + padTo6Digits(tokenId), 25, 50);
  ctx.fillText("#" + padTo4Digits(roundId) + "-" + padTo6Digits(tokenId), 25, 50);

  return canvas.toBuffer("image/png");
}

type ImageFile = "./images/uponly.png" | "./images/wojak.png" | "./images/sis.png" | "./images/nani.png" | "./images/brent.png";

type TokenInfo = { roundId: string; tokenId: string; file: ImageFile };
export async function parseTokenInfo(tokenId: string): Promise<TokenInfo> {
  const contractAddress = "0x2c146750FD8462492b6A8448Bbe80cBe0499a8b5";
  const provider = new ethers.providers.JsonRpcProvider("https://api.avax-test.network/ext/bc/C/rpc");
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const roundId = ((await contract.tokenIdRound(tokenId)) as ethers.BigNumber).toString();
  const prizeRank = (await contract.prizeRank(tokenId)).toString();

  let file: ImageFile;
  switch (prizeRank) {
    case "1":
      file = "./images/sis.png";
      break;
    case "2":
      file = "./images/nani.png";
      break;
    case "3":
      file = "./images/brent.png";
      break;
    case "0":
      file = "./images/wojak.png";
      break;
    default:
      file = "./images/uponly.png";
      break;
  }
  return { roundId, tokenId, file };
}

export async function magic(tokenId: string): Promise<Buffer> {
  const { roundId, file } = await parseTokenInfo(tokenId);
  return await addTextToImage(roundId, tokenId, file);
}

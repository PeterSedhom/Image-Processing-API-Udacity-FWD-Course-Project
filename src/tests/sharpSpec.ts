import path from "path";
import fs from "fs";
import resizeImg from "../utils/sharp";

describe("sharp spec", () => {
  it("resizes an image and saves it to thumbnails folder", async () => {
    const imgPath = path.join(__dirname, `../../images/moon.jpg`);
    const thumbnailPath = path.join(
      __dirname,
      `../../thumbnails/moon-250x250.jpg`
    );
    await resizeImg(imgPath, 250, 250, thumbnailPath);
    fs.accessSync(thumbnailPath);
  });
});

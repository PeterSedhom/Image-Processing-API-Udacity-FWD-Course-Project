import express from "express";
import fs from "fs";
import path from "path";
import resizeImg from "../utils/sharp";

const router = express.Router();

interface reqParams {
  fileName?: string;
  width?: string;
  height?: string;
}

router.get(
  "/api/images",
  async (
    req: express.Request<unknown, unknown, unknown, reqParams>,
    res: express.Response
  ) => {
    const fileName = req.query.fileName;
    if (!fileName) return res.status(400).send("Please enter a filename");
    const width = req.query.width;
    const height = req.query.height;
    const imgPath = path.join(__dirname, `../../images/${fileName}.jpg`);
    try {
      if (!fs.existsSync(imgPath)) {
        return res.status(400).send("File name entered is not supported by us");
      }
      if (!width && !height) {
        res.sendFile(imgPath);
      } else if ((!width && height) || (width && !height)) {
        res
          .status(400)
          .send("Please enter both width and height dimensions to resize");
      } else {
        const w: number = parseFloat(width as string);
        const h: number = parseFloat(height as string);
        const thumbnailPath = path.join(
          __dirname,
          `../../thumbnails/${fileName}-${w}x${h}.jpg`
        );
        try {
          fs.accessSync(thumbnailPath, fs.constants.R_OK);
          console.log("cached");
        } catch (err) {
          await resizeImg(imgPath, w, h, thumbnailPath);
          console.log("not cached");
        }
        res.sendFile(thumbnailPath);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;

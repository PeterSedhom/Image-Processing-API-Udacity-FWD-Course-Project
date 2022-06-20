import sharp from "sharp";

const resizeImg = async (
  imgPath: string,
  w: number,
  h: number,
  thumbnailPath: string
) => {
  return await sharp(imgPath).resize(w, h).toFile(thumbnailPath);
};

export default resizeImg;

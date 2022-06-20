import app from "../app";
import request from "supertest";
import path from "path";
import resizeImg from "../utils/sharp";

describe("image spec", () => {
  it("return image if exists", async () => {
    const res = await request(app).get("/api/images?fileName=moon");
    expect(res.status).toBe(200);
  });

  it("return an error message when filename not provided", async () => {
    const res = await request(app).get("/api/images");
    expect(res.status).toBe(400);
    expect(res.text).toBe("Please enter a filename");
  });

  it("return an error message when filename doesnt exist", async () => {
    const res = await request(app).get("/api/images?fileName=randomimg");
    expect(res.status).toBe(400);
    expect(res.text).toBe("File name entered is not supported by us");
  });

  it("return an error message if one of my dimensions is missing", async () => {
    const res = await request(app).get("/api/images?fileName=moon&width=250");
    expect(res.status).toBe(400);
    expect(res.text).toBe(
      "Please enter both width and height dimensions to resize"
    );
  });

  it("return image from cache if cached", async () => {
    const imgPath = path.join(__dirname, `../../images/wave.jpg`);
    const thumbnailPath = path.join(
      __dirname,
      `../../thumbnails/wave-250x250.jpg`
    );
    await resizeImg(imgPath, 250, 250, thumbnailPath);
    spyOn(console, "log");
    const res = await request(app).get(
      "/api/images?fileName=wave&width=250&height=250"
    );
    expect(res.status).toBe(200);
    expect(console.log).toHaveBeenCalledWith("cached");
  });
});

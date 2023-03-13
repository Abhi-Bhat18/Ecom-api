import mongodb from "mongodb";
import { client } from "../config/db.js";
import fs from "fs";
import Product from "../models/productSchema.js";

export const uploadProduct = async (req, res) => {
  try {
    console.log(req.file);
    const title = req.body.title;
    const price = parseInt(req.body.price);
    const category = req.body.category;
    const description = req.body.description;

    const conn = await client.connect();
    const db = conn.db("product_img");
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "images",
    });

    //uploading the images to
    const readStream = fs
      .createReadStream(req.file.path)
      .pipe(bucket.openUploadStream(req.file.filename));
    readStream.on("error", (err) => {
      throw err;
    });
    readStream.on("finish", async () => {
      console.log("finished");
      conn.close();
      const product = await Product.create({
        title,
        price,
        category,
        description,
        image: `http://127.0.0.1:3000/api/products/img/${req.file.filename}`,
      });
      if (product) {
        res
          .status(201)
          .json({ message: "Song added successfully", status: "success" });
      } else {
        res.status(400);
        throw new Error("Invalid song data");
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).limit(20);
    if (products) res.json(products);
    else throw new Error("Bad request");
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

export const getImg = async (req, res) => {
  try {
    const filename = req.params.filename;

    const conn = await client.connect();
    const db = conn.db("product_img");
    const bucket = new mongodb.GridFSBucket(db, {
      bucketName: "images",
    });

    const downloadStream = bucket
      .openDownloadStreamByName(filename)
      .pipe(res)
      .on("error", (err) => {
        throw err;
      })
      .on("end", () => res.end());
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message });
  }
};

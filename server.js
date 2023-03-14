import express from "express";
import cors from "cors";
import {conn} from "./config/db.js";
import proudctRoute from './routes/productRoute.js'
import orderRoute from './routes/orderRoutes.js'
const app = express();

conn()
  .then(() => {
    console.log("MongoDB instance connected successfully");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//importing all the routes
app.use('/api/products',proudctRoute)
app.use('/api/order',orderRoute)

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(1337, () => {
  console.log("Server listening at http://127.0.0.1:1337");
});

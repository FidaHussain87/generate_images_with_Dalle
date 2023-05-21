import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connectDB.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//Dynamic routes///
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

///routes
app.get("/", async (req, res) => {
  res.send("Hello World");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
  });
};

startServer();

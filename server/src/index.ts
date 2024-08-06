import express from "express";
import cors from "cors";
import { studentRouter } from "./routes/studentsRoutes";
import bodyParser from "body-parser";

require("dotenv").config();
const Port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/students", studentRouter);

app.listen(Port, async () => {
  try {
    console.log(`listening on http://localhost:${Port}/`);
  } catch (error) {
    console.log("app.listen  error:", error);

    console.log(`error while listening on ${Port}`);
  }
});

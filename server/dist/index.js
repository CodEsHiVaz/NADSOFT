"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const studentsRoutes_1 = require("./routes/studentsRoutes");
const body_parser_1 = __importDefault(require("body-parser"));
require("dotenv").config();
const Port = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/students", studentsRoutes_1.studentRouter);
app.listen(Port, async () => {
    try {
        console.log(`listening on http://localhost:${Port}/`);
    }
    catch (error) {
        console.log("app.listen  error:", error);
        console.log(`error while listening on ${Port}`);
    }
});

import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import Knex from "knex";
// -----------------------------------------------------------------------------------------------

const app = express();
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const PORT = 8080;

// --------------------- controller and service------------------------------

import { ItemService } from "./services/itemService";
import { ItemController } from "./controllers/itemController";
import { LogisticController } from "./controllers/logisticsController";
import { LogisticService } from "./services/logisticsService2";
import AuthController from "./controllers/authController";
import { AuthService } from "./services/authService";
import { isLoggedIn, is_admin } from "./middelware";

const itemService = new ItemService(knex);
const itemController = new ItemController(itemService);
const authService = new AuthService(knex);
const authController = new AuthController(authService);
const logisticService = new LogisticService(knex);
const logisticController = new LogisticController(logisticService);

// -----------------------------------------------------------------------------------------------

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", authController.router); // route to authController
app.use("/donate", itemController.router);

// -----------------------------------------------------------------------------------------------

app.get("/hi", (req, res) => {
  res.send("hi");
});

app.post("/login", authController.router);
app.get("/register", authController.router);
// app.get('/admin_route', isLoggedIn, is_admin, (req, res) => {
//   if (req.session && req.session.email) {
//     res.send(`Welcome ${req.session.email}, you are an admin`);
//   } else {
//     res.status(401).json({ message: "Access denied. You are not logged in." });
//   }
// });

// ----------------------這是分隔線----------------------------
app.use("/donate", itemController.router);
app.use("/", logisticController.router);

//-----------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});

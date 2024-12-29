import e from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import bdd from "./bdd/bdd.js";

// Middlewares
import { accesibiliteBDD } from "./middlewares/accessibliteBdd.js";
import { verificationCookie } from "./middlewares/verificationCookie.js";

// Routes
import routeurGenerale from "./routers/generale.js";
import routeurAuthenfication from "./routers/routeurAuthentification.js";

const port = 8100;
const app = e();

dotenv.config();

app.use(
    cors({
        origin: "http://localhost:5173",
        options: "GET,POST,PATCH,PUT,DELETE",
        allowedHeaders: "Content-type,Autorization",
        credentials: true,
    })
);

app.use(e.json());
app.use(cookieParser());
app.use(accesibiliteBDD(bdd));
app.use(verificationCookie);

app.set("view-engine", "ejs");
app.use("/generale", routeurGenerale);
app.use("/authentification", routeurAuthenfication);

// app.use("/", (req, res) => {
//     res.redirect("http://localhost:5173");
// });

app.listen(port, () => console.log("Serveur démarré => port " + port));

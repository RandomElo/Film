import e from "express";
import { pseudoDisponible, inscription, connexion, recuperationCookieAuth } from "../controleurs/controleursAuthentification.js";
const routeurAuthenfication = e.Router();
routeurAuthenfication.post("/inscription", inscription);
routeurAuthenfication.post("/connexion", connexion);
routeurAuthenfication.get("/pseudo-disponible/:nom", pseudoDisponible);
routeurAuthenfication.get("/cookie-auth", recuperationCookieAuth);
export default routeurAuthenfication;

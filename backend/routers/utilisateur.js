import e from "express";
import { pseudoDisponible, inscription, connexion, recuperationCookieAuth } from "../controleurs/utilisateur.js";
const routeurUtilisateur = e.Router();
routeurUtilisateur.post("/inscription", inscription);
routeurUtilisateur.post("/connexion", connexion);
routeurUtilisateur.get("/pseudo-disponible/:nom", pseudoDisponible);
routeurUtilisateur.get("/cookie-auth", recuperationCookieAuth);
export default routeurUtilisateur;

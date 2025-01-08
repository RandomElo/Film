import e from "express";
import { mesListes, ajouterListe } from "../controleurs/listes.js";
const routeurListe = e.Router();
routeurListe.get("/mes-listes", mesListes);
routeurListe.post("/ajouter-liste", ajouterListe);

export default routeurListe;

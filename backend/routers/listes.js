import e from "express";
import { mesListes, ajouterFilm } from "../controleurs/listes.js";
const routeurListe = e.Router();
routeurListe.get("/mes-listes", mesListes);
routeurListe.post("/ajouter-film", ajouterFilm);

export default routeurListe;

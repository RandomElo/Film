import e from "express";
import { creerListe, mesListes, ajouterFilm } from "../controleurs/listes.js";
const routeurListe = e.Router();

routeurListe.post("/creer-liste", creerListe);
routeurListe.get("/mes-listes", mesListes);
routeurListe.post("/ajouter-film", ajouterFilm);

export default routeurListe;

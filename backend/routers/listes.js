import e from "express";
import { creerListe, mesListes, nomListes, ajouterFilm } from "../controleurs/listes.js";
const routeurListe = e.Router();

routeurListe.post("/creer-liste", creerListe);
routeurListe.get("/mes-listes", mesListes);
routeurListe.get("/nom-listes", nomListes);
routeurListe.post("/ajouter-film", ajouterFilm);

export default routeurListe;

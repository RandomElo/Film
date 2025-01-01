import e from "express";
import { rechercheFilm, detailFilm } from "../controleurs/film.js";
const routeurFilm = e.Router();

// Je lui fourni une chaine de caractère et il recherche les films
routeurFilm.get("/recherche/:recherche", rechercheFilm);
routeurFilm.get("/detail/:support/:idFilm", detailFilm);

export default routeurFilm;

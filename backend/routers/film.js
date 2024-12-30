import e from "express";
import { rechercheFilm } from "../controleurs/film.js";
const routeurFilm = e.Router();

routeurFilm.get("/recherche/:nomFilm", rechercheFilm);

export default routeurFilm;

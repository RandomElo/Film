import e from "express";
import { recherche, detailFilm, detailSociete } from "../controleurs/tmdb.js";
const routeurTmdb = e.Router();

// Je lui fourni une chaine de caractère et il recherche les films
routeurTmdb.get("/recherche/:recherche", recherche);
routeurTmdb.get("/detail-film/:support/:idFilm", detailFilm);
routeurTmdb.get("/detail-societe/:type/:id", detailSociete);

export default routeurTmdb;
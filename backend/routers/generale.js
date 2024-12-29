import e from "express";
import { initialisationSession } from "../controleurs/generale.js";
const routeurGenerale = e.Router();

routeurGenerale.get("/initialisation-session", initialisationSession);

export default routeurGenerale;
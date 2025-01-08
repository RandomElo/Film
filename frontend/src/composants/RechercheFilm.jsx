import { useEffect, useState } from "react";
import Fetch from "../fonctions/Fetch";
import Date from "../fonctions/Date";
import pasAffiche from "../images/PasAffiche.png";
import "../styles/RechercheFilm.css";
import { Link } from "react-router-dom";
import { AfficherListeElement } from "./AfficherListeElement";

export function RechercheFilm() {
    const [nomFilm, setNomFilm] = useState(""); // Permet de contenir le nom du film
    const [valeurDivResultat, setValeurDivResultat] = useState("");
    const [typeElement, setTypeElement] = useState("tousTypes");
    useEffect(() => {
        if (nomFilm != "") {
            const requete = async () => {
                const { reponse, detail } = await Fetch(`http://localhost:8100/tmdb/recherche/${encodeURI(nomFilm)}`, "GET");
                if (reponse) {
                    const elementFiltrer = detail.results
                        .filter((element) => {
                            console.log(element.media_type);
                            if (typeElement == "film") return element.media_type == "movie";

                            if (typeElement == "serie") return element.media_type == "tv";

                            return true;
                        })
                        .slice(0, 10);

                    console.log(elementFiltrer);
                    if (detail.results.length > 0) {
                        detail.results = elementFiltrer;
                        setValeurDivResultat(<AfficherListeElement type="recherche" element={detail} id={encodeURI(nomFilm)} />);
                    } else {
                        setValeurDivResultat(<p id="pAucunFilm">Aucun film trouvé</p>);
                    }
                } else {
                    setValeurDivResultat(<p id="erreur">{detail}</p>);
                }
            };
            requete();
        } else {
            setValeurDivResultat("");
        }
    }, [nomFilm, typeElement]);
    return (
        <div className="RechercheFilm">
            <div id="divFiltre">
                <div id="divSelectType">
                    <label htmlFor="selectType">Type : </label>
                    <select id="selectType" onChange={(e) => setTypeElement(e.target.selectedOptions[0].value)}>
                        <option value="tousTypes">Tous types</option>
                        <option value="film">Film</option>
                        <option value="serie">Séries</option>
                    </select>
                </div>
                {/* Le type, adulte */}
            </div>
            <div id="divInput">
                <input type="text" id="inputRechercherFilm" placeholder="Rechercher un film" value={nomFilm} onChange={(e) => setNomFilm(e.target.value)} />
            </div>
            <div id="divListeFilm">{valeurDivResultat}</div>
        </div>
    );
}

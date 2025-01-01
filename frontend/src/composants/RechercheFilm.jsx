import { useEffect, useRef, useState } from "react";
import Fetch from "../fonctions/Fetch";
import Date from "../fonctions/Date";
import pasAffiche from "../images/PasAffiche.png";
import "../styles/RechercheFilm.css";
import { NavLink } from "react-router-dom";

export function RechercheFilm() {
    function AffichageResultat(listeResultat) {
        setValeurDivResultat(
            listeResultat.map((film, index) => {
                return (
                    <div key={index} className="divPresentationFilm">
                        {film.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + film.poster_path} alt={"Poster du film " + film.name} className="posterFilm" /> : <img src={pasAffiche} alt="Image utiliser quand il y a pas d'affiche dans la base de données" className="pasAffiche" />}

                        <div className="divDetailFilm">
                            <p>
                                <span className="gras">Titre : </span>
                                {film.title || film.name}
                            </p>

                            <p>
                                <span className="gras">Type : </span>
                                {film.media_type == "tv" ? "Série" : "Film"}
                            </p>

                            {(film.release_date || film.first_air_date) && (
                                <p>
                                    <span className="gras">Date de sortie : </span>
                                    {film.release_date ? Date(film.release_date) : Date(film.first_air_date)}
                                </p>
                            )}

                            <NavLink to={`/${film.media_type == "tv" ? "serie" : "film"}/` + film.id} className="bouton">
                                En savoir plus
                            </NavLink>
                        </div>
                    </div>
                );
            })
        );
    }

    const [nomFilm, setNomFilm] = useState(""); // Permet de contenir le nom du film
    const [valeurDivResultat, setValeurDivResultat] = useState("");
    const [typeElement, setTypeElement] = useState("tousTypes");
    const selectType = useRef(null);
    useEffect(() => {
        if (nomFilm != "") {
            const requete = async () => {
                const { reponse, detail } = await Fetch(`http://localhost:8100/film/recherche/${encodeURI(nomFilm)}`, "GET");
                if (reponse) {
                    console.log(detail);
                    const detailFiltrer = detail.filter((element) => {
                        if (typeElement == "film") {
                            return element.media_type == "movie";
                        }
                        if (typeElement == "serie") {
                            return element.media_type == "tv";
                        }
                        return true;
                    });
                    console.log(detailFiltrer);

                    if (detailFiltrer.length >= 10) {
                        AffichageResultat(detailFiltrer.slice(0, 10));
                    } else if (detail.results.length > 0) {
                        AffichageResultat(detailFiltrer);
                    } else {
                        setValeurDivResultat(<p id="pAucunFilm">Aucun film trouvé</p>);
                        console.log("il y a pas de film");
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

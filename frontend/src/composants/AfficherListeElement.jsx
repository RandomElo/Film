import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import Fetch from "../fonctions/Fetch";
import "../styles/AfficherListeElement.css";
/**
 * Permet de générer une liste des résultats
 * @param {string} support Permet sa savoir si c'est un film ou une séri
 * @param {string} element Permet d'avoir les données à afficher
 * @param {string} id Permet d'avoir l'idée du paramètre
 * @param {string} type Permet de savoir si j'affiche pour un film
 */
export function AfficherListeElement({ type, support = null, element, id }) {
    const [pageActuelle, setPageActuelle] = useState(1);
    const [donnee, setDonnee] = useState(element);
    console.log(element);
    useEffect(() => {
        setDonnee(element);
    }, [element]);

    async function GestionCliquePage(e) {
        const nouvellePage = e.target.textContent == "Page suivante" ? pageActuelle + 1 : pageActuelle - 1;
        setPageActuelle(nouvellePage);

        const { reponse, detail } = await Fetch(`http://localhost:8100/tmdb/page-suivante/${type}/${support ? support.toLowerCase() : type}/${id}/${pageActuelle + 1}`);
        if (reponse) {
            setDonnee(detail);
        } else {
            console.error(detail);
        }
    }
    return (
        <div className="AfficherListeElement">
            <div className="divConteneurElement">
                {donnee.results.map((element, index) => (
                    <div className={"divElement"} key={index}>
                        <Link to={"/" + (support ? support.toLowerCase() : element.media_type == "tv" ? "serie" : "film") + "/" + element.id}>
                            <img src={"https://image.tmdb.org/t/p/original" + element.poster_path} alt={"Poster de " + (element.title || element.name)} />
                        </Link>
                        <p>{element.title || element.name}</p>
                    </div>
                ))}
            </div>

            {donnee.total_pages > 1 && (
                <div className="divGestionPage">
                    <p id="compteurPage">
                        <span className="gras">Page : </span>
                        {pageActuelle + "/" + element.total_pages}
                    </p>
                    <div className="divBoutonGestionPage">
                        <button className="bouton" disabled={pageActuelle === 1} onClick={(e) => GestionCliquePage(e)}>
                            Page précédente
                        </button>
                        <button className="bouton" onClick={(e) => GestionCliquePage(e)}>
                            Page suivante
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

AfficherListeElement.propTypes = {
    type: PropTypes.string.isRequired,
    support: PropTypes.string,
    element: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

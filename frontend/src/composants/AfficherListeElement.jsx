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
export function AfficherListeElement({ type, support = null, element, id = null }) {
    const [pageActuelle, setPageActuelle] = useState(1);
    const [donnee, setDonnee] = useState(element);
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
    if (type == "recherche" || type == "societe") {
        return (
            <div className="AfficherListeElement">
                <div className="divConteneurElement">
                    {donnee.results.map((element, index) => (
                        <div className={"divElement"} key={index}>
                            <Link to={"/" + (support ? support.toLowerCase() : element.media_type == "tv" ? "serie" : "film") + "/" + element.id}>
                                <img src={"https://image.tmdb.org/t/p/original" + element.poster_path} alt={"Poster de " + (element.title || element.name)} />
                                <p>{element.title || element.name}</p>
                            </Link>
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
    } else if (type == "liste") {
        return (
            <div className="AfficherListeElement">
                <div className="divConteneurElement">
                    {donnee.map((element, index) => (
                        <div className={"divElement"} key={index}>
                            <Link to={"/" + element.support + "/" + element.id}>
                                <img src={element.image} alt={"Poster de " + (element.title || element.name)} />
                                <p>{element.titre}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

AfficherListeElement.propTypes = {
    type: PropTypes.string.isRequired,
    support: PropTypes.string,
    element: PropTypes.object.isRequired,
    id: PropTypes.string,
};

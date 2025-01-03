import { useState } from "react";
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
export function AfficherListeElement({ type, support, element, id }) {
    const [pageActuelle, setPageActuelle] = useState(1);
    const [donnee, setDonnee] = useState(element);

    async function GestionCliquePage(e) {
        // console.log(e.target.textContent);
        const nouvellePage = e.target.textContent == "Page suivante" ? pageActuelle + 1 : pageActuelle - 1;
        setPageActuelle(nouvellePage);

        // Comment faire en sorte de renvoyer la requete pour obtenir juste la page suivante
        // Crée un nouvelle route, qui fait a peut près la meme chose mais renvoie moins de données
        console.log(`http://localhost:8100/tmdb/page-suivante/${type}/${support.toLowerCase()}/${id}/${nouvellePage}`);
        const { reponse, detail } = await Fetch(`http://localhost:8100/tmdb/page-suivante/${type}/${support.toLowerCase()}/${id}/${pageActuelle + 1}`);
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
                        <img src={"https://image.tmdb.org/t/p/original" + element.poster_path} alt={"Poster de " + (element.title || element.name)} />

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
    support: PropTypes.string.isRequired,
    element: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
};

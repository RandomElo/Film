import { useLoaderData } from "react-router-dom";
import "../../styles/Societe.css";
import { useState } from "react";
function AfficherListeElement({ type, element }) {
    const [pageActuelle, setPageActuelle] = useState(1);
    function GestionCliquePage(e) {
        console.log(e.target.textContent);
        e.target.textContent == "Page suivante" ? setPageActuelle((e) => e + 1) : setPageActuelle((e) => e - 1);
        // Comment faire en sorte de renvoyer la requete pour obtenir juste la page suivante
        // Crée un nouvelle route, qui fait a peut près la meme chose mais renvoie moins de données

    }
    return (
        <div id={"divListe" + type}>
            {element.results.map((element, index) => (
                <div className="divSerieElement" key={index}>
                    <img src={"https://image.tmdb.org/t/p/original" + element.poster_path} alt={"Poster de " + (element.title || element.name)} />

                    <p>{element.title || element.name}</p>
                </div>
            ))}
            {element.total_pages > 1 && (
                <>
                    <p id="compteurPage">
                        <span className="gras">Page : </span>
                        {pageActuelle + "/" + element.total_pages}
                    </p>
                    <div id="divGestionPage">
                        <button className="bouton" disabled={pageActuelle === 1} onClick={(e) => GestionCliquePage(e)}>
                            Page précédente
                        </button>
                        <button className="bouton" onClick={(e) => GestionCliquePage(e)}>
                            Page suivante
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export function Societe({ type }) {
    console.log(type);
    const { reponse, detail } = useLoaderData();
    if (!reponse) {
        return (
            <>
                <main className="Societe">
                    <div id="divErreur">
                        <h1 id="titre">Erreur lors la récupération du film</h1>
                        <p>{detail}</p>
                        <a href="https://developer.themoviedb.org/docs/errors" className="bouton">
                            Signification du code d'erreur
                        </a>
                    </div>
                </main>
            </>
        );
    }
    console.log(detail);
    const societeInfo = detail.societe;
    const societeFilm = detail.film;
    const societeSerie = detail.serie;
    return (
        <main className="Societe">
            <h1 id="titre">{detail.societe.name}</h1>
            <img src={"https://image.tmdb.org/t/p/original" + societeInfo.logo_path} alt="" id="test" />
            {societeInfo.headquarters && (
                <p>
                    <span className="gras">Siège : </span>
                    {societeInfo.headquarters}
                </p>
            )}
            {societeInfo.origin_country && (
                <p>
                    <span className="gras">Pays d'origine : </span>
                    {societeInfo.origin_country}
                </p>
            )}
            {societeInfo.parent_company && <p>Parent existant</p>}
            {societeSerie && (
                <div id="divCarteSerie">
                    <h2>Séries</h2>
                    <AfficherListeElement type="Serie" element={societeSerie} />
                </div>
            )}
            {societeFilm && (
                <div id="divCarteFilm">
                    <h2>Film</h2>
                    <AfficherListeElement type="Film" element={societeFilm} />
                </div>
            )}
        </main>
    );
}

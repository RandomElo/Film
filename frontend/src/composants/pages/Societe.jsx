import { useLoaderData, useParams } from "react-router-dom";
import "../../styles/Societe.css";
import { AfficherListeElement } from "../AfficherListeElement";

export function Societe() {
    const { reponse, detail } = useLoaderData();
    const { id } = useParams();
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
    const societeInfo = detail.societe;
    let societeFilm;
    let societeSerie;
    if (detail.societe) {
        societeFilm = detail.film;
    }
    if (detail.serie) {
        societeSerie = detail.serie;
    }
    return (
        <main className="Societe">
            <div id="container">
                <h1 id="titre">{detail.societe.name}</h1>
                <div id="divCartePrincipale">
                    <div id="imageSociete">
                        <img src={"https://image.tmdb.org/t/p/original" + societeInfo.logo_path} alt="" />
                    </div>
                    <div id="divInfoGenerale">
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
                    </div>
                </div>
                {societeSerie && (
                    <div id="divCarteSerie">
                        <h2>Séries</h2>
                        <AfficherListeElement type="societe" support="Serie" element={societeSerie} id={id} />
                    </div>
                )}
                {societeFilm && (
                    <div id="divCarteFilm">
                        <h2>Film</h2>
                        <AfficherListeElement type="societe" support="Film" element={societeFilm} id={id} />
                    </div>
                )}
            </div>
        </main>
    );
}

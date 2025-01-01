import { useLoaderData, useParams } from "react-router-dom";

import "../../styles/Film.css";
import Date from "../../fonctions/Date";
import pasAffiche from "../../images/PasAffiche.png";
import SommeArgent from "../../fonctions/SommeArgent";
export function Film() {
    const { reponse, detail } = useLoaderData();
    const { support } = useParams();
    console.log(support);
    if (!reponse) {
        return (
            <>
                <main className="Film">
                    <h1 id="titre">Erreur lors la récupération du film</h1>
                    <div id="divErreur">
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
    return (
        <>
            <main className="Film">
                <div className="container">
                    <h1 id="titre">{detail.title || detail.name}</h1>
                    <div id="divCartePrincipale">
                        {detail.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + detail.poster_path} alt={"Poster du film " + detail.name} className="posterFilm" /> : <img src={pasAffiche} alt="Image utiliser quand il y a pas d'affiche dans la base de données" id="pasAffiche" />}
                        <div id="divInfoGenerale">
                            <p>
                                <span className="gras">Acteurs : </span>Acteur 1, Acteur 2 , Acteur 3
                            </p>

                            {detail.genres && detail.genres.length > 0 && (
                                <p>
                                    <span className="gras">Genres : </span>
                                    {detail.genres.map((genre) => genre.name).join(", ")}
                                </p>
                            )}
                            <p>
                                {detail.revenue ? (
                                    <>
                                        <span className="gras">Box office : </span>
                                        {SommeArgent(detail.revenue)} ${" "}
                                        {detail.budget && (
                                            <>
                                                | <span className="gras">Budget : </span>
                                                {SommeArgent(detail.budget)} $
                                            </>
                                        )}
                                    </>
                                ) : (
                                    detail.budget && (
                                        <>
                                            <span className="gras">Budget : </span>
                                            {SommeArgent(detail.budget)} $
                                        </>
                                    )
                                )}
                            </p>
                            {detail.production_companies && detail.production_companies.length > 0 && (
                                <p id="pSocieteProduction">
                                    <span className="gras">Société de production : </span>
                                    {detail.production_companies.map((boiteProduction, index) => (
                                        <>
                                            <a href={"/boite-production/" + boiteProduction.id} className="lien" key={index}>
                                                {boiteProduction.name}
                                            </a>
                                            {index < detail.production_companies.length - 1 && ", "}
                                        </>
                                    ))}
                                </p>
                            )}
                            {detail.networks && detail.networks.length > 0 && (
                                <p id="pDiffuseur">
                                    <span className="gras">Diffuseur : </span>
                                    {detail.networks.map((diffuseur, index) => (
                                        <>
                                            <a href={"/diffuseur/" + diffuseur.id}>{diffuseur.name}</a>
                                            {index < detail.networks.length - 1 && ", "}
                                        </>
                                    ))}
                                </p>
                            )}
                        </div>
                    </div>
                    {detail.overview && (
                        <div id="divCarteSynopsis">
                            <h2>Synopsis : </h2>
                            <p>{detail.overview}</p>
                        </div>
                    )}
                    <div id="divCarteDates">
                        <h2>Informations de diffusion</h2>

                        {detail.first_air_date && (
                            <p>
                                <span className="gras">Première diffusion : </span>
                                {Date(detail.first_air_date)}
                            </p>
                        )}
                        {detail.last_air_date && (
                            <p>
                                <span className="gras">Dernière diffusion : </span>
                                {Date(detail.last_air_date)}
                            </p>
                        )}
                        {detail.release_date && (
                            <p>
                                <span className="gras">Date de sortie : </span>
                                {Date(detail.release_date)}
                            </p>
                        )}
                    </div>
                    <div id="divCarteDetails">
                        <h2>Détails supplémentaires</h2>

                        <p>
                            <span className="gras">Type : </span>
                            {detail.type ? detail.type : support.charAt(0).toUpperCase() + support.slice(1)}
                        </p>
                        {detail.status && (
                            <p>
                                <span className="gras">Statut : </span>
                                {detail.status}
                            </p>
                        )}
                        {detail.original_language && (
                            <p>
                                <span className="gras">Langue d'origine : </span>
                                {detail.original_language}
                            </p>
                        )}
                        {detail.spoken_languages && (
                            <p>
                                <span className="gras">Langues utilisés : </span>
                                {detail.spoken_languages.map((langue) => langue.iso_639_1).join(", ")}
                            </p>
                        )}
                        {detail.number_of_seasons && (
                            <p>
                                <span className="gras">Nombre de saison : </span>
                                {detail.number_of_seasons}
                            </p>
                        )}
                        {detail.number_of_episodes && (
                            <p>
                                <span className="gras">Nombre d'épisode : </span>
                                {detail.number_of_episodes}
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

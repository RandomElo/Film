import { Link, useLoaderData, useLocation, useParams } from "react-router-dom";

import "../../styles/Film.css";
import Date from "../../fonctions/Date";
import pasAffiche from "../../images/PasAffiche.png";
import SommeArgent from "../../fonctions/SommeArgent";
export function Film() {
    const { reponse, detail } = useLoaderData();
    const support = useLocation().pathname.split("/")[1];
    if (!reponse) {
        return (
            <>
                <main className="Film">
                    <div id="divErreur">
                        <h1 id="titre">Erreur lors la récupération du film</h1>
                        <p>{detail}</p>
                        <div id="divBouton">
                            <a href="https://developer.themoviedb.org/docs/errors" className="bouton">
                                Signification du code d'erreur
                            </a>
                        </div>
                    </div>
                </main>
            </>
        );
    }
    console.log(detail);
    const donneesFilm = detail.detailFilm;
    return (
        <>
            <main className="Film">
                <div className="container">
                    <h1 id="titre">{donneesFilm.title || donneesFilm.name}</h1>
                    <div id="divCartePrincipale">
                        {donneesFilm.poster_path ? <img src={"https://image.tmdb.org/t/p/original" + donneesFilm.poster_path} alt={"Poster du film " + donneesFilm.name} className="posterFilm" /> : <img src={pasAffiche} alt="Image utiliser quand il y a pas d'affiche dans la base de données" id="pasAffiche" />}
                        <div id="divInfoGenerale">
                            {detail.acteur.cast && detail.acteur.cast.length > 0 && (
                                <p>
                                    <span className="gras">Acteurs : </span>
                                    {detail.acteur.cast.slice(0, 5).map((acteur, index) => {
                                        return (
                                            <>
                                                <Link to={"/acteurs/" + acteur.id} key={index} className="lien">
                                                    {acteur.name}
                                                </Link>
                                                {index < 5 - 1 && ", "}
                                            </>
                                        );
                                    })}
                                </p>
                            )}

                            {donneesFilm.genres && donneesFilm.genres.length > 0 && (
                                <p>
                                    <span className="gras">Genres : </span>
                                    {donneesFilm.genres.map((genre) => genre.name).join(", ")}
                                </p>
                            )}
                            {(donneesFilm.revenue || donneesFilm.budget) && (
                                <p>
                                    {donneesFilm.revenue ? (
                                        <>
                                            <span className="gras">Box office : </span>
                                            {SommeArgent(donneesFilm.revenue)} ${" "}
                                            {donneesFilm.budget && (
                                                <>
                                                    | <span className="gras">Budget : </span>
                                                    {SommeArgent(donneesFilm.budget)} $
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        donneesFilm.budget && (
                                            <>
                                                <span className="gras">Budget : </span>
                                                {SommeArgent(donneesFilm.budget)} $
                                            </>
                                        )
                                    )}
                                </p>
                            )}
                            {donneesFilm.production_companies && donneesFilm.production_companies.length > 0 && (
                                <p id="pSocieteProduction">
                                    <span className="gras">Société de production : </span>
                                    {donneesFilm.production_companies.map((boiteProduction, index) => (
                                        <>
                                            <Link to={"/boite-production/" + boiteProduction.id} className="lien" key={index}>
                                                {boiteProduction.name}
                                            </Link>
                                            {index < donneesFilm.production_companies.length - 1 && ", "}
                                        </>
                                    ))}
                                </p>
                            )}
                            {donneesFilm.networks && donneesFilm.networks.length > 0 && (
                                <p id="pDiffuseur">
                                    <span className="gras">Diffuseur : </span>
                                    {donneesFilm.networks.map((diffuseur, index) => (
                                        <>
                                            <Link to={"/diffuseur/" + diffuseur.id} className="lien">
                                                {diffuseur.name}
                                            </Link>
                                            {index < donneesFilm.networks.length - 1 && ", "}
                                        </>
                                    ))}
                                </p>
                            )}
                        </div>
                    </div>
                    {donneesFilm.overview && (
                        <div id="divCarteSynopsis">
                            <h2>Synopsis : </h2>
                            <p>{donneesFilm.overview}</p>
                        </div>
                    )}
                    <div id="divCarteDates">
                        <h2>Informations de diffusion</h2>

                        {donneesFilm.first_air_date && (
                            <p>
                                <span className="gras">Première diffusion : </span>
                                {Date(donneesFilm.first_air_date)}
                            </p>
                        )}
                        {donneesFilm.last_air_date && (
                            <p>
                                <span className="gras">Dernière diffusion : </span>
                                {Date(donneesFilm.last_air_date)}
                            </p>
                        )}
                        {donneesFilm.release_date && (
                            <p>
                                <span className="gras">Date de sortie : </span>
                                {Date(donneesFilm.release_date)}
                            </p>
                        )}
                    </div>
                    <div id="divCarteDetails">
                        <h2>Détails supplémentaires</h2>

                        <p>
                            <span className="gras">Type : </span>
                            {support == "serie" ? "Série" : "Film"}
                        </p>
                        {donneesFilm.status && (
                            <p>
                                <span className="gras">Statut : </span>
                                {donneesFilm.status}
                            </p>
                        )}
                        {donneesFilm.original_language && (
                            <p>
                                <span className="gras">Langue d'origine : </span>
                                {donneesFilm.original_language}
                            </p>
                        )}
                        {donneesFilm.spoken_languages && (
                            <p>
                                <span className="gras">Langues utilisés : </span>
                                {donneesFilm.spoken_languages.map((langue) => langue.iso_639_1).join(", ")}
                            </p>
                        )}
                        {donneesFilm.number_of_seasons && (
                            <p>
                                <span className="gras">Nombre de saison : </span>
                                {donneesFilm.number_of_seasons}
                            </p>
                        )}
                        {donneesFilm.number_of_episodes && (
                            <p>
                                <span className="gras">Nombre d'épisode : </span>
                                {donneesFilm.number_of_episodes}
                            </p>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

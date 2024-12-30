import { useEffect, useState } from "react";
import "../../styles/accueil.css";
import { RechercheFilm } from "../RechercheFilm";
export function Accueil() {

    document.title = "Accueil - Film";
    return (
        <main className="Accueil">
            <h1 id="titre">Accueil</h1>
            <RechercheFilm/>
            <div id="divPresentationProjet">
                <h2>Présentation du projet</h2>
                <p>Le but de ce projet est de créer un site de partage de film, où l'on peut gérer une liste de film, enregistrer nos films préférés, les films que l'on veut regarder.</p>
                <p>
                    Sur ce site, j'utilise l'<a href="https://www.themoviedb.org">API TMDB</a> pour récupérer différentes informations sur les films (affiche, boîte de production, date de sortie , ...)
                </p>
            </div>
        </main>
    );
}

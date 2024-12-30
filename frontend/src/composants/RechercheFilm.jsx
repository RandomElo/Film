import { useEffect, useState } from "react";
import Fetch from "../fonctions/Fetch";

export function RechercheFilm() {
    const [nomFilm, setNomFilm] = useState("");
    useEffect(() => {
        if (nomFilm != "") {
            console.log("Nouvelle valeur : " + nomFilm);
            console.log(encodeURI(nomFilm));
            const requete = async () => {
                const { reponse, detail } = await Fetch(`http://localhost:8100/film/recherche/${encodeURI(nomFilm)}`, "GET");
                if (reponse) {
                    console.log(detail.results);

                    if (detail.results.length > 5) {
                        for (let i = 0; i < 5; i++) {
                            console.log(detail.results[i]);
                        }
                    } else if (detail.results.length > 0) {
                        for (const film in detail.results) {
                            console.log(film);
                        }
                    } else {
                        console.log("il y a pas de film");
                    }
                } else {
                    console.error(detail);
                }
            };
            requete();
        }
    }, [nomFilm]);
    return (
        <div id="divRechercheFilm">
            <input type="text" placeholder="Rechercher un film" value={nomFilm} onChange={(e) => setNomFilm(e.target.value)} />
        </div>
    );
}

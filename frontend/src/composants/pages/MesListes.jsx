import { useAuthentifier } from "../../hooks/useAuthentifier";
import { useLoaderData, Navigate } from "react-router-dom";
import { AfficherListeElement } from "../AfficherListeElement";

import "../../styles/MesListes.css";
import { useState } from "react";
import Modal from "../Modal";
import Fetch from "../../fonctions/Fetch";
function NouvelleListe(e) {
    e.preventDefault();
    const { reponse, detail } = Fetch("http://localhost:8100/listes/creer-liste", "POST", { nomListe: e.target[0].value, mode: "classique" });
    if(reponse) {

    } else {
        
    }
}
export function MesListes() {
    const { estAuthentifier } = useAuthentifier();
    const { reponse, detail } = useLoaderData();
    const [modalOuverte, setModalOuverte] = useState(false);

    let detailTableau = Object.values(detail);
    if (!estAuthentifier) {
        return <Navigate to="/connexion" replace />;
    }

    document.title = "Mes Listes - Film";
    if (!reponse) {
        return (
            <main className="MesListes">
                <h1 id="titre">Erreur lors de la récupération des listes</h1>
            </main>
        );
    }
    return (
        <main className="MesListes">
            <h1 id="titre">Mes listes</h1>
            <a id="ajouterListe" onClick={() => setModalOuverte(true)}>
                <span>+</span>Crée une nouvelle liste
            </a>
            {detailTableau.length == 0 ? (
                <p>Vous avez aucune liste rattacher à votre compte</p>
            ) : (
                detailTableau.map((liste, indexListe) => (
                    <div className="liste" key={indexListe}>
                        <h2 className="titreListe">{liste.nom}</h2>
                        <AfficherListeElement type="liste" element={liste.film} />
                    </div>
                ))
            )}
            <Modal estOuverte={modalOuverte} fermerModal={() => setModalOuverte(false)}>
                <h2>Création d'une liste</h2>
                <form onSubmit={NouvelleListe}>
                    <input type="text" placeholder="Nom de la liste" required />
                    <button type="submit">Enregistrer</button>
                </form>
            </Modal>
        </main>
    );
}

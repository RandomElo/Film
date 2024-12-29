import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import "../styles/authentification.css";
import Fetch from "../../fonctions/Fetch.js";
import { useAuthentifier } from "../../hooks/useAuthentifier";

export function Authentification({ role }) {
    const { estAuthentifier } = useAuthentifier();

    const [nom, setNom] = useState("");
    const [messageErreur, setMessageErreur] = useState(null);
    const [pseudoDisponiblite, setPseudoDisponiblite] = useState(true);
    // Je met en majuscule le premier charactère du mode
    const modeMajuscule = role.charAt(0).toUpperCase() + role.slice(1);

    // Use effect qui géré la vérification de la disponiblité du pseudo
    useEffect(() => {
        if (nom != "" && role == "inscription") {
            const requete = async () => {
                const { erreur, reponse } = await Fetch(`http://localhost:8100/authentification/pseudo-disponible/${nom}`, "GET");
                if (!erreur) {
                    setPseudoDisponiblite(reponse);
                    if (!reponse) {
                        setMessageErreur("Le pseudo n'est pas disponible");
                    } else {
                        setMessageErreur(null);
                    }
                } else {
                    console.error(reponse);
                    setMessageErreur("Une erreur est survenue");
                }
            };
            requete();
        }
    }, [nom]);
    // Fonction qui gère la mise en majuscule du formulaire
    async function EnvoieFormulaire(e, role) {
        e.preventDefault();
        const donnees = {
            nom: e.target[0].value,
            mdp: e.target[1].value,
        };
        const { erreur, reponse } = await Fetch(`http://localhost:8100/authentification/${role}`, "POST", donnees);

        if (!erreur) {
            if (reponse.connecte) {
                // Aller vers la page mes films
            } else {
                if (reponse.erreur == "Pseudo déjà existant") {
                    setMessageErreur("Le pseudo n'est pas disponible");
                } else {
                    setMessageErreur("Une erreur est survenue");
                }
            }
        } else {
            console.error(reponse);
            setMessageErreur("Une erreur est survenue");
        }
    }
    if (!estAuthentifier) {
        return <Navigate to="/mes-films" replace />;
    }

    return (
        <main className="Authentification">
            <h1>{modeMajuscule}</h1>
            <form onSubmit={(e) => EnvoieFormulaire(e, role)}>
                <div id="inputNom">
                    <label htmlFor="nom">Nom :</label>
                    <input type="text" id="nom" placeholder="Jean" value={nom} onChange={(e) => setNom(e.target.value)} required />
                </div>
                <div id="divInputMdp">
                    <label htmlFor="mdp">Mot de passe :</label>
                    <input type="password" id="mdp" />
                </div>
                {messageErreur && <p id="pErreur">{messageErreur}</p>}
                <button type="submit" className="bouton" disabled={!pseudoDisponiblite}>
                    {modeMajuscule}
                </button>
            </form>
        </main>
    );
}
Authentification.propTypes = {
    role: PropTypes.string.isRequired,
};

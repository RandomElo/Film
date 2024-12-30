import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import "../../styles/authentification.css";
import Fetch from "../../fonctions/Fetch.js";
import { useAuthentifier } from "../../hooks/useAuthentifier";

export function Authentification({ role }) {
    const { estAuthentifier, authentifier } = useAuthentifier(); // Permet de savoir si l'utilisateur est auth
    const [nom, setNom] = useState(""); // Permet de récupérer la valeur de l'input nom
    const [messageErreur, setMessageErreur] = useState(null);
    const [pseudoDisponiblite, setPseudoDisponiblite] = useState(true);
    const [rediriger, setRediriger] = useState(false);

    const modeMajuscule = role.charAt(0).toUpperCase() + role.slice(1);
    document.title = `${modeMajuscule} - Film`;

    // Use effect qui géré la vérification de la disponiblité du pseudo
    useEffect(() => {
        if (nom != "" && role == "inscription") {
            const requete = async () => {
                const { reponse, detail } = await Fetch(`http://localhost:8100/authentification/pseudo-disponible/${nom}`, "GET");
                if (reponse) {
                    setPseudoDisponiblite(detail);
                    if (!detail) {
                        setMessageErreur("Le pseudo n'est pas disponible");
                    } else {
                        setMessageErreur(null);
                    }
                } else {
                    console.error(detail);
                    setMessageErreur(detail);
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
        const { reponse, detail } = await Fetch(`http://localhost:8100/authentification/${role}`, "POST", donnees);
        console.log(detail)
        if (reponse) {
            if (detail) {
                authentifier(); // Je met à jour la valeur du provider
                setRediriger(true);
            } else {
                setMessageErreur("Le pseudo n'est pas disponible");
            }
        } else {
            setMessageErreur(detail);
        }
    }
    if (estAuthentifier || rediriger) {
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

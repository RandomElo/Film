import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

import Fetch from "../fonctions/Fetch.js";

const AuthentifierContext = createContext(false);

export const AuthentifierProvider = ({ children }) => {
    const [estAuthentifier, setAuthentifier] = useState(false);
    const [chargement, setChargement] = useState(true);
    const recuperationCookieAuth = async () => {
        try {
            const { erreur, reponse } = await Fetch("http://localhost:8100/authentification/cookie-auth", "GET");
            if (!erreur) {
                if (reponse.authentifier) {
                    setAuthentifier(true);
                } else {
                    setAuthentifier(false);
                }
            } else {
                console.error(reponse);
            }
        } catch (erreur) {
            console.error(erreur);
        } finally {
            setChargement(false);
        }
    };
    useEffect(() => {
        recuperationCookieAuth();
    }, []);

    const authentifier = () => setAuthentifier(true);

    return <AuthentifierContext.Provider value={{ chargement, estAuthentifier, authentifier }}>{children}</AuthentifierContext.Provider>;
};

// Hook pour récupérer le contexte
export const useAuthentifier = () => {
    const context = useContext(AuthentifierContext);
    if (!context) {
        throw new Error("useAuthentifier doit être utilisé à l'intérieur d'un AuthentifierProvider.");
    }
    return context;
};
AuthentifierProvider.propTypes = {
    children: PropTypes.node.isRequired, // Définit que children est requis et doit être un noeud React valide
};

import { Navigate } from "react-router-dom";
import { useAuthentifier } from "../../hooks/useAuthentifier";
import { useState } from "react";
import Notification from "../Notification";

export function MesFilms() {
    document.title = "Mes films - Film";
    const [afficherNotification, setAfficherNotification] = useState(false);
    const AfficherNotification = () => {
        setAfficherNotification(true);
        setTimeout(() => setAfficherNotification(false), 3000);
    };

    const { estAuthentifier } = useAuthentifier();
    if (!estAuthentifier) {
        return <Navigate to="/connexion" replace />;
    }
    return (
        <main className="mesFilms">
            <h1 id="titre">Mes films</h1>
            <button onClick={AfficherNotification}>Notification</button>
            {afficherNotification && <Notification message="Test" type="sucess" duree={3000} />}
        </main>
    );
}

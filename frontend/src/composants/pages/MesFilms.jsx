import { Navigate } from "react-router-dom";
import { useAuthentifier } from "../../hooks/useAuthentifier";

export function MesFilms() {
    document.title = "Mes films - Film";

    const { estAuthentifier } = useAuthentifier();
    if (!estAuthentifier) {
        return <Navigate to="/connexion" replace />;
    }
    return (
        <main className="mesFilms">
            <h1 id="titre">Mes films</h1>
        </main>
    );
}
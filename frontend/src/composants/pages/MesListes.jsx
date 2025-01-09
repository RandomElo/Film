import { Navigate } from "react-router-dom";
import { useAuthentifier } from "../../hooks/useAuthentifier";
import { useLoaderData } from "react-router-dom";

export function MesListes() {
    const { estAuthentifier } = useAuthentifier();
    const { reponse, detail } = useLoaderData();
    console.log(detail);

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
            {detail.length == 0 ? (
                <p>Vous n'avez pas de listes rattachées à votre compte</p>
            ) : (
                <div id="container">
                    {detail.map((liste, index) => (
                        <div className="element" key={index}>
                            <h2 className="titreListe">{liste.nom}</h2>
                            {!liste.listeFilm ? (
                                <p>Aucun film attacher à la liste</p>
                            ) : (
                                <div>
                                    <p>En cours de dev</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

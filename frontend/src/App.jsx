import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Generale } from "./composants/pages/Generale";
import { Accueil } from "./composants/pages/Accueil";
import { Authentification } from "./composants/pages/Authentification";
import { AuthentifierProvider } from "./hooks/useAuthentifier";
import { MesFilms } from "./composants/pages/MesFilms";

import Fetch from "./fonctions/Fetch";

import "./App.css";
import { Film } from "./composants/pages/Film";
import { Societe } from "./composants/pages/Societe";
import { MesListes } from "./composants/pages/MesListes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Generale />,
        children: [
            {
                path: "",
                element: <Accueil />,
            },
            {
                path: "inscription",
                element: <Authentification role="inscription" />,
            },
            {
                path: "connexion",
                element: <Authentification role="connexion" />,
            },
            {
                path: "mes-films",
                element: <MesFilms />,
            },
            {
                path: "/film/:id",
                element: <Film />,
                loader: async ({ params }) => await Fetch(`http://localhost:8100/tmdb/detail-film/movie/${params.id}`),
            },
            {
                path: "/serie/:id",
                element: <Film />,
                loader: async ({ params }) => await Fetch(`http://localhost:8100/tmdb/detail-film/tv/${params.id}`),
            },
            {
                path: "/boite-production/:id",
                element: <Societe />,
                loader: async ({ params }) => await Fetch(`http://localhost:8100/tmdb/detail-societe/boite-production/${params.id}`),
            },
            {
                path: "/diffuseur/:id",
                element: <Societe />,
                loader: async ({ params }) => await Fetch(`http://localhost:8100/tmdb/detail-societe/diffuseur/${params.id}`),
            },
            {
                path: "/mes-listes",
                element: <MesListes />,
                loader: async () => await Fetch(`http://localhost:8100/listes/mes-listes`),
            },
        ],
    },
]);
function App() {
    return (
        <>
            <AuthentifierProvider>
                <RouterProvider router={router} />
            </AuthentifierProvider>
        </>
    );
}
export default App;

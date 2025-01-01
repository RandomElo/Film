import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Generale } from "./composants/pages/Generale";
import { Accueil } from "./composants/pages/Accueil";
import { Authentification } from "./composants/pages/Authentification";
import { AuthentifierProvider } from "./hooks/useAuthentifier";
import { MesFilms } from "./composants/pages/MesFilms";
import { Film } from "./composants/pages/Film";

import Fetch from "./fonctions/Fetch";

import "./App.css";

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
                path: "/:support/:id",
                element: <Film />,
                loader: async ({ params }) => await Fetch(`http://localhost:8100/film/detail/${params.support == "serie" ? "tv" : "movie"}/${params.id}`),
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

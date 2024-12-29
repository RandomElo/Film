import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Generale } from "./composants/pages/Generale";

import "./App.css";
import { Accueil } from "./composants/pages/Accueil";
import { Authentification } from "./composants/pages/Authentification";
import { AuthentifierProvider } from "./hooks/useAuthentifier";
import { MesFilms } from "./composants/pages/MesFilms";

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
        ],
    },
]);
function App() {
    return (
        <>
            <AuthentifierProvider>
                <RouterProvider router={router} />;
            </AuthentifierProvider>
        </>
    );
}
export default App;

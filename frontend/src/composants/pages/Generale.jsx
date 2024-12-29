import { NavLink, Outlet } from "react-router-dom";
import { useAuthentifier } from "../../hooks/useAuthentifier.jsx";

export function Generale() {
    const { chargement, estAuthentifier } = useAuthentifier();
    if (chargement) {
        return null;
    }
    return (
        <>
            <header>
                <nav className="navbar">
                    <NavLink className="logo" to="/">
                        Listes
                    </NavLink>
                    <div className="navLinks">
                        <ul>
                            <li>
                                <NavLink to="/">Films</NavLink>
                            </li>
                            {estAuthentifier ? (
                                <>
                                    <li>
                                        <NavLink to="/mes-films">Mes films</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/mon-compte">Mon compte</NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/inscription">Inscription</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/connexion">Connexion</NavLink>
                                    </li>
                                </>
                            )}
                            <li>
                                <NavLink to="/connexion">A propos</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <Outlet />
            <footer>
                <p>Site web réalisé par Eloi B.</p>
            </footer>
        </>
    );
}

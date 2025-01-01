export const rechercheFilm = async (req, res) => {
    let tableauResultat = [];
    for (let i = 1; i < 4; i++) {
        const requete = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.CLE_API}&query=${req.params.recherche}&language=fr-FR&page=${i}`);
        if (requete.ok) {
            const reponse = await requete.json();
            tableauResultat = [...tableauResultat, ...reponse.results];
        } else {
            return res.json({ reponse: false, messageErreur: "Problème lors de l'envoie de la requete" });
        }
    }
    return res.json({ reponse: true, detail: tableauResultat });
};
export const detailFilm = async (req, res) => {
    const requete = await fetch(`https://api.themoviedb.org/3/${req.params.support}/${req.params.idFilm}?api_key=${process.env.CLE_API}&language=fr-FR`);
    if (requete.ok) {
        const reponse = await requete.json();
        return res.json({ reponse: true, detail: reponse });
    } else {
        try {
            const reponse = await requete.json();
            if (!reponse.success) {
                return res.json({ reponse: false, messageErreur: `Problème lors de la communnication avec l'API. Code : ${reponse.status_code}` });
            }
        } catch (errur) {
            return res.json({ reponse: false, messageErreur: "Problème lors de l'envoie de la requete" });
        }
    }
};

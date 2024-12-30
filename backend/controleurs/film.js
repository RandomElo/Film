export const test = async (req, res) => {
    res.json({ test: "licorne" });
};
export const rechercheFilm = async (req, res) => {
    const requete = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.CLE_API}&query=${req.params.nomFilm}&language=fr-FR`);
    if (requete.ok) {
        const reponse = await requete.json();
        return res.json({ reponse: true, detail: reponse });
    } else {
        return res.json({ reponse: false, messageErreur: "Problème lors de l'envoie de la requete" });
    }
};

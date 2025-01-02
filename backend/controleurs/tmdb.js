function erreurReponseOk(reponse) {
    if (!reponse.success && reponse.status_code) {
        return { reponse: false, messageErreur: `Problème lors de la communication avec l'API. Code : ${reponse.status_code}` };
    } else {
        return { reponse: false, messageErreur: "Problème lors de l'envoie de la requete" };
    }
}
export const recherche = async (req, res) => {
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
    // Générer le résultat selon le support
    let reponseObjet = {};
    const requeteDetail = await fetch(`https://api.themoviedb.org/3/${req.params.support}/${req.params.idFilm}?api_key=${process.env.CLE_API}&language=fr-FR`);
    const reponseDetailFilm = await requeteDetail.json();
    if (requeteDetail.ok) {
        reponseObjet.detailFilm = reponseDetailFilm;
        const requeteActeur = await fetch(`https://api.themoviedb.org/3/${req.params.support}/${req.params.idFilm}/credits?api_key=${process.env.CLE_API}&language=fr-FR`);
        if (requeteActeur.ok) {
            const reponseActeur = await requeteActeur.json();
            reponseObjet.acteur = reponseActeur;
            return res.json({ reponse: true, detail: reponseObjet });
        } else {
            console.error("Pas d'acteurs");
            return res.json({ reponse: true, detail: reponseObjet });
        }
    } else {
        return res.json(erreurReponseOk(reponseDetailFilm));
    }
};
export const detailSociete = async (req, res) => {
    console.log(req.params.type);
    const objetReponse = {};

    const requeteSociete = await fetch(`https://api.themoviedb.org/3/company/${req.params.id}?api_key=${process.env.CLE_API}&language=fr-FR`);

    const reponseSociete = await requeteSociete.json();
    if (requeteSociete.ok) {
        objetReponse.societe = reponseSociete;

        const requeteFilm = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.CLE_API}&with_companies=${req.params.id}&language=fr-FR`);

        const reponseFilm = await requeteFilm.json();
        if (requeteFilm.ok) {
            console.log("il y a des films");
            objetReponse.film = reponseFilm;
        }

        const requeteSerie = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.CLE_API}&with_companies=${req.params.id}&language=fr-FR`);
        const reponseSerie = await requeteSerie.json();
        if (requeteSerie.ok) {
            objetReponse.serie = reponseSerie;
            res.json({ reponse: true, detail: objetReponse });
        }
    } else {
        return res.json(erreurReponseOk(reponseSociete));
    }
};

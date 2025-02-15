function erreurReponseOk(reponse) {
    if (!reponse.success && reponse.status_code) {
        return { reponse: false, messageErreur: `Problème lors de la communication avec l'API. Code : ${reponse.status_code}` };
    } else {
        return { reponse: false, messageErreur: "Problème lors de l'envoie de la requete" };
    }
}
export const recherche = async (req, res) => {
    const requete = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.CLE_API}&query=${req.params.recherche}&language=fr-FR`);
    const reponse = await requete.json();
    if (requete.ok) {
        return res.json({ reponse: true, detail: reponse });
    } else {
        return res.json(erreurReponseOk(reponse));
    }
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
    const objetReponse = {};
    // company
    const typeRequeteSociete = req.params.type == "boite-production" ? "company" : "network";
    const typeRequete = req.params.type == "boite-production" ? "companies" : "networks";
    const requeteSociete = await fetch(`https://api.themoviedb.org/3/${typeRequeteSociete}/${req.params.id}?api_key=${process.env.CLE_API}&language=fr-FR`);

    const reponseSociete = await requeteSociete.json();
    if (requeteSociete.ok) {
        objetReponse.societe = reponseSociete;

        const requeteFilm = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.CLE_API}&with_${typeRequete}=${req.params.id}&language=fr-FR`);

        const reponseFilm = await requeteFilm.json();
        if (requeteFilm.ok) {
            objetReponse.film = reponseFilm;
        }
        const requeteSerie = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.CLE_API}&with_${typeRequete}=${req.params.id}&language=fr-FR`);
        const reponseSerie = await requeteSerie.json();
        if (requeteSerie.ok) {
            objetReponse.serie = reponseSerie;
            res.json({ reponse: true, detail: objetReponse });
        }
    } else {
        return res.json(erreurReponseOk(reponseSociete));
    }
};
export const pageSuivante = async (req, res) => {
    let requete = "";
    if (req.params.type == "recherche") {
        requete = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.CLE_API}&query=${req.params.id}&language=fr-FR&page=${req.params.page}`);
    } else if (req.params.type == "societe") {
        if (req.params.support == "film" || req.params.support == "serie") {
            requete = await fetch(`https://api.themoviedb.org/3/discover/${req.params.support == "film" ? "movie" : "tv"}?api_key=${process.env.CLE_API}&with_companies=${req.params.id}&language=fr-FR&page=${req.params.page}`);
        } else {
            return res.json({ reponse: false, detail: "La valeur de support est incorrect" });
        }
    } else {
        return res.json({ recherche: true, detail: "Erreur" });
    }
    const reponse = await requete.json();
    if (requete.ok) {
        return res.json({ reponse: true, detail: reponse });
    } else {
        console.error("Erreur");
        return res.json(erreurReponseOk(reponse));
    }
};

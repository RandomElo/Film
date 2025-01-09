// Permet de récupérer les listes de l'utilisateur
export const mesListes = async (req, res) => {
    const listeUtilisateur = await req.Liste.findAll({ where: { idUtilisateur: req.idUtilisateur } });
    // A FAIRE : Il faut que je mette dans la réponse, le nom du film et l'affiche
    // console.log(listeUtilisateur);
    for (let idListe in listeUtilisateur) {
        const listeFilm = listeUtilisateur[idListe].listeFilm;
        for (let idFilm in listeFilm) {
            const film = listeFilm[idFilm];
            console.log(film.support);
            console.log(film.id);
            // Je doit envoyer la requete et crée un objet de retour qui vas contenir :
            // nom liste -> [nomFilm, Afficche]
            /**
                Objet
                    nomListe
                        [nomFilm, Affiche]
             */
        }
    }
    res.json({ reponse: true, detail: listeUtilisateur });
};

// Pemret de pouvoir ajouter un film à une liste
export const ajouterFilm = async (req, res) => {
    const liste = await req.Liste.findOne({ where: { nom: req.body.nomListe, idUtilisateur: req.idUtilisateur } });

    if (!liste) {
        return res.json({ reponse: false, detail: "Liste non-trouvée" });
    }
    const support = req.body.support;

    const listeFilm = [...liste.listeFilm, { support: support, id: parseInt(req.body.idFilm) }];
    await req.Liste.update({ listeFilm }, { where: { nom: req.body.nomListe, idUtilisateur: req.idUtilisateur } });

    return res.json({ reponse: true, detail: "Film ajouter" });
};

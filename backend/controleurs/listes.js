// Pemret de crée un liste
export const creerListe = async (req, res) => {
    await req.Liste.creerListe(req, res);
};

// Permet de récupérer les listes de l'utilisateur
export const mesListes = async (req, res) => {
    const listeUtilisateur = await req.Liste.findAll({ where: { idUtilisateur: req.idUtilisateur } });
    // A FAIRE : Il faut que je mette dans la réponse, le nom du film et l'affiche
    // console.log(listeUtilisateur);
    let objetReponse = {};
    for (let i = 0; i < listeUtilisateur.length; i++) {
        objetReponse[i] = {};
        let tableauReponse = [];

        const listeFilm = listeUtilisateur[i].listeFilm;

        for (let idFilm in listeFilm) {
            const film = listeFilm[idFilm];

            const requete = await fetch(`https://api.themoviedb.org/3/${film.support == "serie" ? "tv" : "movie"}/${film.id}?api_key=${process.env.CLE_API}&language=fr-FR`);

            const reponse = await requete.json();

            if (requete.ok) {
                const objetListeReponse = {
                    titre: reponse.title || reponse.name,
                    image: "https://image.tmdb.org/t/p/original" + reponse.poster_path,
                    support: film.support,
                    id: film.id,
                };
                tableauReponse.push(objetListeReponse);
            } else {
                return res.json({ reponse: false, detail: "Erreur lors de la récupération des films de la liste" });
            }

            // Je doit envoyer la requete et crée un objet de retour qui vas contenir :
            // nom liste -> [nomFilm, Afficche]
            /**
                Objet
                    nomListe
                        [nomFilm, Affiche]
             */
        }

        objetReponse[i].film = tableauReponse;
        objetReponse[i].nom = listeUtilisateur[i].nom;
    }
    console.log(objetReponse);
    res.json({ reponse: true, detail: objetReponse });
};

// Pemret de retourner juste le nom des listes
export const nomListes = async (req, res) => {
    try {
        const listeBdd = await req.Liste.findAll({ where: { idUtilisateur: req.idUtilisateur } });
        // console.log(listeBdd);
        let tableauReponse = [];
        for (let liste in listeBdd) {
            tableauReponse.push(listeBdd[liste].nom);
        }
        return res.json({ reponse: true, detail: tableauReponse });
    } catch (erreur) {
        return res.json({ reponse: false, detail: "Erreur lors de la récupération des listes" });
    }
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

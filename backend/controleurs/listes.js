export const mesListes = async (req, res) => {
    console.log(req.idUtilisateur);
    const listeUtilisateur = await req.Liste.findAll({ where: { idUtilisateur: req.idUtilisateur } });

    res.json({ reponse: true, detail: listeUtilisateur });
};
export const ajouterListe = async (req, res) => {
    console.log(req.body);
    console.log(req.idUtilisateur);
    res.json({ reponse: true, detail: "test" });
};

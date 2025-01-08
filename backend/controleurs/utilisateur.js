export const pseudoDisponible = async (req, res) => {
    await req.Utilisateur.pseudoDisponible(req, res);
};
export const inscription = async (req, res) => {
    await req.Utilisateur.inscription(req, res);
};
export const connexion = async (req, res) => {
    await req.Utilisateur.connexion(req, res);
};
export const recuperationCookieAuth = (req, res) => {
    res.json({ reponse:true , detail: req.cookies.utilisateur ? true : false });
};

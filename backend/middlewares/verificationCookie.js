import jwt from "jsonwebtoken";
export const verificationCookie = (req, res, next) => {
    if (req.cookies.utilisateur != undefined) {
        jwt.verify(req.cookies.utilisateur, process.env.CHAINE_JWT, async (error, decoder) => {
            if (error) {
                res.clearCookie("utilisateur");
                return res.redirect("/");
            } else {
                const utilisateur = await req.Utilisateur.findByPk(decoder.id);
                if (utilisateur) {
                    req.idUtilisateur = decoder.id;
                    console.log("cookie ok")
                    next();
                } else {
                    res.clearCookie("utilisateur");
                    return res.redirect("/");
                }
            }
        });
    } else {
        next();
    }
};

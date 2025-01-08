export const accesibiliteBDD = (bdd) => {
    return (req, res, next) => {
        const { sequelize, Utilisateur, Liste } = bdd;

        req.Sequelize = sequelize;
        req.Utilisateur = Utilisateur;
        req.Liste = Liste;

        next();
    };
};

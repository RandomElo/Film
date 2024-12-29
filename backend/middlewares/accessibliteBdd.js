export const accesibiliteBDD = (bdd) => {
    return (req, res, next) => {
        const { sequelize, Utilisateur } = bdd;

        req.Sequelize = sequelize;
        req.Utilisateur = Utilisateur;

        next();
    };
};

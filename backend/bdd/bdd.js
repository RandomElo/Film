import { Sequelize } from "sequelize";
import Utilisateur from "../modeles/Utilisateur.js";
import Liste from "../modeles/Liste.js";

const sequelize = new Sequelize("bdd", process.env.BDD_UTILISATEUR, process.env.BDD_MDP, {
    dialect: "sqlite",
    storage: "./bdd.sqlite",
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});
const bdd = {
    sequelize,
    Utilisateur: Utilisateur(sequelize),
    Liste: Liste(sequelize),
};

// Relation Utilisateur -> Liste
bdd.Utilisateur.hasMany(bdd.Liste, {
    foreignKey: "idUtilisateur", // Champ de la table Image
    sourceKey: "id", // Champ de la table Utilisateur
});
bdd.Liste.belongsTo(bdd.Utilisateur, {
    foreignKey: "idUtilisateur", // Champ de la table Image
    targetKey: "id", // Champ de la table Utilisateur
});

bdd.sequelize.sync().catch((erreur) => {
    console.error(erreur);
});

export default bdd;

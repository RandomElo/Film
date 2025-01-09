import { DataTypes } from "sequelize";
export default function (bdd) {
    const Liste = bdd.define(
        "Listes",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idUtilisateur: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            nom: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            listeFilm: {
                type: DataTypes.JSON,
                defaultValue: [],
            },
        },
        {
            tableName: "Listes",
        }
    );
    Liste.creerListe = async function (req, res) {
        if (req.body.nomListe) {
            console.log(req.body.nomListe);
            console.log(req.idUtilisateur);
            req.Liste.create({ nom: req.body.nomListe, idUtilisateur: req.idUtilisateur });
        } else {
            return res.json({ reponse: false, detail: "Erreur lors de la création de la liste" });
        }
    };
    return Liste;
}

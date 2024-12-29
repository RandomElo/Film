import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { DataTypes } from "sequelize";

export default function (bdd) {
    const Utilisateur = bdd.define(
        "Utilisateurs",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nom: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true,
            },
            mdp: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM("visiteur", "editeur", "administrateur"),
                allowNull: false,
                defaultValue: "visiteur",
            },
            actif: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        },
        {
            tableName: "Utilisateurs",
        }
    );
    // Fonction qui permet de savoir si le mot de passe est disponible
    Utilisateur.pseudoDisponible = async function (req, res) {
        req.Utilisateur.findOne({
            where: {
                nom: req.params.nom,
            },
        }).then((utilisateur) => {
            return res.json(!utilisateur);
        });
    };

    // Permet d'enregistrer l'utilisateur dans le bdd
    Utilisateur.inscription = async function (req, res) {
        try {
            req.Utilisateur.findOne({ where: { nom: req.body.nom } }).then((utilisateur) => {
                if (utilisateur) {
                    return res.json({ connecte: false, erreur: "Nom déjà existant" });
                }
            });
            const mdpHash = await bcrypt.hash(req.body.mdp, 12);
            const utilisateur = await req.Utilisateur.create({
                nom: req.body.nom,
                mdp: mdpHash,
            });
            return await req.Utilisateur.generationToken(res, utilisateur);
        } catch (erreur) {
            console.error(erreur);
            return res.json({ connecte: false, erreur: erreur });
        }
    };
    Utilisateur.connexion = async function (req, res) {
        const utilisateur = await req.Utilisateur.findOne({ where: { nom: req.body.nom } });

        if (!utilisateur) {
            return res.json({ connecte: true, erreur: "Nom ou mot de passe incorrect" });
        }
        if (bcrypt.compare(req.body.mdp, utilisateur.mdp)) {
            return await req.Utilisateur.generationToken(res, utilisateur);
        } else {
            return res.json({ connecte: true, erreur: "Nom ou mot de passe incorrect" });
        }
    };
    Utilisateur.generationToken = async function (res, utilisateur) {
        try {
            const tokenJWT = jwt.sign({ id: utilisateur.id }, process.env.CHAINE_JWT, {
                expiresIn: "72h",
            });
            console.log("création du cookie");
            return res
                .cookie("utilisateur", tokenJWT, {
                    maxAge: 72 * 60 * 60 * 24 * 1000,
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                })
                .json({ connecte: true });
        } catch (error) {
            console.error(error);
        }
    };
    return Utilisateur;
}

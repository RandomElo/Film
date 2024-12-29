export default async function Fetch(url, methode, donnees = null) {
    try {
        const requete = await fetch(url, {
            method: methode,
            headers: methode != "GET" ? { "Content-Type": "application/json" } : {},
            credentials: "include",
            body: donnees ? JSON.stringify(donnees) : null,
        });
        if (requete.ok) {
            const reponse = await requete.json();
            return { erreur: false, reponse: reponse };
        } else {
            return { erreur: true, reponse: "Envoi de la requête" };
        }
    } catch (erreur) {
        return { erreur: true, reponse: erreur };
    }
}

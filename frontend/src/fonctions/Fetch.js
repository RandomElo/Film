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
            return { reponse: reponse.reponse, detail: reponse.messageErreur || reponse.detail };
        } else {
            console.error("Erreur lors de l'envoie de la requete");
            return { reponse: true, detail: "Envoi de la requête" };
        }
    } catch (erreur) {
        return { reponse: false, detail: erreur };
    }
}

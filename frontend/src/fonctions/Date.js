export default function Date(date) {
    const dateSplit = date.split("-");
    let mois = "";
    switch (dateSplit[1]) {
        case "01":
            mois = "janvier";
            break;
        case "02":
            mois = "février";
            break;
        case "03":
            mois = "mars";
            break;
        case "04":
            mois = "avril";
            break;
        case "05":
            mois = "mais";
            break;
        case "06":
            mois = "juin";
            break;
        case "07":
            mois = "juillet";
            break;
        case "08":
            mois = "août";
            break;
        case "09":
            mois = "septembre";
            break;
        case "10":
            mois = "octobre";
            break;
        case "11":
            mois = "novembre";
            break;
        case "12":
            mois = "décembre";
            break;
        default:
            mois = "mois invalide";
    }
    return dateSplit[2] + " " + mois + " " + dateSplit[0];
}

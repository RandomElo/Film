import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Notification.css";
export default function Notification({ message, type = "succes", duree = 3000, fermerNotification }) {
    const [visible, setVisible] = useState(false);
    console.log("je doit afficher une notif")
    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
            if (fermerNotification) fermerNotification();
        }, duree);
        return () => clearTimeout(timer);
    }, [duree, fermerNotification]);
    const evenementFermer = () => {
        setVisible(false);
        if (fermerNotification) fermerNotification();
    };
    return (
        <div className={`notification ${type} ${visible ? "visible" : ""}`}>
            <span>{message}</span>
            <button className="close-button" onClick={evenementFermer}>
                &times;
            </button>
        </div>
    );
}
Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string,
    duree: PropTypes.number,
    fermerNotification: PropTypes.func.isRequired,
};
/*
    const [afficherNotification, setAfficherNotification] = useState(false);
    {afficherNotification && <Notification message="Message" type="sucess" duree={3000} />}
    const AfficherNotification = () => {
        setAfficherNotification(true);
        setTimeout(() => setAfficherNotification(false), 3000);
    };
*/

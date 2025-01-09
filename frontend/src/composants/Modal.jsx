import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Modal.css";

export default function Modal({ estOuverte, fermerModal, children }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (estOuverte) {
            setTimeout(() => setVisible(true), 75); // Petit délai pour déclencher la transition
        } else {
            setVisible(false);
        }
    }, [estOuverte]);

    if (!estOuverte && !visible) return null;

    return (
        <div className="Modal">
            <div className={`container ${visible ? "active" : ""}`} onClick={fermerModal}>
                <div className="contenu" onClick={(e) => e.stopPropagation()}>
                    <button className="fermer" onClick={fermerModal}>
                        &times;
                    </button>
                    <div className="corps">{children}</div>
                </div>
            </div>
        </div>
    );
}
Modal.propTypes = {
    estOuverte: PropTypes.bool.isRequired,
    fermerModal: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

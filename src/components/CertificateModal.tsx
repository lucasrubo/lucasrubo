import React from "react";
import { createPortal } from "react-dom";

interface CertificateModalProps {
  url: string;
  name: string;
  onClose: () => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({
  url,
  name,
  onClose,
}) => {
  // O modal só é renderizado se chamado, não precisa de open
  return createPortal(
    <div
      className="modal-container certificate-modal"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 99999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        visibility: "visible",
        pointerEvents: "all",
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--eerie-black-2, #23232d)",
          borderRadius: "16px",
          padding: "2rem",
          maxWidth: "90vw",
          maxHeight: "90vh",
          position: "relative",
          color: "var(--white-2, #fff)",
          boxShadow: "var(--shadow-3, 0 16px 40px hsla(0,0%,0%,0.25))",
          pointerEvents: "all",
        }}
      >
        <button
          className="modal-close-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          &times;
        </button>
        <h3 className="modal-title">{name}</h3>
        <iframe
          src={url}
          title={name}
          width="100%"
          height="500px"
          style={{ border: 0, borderRadius: "10px", background: "#fff" }}
          allowFullScreen
        />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="external-link-btn"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(url, "_blank", "noopener,noreferrer");
          }}
        >
          Abrir em nova aba
        </a>
      </div>
    </div>,
    document.body
  );
};

export default CertificateModal;

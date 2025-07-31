import { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import PrintableResume from "./PrintableResume";
import { usePrintResume } from "../hooks/usePrintResume";

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function PrintModal({ isOpen, onClose }: PrintModalProps) {
  const { printRef, handlePrint } = usePrintResume();
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrintClick = async () => {
    setIsGenerating(true);
    try {
      await handlePrint();
    } catch (error) {
      console.error("Erro ao imprimir:", error);
      alert("Erro ao gerar impressão. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="print-modal-overlay" onClick={onClose}>
      <div className="print-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="print-modal-header">
          <h2></h2>
          <div className="print-modal-buttons">
            <button
              className="print-btn primary"
              onClick={handlePrintClick}
              disabled={isGenerating}
            >
              <IonIcon name="print-outline" />
              {isGenerating ? "Creating..." : "Print/Save PDF"}
            </button>
            <button className="print-btn secondary" onClick={onClose}>
              <IonIcon name="close-outline" />
              Close
            </button>
          </div>
        </div>

        <div className="print-modal-body">
          <div className="print-preview">
            <PrintableResume ref={printRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrintModal;

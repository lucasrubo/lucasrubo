import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export const usePrintResume = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Lucas Gabriel Rubo - Resume",
    pageStyle: `
      @page {
        size: A4;
        margin: 8mm;
      }
      @media print {
        body {
          font-size: 8pt !important;
          line-height: 1.2 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .printable-resume {
          padding: 4mm !important;
          margin: 0 !important;
          font-size: 8pt !important;
        }
        .print-content {
          gap: 8mm !important;
        }
        .print-section {
          margin-bottom: 4px !important;
          page-break-inside: avoid !important;
        }
        .print-timeline-item {
          margin-bottom: 2px !important;
          page-break-inside: avoid !important;
        }
        .page-break {
          page-break-before: always;
        }
      }
    `,
    onPrintError: (error) => {
      console.error("Print error:", error);
      alert("Erro ao imprimir. Tente novamente.");
    },
    onAfterPrint: () => {
      console.log("Print completed successfully");
    },
  });

  return { printRef, handlePrint };
};

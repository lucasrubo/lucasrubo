import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { Download, Eye, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PrintableResume from "@/components/PrintableResume";
import { Link } from "react-router-dom";

const ResumePage = () => {
  const { t } = useLanguage();
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Lucas_Rubo_Resume",
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
      }
    `,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Resume Display */}
      <div className="py-8 flex justify-center">
        <PrintableResume ref={resumeRef} />
      </div>
    </div>
  );
};

export default ResumePage;

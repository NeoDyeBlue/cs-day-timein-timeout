import jsPDF from "jspdf";
import "jspdf-autotable";

export function generatePDF(head, body, watermarkText) {
  const pdf = new jsPDF();

  pdf.text("Computer Science Students's Attendance", 14, 22);

  pdf.autoTable({
    head,
    body,
    startY: 30,
    addPageContent: (data) => {
      pdf.saveGraphicsState();
      pdf.setGState(new pdf.GState({ opacity: 0.25 }));
      pdf.setFontSize(50);
      pdf.setTextColor(150);
      pdf.text(
        watermarkText,
        pdf.internal.pageSize.width / 2,
        pdf.internal.pageSize.height / 2,
        {
          align: "center",
          //   angle: 30,
          baseline: "middle",
        }
      );
      pdf.restoreGraphicsState();
    },
  });

  // Save the PDF
  pdf.save("attendance.pdf");
}

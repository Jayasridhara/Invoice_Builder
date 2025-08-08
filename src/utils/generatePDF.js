// src/utils/generatePDF.js
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
const generatePDF = async (ref) => {
  const element = ref.current;
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2, // Retain a good scale for quality
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight(); // Get actual PDF page height

  // Define your desired margins in mm
  const marginX = 10; // 10mm left and right margin
  const marginY = 10; // 10mm top and bottom margin

  // Calculate the image dimensions adjusted for margins
  const imgWidth = pdfWidth - (2 * marginX);
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

  let positionY = marginY; // Starting Y position with top margin
  let heightLeft = imgHeight;

  // Add the first page with content
  pdf.addImage(imgData, 'PNG', marginX, positionY, imgWidth, imgHeight);
  heightLeft -= (pdfHeight - positionY); // Reduce remaining height by the visible area on the first page

  // Handle multiple pages if content overflows
  while (heightLeft > 0) {
    pdf.addPage();
    positionY = marginY; // Reset Y position for new page with top margin
    // Calculate the Y-offset for the next part of the image
    const cropY = imgHeight - heightLeft;
    
    // Calculate the height of the image to add on the current page
    const heightToAdd = Math.min(heightLeft, pdfHeight - (2 * marginY)); // Remaining height or available page height with margins
    
    // Add only the portion of the image that fits on the current page
    pdf.addImage(imgData, 'PNG', marginX, positionY, imgWidth, heightToAdd, null, null, cropY, 0); // Crop image for multi-page
    heightLeft -= heightToAdd; // Decrease remaining height
  }

  pdf.save(`invoice_${Date.now()}.pdf`);
};



export default generatePDF;

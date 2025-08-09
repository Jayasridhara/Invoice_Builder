
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

const generatePDF = async (ref) => {
  const element = ref.current;
  if (!element) return console.error("Missing element reference.");

    function cloneAndReplaceInputs(node) {
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      const span = document.createElement("span");
      span.textContent = node.value;
      span.className = node.className;
      span.style.cssText = window.getComputedStyle(node).cssText;
      span.style.display = "inline-block";
      span.style.width = `${node.offsetWidth}px`;
      span.style.height = `${node.offsetHeight}px`;
      return span;
    }
    const clone = node.cloneNode(false);
    node.childNodes.forEach(child =>
      clone.appendChild(cloneAndReplaceInputs(child))
    );
    return clone;
  }

  // Create off-screen container for capturing
  const clone = cloneAndReplaceInputs(element);
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.appendChild(clone);
  document.body.appendChild(container);

  // Screenshot the cloned version
  const canvas = await html2canvas(container, {
    scale: 3,
    useCORS: true,
    logging: false,
    width: clone.offsetWidth,
    height: clone.scrollHeight,
    letterRendering: true,
    
  });

  // Clean up
  document.body.removeChild(container);

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();
  const imgW = pdfW - 20;
  const imgH = (canvas.height * imgW) / canvas.width;

  let rendered = 0;
  while (rendered < imgH) {
    const drawH = Math.min(imgH - rendered, pdfH - 30);
    const srcY = (rendered / imgH) * canvas.height;

    pdf.addImage(
      imgData,
      'PNG',
      10, 15,
      imgW, drawH,
      undefined, 'FAST',
      0, srcY
    );

    rendered += drawH;
    if (rendered < imgH) pdf.addPage();
  }

const now = new Date();
const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
pdf.save(`invoice_${formattedDateTime}.pdf`);

};

export default generatePDF;

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
const generatePDF = async (ref) => {
  const element = ref.current;
  if (!element) return console.error("Missing element reference.");

  window.scrollTo(0, 0);

  function cloneAndReplaceInputs(node) {
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      const span = document.createElement("span");
      span.textContent = node.value;
      span.className = node.className;
      const style = window.getComputedStyle(node);
      span.style.cssText = style.cssText;
      span.style.display = "inline-block";
      span.style.width = `${node.offsetWidth}px`;
      span.style.height = `${node.offsetHeight}px`;
      span.style.verticalAlign = style.verticalAlign;
      return span;
    }
    const clone = node.cloneNode(false);
    for (const child of node.childNodes) {
      clone.appendChild(cloneAndReplaceInputs(child));
    }
    return clone;
  }

  const clone = cloneAndReplaceInputs(element);
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "0px";
  
  container.style.width = `${document.documentElement.clientWidth}px`; 
  document.body.appendChild(container);
  container.appendChild(clone);

  const canvas = await html2canvas(clone, { 
    scale: 3, 
    useCORS: true,
    logging: false,
    letterRendering: true,
    width: container.scrollWidth,
    height: container.scrollHeight,
    windowWidth: container.scrollWidth,
    windowHeight: container.scrollHeight,
  });

  document.body.removeChild(container);

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();

  const canvasAspectRatio = canvas.width / canvas.height;
  

  let imgW = pdfW - 20; 
  let imgH = imgW / canvasAspectRatio;

  if (imgH > pdfH - 2 * 15) { 
      imgH = pdfH - 2 * 15;
      imgW = imgH * canvasAspectRatio; 
  }

  const pageMargin = 15;


  pdf.addImage(imgData, 'PNG', (pdfW - imgW) / 2, pageMargin, imgW, imgH);

  const now = new Date();
  const formattedDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}_${String(now.getHours()).padStart(2, "0")}-${String(now.getMinutes()).padStart(2, "0")}`;
  pdf.save(`invoice_${formattedDateTime}.pdf`);
};

export default generatePDF;

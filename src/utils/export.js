import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function exportAsPng(elementId, filename = 'algovision-export.png') {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const canvas = await html2canvas(element, {
    backgroundColor: getComputedStyle(document.body).backgroundColor,
    scale: 2,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
  return true;
}

export async function exportAsPdf(elementId, filename = 'algovision-export.pdf') {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save(filename);
  return true;
}

export async function exportAsGif(elementId, filename = 'algovision-export.svg') {
  const element = document.getElementById(elementId);
  if (!element) return false;

  const canvas = await html2canvas(element, {
    backgroundColor: getComputedStyle(document.body).backgroundColor,
    scale: 1,
  });
  const image = canvas.toDataURL('image/png');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <style>
    image { animation: pulse 1.2s ease-in-out infinite alternate; transform-origin: center; }
    @keyframes pulse { from { opacity: .78; transform: scale(.995); } to { opacity: 1; transform: scale(1); } }
  </style>
  <rect width="100%" height="100%" fill="${getComputedStyle(document.body).backgroundColor}" />
  <image href="${image}" width="${canvas.width}" height="${canvas.height}" />
</svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const link = document.createElement('a');
  link.download = filename;
  link.href = URL.createObjectURL(blob);
  link.click();
  URL.revokeObjectURL(link.href);
  return true;
}

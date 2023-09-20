import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';

export const downloadPdf = (el: HTMLElement) => {
  html2canvas(el)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new JsPDF('p', 'mm', 'a4');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight() - 120;
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      doc.save('test.pdf');
      return 1;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
};

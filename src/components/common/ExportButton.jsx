import { useState } from 'react';
import { Download, Image, FileText } from 'lucide-react';
import { Button } from './Button';

export function ExportButton({ targetId = 'visualizer-export' }) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (type) => {
    setExporting(true);
    try {
      const { exportAsPng, exportAsPdf, exportAsGif } = await import('@/utils/export');
      if (type === 'png') await exportAsPng(targetId);
      if (type === 'pdf') await exportAsPdf(targetId);
      if (type === 'gif') await exportAsGif(targetId);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={() => handleExport('png')} disabled={exporting}>
        <Image className="h-4 w-4" />
        PNG
      </Button>
      <Button variant="secondary" size="sm" onClick={() => handleExport('pdf')} disabled={exporting}>
        <FileText className="h-4 w-4" />
        PDF
      </Button>
      <Button variant="ghost" size="sm" onClick={() => handleExport('gif')} disabled={exporting} title="Animated SVG export">
        <Download className="h-4 w-4" />
        GIF
      </Button>
    </div>
  );
}

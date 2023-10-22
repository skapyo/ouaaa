/* eslint-disable @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import XLSX from 'xlsx';
import pick from 'lodash/pick';

type ExportDataParams = {
  data: any[],
  columns?: string[],
  columnLabels?: string[],
  columnOptions?: any[],
  sheetName?: string,
  fileName?: string
}

const useExcelExport = () => {
  const exportData = useCallback((params: ExportDataParams) => {
    const { data, columns, columnLabels, columnOptions, sheetName, fileName } = params;
    let ws: any;
    let dataToExport = data;
    const XLSX = require('xlsx');
    /* Get specific columns */
    if (columns) {
      dataToExport = data.map(dataObject => pick(dataObject, columns));
    }

    if (columnLabels) {
      /* Create worksheet with custom headers */
      ws = XLSX.utils.aoa_to_sheet([columnLabels as any[]]);
      /* Add to the worksheet all values without header */
      XLSX.utils.sheet_add_json(ws, dataToExport, { origin: 'A2', skipHeader: true });
    } else {
      /* Create worksheet with key headers */
      ws = XLSX.utils.json_to_sheet(dataToExport, { cellDates: true });
    }

    if (columnOptions) {
      /* Specify column options */
      ws['!cols'] = columnOptions;
    }

    /* Create workbook */
    const wb = XLSX.utils.book_new();
    /* Add worksheet to workbook, with the name of worksheet */
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    /* Generate XLSX file with name of the file, and send to client */
    XLSX.writeFile(wb, `${fileName}.xlsx`, { cellDates: true });
  }, []);

  return exportData;
};

export default useExcelExport;

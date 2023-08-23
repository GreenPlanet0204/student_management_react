import { saveAs } from "file-saver";
import { Workbook } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { WorkbookSaveOptions } from "igniteui-react-excel";
import { WorkbookLoadOptions } from "igniteui-react-excel";
import { IgrExcelXlsxModule } from "igniteui-react-excel";
import { IgrExcelCoreModule } from "igniteui-react-excel";
import { IgrExcelModule } from "igniteui-react-excel";

IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();

const getExtension = (format) => {
  switch (format) {
    case WorkbookFormat.StrictOpenXml:
    case WorkbookFormat.Excel2007:
      return ".xlsx";
    case WorkbookFormat.Excel2007MacroEnabled:
      return ".xlsm";
    case WorkbookFormat.Excel2007MacroEnabledTemplate:
      return ".xltm";
    case WorkbookFormat.Excel2007Template:
      return ".xltx";
    case WorkbookFormat.Excel97To2003:
      return ".xls";
    case WorkbookFormat.Excel97To2003Template:
      return ".xlt";
    default:
      return;
  }
};

const load = (file) => {
  return new Promise((resolve, reject) => {
    ExcelUtility.readFileAsUint8Array(file).then(
      (a) => {
        Workbook.load(
          a,
          new WorkbookLoadOptions(),
          (w) => {
            resolve(w);
          },
          (e) => {
            reject(e);
          }
        );
      },
      (e) => {
        reject(e);
      }
    );
  });
};

const loadFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = (d) => {
      const data = new Uint8Array(req.response);
      Workbook.load(
        data,
        new WorkbookLoadOptions(),
        (w) => {
          resolve(w);
        },
        (e) => {
          reject(e);
        }
      );
    };
    req.send();
  });
};

const save = (workbook, fileNameWithoutExtension) => {
  return new Promise((resolve, reject) => {
    const opt = new WorkbookSaveOptions();
    opt.type = "blob";

    workbook.save(
      opt,
      (d) => {
        const fileExt = ExcelUtility.getExtension(workbook.currentFormat);
        const fileName = fileNameWithoutExtension + fileExt;
        saveAs(d, fileName);
        resolve(fileName);
      },
      (e) => {
        reject(e);
      }
    );
  });
};

const readFileAsUint8Array = (file) => {
  return new Promise()((resolve, reject) => {
    const fr = new FileReader();
    fr.onerror = (e) => {
      reject(fr.error);
    };

    if (fr.readAsBinaryString) {
      fr.onload = (e) => {
        const rs = fr?.resultString;
        const str = rs != null ? rs : fr.result;
        const result = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
          result[i] = str.charCodeAt(i);
        }
        resolve(result);
      };
      fr.readAsBinaryString(file);
    } else {
      fr.onload = (e) => {
        resolve(new Uint8Array(fr.result));
      };
      fr.readAsArrayBuffer(file);
    }
  });
};

export const ExcelUtility = {
  getExtension: getExtension,
  readFileAsUint8Array: readFileAsUint8Array,
  load: load,
  save: save,
  loadFromUrl: loadFromUrl,
};

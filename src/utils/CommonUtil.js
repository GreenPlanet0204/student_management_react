import jwt_decode from "jwt-decode";
import Constants from "./constants";
import CookieUtil from "./CookieUtil";
import { Workbook } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { WorksheetRegion } from "igniteui-react-excel";
import { ChartType } from "igniteui-react-excel";
import { IgrExcelXlsxModule } from "igniteui-react-excel";
import { IgrExcelCoreModule } from "igniteui-react-excel";
import { IgrExcelModule } from "igniteui-react-excel";
import { ExcelUtility } from "./ExcelUtility";

IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();

const is_date = (date) => {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return true;
  }
  return false;
};

const getTimeFromDate = (date) => {
  let dateObj = is_date(date) ? date : new Date(date);
  let hour = dateObj.getHours();
  let minute = dateObj.getMinutes();
  let meridian = "am";
  if (hour > 12) {
    hour -= 12;
    meridian = "pm";
  }
  if (hour === 0) {
    hour = 12;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return hour + ":" + minute + " " + meridian;
};

const getUserId = () => {
  let token = CookieUtil.getCookie(Constants.ACCESS_PROPERTY);
  if (token) {
    let decodedToken = jwt_decode(token);
    return decodedToken.userId;
  }
  return "";
};

const getFormatedChatUser = (chatUsers, onlineUserList) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  try {
    return chatUsers.reduce((acumulator, item) => {
      if (item.type === "DM" || item.type === "SELF") {
        let newResult = {};
        newResult["roomId"] = item.roomId;
        let member = null;
        for (let user of item.member) {
          if (user.id !== userId || item.type === "SELF") {
            member = user;
          }
        }
        if (member) {
          newResult["role"] = member.role;
          newResult["name"] = member.name;
          newResult["image"] = member.image;
          newResult["id"] = member.id;
          newResult["isOnline"] = onlineUserList?.includes(member.id);
        }
        acumulator.push(newResult);
        return acumulator;
      }
      return acumulator;
    }, []);
  } catch {}
};

const getActiveChatId = (params) => {
  return params ? params.chatId : null;
};

const exportExcel = (data, start, end, filename) => {
  const headers = Object.keys(data[0]);
  headers.pop();
  const wb = new Workbook(WorkbookFormat.Excel2007);
  const ws = wb.worksheets().add("Sheet1");
  ws.defaultColumnWidth = 200 * 20;
  const firstDataRow = 2;
  const headerRow = ws.rows(firstDataRow - 1);
  for (let c = 1; c < headers.length; c++) {
    headerRow.setCellValue(c - 1, headers[c]);
  }
  const xlRow1 = ws.rows(firstDataRow);
  xlRow1.setCellValue(0, new Date(start).toLocaleDateString());
  xlRow1.setCellValue(1, 0);
  for (let r = 0; r < data.length; r++) {
    const xlRow = ws.rows(r + firstDataRow + 1);
    const dataRow = data[r];
    xlRow.setCellValue(0, new Date(dataRow["date"]).toLocaleDateString());
    for (let c = 2; c < headers.length; c++) {
      xlRow.setCellValue(c - 1, dataRow[headers[c]]);
    }
  }

  const indexRow = firstDataRow - 1;
  const indexData = firstDataRow + data.length;
  const indexHeader = headers.length - 2;

  const tableRegion = new WorksheetRegion(
    ws,
    indexRow,
    0,
    indexData,
    indexHeader
  );
  ws.tables().add(tableRegion.toString(), true);
  ws.rows(0).height = 5000;
  const chart = ws
    .shapes()
    .addChart(
      ChartType.Line,
      ws.rows(0).cells(0),
      { x: new Date(start), y: 0 },
      ws.rows(0).cells(headers.length - 1),
      { x: new Date(end), y: 100 }
    );
  chart.setSourceData(`A3:B${data.length + 3}`, false);

  ExcelUtility.save(wb, filename);
};

const CommonUtil = {
  getTimeFromDate: getTimeFromDate,
  getUserId: getUserId,
  getFormatedChatUser: getFormatedChatUser,
  getActiveChatId: getActiveChatId,
  exportExcel: exportExcel,
};

export default CommonUtil;

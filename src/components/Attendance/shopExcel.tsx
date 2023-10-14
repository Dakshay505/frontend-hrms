
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import toast from "react-hot-toast";
function formatDateExcel(date: any) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
function extractTimeFromISOString(isoString:any) {
  if (!isoString) {
    return null;
  }

  const timePart = isoString.split('T')[1];
  const timeWithoutMilliseconds = timePart.split('.')[0]; 
  return timeWithoutMilliseconds;
}
export const exportShopToExcel = (items:any) => {
  if (items) {
    const columnOrder = [
      'Sr.no',
      'Date',
      'EmployeeCode',
      'Name',
      'JobProfile',
      'Group',
      'Shift',
      'PunchIn',
      'PunchOut',
      'Status',
      'Signature',
      'Shop Code',
      'Shop Name',
      ""
    ];
    let modifiedData:any=[]

    items.map((temp:any, index: number) => {
      modifiedData = temp?.attendance.map((record: any, index: number)=>{

      const mappedData = columnOrder.map((column) => {
        switch (column) {
          case 'Sr.no':
            return index + 1;
          case 'EmployeeCode':
            return record.employeeId.employeeCode;
          case 'Name':
            return record.employeeId.name;
          case 'Date':
            const date = new Date(record.date);
            const formattedDate = formatDateExcel(date);
            return formattedDate;
          case 'Shift':
            return record.shift;
          case 'PunchIn':
            const time = record.punches[0]?.punchIn.split('T')[1].split('.')[0];
            return time;
          case 'PunchOut':
            const time2 = record.punches.length > 0 ? extractTimeFromISOString(record.punches[record.punches.length - 1]?.punchOut) : null;
            return time2;
          case 'Status':
            return record.status;
          case 'JobProfile':
            return record.employeeId.jobProfileId.jobProfileName;
          case 'Group':
            return record.employeeId.groupId.groupName;
          case 'Shop Code':
            return  temp.shopCode ? temp.shopCode : "-";
          case 'Shop Name':
            return temp.shopName ? temp.shopName : "-";
          default:
            return '';
        }
      });

      return Object.fromEntries(mappedData.map((value, index) => [columnOrder[index], value]));
    })
    });
    console.log("item", modifiedData)
   

    const ws = XLSX.utils.json_to_sheet(modifiedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'attendance_data.xlsx');
    toast.success("CSV Download Successfully");
  }
};
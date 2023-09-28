import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

function Excel() {
  const [jsonData, setJsonData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://chawlacomponents.com/api/v2/attendance?limit=2000', { withCredentials: true });
      setJsonData(response.data.attendanceRecords);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const exportToExcel = () => {
    if (jsonData) {
      // Modify jsonData to include concatenated punches
      const modifiedData = jsonData.map((record:any) => ({
        ...record,
        punches: record.punches.map((punch:any) => `${punch.punchIn} - ${punch.punchOut || 'N/A'}`).join('\n'),
        employeeId:record.employeeId.name
      
    }));

      const ws = XLSX.utils.json_to_sheet(modifiedData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Attendance Data');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'attendance_data.xlsx');
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      <button onClick={exportToExcel} disabled={!jsonData}>
        Export to Excel
      </button>
      {jsonData && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
}

export default Excel;

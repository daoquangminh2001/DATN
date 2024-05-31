import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelUploader = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (files) => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Transform data, handling dates
      const transformedData = data.map((row, index) => {
        if (index === 0) {
          // Header row, keep it as is
          return row;
        }
        return row.map((cell, cellIndex) => {
          if (cellIndex === 6) {
            // Parse the NgaySinh field (assuming it's the 7th column)
            const date = new Date(cell);
            if (!isNaN(date.getTime())) {
              return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
            }
          }
          // Return the cell as is for other fields
          return cell;
        });
      });

      setExcelData(transformedData);
    };
    reader.readAsBinaryString(file);
  };

  const sendDataToAPI = () => {
    if (!excelData) return;

    let transformedData = [];
    excelData.forEach((item, index) => {
      if (index !== 0) {
        const guest = {
          MaKH: item[0],
          HoTen: item[1],
          CMT: item[2].toString(),
          GioiTinh: item[3],
          SDT: '0' + item[4],
          GhiChu: item.GhiChu || 'Không có ghi chú',
          isDelete: 'false',
          DiaChi: item[5],
          NgaySinh: item[6] || new Date(),
          CreateDate: new Date(),
          CreateBy: localStorage.getItem("EmployeeName"),
          ModifiedDate: new Date(),
          ModifiedBy: localStorage.getItem("EmployeeName"),
        };
        transformedData.push(guest);
      }
    });

    fetch('https://localhost:5001/api/v1/Guests/insertListGuest', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("Token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data uploaded successfully:', data);
    })
    .catch((error) => {
      console.error('Error uploading data:', error);
    });
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={(e) => handleFileUpload(e.target.files)} />
      <button onClick={sendDataToAPI} disabled={!excelData}>
        Upload thông tin khách hàng!
      </button>
    </div>
  );
};

export default ExcelUploader;

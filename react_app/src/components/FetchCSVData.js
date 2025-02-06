// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function FetchCSVData() {
//   const [csvData, setCsvData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchCSVData();
//   }, []);

//   const fetchCSVData = () => {
//     const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSN9qYza-MdxZdNBnWK58LbIFS6v6UIdYXPwrNgCewtPqVuYdt2g7HmzXXG9x6kshf_-8Cctgj2xTOp/pub?output=csv';

//     axios.get(csvUrl)
//       .then((response) => {
//         const parsedCsvData = parseCSV(response.data);
//         setCsvData(parsedCsvData);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching CSV data:', error);
//         setError('Failed to fetch CSV data');
//         setLoading(false);
//       });
//   };

//   function parseCSV(csvText) {
//     const rows = csvText.split(/\r?\n/);
//     const headers = rows[0].split(',');
//     const data = [];
//     for (let i = 1; i < rows.length; i++) {
//       const rowData = rows[i].split(',');
//       const rowObject = {};
//       for (let j = 0; j < headers.length; j++) {
//         rowObject[headers[j]] = rowData[j];
//       }
//       data.push(rowObject);
//     }
//     return data;
//   }

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h2>CSV Data</h2>
//       <table>
//         <thead>
//           <tr>
//             {csvData.length > 0 && Object.keys(csvData[0]).map((header, index) => (
//               <th key={index}>{header}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {csvData.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {Object.values(row).map((value, cellIndex) => (
//                 <td key={cellIndex}>{value}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect } from "react";
import axios from "axios";

export default function FetchCSVData({ setTreesData }) {
  useEffect(() => {
    fetchCSVData();
  }, []);

  const fetchCSVData = async () => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSN9qYza-MdxZdNBnWK58LbIFS6v6UIdYXPwrNgCewtPqVuYdt2g7HmzXXG9x6kshf_-8Cctgj2xTOp/pub?output=csv";

    try {
      console.log("Fetching CSV data...");
      const response = await axios.get(csvUrl);
      const parsedCsvData = parseCSV(response.data);
      setTreesData(parsedCsvData);

      // Debugging: Log the first tree entry to check column names
      if (parsedCsvData.length > 0) {
        console.log("Sample tree data:", parsedCsvData[0]);
      }
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    }
  };

  function parseCSV(csvText) {
    const rows = csvText.split(/\r?\n/);
    const headers = rows[0].split(",").map(header => header.trim()); // Trim headers
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const rowData = rows[i].split(",");
      if (rowData.length !== headers.length) continue; // Skip malformed rows

      const rowObject = {};
      for (let j = 0; j < headers.length; j++) {
        rowObject[headers[j]] = rowData[j].trim();
      }

      data.push(rowObject);
    }

    return data;
  }

  return null; // No UI needed, just loads data
}

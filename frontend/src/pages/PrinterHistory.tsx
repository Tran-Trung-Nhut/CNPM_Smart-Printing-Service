import { Column, HeaderGroup, Row, useTable } from "react-table"
import { useSidebar } from "../providers/SidebarContext";

interface PrinterHistoryData {
  name: string;
  printer_ID: string;     
  printing_date: string;   
  files: number;            
}

const data: PrinterHistoryData[] = [
  { name: "John Doe", printer_ID: "ds3a23", printing_date: "20/10/2024", files: 5 },
  { name: "Jane Smith", printer_ID: "ds3b45", printing_date: "20/10/2024", files: 2 },
  { name: "Alice Johnson", printer_ID: "ds3c67", printing_date: "23/10/2024", files: 3 },
  { name: "Michael Brown", printer_ID: "ds3d89", printing_date: "22/10/2024", files: 10 },
  { name: "Emily Davis", printer_ID: "ds3e12", printing_date: "10/10/2024", files: 7 }, 
  ];

const columns: Column<PrinterHistoryData>[] = [
    {
      Header: "Tên máy",
      accessor: "name", // Đây là khóa trong đối tượng data
    },
    {
      Header: "Mã số máy",
      accessor: "printer_ID",
    },
    {
      Header: "Ngày in",
      accessor: "printing_date",
    },
    {
      Header: "Số tệp in",
      accessor: "files",
    },
    {
      Header: "Tùy chọn", // Tiêu đề cột mới
      Cell: ({ row }: { row: Row<PrinterHistoryData> }) => (
        <div className="flex justify-center space-x-3">
          <button className="pi pi-info-circle" style={{color: ""}}/>
          <button className="pi pi-trash hover:scale-110" style={{color: "red"}}/>
        </div>
      ),
    },
  ];

export default function PrinterHistory() {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      }: any = useTable<PrinterHistoryData>({ columns, data });

    const {visible} = useSidebar();
    return (
      <div className={`${visible? 'pr-0': 'pr-2'} min-h-screen pt-[78px] font-mono ${visible? 'pl-[195px]': 'pl-[0px]'}`}>
        <div className={`border-2 shadow bg-white rounded ${visible? 'w-[1053px]': 'w-[1260px]'}  h-[600px]`}>
          <div className="pl-2 bg-white space-y-3 space-x-1 flex items-center justify-between">
            <div className="space-y-3 space-x-1 flex items-center">
                <input 
                type="text" 
                className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"
                placeholder="Nhập tên hoặc mã số máy"/>
                <button className="pi pi-search hover:scale-110 pb-2" style={{fontSize: "12px"}}/>
            </div>
            <div className="flex items-center justify-center space-x-2 pb-2 pr-2">
                <p>Từ</p>
                <input 
                type="date"
                className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"/>
                <p>đến</p>
                <input 
                type="date"
                className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"/>
            </div>
          </div>
          <table {...getTableProps()} className=" bg-white rounded w-full">
            <thead>
              {headerGroups.map((headerGroup: HeaderGroup<PrinterHistoryData>) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-2">
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: Row<PrinterHistoryData>) => {
                prepareRow(row);
                return (
                    <tr 
                    {...row.getRowProps()} 
                    className="text-center hover:bg-gray-300 border-b-[1px]"
                    style={{ lineHeight: "2" }}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                    </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center h-10 border-b-[0.5px]">
            <div className="flex justify-between w-[250px]">
              <button className="pi pi-arrow-left" />
              <button className="pi pi-arrow-right" />
            </div>
          </div> 
        </div>
      </div> 
    )
}
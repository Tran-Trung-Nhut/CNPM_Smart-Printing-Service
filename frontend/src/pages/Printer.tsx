import { Column, HeaderGroup, Row, useTable } from "react-table"
import { useSidebar } from "../providers/SidebarContext";

interface PrinterData {
  brand: string;
  printer_name: string; 
  printer_ID: string;       
  location: string;
  status: string            
}

const tmpNum = 1

const data: PrinterData[] = [
  { brand: "John Doe", printer_ID: "ds3a23", printer_name: "20/10/2024", location: "A3-HCMUT", status: "on" },
  { brand: "Jane Smith", printer_ID: "ds3b45", printer_name: "20/10/2024", location: "A3-HCMUT", status: "on" },
  { brand: "Alice Johnson", printer_ID: "ds3c67", printer_name: "23/10/2024", location: "A3-HCMUT", status: "off" },
  { brand: "Michael Brown", printer_ID: "ds3d89", printer_name: "22/10/2024", location: "A3-HCMUT", status: "off" },
  { brand: "Emily Davis", printer_ID: "ds3e12", printer_name: "10/10/2024", location: "A3-HCMUT", status: "on" }, 
  ];

const columns: Column<PrinterData>[] = [
    {
        Header: "Trạng thái",   
        Cell: ({ row }: { row: Row<PrinterData> }) => {
            const statusText = row.original.status === 'on'? "Hoạt động": "Đã dừng"
            return(
                <div className="flex justify-center">
                    <div className="flex space-x-3 justify-start w-[110px]">
                        <button className="pi pi-power-off hover:scale-110 active:scale-95" 
                        style={{color:row.original.status === 'on'? 'green':'red'}}
                        onClick={()=>{}}/>
                        <p 
                        className={`${row.original.status === 'on' ? 'text-green-700' : 'text-red-600'}`}>
                            {statusText}
                        </p>
                    </div>
                </div>
            )
        }
    },
    {
      Header: "Thương hiệu",
      accessor: "brand", // Đây là khóa trong đối tượng data
    },
    {
        Header: "Tên máy in",
        accessor: "printer_name",
      },
    {
      Header: "Mã số máy",
      accessor: "printer_ID",
    },
    {
      Header: "Địa chỉ",
      accessor: "location",
    },
    {
      Header: "Tùy chọn", // Tiêu đề cột mới
      Cell: ({ row }: { row: Row<PrinterData> }) => (
        <div className="flex justify-center space-x-3">
          <button className="pi pi-info-circle" style={{color: ""}}/>
          <button className="pi pi-trash hover:scale-110" style={{color: "red"}}/>
        </div>
      ),
    },
  ];

export default function Printer() {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      }: any = useTable<PrinterData>({ columns, data });

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
            <div className="flex items-center justify-center space-x-2 pb-2 pr-5">
                <button className="flex hover:scale-110 active:scale-90 justify-center items-center py-1 px-2 rounded space-x-1 bg-blue-500">
                    <i className="pi pi-print" style={{color: 'white'}}/>
                    <p className="text-white">Thêm máy in</p>
                </button>
            </div>
          </div>
          <table {...getTableProps()} className=" bg-white rounded w-full">
            <thead>
              {headerGroups.map((headerGroup: HeaderGroup<PrinterData>) => (
                <tr {...headerGroup.getHeaderGroupProps()} 
                className="border-2">
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: Row<PrinterData>) => {
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
              <div className="flex justify-center items-center">
                <input 
                type="text" 
                placeholder={tmpNum.toString()} 
                className="mt-1 size-6  text-center focus:border-gray-300"/>
                <p>/ {tmpNum} trang</p>
              </div>
              <button className="pi pi-arrow-right" />
            </div>
          </div> 
        </div>
      </div> 
    )
}
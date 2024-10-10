import { Column, HeaderGroup, Row, useTable } from "react-table"
import { useSidebar } from "../providers/SidebarContext";
import CreateNotification from "../components/CreateNotification";
import { useState } from "react";

interface PrinterHistoryData {
  subject: string;
  sender: string;     
  sending_date: string;   
  noreciever: number;            
}

const data: PrinterHistoryData[] = [
  { subject: "Inform", sender: "John Doe", sending_date: "20/10/2024", noreciever: 5 },
  { subject: "Warning", sender: "John Doe", sending_date: "20/10/2024", noreciever: 2 },
  { subject: "Warning", sender: "Alice Johnson", sending_date: "23/10/2024", noreciever: 3 },
  { subject: "Warning", sender: "Alice Johnson", sending_date: "22/10/2024", noreciever: 10 },
  { subject: "Inform", sender: "Alice Johnson", sending_date: "10/10/2024", noreciever: 7 }, 
  ];

const columns: Column<PrinterHistoryData>[] = [
    {
      Header: "Tiêu đề",
      accessor: "subject", // Đây là khóa trong đối tượng data
    },
    {
      Header: "Người gửi",
      accessor: "sender",
    },
    {
      Header: "Ngày gửi",
      accessor: "sending_date",
    },
    {
      Header: "Số người được gửi",
      accessor: "noreciever",
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

export default function Notifications() {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      }: any = useTable<PrinterHistoryData>({ columns, data });

    const {visible} = useSidebar();
    const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)

    const setIsOpen = (val: boolean) => {
        setIsOpenCreate(val)
    }

    return (
      <div className={`${visible? 'pr-0': 'pr-2'} min-h-screen pt-[78px] font-mono ${visible? 'pl-[195px]': 'pl-[0px]'}`}>
        <div className={`border-2 shadow bg-white rounded ${visible? 'w-[1053px]': 'w-[1260px]'}  h-[600px]`}>
          <div className="pl-2 bg-white space-y-3 space-x-1 flex items-center justify-between">
            <div className="space-y-3 space-x-1 flex items-center">
                <input 
                type="text" 
                className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"
                placeholder="Nhập tiêu đề thông báo"/>
                <button className="pi pi-search hover:scale-110 pb-2" style={{fontSize: "12px"}}/>
            </div>
            <div className="flex items-center justify-center space-x-2 pb-2">
                <p>Từ</p>
                <input 
                type="date"
                className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"/>
                <p>đến</p>
                <input 
                type="date"
                className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"/>
            </div>
            <div className="pr-4 flex items-center pb-2">
                <button 
                className="flex rounded justify-center hover:scale-110 active:scale-90 items-center bg-blue-500 space-x-1 px-2 py-1"
                onClick={() => setIsOpenCreate(true)}>
                    <i 
                    className="pi pi-envelope"
                    style={{color:'white'}}/>
                    <p className="text-white">Tạo thông báo</p>
                </button>
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
        <div>
            <CreateNotification isOpen={isOpenCreate} setIsOpen={setIsOpen}/>
        </div>
      </div> 
    )
}
import React, { useState } from "react";
import { Column, HeaderGroup, Row, useTable } from "react-table"
import { useSidebar } from "../providers/SidebarContext";

//Tối đa chỉ 15 records

interface StudentData {
  name: string;
  student_ID: string;     
  printing_time: number;   
  pages: number;            
}

const tmpNum = 1

const data: StudentData[] = [
  { name: "John Doe", student_ID: "ds3a23", printing_time: 35, pages: 5 },
  { name: "Jane Smith", student_ID: "ds3b45", printing_time: 15, pages: 2 },
  { name: "Alice Johnson", student_ID: "ds3c67", printing_time: 20, pages: 3 },
  { name: "Michael Brown", student_ID: "ds3d89", printing_time: 50, pages: 10 },
  { name: "Emily Davis", student_ID: "ds3e12", printing_time: 25, pages: 7 }, 
  { name: "John Doe", student_ID: "ds3a23", printing_time: 35, pages: 5 },
  { name: "Jane Smith", student_ID: "ds3b45", printing_time: 15, pages: 2 },
  { name: "Alice Johnson", student_ID: "ds3c67", printing_time: 20, pages: 3 },
  { name: "Michael Brown", student_ID: "ds3d89", printing_time: 50, pages: 10 },
  { name: "Emily Davis", student_ID: "ds3e12", printing_time: 25, pages: 7 }, 
  { name: "John Doe", student_ID: "ds3a23", printing_time: 35, pages: 5 },
  { name: "Jane Smith", student_ID: "ds3b45", printing_time: 15, pages: 2 },
  { name: "Alice Johnson", student_ID: "ds3c67", printing_time: 20, pages: 3 },
  { name: "Michael Brown", student_ID: "ds3d89", printing_time: 50, pages: 10 },
  { name: "Emily Davis", student_ID: "ds3e12", printing_time: 25, pages: 7 }, 
  ];

const columns: Column<StudentData>[] = [
    {
      Header: "Họ và tên",
      accessor: "name", // Đây là khóa trong đối tượng data
    },
    {
      Header: "MSSV",
      accessor: "student_ID",
    },
    {
      Header: "Số lần in",
      accessor: "printing_time",
    },
    {
      Header: "Số trang in còn lại",
      accessor: "pages",
    },
    {
      Header: "Tùy chọn", // Tiêu đề cột mới
      Cell: ({ row }: { row: Row<StudentData> }) => (
        <div className="flex justify-center space-x-3">
          <button className="pi pi-info-circle" style={{color: ""}}/>
        </div>
      ),
    },
  ];

export default function Student() {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      }: any = useTable<StudentData>({ columns, data });

    const {visible} = useSidebar();
    return (
      <div className={`${visible? 'pr-0': 'pr-2'} pt-[78px] font-mono ${visible? 'pl-[190px]': 'pl-[0px]'} min-h-screen`}>        
        <div className={`border-2 shadow bg-white rounded ${visible? 'w-[1050px]': 'w-[1260px]'}  h-[650px]`}>
          <div className="pl-2 bg-white space-y-3 space-x-1 flex items-center">
            <input 
            type="text" 
            className="border rounded bg-white shadow h-6 w-52 text-[12px]  focus:outline-none focus:border-gray-400"
            placeholder="Nhập tên hoặc MSSV"
           />
            <button className="pi pi-search hover:scale-110 pb-2" style={{fontSize: "12px"}}/>
          </div>
          <table {...getTableProps()} className=" bg-white rounded w-full">
            <thead>
              {headerGroups.map((headerGroup: HeaderGroup<StudentData>) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-2">
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                    ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: Row<StudentData>) => {
                prepareRow(row);
                return (
                    <tr {...row.getRowProps()} 
                    className="text-center border-b-[1px]"
                    style={{ lineHeight: "2" }}>
                        {row.cells.map(cell => (
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                    </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-center border-b-[0.5px] h-11">
            <div className="flex justify-between w-[250px] py-1">
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
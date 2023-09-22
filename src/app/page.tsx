"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { UserList } from "@/app/components/UserList";
import { columns } from "@/app/components/dataTable/columns"


export default function Home() {
  const [data, setData] = useState([])
 
  function padTo2Digits(num:number) {
    return num.toString().padStart(2, '0');
  }
  
  function convertMsToMinutesSeconds(milliseconds:number) {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.round((milliseconds % 60000) / 1000);
  
    return seconds === 60
      ? `${minutes + 1}:00`
      : `${minutes}:${padTo2Digits(seconds)}`;
  }
    useEffect(() => {
      setInterval(() => {
      fetch('/api/winners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(async (res) => {
       const winners = await  res.json()
       setData(winners)
      }
       )
      }, 3000)
    }, [])
  let i = 0;
    return (
   
        <UserList data={data} columns={columns}/>
      
  );
};
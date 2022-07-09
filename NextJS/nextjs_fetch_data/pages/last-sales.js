import React, { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";
export default function LastSalesPage() {
  const [sales, setSales] = useState();
  //   const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(
    "https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/sales.json",
    axios
  );
  console.log(data);
    
  useEffect(() => {
    const transformedSales = [];
    if (data) {
          for (const key in data.data) {
            transformedSales.push({
              id: key,
              username: data.data[key].username,
              volume: data.data[key].volume,
            });
          }
        setSales(transformedSales)
    }
        

  }, [data]);
  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-dummydb-61545-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }
  if (!data||!sales) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Failed to load.</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

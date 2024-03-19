import React, { useEffect, useState } from "react";
import { apiTotalByDay } from "../apis";
import { Line } from "react-chartjs-2";
import moment from "moment";

const TotalByDay = () => {
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [mapData, setMapData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchApiTotalByDay = async () => {
    try {
      const response = await apiTotalByDay({
        startDays: startDay,
        endDays: endDay,
      });
      setMapData(response.data.monthSales);
      setTotalRevenue(response.data.totalMonthSales);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };
console.log(mapData);
  const fetchDefaultData = async () => {
    try {
      const response = await apiTotalByDay();
      setMapData(response.data.monthSales);
      setTotalRevenue(response.data.totalMonthSales);
    } catch (error) {
      console.error("Something went wrong", error);
    }
  };

  useEffect(() => {
    if (!startDay && !endDay) {
      fetchDefaultData();
    } else if (startDay !== "" && endDay !== "") {
      fetchApiTotalByDay();
    }
  }, [startDay, endDay]);

  const revenueData =
    mapData?.length > 0 ? mapData.map((order) => order?.total) : [];

  const data = {};

  const monthDays = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];


  if (!startDay || !endDay) {
    data.labels = monthDays;

  } else {
    data.labels = mapData?.map((el) =>
      el.salesInfo.length > 0
        ? moment(el.salesInfo[0].orderDate).format("YYYY/MM/DD")
        : "N/A"
    );
  }

  data.datasets = [
    {
      label: "Total Revenue",
      data: revenueData,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      fill: true,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="px-2">
        <div className="bg-white">
          <div className="flex justify-center pt-2">
            <div className="flex gap-2">
              <input
                type="date"
                value={startDay}
                onChange={(e) => setStartDay(e.target.value)}
                className="border bg-gray-50 rounded-md p-1"
              />
              <input
                type="date"
                value={endDay}
                onChange={(e) => setEndDay(e.target.value)}
                className="border bg-gray-50 rounded-md p-1"
              />
            </div>
          </div>
          <div>
            <Line data={data} options={{ responsive: true }} />
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="bg-white px-2">
          <div className="h-[200px] w-full overflow-y-auto mt-2">
            <span className="text-lg font-semibold py-2 flex justify-between">
              <span>List of customers who made purchases during the day</span>
              <span className="flex gap-2">
                <p>Total revenue by day:</p>
                <p className="text-main">{totalRevenue} $</p>
              </span>
            </span>
            <table className="table border w-full mb-3 text-left">
              <thead>
                <tr>
                  <th className="border-l-4 pl-2 px-2 py-1">Name User</th>
                  <th className="border-l-4 pl-2 px-2 py-1">Status Payment</th>
                  <th className="border-l-4 pl-2 px-2 py-1">Status Order</th>
                  <th className="border-l-4 pl-2 px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {mapData?.map((el, index) => (
                  <tr className="border" key={index}>
                    <td className="p-2 border">
                      {el.salesInfo.length > 0
                        ? `${el.salesInfo[0].firstname} ${el.salesInfo[0].lastname}`
                        : "N/A"}
                    </td>
                    <td className="p-2 border">
                      {el.salesInfo.length > 0
                        ? el.salesInfo[0].statusPayment
                        : "N/A"}
                    </td>
                    <td className="p-2 border">
                      {el.salesInfo.length > 0
                        ? el.salesInfo[0].statusOrder
                        : "N/A"}
                    </td>
                    <td className="p-2 border">{el.total} $</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalByDay;

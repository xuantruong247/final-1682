import React, { Fragment, useEffect, useState } from "react";
import { apiRevenueDay } from "../apis";
import { Line } from "react-chartjs-2";

const TotalRevenue = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [orderList, setOrderList] = useState([]);

  const fetchData = async () => {
    const response = await apiRevenueDay({ day: selectedDay });
    setTotalRevenue(response.data.totalRevenue);
    setOrderList(response.data.orders);
  };

  // Xử lý dữ liệu cho biểu đồ
  const revenueData =
    orderList.length > 0 ? orderList.map((order) => order?.total) : [];

  const data = {
    labels: [
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
    ],
    datasets: [
      {
        label: "Total Revenue",
        data: revenueData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  useEffect(() => {
    fetchData();
  }, [selectedDay]);

  return (
    <div className="flex flex-col">
      <div className="px-2">
        <div className="bg-white">
          <div className="flex justify-center pt-2">
            <input
              type="date"
              value={selectedDay}
              onChange={(e) => {
                setSelectedDay(e.target.value);
              }}
              className="border bg-gray-50 rounded-md p-1"
            />
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
                {orderList.map((el, index) => (
                  <tr className="border" key={index}>
                    <td className="p-2 border">
                      {el.postedBy.firstname} {el.postedBy.lastname}
                    </td>
                    <td className="p-2 border">{el.statusPayment}</td>
                    <td className="p-2 border">{el.statusOrder}</td>
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

export default TotalRevenue;

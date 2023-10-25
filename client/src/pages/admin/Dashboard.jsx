import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import {
  TbCategory,
  TbBrandCodesandbox,
  TbBrandProducthunt,
} from "react-icons/tb";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  apiGetAllProducts,
  apiGetBrand,
  apiGetCategories,
  apiGetOrders,
  apiGetUsers,
  apiWeekSales,
} from "../../apis";
import moment from "moment";
import { FaMoneyCheckAlt } from "react-icons/fa";

const Dashboard = () => {
  const [productCount, setProductCount] = useState([]);
  const [chartProductData, setChartProductData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [blockedUserCount, setBlockedUserCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [getOrder, setGetOrder] = useState([]);
  const [brands, setBrands] = useState([]);
  const [top10Products, setTop10Products] = useState([]);
  const [weekSale, setWeekSale] = useState([]);
  const [getTableUser, setGetTableUser] = useState([]);
  const [totalWeek, setTotalWeek] = useState([]);

  const fetchAllProducts = async () => {
    const perPage = 12;
    let allProducts = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const resp = await apiGetAllProducts({ page, sort: "sold" });

      if (resp.data.counts) {
        const products = resp.data.products;
        allProducts = allProducts.concat(products);

        totalPages = Math.ceil(resp.data.counts / perPage);

        page++;
      } else {
        break;
      }
    }
    setProductCount(allProducts.length);
    setChartProductData(allProducts);

    const top10SellingProduct = allProducts.slice(0, 10);
    setTop10Products(top10SellingProduct);
  };

  const fetchAllUsers = async () => {
    let allUsers = [];
    const limit = 12;
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const resp = await apiGetUsers({ page });

      if (resp.data.counts) {
        const users = resp.data.users;
        allUsers = allUsers.concat(users);

        totalPages = Math.ceil(resp.data.counts / limit);

        page++;
      } else {
        break;
      }
    }
    setUserCount(allUsers.length);

    const blockedCount = allUsers.filter(
      (user) => user.isBlocked === true
    ).length;
    setBlockedUserCount(blockedCount);
    setActiveUserCount(allUsers.length - blockedCount);
  };

  const fetchCategories = async () => {
    const resp = await apiGetCategories();
    setCategories(resp.data.getProductsCategory);
  };

  const fetchBrands = async () => {
    const resp = await apiGetBrand();
    setBrands(resp.data.getBrandCategory);
  };

  const fetchOrder = async () => {
    const response = await apiGetOrders();
    setGetOrder(response.data);
  };

  const categoryCounts = {};

  chartProductData.forEach((item) => {
    const categoryTitle = item.category.title;
    if (categoryCounts.hasOwnProperty(categoryTitle)) {
      categoryCounts[categoryTitle]++;
    } else {
      categoryCounts[categoryTitle] = 1;
    }
  });

  // Chuyển dữ liệu từ object categoryCounts thành mảng để sử dụng cho biểu đồ
  const productByCategory = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Count product by category",
        data: Object.values(categoryCounts),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const userBlocks = {
    labels: ["Block", "Active"],
    datasets: [
      {
        data: [blockedUserCount, activeUserCount],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  const maxNameLength = 12;

  const productName = top10Products.map((product) => {
    if (product.title.length > maxNameLength) {
      return product.title.slice(0, maxNameLength) + "...";
    }
    return product.title;
  });

  const productSellCounts = top10Products.map((product) => product.sold);

  const top10SellProducts = {
    labels: productName,
    datasets: [
      {
        label: "Number of products sold",
        data: productSellCounts,
        backgroundColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const fetchApiWeekSale = async () => {
    const response = await apiWeekSales();
    const rawData = response.data.weekSale;
    setGetTableUser(response.data.weekSale);
    setTotalWeek(response.data);
    const DAYS = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const newData = DAYS.map((day) => {
      const foundDay = rawData.find(
        (item) => item._id === DAYS.indexOf(day) + 1
      );

      if (foundDay) {
        return {
          day,
          amount: foundDay.total / 100,
        };
      } else {
        return {
          day,
          amount: 0,
        };
      }
    });

    setWeekSale(newData);
  };
  const orderWeekSale = {
    labels: weekSale.map((data) => data.day),
    datasets: [
      {
        label: "Revenue every day of the week",
        data: weekSale.map((data) => data.amount),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.5,
      },
    ],
  };
  useEffect(() => {
    fetchAllProducts();
    fetchAllUsers();
    fetchCategories();
    fetchBrands();
    fetchOrder();
    fetchApiWeekSale();
  }, []);
  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="h-[60px] flex items-center text-2xl font-bold px-4 border-b border-sky-300">
        <span>Dashboard</span>
      </h1>
      <div className="grid grid-cols-5 gap-2 mx-2 mt-4 h-[100px]">
        <div className="border rounded-lg bg-white flex justify-between items-center px-4 ">
          <AiOutlineUsergroupAdd size={35} color="green" />
          <div className="flex flex-col gap-2 items-center justify-between">
            <h3>Users</h3>
            <h1 className="font-semibold text-lg">{userCount}</h1>
          </div>
        </div>
        <div className="border rounded-lg bg-white flex justify-between items-center px-4 ">
          <TbBrandProducthunt size={35} color="orange" />
          <div className="flex flex-col gap-2 items-center justify-between">
            <h3>Products</h3>
            <h1 className="font-semibold text-lg">{productCount}</h1>
          </div>
        </div>
        <div className="border rounded-lg bg-white flex justify-between items-center px-4 ">
          <TbCategory size={35} color="red" />
          <div className="flex flex-col gap-2 items-center justify-between">
            <h3>Categories</h3>
            <h1 className="font-semibold text-lg">{categories.length}</h1>
          </div>
        </div>
        <div className="border rounded-lg bg-white flex justify-between items-center px-4 ">
          <TbBrandCodesandbox size={35} color="blue" />
          <div className="flex flex-col gap-2 items-center justify-between">
            <h3>Brands</h3>
            <h1 className="font-semibold text-lg">{brands.length}</h1>
          </div>
        </div>
        <div className="border rounded-lg bg-white flex justify-between items-center px-4 ">
          <RiBillFill size={35} color="violet" />
          <div className="flex flex-col gap-2 items-center justify-between">
            <h3>Orders</h3>
            <h1 className="font-semibold text-lg">{getOrder.counts}</h1>
          </div>
        </div>
      </div>
      <div className="mx-2 bg-white">
        <Line data={orderWeekSale} height="100px" />
      </div>
      <div className="grid grid-cols-10 gap-2 mx-2">
        <div className="col-span-8 bg-white p-4">
          <span className="text-lg font-semibold">
            List of customers who made purchases during the week
          </span>
          <div className="h-[200px] w-full overflow-y-auto mt-2">
            <table className="table border w-full mb-3 text-left">
              <thead>
                <tr>
                  <th className="border-l-4 pl-2 px-2 py-1">Name User</th>
                  <th className="border-l-4 pl-2 px-2 py-1">Status Payment</th>
                  <th className="border-l-4 pl-2 px-2 py-1">Status Order</th>
                  <th className="border-l-4 pl-2 px-2 py-1">Total</th>
                  <th className="border-l-4 pl-2 px-2 py-1">CreatedAt</th>
                </tr>
              </thead>
              <tbody>
                {getTableUser.map((el) => (
                  <Fragment key={el._id}>
                    {el.salesInfo.map((item, index) => (
                      <tr className="border" key={index}>
                        <td className="p-2 border">
                          {item.firstname} {item.lastname}
                        </td>
                        <td className="p-2 border">{item.statusPayment}</td>
                        <td className="p-2 border">{item.statusOrder}</td>
                        <td className="p-2 border">{item.total}</td>
                        <td className="p-2 border">
                          {moment(item.orderDate).format("DD-MM-YYYY")}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-span-2 bg-white p-4">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <span className="text-lg font-semibold">Total income</span>
              <div className="border rounded-lg bg-gray-500 flex justify-between items-center px-4 text-white">
                <FaMoneyCheckAlt size={35} style={{ color: "#F3F0CA" }} />
                <div className="flex flex-col gap-2 items-center justify-between">
                  <h3>Total</h3>
                  <h1 className="font-semibold text-lg">
                    {getOrder.totalSum} $
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Total income per week</span>
              <div className="border rounded-lg bg-red-400 flex justify-between items-center px-4 text-white">
                <FaMoneyCheckAlt size={35} />
                <div className="flex flex-col gap-2 items-center justify-between">
                  <h3>Total</h3>
                  <h1 className="font-semibold text-lg">
                    {totalWeek.totalWeekSales} $
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mx-2">
        <div className="flex-7 bg-white">
          <div className="border-b h-[40px] px-4 flex items-center">
            <span className="text-lg font-semibold">Products by category</span>
          </div>
          <div className="min-h-[430px]">
            <Bar data={productByCategory} />
          </div>
        </div>
        <div className="flex-3 bg-white">
          <div className="border-b h-[40px] px-4 flex flex-col">
            <span className="text-lg font-semibold">
              Total number of active accounts
            </span>
            <canvas id="okCanvas2" width="400" height="100"></canvas>

            <Pie data={userBlocks} width="300px" height="200px" />
          </div>
        </div>
      </div>
      <div className="mx-2 bg-white py-4">
        <div className="border-b h-[40px] px-4 flex items-center">
          <span className="text-lg font-semibold">
            Top 10 most sold products
          </span>
        </div>
        <div className="pr-4 pl-8">
          <Bar data={top10SellProducts} height="100px" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

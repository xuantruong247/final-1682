import React, { useEffect, useState } from "react";
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
  apiGetUsers,
} from "../../apis";

const Dashboard = () => {
  const [productCount, setProductCount] = useState([]);
  const [chartProductData, setChartProductData] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [blockedUserCount, setBlockedUserCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [top10Products, setTop10Products] = useState([]);

  const fetchAllProducts = async () => {
    const perPage = 12; // Số lượng sản phẩm trên mỗi trang
    let allProducts = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const resp = await apiGetAllProducts({ page, sort: "sold" });

      if (resp.data.counts) {
        const products = resp.data.products;
        allProducts = allProducts.concat(products);

        // Tính tổng số trang dựa trên số lượng sản phẩm và số lượng sản phẩm trên mỗi trang
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

        // Tính tổng số trang dựa trên số lượng người dùng và số lượng người dùng trên mỗi trang
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

  useEffect(() => {
    fetchAllProducts();
    fetchAllUsers();
    fetchCategories();
    fetchBrands();
  }, []);

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
    labels: Object.keys(categoryCounts), // Tên các danh mục
    datasets: [
      {
        label: "Count product by category",
        data: Object.values(categoryCounts), // Số lượng sản phẩm cho từng danh mục
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
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.5,
      },
    ],
  };


  // const accountsCreateEveryDay = {

  // }

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
            <h1 className="font-semibold text-lg">300</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mx-2 mt-5">
        <div className="flex-7 bg-white">
          <div className="border-b h-[40px] px-4 flex items-center">
            <span className="text-lg font-semibold">Products by category</span>
          </div>
          <div className="min-h-[430px]">
            <Bar
              data={productByCategory}
            />
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
          <Line
            data={top10SellProducts}
            height="100px"
          />
        </div>
      </div>
      <div>order</div>
    </div>
  );
};

export default Dashboard;

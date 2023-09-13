import React, { useEffect, useState } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import {
  TbCategory,
  TbBrandCodesandbox,
  TbBrandProducthunt,
} from "react-icons/tb";
import { Bar } from "react-chartjs-2";
import {
  apiGetAllProducts,
  apiGetBrand,
  apiGetCategories,
  apiGetUsers,
} from "../../apis";

const Dashboard = () => {
  const [productCount, setProductCount] = useState([]);
  const [chartProductData, setChartProductData] = useState([]);
  const [userCount, setUserCount] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchAllProducts = async () => {
    const perPage = 12; // Số lượng sản phẩm trên mỗi trang
    let allProducts = [];
    let page = 1;
    let totalPages = 1;
  
    while (page <= totalPages) {
      const resp = await apiGetAllProducts({ page });
  
      if (resp.data.counts) {
        const products = resp.data.products;
        allProducts = allProducts.concat(products);
  
        // Tính tổng số trang dựa trên số lượng sản phẩm và số lượng sản phẩm trên mỗi trang
        totalPages = Math.ceil(resp.data.counts / perPage);
  
        page++;
      } else {
        break; // Kết thúc vòng lặp nếu không còn dữ liệu
      }
    }
  
    // Ở đây, allProducts chứa tất cả sản phẩm từ tất cả các trang
    setProductCount(allProducts.length);
    setChartProductData(allProducts);
  };
  

  const fetchUser = async () => {
    const resp = await apiGetUsers();
    setUserCount(resp.data.counts);
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
    fetchUser();
    fetchCategories();
    fetchBrands();
  }, []);

  // Khởi tạo đối tượng để lưu số lượng sản phẩm cho từng danh mục
  const categoryCounts = {};

  // Lặp qua toàn bộ danh sách sản phẩm và cập nhật số lượng sản phẩm cho từng danh mục
  chartProductData.forEach((item) => {
    const categoryTitle = item.category.title;
    if (categoryCounts.hasOwnProperty(categoryTitle)) {
      categoryCounts[categoryTitle]++;
    } else {
      categoryCounts[categoryTitle] = 1;
    }
  });

  // Chuyển dữ liệu từ object categoryCounts thành mảng để sử dụng cho biểu đồ
  const chartData = {
    labels: Object.keys(categoryCounts), // Tên các danh mục
    datasets: [
      {
        label: "Count product by category",
        data: Object.values(categoryCounts), // Số lượng sản phẩm cho từng danh mục
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: [
        {
          beginAtZero: true,
          title: {
            display: true,
            text: "Số lượng sản phẩm",
            font: {
              weight: "bold",
              size: 16,
            },
          },
        },
      ],
    },
  };

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
          <div className="h-[500px]">
            <Bar options={chartOptions} data={chartData} />
          </div>
        </div>
        <div className="flex-3 bg-slate-50">dasd</div>
      </div>
    </div>
  );
};

export default Dashboard;

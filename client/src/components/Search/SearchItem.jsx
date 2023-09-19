import React, { memo, useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { createSearchParams, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiGetAllProducts } from "../../apis";
import useDebounce from "../../hooks/useDebounce";
import path from "../../utils/path";

const SearchItem = ({
  name,
  activeClick,
  changeActiveFilter,
  type = "checkbox",
  onChangeCategoriesSelected,
  onChangBrandSelected,
}) => {
  const { categories } = useSelector((state) => state.category);
  const { brands } = useSelector((state) => state.brand);

  const [selected, setSelected] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [priceFormat, setPriceFormat] = useState(null);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const { category } = useParams();
  const navigate = useNavigate();
  const handleSeletec = (e) => {
    const alreadyEl = selected.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
  };

  const handleSeletedBrand = (e) => {
    const alreadyEl = selectedBrand.find((el) => el === e.target.value);
    if (alreadyEl)
      setSelectedBrand((prev) => prev.filter((el) => el !== e.target.value));
    else setSelectedBrand((prev) => [...prev, e.target.value]);
  };

  useEffect(() => {
    navigate({
      pathname: `/${path.PRODUCTS}`,
      search: createSearchParams({
        category: selected,
        brand: selectedBrand,
      }).toString(),
    });
    if (onChangeCategoriesSelected || onChangBrandSelected) {
      if (onChangeCategoriesSelected) {
        onChangeCategoriesSelected(selected);
      }
      if (onChangBrandSelected) {
        onChangBrandSelected(selectedBrand);
      }
    }
  }, [selected, selectedBrand]);

  const fetchBestPriceProduct = async () => {
    const response = await apiGetAllProducts({ sort: "price-desc" });
    if (response.data.products) {
      setPriceFormat(response.data.products[0].price);
    }
  };

  useEffect(() => {
    if (type === "input") {
      fetchBestPriceProduct();
    }
  }, [type]);

  const deboucePriceFrom = useDebounce(price.from, 1000);
  const deboucePriceTo = useDebounce(price.to, 1000);

  useEffect(() => {
    let data = {};

    if (Number(price.from) > 0) {
      data.userMinPrice = price.from;
    }
    if (Number(price.to) > 0) {
      data.userMaxPrice = price.to;
    }
    if (Number(price.from) > 0 || Number(price.to) > 0) {
      navigate({
        pathname: `/${path.PRODUCTS}`,
        search: createSearchParams(data).toString(),
      });
    }
  }, [deboucePriceFrom, deboucePriceTo]);

  return (
    <div
      onClick={() => {
        changeActiveFilter(name);
      }}
      className="p-3 text-sm relative border text-gray-500 border-gray-800 flex justify-between items-center gap-6 cursor-pointer"
    >
      <span className="capitalize">{name}</span>
      <BsChevronDown />
      {activeClick === name && (
        <div className="absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 border bg-white min-w-[150px]">
          {type === "checkbox" && (
            <div className="">
              <div
                onClick={(e) => e.stopPropagation()}
                className="p-4 items-center flex justify-center gap-8"
              >
                <span className="whitespace-nowrap">{`${selected.length} selected`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                    setSelectedBrand([])
                  }}
                  className="underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col"
              >
                {name == "Category" &&
                  categories &&
                  categories.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="checkbox"
                        value={item._id}
                        id={item._id}
                        onChange={handleSeletec}
                        checked={
                          selected.some((selected) => selected === item._id)
                            ? true
                            : false
                        }
                      />
                      <label
                        className="text-gray-700 cursor-pointer"
                        htmlFor={item.title}
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}

                {name == "Brand" &&
                  brands &&
                  brands.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="checkbox"
                        value={item._id}
                        id={item._id}
                        onChange={handleSeletedBrand}
                        checked={
                          selectedBrand.some(
                            (selectedBrand) => selectedBrand === item._id
                          )
                            ? true
                            : false
                        }
                      />
                      <label
                        className="text-gray-700 cursor-pointer"
                        htmlFor={item.title}
                      >
                        {item.title}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="p-4 items-center flex justify-center gap-8"
              >
                <span className="whitespace-nowrap">{`Giá cao nhất là : ${Number(
                  priceFormat
                ).toLocaleString()} VNĐ`}</span>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected([]);
                  }}
                  className="underline hover:text-main"
                >
                  Reset
                </span>
              </div>
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    type="number"
                    className="p-1 w-[90px] border "
                    id="from"
                    value={price.from}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    type="number"
                    className="p-1 w-[90px] border"
                    id="to"
                    value={price.to}
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(SearchItem);

import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
} from "react-router-dom";
import {
  ItemProduct,
  SearchItem,
  InputOptions,
  Pagination,
} from "../../components";
import { apiGetAllProducts } from "../../apis/product";
import Masonry from "react-masonry-css";
import { sorts } from "../../utils/contants";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const [categoriesId, setCategoriesId] = useState([]);
  const [products, setProducts] = useState(null);
  const [params] = useSearchParams();
  const [sort, setSort] = useState("");
  const navigate = useNavigate();

  const fetchProductByCategory = async (queries) => {
    const response = await apiGetAllProducts(queries);
    if (response?.data) {
      setProducts(response?.data);
    }
  };

  const { category } = useParams();
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    console.log(queries);
    const arrCategoriesId = categoriesId.join(",");
    queries.categoriesId = arrCategoriesId;
    if (queries.from) {
      queries.price = { gte: queries.from };
      delete queries.from;
    }
    if (queries.to) {
      queries.price = { lte: queries.to };
      delete queries.to;
    }
    console.log(queries);
    fetchProductByCategory(queries);
    window.scrollTo(0, 0);
  }, [params]);

  const [activeClick, setActiveClick] = useState(null);
  const changeActiveFilter = useCallback(
    (name) => {
      if (activeClick === name) setActiveClick(null);
      else setActiveClick(name);
    },
    [activeClick]
  );

  const onChangeCategoriesSelected = (data) => {
    console.log(data);
    setCategoriesId(data);
  };

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({
          sort,
        }).toString(),
      });
    }
  }, [sort]);

  return (
    <div className="w-full">
      <div className="h-[81px] flex  items-center justify-center bg-gray-100">
        <div className="w-main">
          <h3 className="font-medium uppercase">Product</h3>
        </div>
      </div>
      <div className="w-main border p-4 flex m-auto justify-between">
        <div className="w-4/5 flex-auto flex flex-col gap-3">
          <span className="font-semibold text-sm">Filter By</span>
          <div className="flex items-center gap-4">
            <SearchItem
              name="Price"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="input"
            />
            <SearchItem
              name="Brand"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="checkbox"
            />
            <SearchItem
              name="Category"
              activeClick={activeClick}
              changeActiveFilter={changeActiveFilter}
              type="checkbox"
              onChangeCategoriesSelected={onChangeCategoriesSelected}
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-3 ">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <InputOptions
              value={sort}
              changeValue={changeValue}
              Options={sorts}
            />
          </div>
        </div>
      </div>
      <div className="w-main mt-8 m-auto h-[1250px]">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex mx-[-8px]"
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((item, index) => (
            <ItemProduct
              key={index}
              pid={item.pid}
              productData={item}
              normal={true}
            />
          ))}
        </Masonry>
      </div>
      <div className="w-main m-auto my-4 flex justify-center">
        <Pagination totalCount={products?.counts} />
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default Products;

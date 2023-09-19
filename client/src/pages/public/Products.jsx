import React, { useCallback, useEffect, useState } from "react";
import {
  useParams,
  useSearchParams,
  useNavigate,
  createSearchParams,
  useRoutes,
} from "react-router-dom";
import {
  ItemProduct,
  SearchItem,
  InputOptions,
  Pagination,
  Breakcrumb,
} from "../../components";
import { apiGetAllProducts } from "../../apis/product";
import Masonry from "react-masonry-css";
import { sorts } from "../../utils/contants";
import path from "../../utils/path";
import { AiOutlineRight } from "react-icons/ai";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const [categoriesId, setCategoriesId] = useState([]);
  const [brandId, setBrandId] = useState([]);

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


  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    const arrCategoriesId = categoriesId.join(",");
    queries.categoriesId = arrCategoriesId;

    const arrBrandId = brandId.join(",");
    queries.brandId = arrBrandId;

    if (queries.from) {
      queries.price = { gte: queries.from };
      delete queries.from;
    }
    if (queries.to) {
      queries.price = { lte: queries.to };
      delete queries.to;
    }
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
    setCategoriesId(data);
  };

  const onChangBrandSelected = (data) => {
    setBrandId(data);
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
        pathname: `/${path.PRODUCTS}`,
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
          <h3 className="font-medium">Products</h3>
          <span className="flex gap-1">
            <Breakcrumb />
            <span className="flex items-center gap-1 text-sm">
              <AiOutlineRight size={10} />
              Product
            </span>
          </span>
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
              onChangBrandSelected={onChangBrandSelected}
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
    </div>
  );
};

export default Products;

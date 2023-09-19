import React from "react";
import {
  Banner,
  Sidebar,
  BestSeller,
  DealDaily,
  FeatureProducts,
  BlogsComponent,
} from "../../components";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet title="Perfume Since 2001 | Store Perfume" />
      <div className="w-main flex flex-col mt-6">
        <div className=" flex w-full gap-2">
          <div className="w-[75%]">
            <Banner />
          </div>
          <div className="w-[25%]">
            <Sidebar />
          </div>
        </div>
        <div className=" flex w-full  mt-8 gap-2">
          <div className="w-[25%]">
            <DealDaily />
          </div>
          <div className="w-[75%]">
            <BestSeller />
          </div>
        </div>
      </div>
      <div className="my-8 w-main m-auto">
        <FeatureProducts />
      </div>
      <div className="my-8 w-main m-auto">
        <BlogsComponent />
      </div>
    </>
  );
};

export default Home;

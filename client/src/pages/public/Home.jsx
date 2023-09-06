import React from "react";
import {
  Banner,
  Sidebar,
  BestSeller,
  DealDaily,
  FeatureProducts,
  Blogs,
} from "../../components";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet title="Perfume Since 2001 | Store Perfume" />
      <div className="w-main flex mt-6">
        <div className=" flex flex-col gap-5 w-[25%] flex-auto ">
          <Sidebar />
          <DealDaily />
        </div>
        <div className=" flex flex-col gap-5 pl-5 w-[75%] flex-auto ">
          <Banner />
          <BestSeller />
        </div>
      </div>
      <div className="my-8 w-main m-auto">
        <FeatureProducts />
      </div>
      <div className="my-8 w-main m-auto">
        <Blogs />
      </div>
    </>
  );
};

export default Home;

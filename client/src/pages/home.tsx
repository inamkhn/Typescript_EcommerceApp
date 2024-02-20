import React from "react";
import coverimg from "../assets/shoesImg.jpg";
import ProductCart from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productApi";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";

const Home = () => {

    const {data} =  useLatestProductsQuery("")
    console.log(data?.product)
  const cardItems = [
    {
      id: 1,
      image:
        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      name: "Nike Shoes",
      price: 20,
    },
    {
      id: 2,
      image:
        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      name: "Nike Jordon",
      price: 200,
    },
    {
      id: 3,
      image:
        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      name: "addidas Shoes",
      price: 120,
    },
    {
      id: 4,
      image:
        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      name: "New Nike Jordon",
      price: 220,
    },
    {
      id: 4,
      image:
        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      name: "New Nike Jordon",
      price: 220,
    },
    {
      id: 4,
      image:
        "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
      name: "New Nike Jordon",
      price: 220,
    },
  ];
  return (
    <div className="mx-14">
      <div className="flex justify-center items-center">
        <img src={coverimg} className="w-[900px] h-[350px] object-center" />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-2xl mt-2 font-semibold">Latest Products</p>
        <p className="text-xl mt-2 font-normal mr-3">more</p>
      </div>

      <div className="grid sm:grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-4">
        {cardItems.map((item, index) => {
          return (
            <>
              <div key={index}>
                <ProductCart {...item} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

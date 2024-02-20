import React from "react";
import ProductCart from "../components/product-card";

const search = () => {
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
    <div className="mx-16">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3 space-y-4 mt-3">
          <div>
            <p className="p-1">Sort</p>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
          <div>
            <p className="p-1">Price</p>
            <input
              type="range"
              min={0}
              max="100"
              value="40"
              className="range"
            />
          </div>
          <div>
            <p className="p-1">Category</p>
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Who shot first?
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
        </div>
        {/* products */}
        <div className="col-span-9">
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-3">
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
      </div>
    </div>
  );
};

export default search;

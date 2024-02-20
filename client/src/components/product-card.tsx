import React from "react";
import { Link } from "react-router-dom";

interface ItemsProps {
  id: number;
  image: string;
  name: string;
  price: number;
}

const productcard = ({ id, image, name, price }: ItemsProps) => {
  return (
    <div>
      <div className="card card-compact w-72 bg-base-100 shadow-xl my-4">
        <figure>
          <img src={image} alt="Shoes" className="" />
        </figure>
        <div className="card-body">
          <Link to="/cart">
            <h2 className="card-title">{name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <p>Price $-{price}</p>
          </Link>
          {/* <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default productcard;

import React from "react";
import coverimg from "../assets/shoesImg.jpg";
import { FaRegTrashCan } from "react-icons/fa6";

const cart = () => {
  return (
    <div className="mx-16 mt-6">
      <div className="grid grid-cols-12 gap-1">
        {/* product list */}
        <div className="col-span-9">
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                {/* row 1 */}
                <tr>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-20 h-20">
                          <img
                            src={coverimg}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">Hart Hagerty</div>
                        <div className="text-sm opacity-50">$100</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <button className="bg-gray-400 px-2 rounded-md">-</button>
                      <p>12</p>
                      <button className="bg-gray-400 px-2 rounded-md">+</button>
                    </div>
                  </td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      <FaRegTrashCan className="text-lg text-red-400" />
                    </button>
                  </th>
                </tr>
                {/* row 2 */}
              </tbody>
            </table>
          </div>
        </div>
        {/* cart */}
        <div className="col-span-3">
          <div className="card w-60 bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
              <p>SubTotal: $100</p>
              <p>Shipping Charges: $10</p>
              <p>Tax: $5</p>
              <p>Discount: $10</p>
              <p className="font-bold">Total: $100</p>

              <label className="form-control w-full max-w-xs">
                <input
                  type="text"
                  placeholder="Coupon"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <button className="btn btn-success w-full">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cart;

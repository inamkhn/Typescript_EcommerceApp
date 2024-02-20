import React from "react";

const orders = () => {
  return (
    <div className="px-60">
      <p className="text-3xl font-semibold py-2">MY ORDERS</p>
      <div className="overflow-x-auto ">
        <p className="text-center text-2xl font-semibold py-2">ORDERS</p>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>43sda224s214b</th>
              <td>2</td>
              <td>499</td>
              <td>5000</td>
              <td>
                <p className="text-red-400">processing</p>
              </td>
              <td>
                <button className="text-white bg-blue-500 px-2 py-1 rounded-md">
                  View
                </button>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>43sda224s214b</th>
              <td>2</td>
              <td>499</td>
              <td>5000</td>
              <td>
                <p className="text-red-400">processing</p>
              </td>
              <td>
                <button className="text-white bg-blue-500 px-2 py-1 rounded-md">
                  View
                </button>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>43sda224s214b</th>
              <td>2</td>
              <td>499</td>
              <td>5000</td>
              <td>
                <p className="text-red-400">processing</p>
              </td>
              <td>
                <button className="text-white bg-blue-500 px-2 py-1 rounded-md">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default orders;

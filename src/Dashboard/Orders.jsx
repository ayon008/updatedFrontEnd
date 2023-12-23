import React, { useEffect, useState } from "react";
import DashboardResponsive from "./DashboardResponsive";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Orders = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_DataHost}/Orders`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_DataHost}/Orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        setOrder((prevOrder) => prevOrder.filter((item) => item._id !== id));

        Swal.fire({
          title: "Order Deleted Successful!",
          text: "",
          icon: "success",
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const productName =
    order.length > 0 && order[0].Product_Name
      ? order[0].Product_Name.split(" ").slice(0, 3).join(" ")
      : "";

  return (
    <div className="flex">
      <div>
        <DashboardResponsive></DashboardResponsive>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Brand_Name</th>
                <th>Product Code</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {order?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item?.Doc_1_PC} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{productName}</div>
                        <div className="text-sm opacity-50">
                          {item?.Brand_Name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{item?.Product_Code}</td>
                  <td>Purple</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;

import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthProvider";
import axios from "axios";

const Buy_Now = () => {
  const data = useLoaderData();
  const { Product_Name, Price, Doc_1_PC, Product_Code, Brand_Name } = data;
  const { user, loading } = useContext(AuthContext);

  const [deliveryOption, setDeliveryOption] = useState("DJI");
  const [formData, setFormData] = useState({
    YourName: "",
    YourMobileNumber: "",
    YourFullAddress: "",
    UserEmail: user?.email,
    Doc_1_PC,
    Product_Name,
    Brand_Name,
    Product_Code,
  });

  const handleDeliveryChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const calculateTotal = () => {
    const deliveryCharge = deliveryOption === "DJI" ? 60 : 120;
    return Price + deliveryCharge;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.UserEmail) {
      console.error("UserEmail is undefined. Form submission aborted.");
      return;
    }

    const totalPrice = calculateTotal();

    // console.log("Form Data:", {
    //   ...formData,
    //   DeliveryCharge: deliveryOption === "DJI" ? 60 : 120,
    //   TotalPrice: totalPrice,
    // });

    const orderData = {
      ...formData,
      DeliveryCharge: deliveryOption === "DJI" ? 60 : 120,
      TotalPrice: totalPrice,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DataHost}/Orders`,
        orderData
      );

      Swal.fire({
        title: "Order Successful!",
        text: "Thank you for your order. We will process it soon.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error submitting order:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to submit order. Please try again later.",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="md:max-w-[1220px] mx-auto px-2 md:px-0 pt-5 md:pt-0">
      <form onSubmit={handleFormSubmit}>
        <section className="flex flex-col md:flex-row justify-between md:gap-x-4 gap-y-5">
          <section className="md:w-[50%] bg-slate-0 md:p-4 bg-white">
            <p className="text-center text-[18px] py-7">
              To confirm the order, enter your name, address, mobile number, and
              click on the{" "}
              <span className="text-primaryColor1">confirm order</span> button
            </p>
            <section className="flex flex-col gap-y-4">
              <div>
                <p className="pl-[5px]">Your Name</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Your Name"
                  type="text"
                  required
                  name="YourName"
                  value={formData.YourName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="pl-[5px]">Your Mobile Number</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Your Mobile Number"
                  type="text"
                  required
                  name="YourMobileNumber"
                  value={formData.YourMobileNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <p className="pl-[5px]">Your Full Address</p>
                <input
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-2 pl-[8px] mt-1"
                  placeholder="Enter Your Full Address"
                  type="text"
                  required
                  name="YourFullAddress"
                  value={formData.YourFullAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <p className="pl-[5px]">Delivery charge:</p>
                <select
                  className="w-full outline-none border-[1.2px] border-[#ced4da] rounded-[4px] py-3 pl-[8px] mt-1"
                  name="select"
                  required
                  id="select"
                  onChange={handleDeliveryChange}
                  value={deliveryOption}
                >
                  <option value="DJI">Inside Dhaka (60 Tk.)</option>
                  <option value="Parrot">Outside Dhaka (120 Tk.)</option>
                </select>
              </div>
              <input
                type="submit"
                value="Order Now"
                className="w-full py-3 bg-orange-500 rounded-[3px] cursor-pointer"
              />
            </section>
          </section>
          <section className="md:w-[50%] bg-white md:p-4 md:pt-0 py-4 md:py-0">
            <p className="text-[18px] text-center md:text-left">Your Order</p>
            <div className="flex justify-between items-center pt-5 md:gap-x-4 gap-x-2">
              <div className="w-[20%]">
                <img
                  className="w-[90px] h-[60px] md:w-[80px] md:h-[80px] rounded-[2px]"
                  src={Doc_1_PC}
                  alt=""
                />
              </div>
              <div className="w-[70%] font-serif text-[10.5px] md:text-[14px]">
                {Product_Name}
              </div>
              <div className="w-[10%] text-right">
                <p>TK</p> <p>{Price}</p>
              </div>
            </div>
            <hr className="mt-3 border-t-2" />
            <div className="flex gap-y-2 flex-col mt-10">
              <div className="flex justify-between">
                <p className="font-bold">Total:</p>
                <p className="font-bold">
                  <span className="font-semibold">TK</span> {Price}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold">Delivery charge:</p>
                <p className="font-bold text-orange-600">
                  <span className="font-semibold">TK</span>{" "}
                  {deliveryOption === "DJI" ? 60 : 120}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-bold text-[18px]">Total:</p>
                <p className="font-bold text-[19.2px]">TK {calculateTotal()}</p>
              </div>
            </div>
          </section>
        </section>
      </form>
    </div>
  );
};

export default Buy_Now;

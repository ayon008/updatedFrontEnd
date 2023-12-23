import React, { useContext } from "react";
import { Link, useLoaderData } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { AuthContext } from "../../Contexts/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import useCart from "../SharedComponents/Header/useCart";

const Chackout = () => {
  const { user } = useContext(AuthContext);
  const [, , refetch] = useCart();
  const data = useLoaderData();
  const {
    _id,
    Product_Name,
    Brand_Name,
    Product_Code,
    Price,
    Price_Without_Discount,
    Available_Size,
    Color_Variants,
    Commission,
    Product_Description,
    Doc_1_PC,
    Doc_2_PC,
    Doc_3_PC,
  } = data;

  const productWithoutId = {
    Product_Name,
    Brand_Name,
    Product_Code,
    Price,
    Price_Without_Discount,
    Available_Size,
    Color_Variants,
    Commission,
    Product_Description,
    Doc_1_PC,
    Doc_2_PC,
    Doc_3_PC,
    userEmail: user?.email,
  };

  const handleAddToCartSave = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DataHost}/ProductAddToCart`,
        productWithoutId
      );

      if (response.data && response.data.code === 11000) {
        refetch();
        Swal.fire({
          title: "Item already in the cart!",
          text: "You can update the quantity in the cart.",
          icon: "info",
        });
      } else {
        Swal.fire({
          title: "Add To Cart Successful!",
          text: "Thank you",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      console.error("Error submitting order:", error);

      Swal.fire({
        title: "Error!",
        text: "Failed to submit Add to cart. Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <section className="md:max-w-[1220px] mx-auto px-3 md:px-0">
      <section className="flex justify-center pt-6">
        <div className="flex flex-col mx-1 md:mx-0  md:flex-row gap-x-6">
          <div className="flex justify-center">
            <div className="w-[330px]">
              <Carousel showArrows={true}>
                <div>
                  <img
                    className="md:rounded-[0px]"
                    src={Doc_1_PC && Doc_1_PC}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="md:rounded-[0px]"
                    src={Doc_2_PC && Doc_2_PC}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="md:rounded-[0px]"
                    src={Doc_3_PC && Doc_3_PC}
                    alt=""
                  />
                </div>
              </Carousel>
            </div>
          </div>
          <div className="py-6 md:py-0">
            <p className="md:text-[22px] text-[15px] text-[#212121] md:max-w-[650px] font-semibold text-justify">
              {Product_Name}
            </p>
            <div className="flex gap-x-3 mt-5">
              <p>
                <span className="text-[#444] text-[14px]">Brand:</span>{" "}
                <span className="text-[#1a9cb7] cursor-pointer text-[14px]">
                  {Brand_Name && Brand_Name}
                </span>
              </p>
              <p>
                <span className="text-[#444] text-[14px]">Code:</span>{" "}
                <span className="text-[#1a9cb7] cursor-pointer text-[14px]">
                  {Product_Code && Product_Code}
                </span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-x-3 ">
              <p>
                <span className="text-[#444] text-[14px]">Available Size:</span>{" "}
                <span className="text-[#1a9cb7] cursor-pointer text-[14px]">
                  {Available_Size && Available_Size}
                </span>
              </p>
              <p>
                <span className="text-[#444] text-[14px]">Color Varient:</span>{" "}
                <span className="text-[#1a9cb7] cursor-pointer text-[14px]">
                  {Color_Variants && Color_Variants}
                </span>
              </p>
            </div>
            <div className="md:mt-3 mt-1 md:w-[650px]">
              <div>
                <p>Additional Details :</p>
                <p className="text-[#1a9cb7] cursor-pointer text-[14px] text-justify">
                  {Product_Description && Product_Description}
                </p>
              </div>
            </div>
            <div className="pt-5">
              <p className="text-primaryColor1 text-[18px]  md:text-[29px] font-normal">
                ৳ {Price && Price}
              </p>
              <p className="text-[13px]">
                <span className="line-through text-slate-400">
                  ট{Price_Without_Discount && Price_Without_Discount}{" "}
                </span>
                <span className="pl-1"> -{Commission}%</span>{" "}
              </p>
            </div>
            <div class="">
              <span class="text-[25px] bg-[#eff0f5] text-[#9e9e9e] cursor-pointer px-2">
                -
              </span>
              <input
                className="text-center w-[10%] mx-3"
                type="text"
                value="1"
              />
              <span class="text-[25px] bg-[#eff0f5] text-[#9e9e9e] cursor-pointer px-1">
                +
              </span>
            </div>

            <div className="flex gap-x-3 pt-6">
              <Link to={`/shipping/${_id}`}>
                <button className="text-white bg-[#2abbe8] md:px-[87px] px-[29px] md:py-[9.5px] py-[8px] rounded-[1.8px] hover:scale-105 duration-50000 transition-all">
                  Buy Now
                </button>
              </Link>
              <Link>
                <button
                  className="text-white bg-[#f57224] md:px-[87px] px-[22px] md:py-[9.5px] py-[8px] rounded-[1.8px] hover:scale-105 duration-50000 transition-all"
                  onClick={handleAddToCartSave}
                >
                  Add To Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default Chackout;

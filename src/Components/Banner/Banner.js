import React from "react";
import image from "../../Images/Image1.png";

const Banner = () => {
  return (
    <div className="grid grid-cols-2 bg-amber-600 rounded-[30px]">
      <div className="grid justify-items-end text-white">
        <div>
          <h1 className=" md:mt-9 text-bold text-6xl">
            Deliver Food To Your <br /> Door Step.
          </h1>
          <h3>Authentic Food, Quick Services, Fast Delivery.</h3>
        </div>
      </div>
      <div className=" grid justify-items-start">
        <img src={image} className="max-w-sm bg-transparent align-bottom" />
      </div>
    </div>
  );
};

export default Banner;

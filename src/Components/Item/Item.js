import React from "react";

const Item = ({ item }) => {
  return (
    <div>
      <div className="h-64 overflow-hidden">
        <img
          src={item?.ImageUrl ? item.ImageUrl : "Error Loading"}
          className="rounded-xl w-full h-full object-cover"
          alt="Food"
        />
      </div>
      <div className="text-center">
        <h1 className="text-slate-500">{item.Name}</h1>
      </div>
    </div>
  );
};

export default Item;

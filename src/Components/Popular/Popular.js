import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "../Item/Item";

import "swiper/css";
import "swiper/css/pagination";
import NewItem from "../NewItem/NewItem";

const Popular = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swiper, setSwiper] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const openModal = () => setIsOpen(true);

  useEffect(() => {
    fetch(
     "http://www.api.technicaltest.quadtheoryltd.com/api/Item?page=1&pageSize=10"
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.Items);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="text-center m-32">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center m-32">
        <h1 className="text-2xl text-red-600">Error: {error}</h1>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mx-10">
      <div className="grid grid-cols-2 md:mt-32">
        <div className="grid justify-items-start">
          <h1 className="text-xl md:text-3xl m-2">Popular</h1>
        </div>
        <div className="grid justify-items-end">
          <div className="flex justify-end ">
            <a
              href="#my_modal_8"
              onClick={openModal}
              className="text-orange-600 font-bold mt-3"
            >
              AddMore
            </a>
            <button
              className="bg-transparent mx-2"
              onClick={() => swiper.slidePrev()}
            >
              ❮
            </button>
            <button
              className="bg-transparent mx-2"
              onClick={() => swiper.slideNext()}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
      <div>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          className="mySwiper"
          onSwiper={setSwiper}
        >
          {items.map((item) => (
            <SwiperSlide key={item.Id}>
              <Item key={item.Id} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <NewItem isOpen={isOpen} setIsOpen={setIsOpen}></NewItem>
    </div>
  );
};

export default Popular;

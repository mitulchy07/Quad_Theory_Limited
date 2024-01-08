import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Item from "../Item/Item";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [swiper, setSwiper] = useState(null);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="md:mb-56">
      <div>
        <div className="grid grid-cols-2 md:mt-32">
          <div className="grid justify-items-start">
            <h1 className="text-3xl m-2">Recommended</h1>
          </div>
          <div className="grid justify-items-end">
            <div className="flex justify-end ">
              <Link to="/newitem" className="text-orange-600 font-bold mt-3">
                AddMore
              </Link>
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
            {[...items].reverse().map((item) => (
              <SwiperSlide key={item.Id}>
                <Item key={item.Id} item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Recommended;
